import { NextResponse } from "next/server";
import { runAgentStep, startRun } from "@/lib/blog-agent";

export const runtime = "nodejs";
// One request runs a single agent step (one model call plus its tools), which
// measures 5-25s. The client drives the loop, so the run as a whole is not
// bounded by this — and it stays inside the 60s Hobby cap on Vercel.
// Must be a literal: Next statically analyses segment config exports.
export const maxDuration = 60;

export async function POST(request) {
	if (!process.env.DEEPSEEK_API_KEY) {
		return NextResponse.json(
			{ success: false, error: "DeepSeek API key not configured" },
			{ status: 500 },
		);
	}
	if (!process.env.EXA_API_KEY) {
		return NextResponse.json(
			{ success: false, error: "Exa API key not configured" },
			{ status: 500 },
		);
	}

	const body = await request.json().catch(() => ({}));
	const { messages, postContext, run: previousRun } = body;

	// Either resume a run the client is holding, or open a new one.
	let run;
	if (previousRun?.conversation?.length) {
		run = previousRun;
	} else if (Array.isArray(messages) && messages.length > 0) {
		run = startRun({ messages, postContext });
	} else {
		return NextResponse.json(
			{ success: false, error: "messages or run is required" },
			{ status: 400 },
		);
	}

	const encoder = new TextEncoder();
	// `start` must stay synchronous: Next awaits it before sending headers, so
	// an async body here would buffer the entire step instead of streaming it.
	const stream = new ReadableStream({
		start(controller) {
			const send = (event) => {
				controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
			};

			// Node holds queued chunks until the event loop gets an I/O turn, so
			// without this yield the whole step lands on the client at once.
			const flush = () => new Promise((resolve) => setImmediate(resolve));

			send({ type: "start", at: Date.now() });

			(async () => {
				try {
					for await (const event of runAgentStep(run)) {
						send(event);
						await flush();
					}
				} catch (error) {
					console.error("Blog chat agent error:", error);
					send({ type: "error", error: error?.message || "Agent failed" });
				} finally {
					controller.close();
				}
			})();
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "application/x-ndjson; charset=utf-8",
			"Cache-Control": "no-cache, no-transform",
			// Stop reverse proxies from holding the stream. Do not set
			// Content-Encoding here — a bogus value makes clients buffer the body.
			"X-Accel-Buffering": "no",
		},
	});
}
