import { NextResponse } from "next/server";
import {
	assessSitemap,
	getSitemapStatus,
	SEARCH_CONSOLE_SITE,
	submitSitemap,
} from "@/lib/search-console";
import { getSiteUrl } from "@/lib/site";
import { SITEMAP_SEGMENTS } from "@/lib/sitemap-entries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * What gets pushed to Search Console: the index, plus every segment marked
 * `submit`. Cities are excluded by default (see SITEMAP_SEGMENTS) so the
 * crawl budget Google allocates from the sitemap goes to pages that can
 * index today; submitting them is an env flag, not a deploy.
 */
const SITEMAP_URLS = [
	getSiteUrl("/sitemap-index.xml"),
	...SITEMAP_SEGMENTS.filter((segment) => segment.submit).map(
		(segment) => segment.url,
	),
];

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

async function checkOne(sitemapUrl) {
	const submitted = await submitSitemap(sitemapUrl);
	const status = await getSitemapStatus(sitemapUrl);
	const health = assessSitemap(status);

	if (!health.healthy) {
		// Surfaces in Vercel logs, where cron failures are actually looked at.
		console.error(
			`Sitemap check failed for ${sitemapUrl}: ${health.problems.join("; ")}`,
		);
	}

	return {
		sitemap: sitemapUrl,
		submitted: submitted.submitted,
		status,
		healthy: health.healthy,
		problems: health.problems,
	};
}

async function run() {
	// Sequential: the Search Console write quota is small and this runs once a
	// day over two or three URLs, so there is nothing to gain from racing them.
	const results = [];
	for (const sitemapUrl of SITEMAP_URLS) {
		results.push(await checkOne(sitemapUrl));
	}

	return {
		success: true,
		site: SEARCH_CONSOLE_SITE,
		sitemaps: results,
		healthy: results.every((r) => r.healthy),
		problems: results.flatMap((r) =>
			r.problems.map((p) => `${r.sitemap}: ${p}`),
		),
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
