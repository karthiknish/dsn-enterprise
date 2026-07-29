import { NextResponse } from "next/server";
import { runBlogAgent } from "@/lib/blog-agent";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * Streams agent steps as newline-delimited JSON so the studio can show
 * research happening instead of a one-minute spinner.
 */
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
	const { messages, postContext } = body;

	if (!Array.isArray(messages) || messages.length === 0) {
		return NextResponse.json(
			{ success: false, error: "messages are required" },
			{ status: 400 },
		);
	}

	const encoder = new TextEncoder();
	// `start` must stay synchronous: Next awaits it before sending headers, so
	// an async body here would buffer the entire run instead of streaming it.
	const stream = new ReadableStream({
		start(controller) {
			const send = (event) => {
				controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
			};

			// Node holds queued chunks until the event loop gets an I/O turn, so
			// without this yield the whole run lands on the client at once.
			const flush = () => new Promise((resolve) => setImmediate(resolve));

			send({ type: "start", at: Date.now() });

			(async () => {
				try {
					for await (const event of runBlogAgent({ messages, postContext })) {
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
