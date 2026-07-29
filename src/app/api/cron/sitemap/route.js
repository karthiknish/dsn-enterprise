import { NextResponse } from "next/server";
import {
	assessSitemap,
	getSitemapStatus,
	SEARCH_CONSOLE_SITE,
	submitSitemap,
} from "@/lib/search-console";
import { getSiteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITEMAP_URL = getSiteUrl("/sitemap.xml");

/**
 * Vercel sends `Authorization: Bearer $CRON_SECRET` on scheduled invocations.
 * Without this check the endpoint is an open button that anyone can press.
 */
function isAuthorised(request) {
	const secret = process.env.CRON_SECRET;
	if (!secret) return false;

	const header = request.headers.get("authorization") || "";
	const token = /^Bearer\s+(.+)$/i.exec(header.trim())?.[1];
	return token === secret;
}

async function run() {
	const submitted = await submitSitemap(SITEMAP_URL);
	const status = await getSitemapStatus(SITEMAP_URL);
	const health = assessSitemap(status);

	if (!health.healthy) {
		// Surfaces in Vercel logs, where cron failures are actually looked at.
		console.error(
			`Sitemap check failed for ${SITEMAP_URL}: ${health.problems.join("; ")}`,
		);
	}

	return {
		success: true,
		site: SEARCH_CONSOLE_SITE,
		sitemap: SITEMAP_URL,
		submitted: submitted.submitted,
		status,
		healthy: health.healthy,
		problems: health.problems,
	};
}

export async function GET(request) {
	if (!isAuthorised(request)) {
		return NextResponse.json(
			{ success: false, error: "Unauthorised" },
			{ status: 401 },
		);
	}

	try {
		const result = await run();
		// 200 either way: a failed sitemap is a reportable finding, not a broken
		// cron. Returning 500 here would make Vercel retry a Google-side issue.
		return NextResponse.json(result);
	} catch (error) {
		console.error("Sitemap cron failed:", error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 },
		);
	}
}
