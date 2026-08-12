/**
 * SEO intelligence for the admin console, sourced through treg.
 *
 * Three jobs, three catalog endpoints, each picked as the cheapest option that
 * actually returned data when the integration was wired up:
 *
 *   rank      dataforseo.google.serp.organic   $0.002/call    live top-N organic
 *   keywords  dataforseo.google.keywords.ideas $0.0126/call   ideas + volume/CPC
 *   authority moz.web.url.metrics              $0.00667/call  DA/PA/spam score
 *
 * Cheaper siblings exist for all three (serpstat at $0.0005/result, majestic at
 * $0.0008/result), but treg's shared serpstat key was returning "Limits
 * exceeded" during setup. If that clears, the ids below are the only thing that
 * has to change — the response normalisers are the contract the UI depends on.
 *
 * Server-only.
 */

import { TregError, tregCall } from "@/lib/treg";

/** DataForSEO location code for India. 2840 = United States. */
export const DEFAULT_LOCATION_CODE = 2356;
export const DEFAULT_LANGUAGE_CODE = "en";

export const SEO_TASKS = ["rank", "keywords", "authority"];

/** Advertised per-call price, shown in the UI so cost is visible before a run. */
export const TASK_COSTS_USD = {
	rank: 0.002,
	keywords: 0.0126,
	authority: 0.00667,
};

/**
 * DataForSEO wraps every response in a task envelope and reports upstream
 * failures inside a 200. Unwrap it or throw with the real status message.
 */
function unwrapDataForSeo(payload, endpointId) {
	if (payload?.status_code !== 20000) {
		throw new TregError(payload?.status_message || "DataForSEO error", {
			status: 502,
			endpoint: endpointId,
			detail: payload?.status_message,
		});
	}

	const task = payload?.tasks?.[0];
	if (task?.status_code !== 20000) {
		throw new TregError(task?.status_message || "DataForSEO task failed", {
			status: 502,
			endpoint: endpointId,
			detail: task?.status_message,
		});
	}

	return { result: task?.result?.[0] ?? null, cost: payload?.cost ?? 0 };
}

function normaliseDomain(value) {
	return String(value || "")
		.trim()
		.replace(/^https?:\/\//i, "")
		.replace(/^www\./i, "")
		.replace(/\/.*$/, "")
		.toLowerCase();
}

/**
 * Where a site ranks for a keyword, plus everyone ahead of it.
 *
 * `rank_absolute` counts every SERP block (ads, AI overview, snippets), while
 * `rank_group` counts organic positions only — the UI shows the latter because
 * that is the number people mean by "we rank #3".
 *
 * @param {object} params
 * @param {string} params.keyword
 * @param {string} params.domain site to locate in the results
 * @param {number} [params.locationCode]
 * @param {number} [params.depth] results to scan, 10-100
 */
export async function fetchKeywordRank({
	keyword,
	domain,
	locationCode = DEFAULT_LOCATION_CODE,
	depth = 20,
}) {
	const endpointId = "dataforseo.google.serp.organic";
	const target = normaliseDomain(domain);

	const payload = await tregCall(endpointId, {
		body: [
			{
				keyword,
				location_code: Number(locationCode),
				language_code: DEFAULT_LANGUAGE_CODE,
				depth: Math.min(Math.max(Number(depth) || 20, 10), 100),
			},
		],
	});

	const { result, cost } = unwrapDataForSeo(payload, endpointId);

	const items = (result?.items || [])
		.filter((item) => item.type === "organic")
		.map((item) => ({
			position: item.rank_group,
			absolutePosition: item.rank_absolute,
			domain: normaliseDomain(item.domain),
			title: item.title,
			url: item.url,
			description: item.description,
			isTarget: normaliseDomain(item.domain) === target,
		}));

	const match = items.find((item) => item.isTarget) || null;

	return {
		task: "rank",
		keyword: result?.keyword || keyword,
		domain: target,
		locationCode: Number(locationCode),
		checkedAt: result?.datetime || new Date().toISOString(),
		checkUrl: result?.check_url || null,
		totalResults: result?.se_results_count ?? null,
		serpFeatures: result?.item_types || [],
		position: match?.position ?? null,
		rankingUrl: match?.url ?? null,
		results: items,
		costUsd: cost,
	};
}

/**
 * Keyword ideas around a seed, with volume, CPC and difficulty.
 *
 * `depth` is the breadth of the related-searches crawl, not a page size: 0 is
 * the seed alone, and each step out expands the candidate set considerably. For
 * niche B2B terms depth 1 is too narrow to be useful — "thread gauges" returns
 * 7 ideas at depth 1 and 27 at depth 2, for about $0.002 more — so 2 is the
 * default here.
 *
 * `ignore_synonyms` is deliberately off: on a vocabulary this small it discards
 * genuine variants ("thread ring gauge manufacturer") as near-duplicates.
 *
 * @param {object} params
 * @param {string} params.keyword seed keyword
 * @param {number} [params.locationCode]
 * @param {number} [params.limit] 1-100 ideas to return
 * @param {number} [params.depth] 0-3 crawl breadth
 */
export async function fetchKeywordIdeas({
	keyword,
	locationCode = DEFAULT_LOCATION_CODE,
	limit = 40,
	depth = 2,
}) {
	const endpointId = "dataforseo.google.keywords.ideas";

	const payload = await tregCall(endpointId, {
		body: [
			{
				keyword,
				location_code: Number(locationCode),
				language_code: DEFAULT_LANGUAGE_CODE,
				depth: Math.min(Math.max(Number(depth) || 2, 0), 3),
				limit: Math.min(Math.max(Number(limit) || 40, 1), 100),
				include_seed_keyword: true,
			},
		],
	});

	const { result, cost } = unwrapDataForSeo(payload, endpointId);

	const ideas = (result?.items || [])
		.map((item) => {
			const data = item?.keyword_data || {};
			const info = data.keyword_info || {};
			return {
				keyword: data.keyword,
				searchVolume: info.search_volume ?? null,
				cpc: info.cpc ?? null,
				competition: info.competition ?? null,
				competitionLevel: info.competition_level ?? null,
				difficulty: data.keyword_properties?.keyword_difficulty ?? null,
				serpFeatures: data.serp_info?.serp_item_types || [],
				relatedKeywords: item?.related_keywords || [],
			};
		})
		.filter((idea) => idea.keyword)
		// Volume-first ordering: the API returns them in crawl order, which is
		// close to useless for deciding what to write next.
		.sort((a, b) => (b.searchVolume ?? -1) - (a.searchVolume ?? -1));

	return {
		task: "keywords",
		seed: keyword,
		locationCode: Number(locationCode),
		checkedAt: new Date().toISOString(),
		totalAvailable: result?.total_count ?? ideas.length,
		ideas,
		costUsd: cost,
	};
}

/**
 * Moz authority metrics for a domain, plus optional competitors.
 *
 * Moz bills per returned row, so competitors ride along in the same call rather
 * than one request each. `targets` is capped at 50 by the provider; the route
 * caps it lower to keep a stray paste from burning the balance.
 *
 * @param {object} params
 * @param {string[]} params.targets domains or URLs
 */
export async function fetchAuthorityMetrics({ targets }) {
	const endpointId = "moz.web.url.metrics";

	const cleaned = targets
		.map((target) => String(target || "").trim())
		.filter(Boolean)
		.slice(0, 10);

	if (cleaned.length === 0) {
		throw new TregError("At least one target domain is required", {
			status: 400,
			endpoint: endpointId,
		});
	}

	const payload = await tregCall(endpointId, { body: { targets: cleaned } });

	const results = (payload?.results || []).map((row) => ({
		page: row.page,
		rootDomain: row.root_domain,
		title: row.title || null,
		lastCrawled: row.last_crawled || null,
		httpCode: row.http_code ?? null,
		domainAuthority: row.domain_authority ?? null,
		pageAuthority: row.page_authority ?? null,
		// Moz returns -1 for "not enough data to score", which is not the same
		// as a clean 0 and must not render as one.
		spamScore: row.spam_score >= 0 ? row.spam_score : null,
		linkingRootDomains: row.root_domains_to_root_domain ?? null,
		externalLinks: row.external_pages_to_root_domain ?? null,
		linksToPage: row.pages_to_page ?? null,
	}));

	return {
		task: "authority",
		checkedAt: new Date().toISOString(),
		results,
		// Moz prices per row, not per call.
		costUsd: results.length * TASK_COSTS_USD.authority,
	};
}
