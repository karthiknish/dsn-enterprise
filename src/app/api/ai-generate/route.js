import { NextResponse } from "next/server";
import {
	generateBlogContent,
	generateBlogIdeas,
	generateBlogMetadata,
	generateExcerpt,
	generateTitle,
	improveContent,
} from "@/lib/deepseek";
import { ERROR_CODES, jsonError } from "@/lib/http-error";

export async function POST(request) {
	try {
		if (!process.env.DEEPSEEK_API_KEY) {
			return jsonError({
				code: ERROR_CODES.serviceUnavailable,
				message: "DeepSeek API key not configured",
				status: 500,
				extra: { success: false },
			});
		}

		const body = await request.json();
		const { action, topic, keywords, content, instruction, category } = body;

		let result;

		switch (action) {
			case "generate":
				if (!topic) {
					return jsonError({
						code: ERROR_CODES.validationError,
						message: "Topic is required",
						status: 400,
						extra: { success: false },
					});
				}
				result = await generateBlogContent(topic, keywords || []);
				break;

			case "metadata":
				if (!topic || !content) {
					return jsonError({
						code: ERROR_CODES.validationError,
						message: "Topic and content are required",
						status: 400,
						extra: { success: false },
					});
				}
				result = await generateBlogMetadata(topic, content);
				break;

			case "ideas":
				result = await generateBlogIdeas(category || "precision gauges");
				break;

			case "improve":
				if (!content || !instruction) {
					return jsonError({
						code: ERROR_CODES.validationError,
						message: "Content and instruction are required",
						status: 400,
						extra: { success: false },
					});
				}
				result = await improveContent(content, instruction);
				break;

			case "title":
				if (!topic) {
					return jsonError({
						code: ERROR_CODES.validationError,
						message: "Topic is required",
						status: 400,
						extra: { success: false },
					});
				}
				result = await generateTitle(topic);
				break;

			case "excerpt":
				if (!topic) {
					return jsonError({
						code: ERROR_CODES.validationError,
						message: "Title is required",
						status: 400,
						extra: { success: false },
					});
				}
				result = await generateExcerpt(topic, content || "");
				break;

			default:
				return jsonError({
					code: ERROR_CODES.badRequest,
					message: "Invalid action",
					status: 400,
					extra: { success: false },
				});
		}

		return NextResponse.json(result);
	} catch (error) {
		console.error("AI Generate API Error:", error);
		return jsonError({
			code: ERROR_CODES.internalError,
			message: "Internal server error",
			status: 500,
			extra: { success: false },
		});
	}
}
