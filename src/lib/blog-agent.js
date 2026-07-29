/**
 * Blog studio agent loop (server-only).
 *
 * DeepSeek does the reasoning and writing, Exa supplies the facts, and a
 * deterministic slop check gates the result. The loop is an async generator so
 * the route can stream each step to the admin UI instead of showing a spinner
 * for a minute.
 */

import { reviseInstruction, SYSTEM_PROMPT } from "@/lib/blog-agent-prompt";
import { executeTool, TOOL_SCHEMAS } from "@/lib/blog-agent-tools";
import { checkSlop, formatSlopReport } from "@/lib/slop-check";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const MAX_STEPS = 12;
const MAX_REVISIONS = 2;
const ACCEPTABLE_SCORE = 85;

async function callDeepSeek(messages, { tools = TOOL_SCHEMAS } = {}) {
	const response = await fetch(DEEPSEEK_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY || ""}`,
		},
		body: JSON.stringify({
			model: MODEL,
			messages,
			tools,
			tool_choice: "auto",
			temperature: 0.6,
			max_tokens: 8000,
		}),
		cache: "no-store",
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		throw new Error(
			`DeepSeek API error (${response.status}): ${detail.slice(0, 300)}`,
		);
	}

	const data = await response.json();
	const choice = data?.choices?.[0];
	if (!choice) throw new Error("DeepSeek returned no choices");
	return choice.message;
}

function parseArgs(raw) {
	try {
		return JSON.parse(raw || "{}");
	} catch {
		return {};
	}
}

function summariseToolResult(name, result) {
	if (name === "web_search") {
		return (result.results || []).map((r) => ({
			title: r.title,
			url: r.url,
			published: r.published,
		}));
	}
	if (name === "read_page") {
		return (result.pages || []).map((p) => ({
			title: p.title,
			url: p.url,
			chars: p.text?.length || 0,
		}));
	}
	return null;
}

/**
 * @param {object} params
 * @param {Array<{role:string, content:string}>} params.messages  Editor/assistant chat history
 * @param {object} [params.postContext]  Current form state, so the agent can work with an existing draft
 * @yields {{type:string, ...}} stream events
 */
export async function* runBlogAgent({ messages, postContext }) {
	if (!process.env.DEEPSEEK_API_KEY) {
		yield { type: "error", error: "DeepSeek API key not configured" };
		return;
	}

	const contextNote = postContext?.title
		? `\n\nCURRENT POST IN THE EDITOR\nTitle: ${postContext.title}\nExcerpt: ${postContext.excerpt || "(empty)"}\nBody length: ${(postContext.content || "").length} characters.`
		: "";

	const conversation = [
		{ role: "system", content: SYSTEM_PROMPT + contextNote },
		...messages.map((m) => ({ role: m.role, content: m.content })),
	];

	let draft = null;
	let report = null;
	let revisions = 0;
	const sourcesSeen = new Map();

	for (let step = 0; step < MAX_STEPS; step += 1) {
		let message;
		try {
			message = await callDeepSeek(conversation);
		} catch (error) {
			yield { type: "error", error: error.message };
			return;
		}

		conversation.push(message);

		if (message.content?.trim()) {
			yield { type: "assistant", content: message.content.trim() };
		}

		const toolCalls = message.tool_calls || [];
		if (!toolCalls.length) {
			yield { type: "done", draft, report, sources: [...sourcesSeen.values()] };
			return;
		}

		for (const call of toolCalls) {
			const name = call.function?.name;
			const args = parseArgs(call.function?.arguments);

			yield { type: "tool_call", id: call.id, name, args };

			let execution;
			try {
				execution = await executeTool(name, args);
			} catch (error) {
				execution = { result: { error: error.message } };
				yield { type: "tool_error", id: call.id, name, error: error.message };
			}

			for (const source of summariseToolResult(name, execution.result) || []) {
				if (source.url && !sourcesSeen.has(source.url)) {
					sourcesSeen.set(source.url, source);
				}
			}

			yield {
				type: "tool_result",
				id: call.id,
				name,
				summary: summariseToolResult(name, execution.result),
			};

			conversation.push({
				role: "tool",
				tool_call_id: call.id,
				content: JSON.stringify(execution.result).slice(0, 60000),
			});

			if (!execution.draft) continue;

			// Draft checkpoint: grade it, and push back if it reads generated.
			draft = execution.draft;
			report = checkSlop(draft.contentMarkdown, { sources: draft.sources });
			yield { type: "draft", draft, report };

			const needsWork =
				report.score < ACCEPTABLE_SCORE && revisions < MAX_REVISIONS;
			if (needsWork) {
				revisions += 1;
				yield { type: "revision", attempt: revisions, report };
				conversation.push({
					role: "user",
					content: reviseInstruction(formatSlopReport(report)),
				});
			}
		}
	}

	yield {
		type: "done",
		draft,
		report,
		sources: [...sourcesSeen.values()],
		note: "Reached the step limit.",
	};
}
