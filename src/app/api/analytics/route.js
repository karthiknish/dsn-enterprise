import { NextResponse } from "next/server";
import {
	ANALYTICS_PERIODS,
	getAnalyticsData,
	isValidPeriod,
} from "@/lib/analytics-data";
import { requireAdmin } from "@/lib/api-auth";

/**
 * GA4 analytics for the admin dashboard.
 *
 * Requires a valid Firebase ID token. This endpoint was previously public:
 * an anonymous GET returned the full analytics payload (traffic, referrers,
 * top pages) with HTTP 200.
 */

// Auth depends on a per-request header, so this must never be cached or
// statically evaluated at build time.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request) {
	const auth = await requireAdmin(request);
	if (!auth.ok) return auth.response;

	const { searchParams } = new URL(request.url);
	const period = searchParams.get("period") || "30d";

	if (!isValidPeriod(period)) {
		return NextResponse.json(
			{
				error: `Invalid period. Expected one of: ${ANALYTICS_PERIODS.join(", ")}`,
			},
			{ status: 400 },
		);
	}

	try {
		const data = await getAnalyticsData(period);
		return NextResponse.json(data, {
			headers: {
				// Per-user data behind auth: never store in a shared cache.
				"Cache-Control": "private, no-store",
			},
		});
	} catch (error) {
		// Log the real error server-side, return a generic message. GA API
		// errors embed the service-account email, GCP project, and property ID.
		console.error("GA Data API error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch analytics data" },
			{ status: 502 },
		);
	}
}
