import { NextResponse } from "next/server";
import {
	DEFAULT_STYLE,
	generateFeaturedImage,
	IMAGE_STYLES,
} from "@/lib/gemini-image-server";

export const runtime = "nodejs";
// Vercel caps this at 60s on Hobby. 2K generation measures ~25s including the
// art-direction pass; 4K is close to the limit and may time out there.
// Must be a literal: Next statically analyses segment config exports.
export const maxDuration = 60;

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
