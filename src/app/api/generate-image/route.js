import { NextResponse } from "next/server";
import {
	DEFAULT_STYLE,
	generateFeaturedImage,
	IMAGE_STYLES,
} from "@/lib/gemini-image-server";

export const runtime = "nodejs";
// 2K generation with a thinking pass can take a while.
export const maxDuration = 120;

export async function GET() {
	return NextResponse.json({
		success: true,
		configured: Boolean(
			process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
		),
		defaultStyle: DEFAULT_STYLE,
		styles: Object.entries(IMAGE_STYLES).map(([id, { label }]) => ({
			id,
			label,
		})),
	});
}

export async function POST(request) {
	try {
		if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
			return NextResponse.json(
				{ success: false, error: "Gemini API key not configured" },
				{ status: 500 },
			);
		}

		const body = await request.json();
		const {
			title,
			excerpt,
			content,
			style,
			instructions,
			aspectRatio,
			imageSize,
		} = body || {};

		if (!title) {
			return NextResponse.json(
				{ success: false, error: "Title is required" },
				{ status: 400 },
			);
		}

		const result = await generateFeaturedImage({
			title,
			excerpt: excerpt || "",
			content: content || "",
			style: style || DEFAULT_STYLE,
			instructions: instructions || "",
			aspectRatio,
			imageSize,
		});

		return NextResponse.json({ success: true, ...result });
	} catch (error) {
		console.error("Generate Image API Error:", error);
		return NextResponse.json(
			{
				success: false,
				error: error?.message || "Failed to generate image",
			},
			{ status: 500 },
		);
	}
}
