import { NextResponse } from "next/server";
import { getPhoto, getPhotos, searchPhotos } from "@/lib/unsplash-server";

export const dynamic = "force-dynamic";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type") || "photos";
	const perPage = Math.min(
		Math.max(parseInt(searchParams.get("per_page") || "15", 10), 1),
		30,
	);
	const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

	try {
		let result;

		switch (type) {
			case "search": {
				const query = searchParams.get("query")?.trim();
				if (!query) {
					return NextResponse.json(
						{ error: "Search query is required" },
						{ status: 400 },
					);
				}
				result = await searchPhotos(query, perPage, page);
				break;
			}
			case "photo": {
				const id = searchParams.get("id");
				if (!id) {
					return NextResponse.json(
						{ error: "Photo id is required" },
						{ status: 400 },
					);
				}
				result = await getPhoto(id);
				break;
			}
			case "photos":
				result = await getPhotos(perPage, page);
				break;
			default:
				return NextResponse.json(
					{ error: "Invalid type. Use search, photos, or photo." },
					{ status: 400 },
				);
		}

		return NextResponse.json(result);
	} catch (error) {
		console.error("Unsplash API route error:", error);
		const message = error.message || "Failed to fetch photos";
		const status = message.includes("not configured") ? 503 : 502;
		return NextResponse.json({ error: message }, { status });
	}
}
