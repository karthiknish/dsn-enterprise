/**
 * Per-run history for the daily Search Console sitemap check.
 *
 * Why this exists. The cron in `src/app/api/cron/sitemap/route.js` submits the
 * sitemaps and reads them back, but until now it kept no record of having done
 * so. Everything it knew came from Google's own `lastSubmitted` /
 * `lastDownloaded`, and `lastSubmitted` is *overwritten* on every submit. So the
 * only question the system could answer was "did it run recently?", never "has
 * it been running?" — a cron that failed Mon–Wed and succeeded Thu left exactly
 * the same trace as one that ran every day. Vercel's log retention cannot close
 * that either: `vercel logs` streams the last five minutes only.
 *
 * One document per UTC day, keyed `YYYY-MM-DD`, so a re-run on the same day
 * updates that day's row rather than appending a duplicate. A daily cron then
 * produces exactly one row per day, which is what makes a gap readable.
 *
 * Firestore is reached through the Admin SDK (`getAdminDb`), which bypasses
 * security rules — correct here, because this is a server-only operational log
 * that no client should read or write. The collection is deliberately outside
 * the `blogs` / `contacts` rules in `firestore.rules`: without an `allow`
 * clause, client access is denied by default and only the Admin SDK can touch it.
 *
 * Server-only. Never import from a client component.
 */

import { getAdminDb } from "@/lib/firebase-admin";

const COLLECTION = "ops_sitemap_runs";

/** Runs older than this are pruned opportunistically on each write. */
export const RETAIN_DAYS = 90;

/**
 * How long without a run before the health check should complain.
 *
 * The cron is scheduled daily at 04:00 UTC and Vercel allows up to an hour of
 * jitter on this plan, so a healthy gap is at most ~25h. 50h therefore means a
 * whole day was skipped, with a full day of slack against jitter and a late
 * health probe.
 */
export const STALE_AFTER_HOURS = 50;

function dayKey(date) {
	return date.toISOString().slice(0, 10);
}

/**
 * Persist one run. `summary` is the shape the cron route already returns:
 * `{ healthy, problems, sitemaps }` plus the derived `lastDownloaded` / `urls`.
 */
export async function recordSitemapRun(
	summary,
	{ at = new Date(), trigger = "unknown" } = {},
) {
	const db = getAdminDb();
	const atIso = at.toISOString();

	const doc = {
		at: atIso,
		day: dayKey(at),
		trigger,
		healthy: Boolean(summary?.healthy),
		problems: Array.isArray(summary?.problems)
			? summary.problems.slice(0, 20)
			: [],
		lastDownloaded: summary?.lastDownloaded || null,
		urls: Number.isFinite(summary?.urls) ? summary.urls : null,
		sitemaps: (summary?.sitemaps || []).slice(0, 10).map((entry) => ({
			sitemap: entry.sitemap,
			healthy: Boolean(entry.healthy),
			lastSubmitted: entry.status?.lastSubmitted || null,
			lastDownloaded: entry.status?.lastDownloaded || null,
			errors: entry.status?.errors ?? null,
			warnings: entry.status?.warnings ?? null,
		})),
	};

	await db.collection(COLLECTION).doc(dayKey(at)).set(doc);
	await pruneOldRuns(db, at);
	return doc;
}

async function pruneOldRuns(db, at) {
	const cutoff = new Date(
		at.getTime() - RETAIN_DAYS * 86_400_000,
	).toISOString();
	const stale = await db
		.collection(COLLECTION)
		.where("at", "<", cutoff)
		.limit(100)
		.get();
	if (stale.empty) return 0;

	const batch = db.batch();
	for (const doc of stale.docs) batch.delete(doc.ref);
	await batch.commit();
	return stale.size;
}

/** Recent runs, newest first. */
export async function readSitemapRunHistory(limit = 40) {
	const db = getAdminDb();
	const snapshot = await db
		.collection(COLLECTION)
		.orderBy("at", "desc")
		.limit(limit)
		.get();
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * Turn run history into a verdict.
 *
 * An empty history is *not* a failure. Before the first run after this shipped
 * there is nothing to judge, and reporting "unhealthy" then would flip the site
 * red on deploy. `known: false` says "we cannot tell yet" and callers treat that
 * as healthy-but-unproven.
 */
export function assessSitemapRunHistory(
	runs,
	{ staleAfterHours = STALE_AFTER_HOURS, maxConsecutiveFailures = 2 } = {},
) {
	if (!Array.isArray(runs) || runs.length === 0) {
		return {
			known: false,
			healthy: true,
			problems: [],
			lastRunAt: null,
			ageHours: null,
			consecutiveUnhealthy: 0,
			runsOnRecord: 0,
		};
	}

	const lastRunAt = runs[0].at;
	const ageHours = (Date.now() - new Date(lastRunAt).getTime()) / 3_600_000;

	let consecutiveUnhealthy = 0;
	for (const run of runs) {
		if (run.healthy) break;
		consecutiveUnhealthy += 1;
	}

	const problems = [];
	if (ageHours > staleAfterHours) {
		problems.push(
			`the sitemap check has not run for ${Math.floor(ageHours)}h; it is scheduled daily`,
		);
	}
	if (consecutiveUnhealthy >= maxConsecutiveFailures) {
		problems.push(
			`${consecutiveUnhealthy} consecutive sitemap check(s) reported problems`,
		);
	}

	return {
		known: true,
		healthy: problems.length === 0,
		problems,
		lastRunAt,
		ageHours: Math.round(ageHours * 10) / 10,
		consecutiveUnhealthy,
		runsOnRecord: runs.length,
		lastRun: {
			at: runs[0].at,
			healthy: Boolean(runs[0].healthy),
			trigger: runs[0].trigger || "unknown",
			problems: runs[0].problems || [],
		},
	};
}
