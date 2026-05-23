import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/analytics-data";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const period = searchParams.get("period") || "30d";

	try {
		const data = await getAnalyticsData(period);
		return NextResponse.json(data);
	} catch (error) {
		console.error("GA Data API Error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to fetch analytics data" },
			{ status: 500 },
		);
	}
}
