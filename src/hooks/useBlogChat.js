"use client";

import { useCallback, useReducer, useRef } from "react";
import { blogChatReducer, initialBlogChatState } from "@/lib/blog-chat-reducer";
import { markdownToHtml } from "@/lib/markdown-to-html";

const EVENT_TO_ACTION = {
	assistant: (e) => ({ type: "ASSISTANT", content: e.content }),
	tool_call: (e) => ({
		type: "TOOL_CALL",
		id: e.id,
		name: e.name,
		args: e.args,
	}),
	tool_result: (e) => ({ type: "TOOL_RESULT", id: e.id, summary: e.summary }),
	tool_error: (e) => ({ type: "TOOL_ERROR", id: e.id, error: e.error }),
	draft: (e) => ({ type: "DRAFT", draft: e.draft, report: e.report }),
	revision: (e) => ({ type: "REVISION", attempt: e.attempt, report: e.report }),
	notice: (e) => ({ type: "NOTICE", message: e.message }),
	done: (e) => ({ type: "DONE", sources: e.sources, note: e.note }),
	error: (e) => ({ type: "ERROR", error: e.error }),
};

// Safety net for the client-driven loop; the server enforces its own step cap.
const MAX_CLIENT_STEPS = 16;

/**
 * Drives the researched-blog chat: streams NDJSON agent events and exposes
 * the resulting draft plus its slop report.
 */
export function useBlogChat({ postContext, onApplyDraft } = {}) {
	const [state, dispatch] = useReducer(blogChatReducer, initialBlogChatState);
	const abortRef = useRef(null);

	const send = useCallback(
		async (rawContent) => {
			const content = (rawContent ?? "").trim();
			if (!content || state.running) return;

			const history = [
				...state.timeline
					.filter((e) => e.kind === "user" || e.kind === "assistant")
					.map((e) => ({ role: e.kind, content: e.content })),
				{ role: "user", content },
			];

			dispatch({ type: "SUBMIT", content });

			const controller = new AbortController();
			abortRef.current = controller;

			/**
			 * Runs one agent step and returns the run state to resume from, or null
			 * when the turn is over. Each request is short enough to stay well
			 * inside the serverless time limit.
			 */
			const runStep = async (payload) => {
				const response = await fetch("/api/blog-chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
					signal: controller.signal,
				});

				if (!response.ok || !response.body) {
					const data = await response.json().catch(() => ({}));
					throw new Error(data.error || `Request failed (${response.status})`);
				}

				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				let buffer = "";
				let nextRun = null;
				let failed = false;

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					buffer += decoder.decode(value, { stream: true });

					const lines = buffer.split("\n");
					buffer = lines.pop() || "";

					for (const line of lines) {
						if (!line.trim()) continue;
						let event;
						try {
							event = JSON.parse(line);
						} catch {
							continue;
						}

						// State is plumbing, not something the editor should see.
						if (event.type === "state") {
							nextRun = event.run;
							continue;
						}
						if (event.type === "error") failed = true;

						const toAction = EVENT_TO_ACTION[event.type];
						if (toAction) dispatch(toAction(event));
					}
				}

				if (failed || !nextRun || nextRun.done) return null;
				return nextRun;
			};

			try {
				let run = await runStep({ messages: history, postContext });
				let steps = 1;

				while (run && steps < MAX_CLIENT_STEPS) {
					run = await runStep({ run });
					steps += 1;
				}

				dispatch({ type: "DONE", sources: [] });
			} catch (error) {
				if (error.name === "AbortError") {
					dispatch({ type: "DONE", sources: [] });
					return;
				}
				dispatch({ type: "ERROR", error: error.message || "Network error" });
			} finally {
				abortRef.current = null;
			}
		},
		[postContext, state.running, state.timeline],
	);

	const stop = useCallback(() => {
		abortRef.current?.abort();
	}, []);

	const applyDraft = useCallback(
		(fields) => {
			if (!state.draft) return;
			const draft = state.draft;
			const payload = {};

			if (fields.title !== false) payload.title = draft.title;
			if (fields.excerpt !== false) payload.excerpt = draft.excerpt;
			if (fields.content !== false) {
				payload.content = markdownToHtml(draft.contentMarkdown);
			}
			if (fields.seo !== false) {
				payload.metaTitle = draft.metaTitle || "";
				payload.metaDescription = draft.metaDescription || "";
			}

			onApplyDraft?.(payload, draft);
			dispatch({ type: "APPLIED" });
		},
		[state.draft, onApplyDraft],
	);

	return {
		state,
		dispatch,
		send,
		stop,
		applyDraft,
		setInput: (input) => dispatch({ type: "SET_INPUT", input }),
		reset: () => dispatch({ type: "RESET" }),
	};
}
