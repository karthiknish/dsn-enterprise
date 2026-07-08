import { NextResponse } from "next/server";
import {
	generateBlogContent,
	generateBlogIdeas,
	generateBlogMetadata,
	generateExcerpt,
	generateTitle,
	improveContent,
} from "@/lib/deepseek";

export async function POST(request) {
	try {
		if (!process.env.DEEPSEEK_API_KEY) {
			return NextResponse.json(
				{ success: false, error: "DeepSeek API key not configured" },
				{ status: 500 },
			);
		}

		const body = await request.json();
		const { action, topic, keywords, content, instruction, category } = body;

		let result;

		switch (action) {
			case "generate":
				if (!topic) {
					return NextResponse.json(
						{ success: false, error: "Topic is required" },
						{ status: 400 },
					);
				}
				result = await generateBlogContent(topic, keywords || []);
				break;

			case "metadata":
				if (!topic || !content) {
					return NextResponse.json(
						{ success: false, error: "Topic and content are required" },
						{ status: 400 },
					);
				}
				result = await generateBlogMetadata(topic, content);
				break;

			case "ideas":
				result = await generateBlogIdeas(category || "precision gauges");
				break;

			case "improve":
				if (!content || !instruction) {
					return NextResponse.json(
						{ success: false, error: "Content and instruction are required" },
						{ status: 400 },
					);
				}
				result = await improveContent(content, instruction);
				break;

			case "title":
				if (!topic) {
					return NextResponse.json(
						{ success: false, error: "Topic is required" },
						{ status: 400 },
					);
				}
				result = await generateTitle(topic);
				break;

			case "excerpt":
				if (!topic) {
					return NextResponse.json(
						{ success: false, error: "Title is required" },
						{ status: 400 },
					);
				}
				result = await generateExcerpt(topic, content || "");
				break;

			default:
				return NextResponse.json(
					{ success: false, error: "Invalid action" },
					{ status: 400 },
				);
		}

		return NextResponse.json(result);
	} catch (error) {
		console.error("AI Generate API Error:", error);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}
