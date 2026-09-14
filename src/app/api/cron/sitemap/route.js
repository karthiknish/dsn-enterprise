import { NextResponse } from "next/server";
import { ERROR_CODES, jsonError } from "@/lib/http-error";
import {
	assessSitemap,
	getSitemapStatus,
	SEARCH_CONSOLE_SITE,
	submitSitemap,
} from "@/lib/search-console";
import { getSubmittedSitemapUrls } from "@/lib/sitemap-entries";
import { recordSitemapRun } from "@/lib/sitemap-run-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * What gets pushed to Search Console: the index, plus every segment marked
 * `submit`. Cities are excluded by default (see SITEMAP_SEGMENTS) so the
 * crawl budget Google allocates from the sitemap goes to pages that can
 * index today; submitting them is an env flag, not a deploy.
 */
const SITEMAP_URLS = getSubmittedSitemapUrls();

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

/**
 * Vercel's scheduler identifies itself as `vercel-cron/1.0`. Recording it keeps
 * a hand-triggered run from being read as evidence that the schedule fired —
 * the exact distinction the history exists to make.
 */
function triggerOf(request) {
	const ua = request.headers.get("user-agent") || "";
	return /vercel-cron/i.test(ua) ? "cron" : "manual";
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

/** Flatten a run result into the row the history stores. */
function summarise(result) {
	const lastDownloaded =
		result.sitemaps
			.map((entry) => entry.status?.lastDownloaded)
			.filter(Boolean)
			.sort()
			.at(-1) || null;

	return {
		healthy: result.healthy,
		problems: result.problems,
		sitemaps: result.sitemaps,
		lastDownloaded,
		urls: result.sitemaps.reduce(
			(sum, entry) => sum + Number(entry.status?.urlCount || 0),
			0,
		),
	};
}

/**
 * Write the run to the history, and never let that write fail the cron.
 *
 * The history is diagnostics. If Firestore is unreachable, the sitemap still
 * got submitted and the cron still did its job; turning that into a 500 would
 * be reporting a logging outage as a Search Console outage.
 */
async function recordRunSafely(summary, trigger) {
	try {
		const run = await recordSitemapRun(summary, { trigger });
		return { recorded: true, at: run.at, trigger: run.trigger };
	} catch (error) {
		console.error("Sitemap run history write failed:", error?.message);
		return { recorded: false, error: error?.message || "history write failed" };
	}
}

export async function GET(request) {
	if (!isAuthorised(request)) {
		return jsonError({
			code: ERROR_CODES.unauthorized,
			message: "Unauthorised",
			status: 401,
			extra: { success: false },
		});
	}

	const trigger = triggerOf(request);

	try {
		const result = await run();
		const logged = await recordRunSafely(summarise(result), trigger);
		// 200 either way: a failed sitemap is a reportable finding, not a broken
		// cron. Returning 500 here would make Vercel retry a Google-side issue.
		return NextResponse.json({ ...result, logged });
	} catch (error) {
		console.error("Sitemap cron failed:", error);
		// A thrown run is still a run. Record it, or the history would show a
		// clean gap for a day the cron actually ran and failed.
		const logged = await recordRunSafely(
			{
				healthy: false,
				problems: [error?.message || "sitemap cron failed"],
				sitemaps: [],
			},
			trigger,
		);
		return jsonError({
			code: ERROR_CODES.internalError,
			message: error.message || "Sitemap cron failed",
			status: 500,
			extra: { success: false, logged },
		});
	}
}
