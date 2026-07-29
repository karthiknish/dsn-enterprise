/**
 * Blog studio agent loop (server-only).
 *
 * DeepSeek does the reasoning and writing, Exa supplies the facts, and a
 * deterministic slop check gates the result. The loop is an async generator so
 * the route can stream each step to the admin UI instead of showing a spinner
 * for a minute.
 */

import {
	FORCE_DRAFT_INSTRUCTION,
	reviseInstruction,
	SYSTEM_PROMPT,
} from "@/lib/blog-agent-prompt";
import { executeTool, TOOL_SCHEMAS } from "@/lib/blog-agent-tools";
import { checkSlop, formatSlopReport } from "@/lib/slop-check";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const MAX_STEPS = 12;
const MAX_REVISIONS = 2;
const ACCEPTABLE_SCORE = 85;

/**
 * Wall-clock budget for the whole turn, across every step.
 *
 * This is not the serverless limit — the caller runs one step per request, so
 * no single request comes close to maxDuration. This budget exists so a turn
 * cannot research forever while an editor waits; when it runs low the model is
 * made to write with what it has rather than being cut off empty-handed.
 */
const BUDGET_MS = Number(process.env.BLOG_AGENT_BUDGET_MS || 240_000);
// Writing a full article is the single most expensive call in the loop.
const WRITE_RESERVE_MS = Number(
	process.env.BLOG_AGENT_WRITE_RESERVE_MS || 45_000,
);

async function callDeepSeek(
	messages,
	{ tools = TOOL_SCHEMAS, toolChoice = "auto" } = {},
) {
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
			tool_choice: toolChoice,
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
 * Build the opening conversation for a new turn.
 */
export function startRun({ messages, postContext }) {
	const contextNote = postContext?.title
		? `\n\nCURRENT POST IN THE EDITOR\nTitle: ${postContext.title}\nExcerpt: ${postContext.excerpt || "(empty)"}\nBody length: ${(postContext.content || "").length} characters.`
		: "";

	return {
		conversation: [
			{ role: "system", content: SYSTEM_PROMPT + contextNote },
			...messages.map((m) => ({ role: m.role, content: m.content })),
		],
		draft: null,
		report: null,
		revisions: 0,
		sources: [],
		step: 0,
		elapsedMs: 0,
		forcedWrite: false,
		done: false,
	};
}

/**
 * Run exactly one agent step: one model call plus any tools it asks for.
 *
 * The loop is driven a step at a time by the caller so that no single HTTP
 * request approaches a serverless time limit (60s on Vercel Hobby), while the
 * run as a whole can take as long as it needs. `run` is plain JSON, so the
 * caller can hold it in memory, persist it, or send it back over the wire.
 *
 * @param {object} run  State from startRun(), or the run returned by the previous step
 * @yields {{type:string, ...}} stream events; the final event is always `state`
 */
export async function* runAgentStep(run) {
	if (!process.env.DEEPSEEK_API_KEY) {
		yield { type: "error", error: "DeepSeek API key not configured" };
		return;
	}

	const stepStartedAt = Date.now();
	const conversation = [...run.conversation];
	const sourcesSeen = new Map((run.sources || []).map((s) => [s.url, s]));

	let { draft, report, revisions, forcedWrite } = run;
	let done = false;
	let note = null;

	// Total time spent across every step of this turn, not just this request.
	const totalElapsed = () => run.elapsedMs + (Date.now() - stepStartedAt);

	const finish = (finalNote) => {
		done = true;
		note = finalNote;
	};

	if (run.step >= MAX_STEPS) {
		finish("Reached the step limit.");
	} else if (run.elapsedMs > BUDGET_MS && draft) {
		finish("Stopped at the time limit.");
	}

	if (!done) {
		// Out of research time with nothing written: make this call be the
		// article rather than another search.
		let toolChoice = "auto";
		if (
			!draft &&
			!forcedWrite &&
			run.elapsedMs > BUDGET_MS - WRITE_RESERVE_MS
		) {
			forcedWrite = true;
			toolChoice = { type: "function", function: { name: "save_draft" } };
			conversation.push({ role: "user", content: FORCE_DRAFT_INSTRUCTION });
			yield {
				type: "notice",
				message:
					"Research time is up — writing the draft now from what has been gathered.",
			};
		}

		let message;
		try {
			message = await callDeepSeek(conversation, { toolChoice });
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
			// No tool call means the model is talking to the editor: turn is over.
			finish(null);
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

			const summary = summariseToolResult(name, execution.result);
			for (const source of summary || []) {
				if (source.url && !sourcesSeen.has(source.url)) {
					sourcesSeen.set(source.url, source);
				}
			}

			yield { type: "tool_result", id: call.id, name, summary };

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

			// A revision costs another full write; only start one if there is room.
			const needsWork =
				report.score < ACCEPTABLE_SCORE &&
				revisions < MAX_REVISIONS &&
				totalElapsed() < BUDGET_MS - WRITE_RESERVE_MS;

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

	const next = {
		conversation,
		draft,
		report,
		revisions,
		sources: [...sourcesSeen.values()],
		step: run.step + 1,
		elapsedMs: totalElapsed(),
		forcedWrite,
		done,
	};

	if (done) {
		yield {
			type: "done",
			draft,
			report,
			sources: next.sources,
			note,
		};
	}

	// Always last: lets the caller resume the run on the next request.
	yield { type: "state", run: next };
}
