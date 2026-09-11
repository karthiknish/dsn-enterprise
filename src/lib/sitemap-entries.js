import { HI_TRANSLATED_PATHS } from "@/content/hi/pages";
import { getPublishedPosts } from "@/lib/blog-queries";
import { HINDI_ENABLED, HREFLANG } from "@/lib/i18n/config";
import {
	generateProductCityPages,
	generateServiceCityPages,
} from "@/lib/seo-pages.config";
import { getSiteUrl, SITE_URL } from "@/lib/site";
import {
	generateMetricSizePages,
	generateThreadSystemPages,
} from "@/lib/thread-pages.config";

/**
 * Shared entry builders for the split sitemap.
 *
 * The sitemap is split into two segments because a single file mixes two
 * populations with very different crawl economics:
 *
 *   main   — homepage, hub pages, blog posts. Unique content, internally
 *            linked, changes often. These are the URLs that should consume
 *            crawl budget.
 *   cities — generated product/service x city pages. Near-orphans (only a
 *            handful are linked from /products/plain-gauges) and templated,
 *            so Google spends fetches on them and indexes almost none.
 *
 * Splitting does not by itself improve rankings. What it buys is:
 *   - per-segment coverage numbers in Search Console (main 40/52 vs
 *     cities 0/36) instead of one useless "50 not indexed" aggregate;
 *   - the ability to submit main alone so new blog posts are discovered in
 *     one or two crawls rather than behind a wall of city URLs;
 *   - independent lastmod policy — main moves, cities stay pinned, so a
 *     blog edit stops triggering recrawls of 36 unchanged city pages.
 */

/**
 * Cities use a pinned lastmod rather than `new Date()`.
 *
 * Previously every URL in the sitemap carried the build timestamp, which told
 * Google that all 36 city pages changed every hour. They had not. Bump this
 * constant by hand when city page templates or copy actually change.
 */
export const CITY_PAGES_LASTMOD = new Date("2026-08-21T00:00:00.000Z");

/**
 * Thread reference tables use a pinned lastmod for the same reason cities do.
 * The dimensions are standards data and only change when the source standard
 * or the curation does — not on every deploy. Bump by hand when either moves.
 *
 * This is the day the layer went live. It must never be dated ahead of the
 * build: Google ignores a `lastmod` it cannot believe, so a pin set in the
 * future would cost the ten newest pages exactly the first recrawl the pin
 * exists to earn. `pinnedLastModified` clamps it, but the value belongs right
 * on its own.
 */
export const THREAD_PAGES_LASTMOD = new Date("2026-09-11T00:00:00.000Z");

const NOW = () => new Date();

/**
 * Clamp a hand-pinned lastmod so it can never be dated in the future.
 *
 * A future date is the clearest kind of `lastmod` Google refuses to believe,
 * and the failure is silent: the sitemap still validates, Search Console still
 * reports no error, and the only symptom is a page that keeps its stale
 * crawl — which is precisely what the pin was added to avoid. The first
 * revision of `THREAD_PAGES_LASTMOD` was set one day ahead and shipped. The
 * guard therefore lives here rather than in a comment asking the next editor
 * to be careful.
 *
 * @param {Date} date
 * @returns {Date}
 */
function pinnedLastModified(date) {
	const now = NOW();
	return date > now ? now : date;
}

/**
 * Blog posts for the sitemap. Delegates to the same query the post route uses
 * to decide which slugs exist, so the sitemap can never list a URL the router
 * would 404.
 *
 * An empty list is tolerable here — the blog simply drops out of this segment.
 * A *failed* read is not silently tolerated: the post route shares this query
 * and refuses to build on failure, so a real outage stops the deploy rather
 * than shipping a sitemap that advertises nothing and a blog that serves
 * nothing.
 */
async function getBlogPosts() {
	const { ok, posts } = await getPublishedPosts();

	if (!ok) {
		console.log("Sitemap: Unable to fetch blog posts, continuing without them");
		return [];
	}

	return posts;
}

function staticPages() {
	const now = NOW();
	return [
		{ path: "", changeFrequency: "weekly", priority: 1.0 },
		{ path: "/about", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/products", changeFrequency: "weekly", priority: 0.9 },
		{
			path: "/products/plain-gauges",
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			path: "/products/thread-gauges",
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			path: "/products/api-gauges",
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			path: "/products/special-gauges",
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{ path: "/services", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/industries", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/quality", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/calibration", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/resources", changeFrequency: "monthly", priority: 0.7 },
		{ path: "/faq", changeFrequency: "monthly", priority: 0.7 },
		{ path: "/contact", changeFrequency: "monthly", priority: 0.8 },
		{ path: "/blog", changeFrequency: "daily", priority: 0.7 },
	].map((page) => ({
		url: `${SITE_URL}${page.path}`,
		lastModified: now,
		changeFrequency: page.changeFrequency,
		priority: page.priority,
	}));
}

/**
 * Annotate the English pages that have a Hindi counterpart so the hreflang
 * pairing is reciprocal inside the sitemap itself.
 */
function withAlternates(entry) {
	if (!HINDI_ENABLED) return entry;
	const path = entry.url.replace(SITE_URL, "") || "/";
	if (!HI_TRANSLATED_PATHS.includes(path)) return entry;
	const hiPath = path === "/" ? "/hi" : `/hi${path}`;
	return {
		...entry,
		alternates: {
			languages: {
				[HREFLANG.en]: entry.url,
				[HREFLANG.hi]: `${SITE_URL}${hiPath}`,
			},
		},
	};
}

/**
 * Hindi layer. Only included once NEXT_PUBLIC_HINDI_ENABLED=true, because
 * while gated the pages are noindex and listing them would send Google to
 * URLs it is told not to index.
 */
function hindiPages() {
	if (!HINDI_ENABLED) return [];
	const now = NOW();
	return HI_TRANSLATED_PATHS.map((p) => {
		const hiPath = p === "/" ? "/hi" : `/hi${p}`;
		return {
			url: `${SITE_URL}${hiPath}`,
			lastModified: now,
			changeFrequency: "monthly",
			// Deliberately below the English equivalents: the English pages
			// are the proven ones and should keep crawl priority.
			priority: 0.5,
			alternates: {
				languages: {
					[HREFLANG.en]: `${SITE_URL}${p === "/" ? "" : p}`,
					[HREFLANG.hi]: `${SITE_URL}${hiPath}`,
				},
			},
		};
	});
}

/**
 * Thread reference pages: the hub, one page per thread system, and a page per
 * metric size. These go in the main segment, not the generated one — the
 * variable that changes between them is engineering data rather than a city
 * name, so each URL states different numbers and earns its own index entry.
 */
function threadEntries() {
	const hub = {
		path: "/threads",
		changeFrequency: "monthly",
		priority: 0.75,
	};

	return [
		hub,
		...generateThreadSystemPages(),
		...generateMetricSizePages(),
	].map((page) => ({
		url: `${SITE_URL}${page.path}`,
		lastModified: pinnedLastModified(THREAD_PAGES_LASTMOD),
		changeFrequency: page.changeFrequency ?? "monthly",
		priority: page.priority ?? 0.6,
	}));
}

/**
 * Segment 1: everything with unique content and real internal links.
 * This is the file to submit to Search Console first.
 */
export async function getMainEntries() {
	const blogPosts = await getBlogPosts();
	const blogPages = blogPosts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: post.updatedAt,
		changeFrequency: "weekly",
		priority: 0.6,
	}));

	return [
		...staticPages().map(withAlternates),
		...threadEntries(),
		...blogPages,
		...hindiPages(),
	];
}

/**
 * Segment 2: generated location pages.
 *
 * Priority still comes from city tier and product rank rather than a flat
 * 0.5, but it is capped below the main segment: until these pages carry real
 * internal links and non-templated copy, they should never outrank a blog
 * post for crawl attention.
 */
export function getCityEntries() {
	const productCityPages = generateProductCityPages().map((page) => ({
		url: `${SITE_URL}/products/${page.product}-${page.city}`,
		lastModified: pinnedLastModified(CITY_PAGES_LASTMOD),
		changeFrequency: "monthly",
		priority: page.priority ?? 0.5,
	}));

	const serviceCityPages = generateServiceCityPages().map((page) => ({
		url: `${SITE_URL}/services/${page.service}-${page.city}`,
		lastModified: pinnedLastModified(CITY_PAGES_LASTMOD),
		changeFrequency: "monthly",
		priority: page.priority ?? 0.5,
	}));

	return [...productCityPages, ...serviceCityPages];
}

/** Every URL across both segments, for the legacy single-file sitemap. */
export async function getAllEntries() {
	const [main, cities] = [await getMainEntries(), getCityEntries()];
	return [...main, ...cities];
}

/**
 * The segments listed in /sitemap-index.xml, in submission order.
 *
 * `lastModified` is a function so the main segment reports the current build
 * time while cities stay pinned — the whole point of the split is that a blog
 * edit does not advertise 36 city pages as changed.
 */
export const SITEMAP_SEGMENTS = [
	{
		name: "main",
		url: getSiteUrl("/sitemap-main.xml"),
		lastModified: () => NOW(),
		/** Submitted to Search Console by the cron. */
		submit: true,
	},
	{
		name: "cities",
		url: getSiteUrl("/sitemap-cities.xml"),
		lastModified: () => pinnedLastModified(CITY_PAGES_LASTMOD),
		// Held back until the city pages have internal links and unique copy.
		// Flip via SITEMAP_SUBMIT_CITIES=true — no code change, no page deletion,
		// no noindex needed.
		submit: process.env.SITEMAP_SUBMIT_CITIES === "true",
	},
];

/**
 * Sitemaps the cron submits and the health check reads.
 *
 * Index first, then every segment marked `submit`. Cities stay off this list
 * until SITEMAP_SUBMIT_CITIES=true, so a health check cannot 404 on a file
 * Google was never asked to know about. The legacy /sitemap.xml is still
 * served, but it is not submitted — submitting both the index and the flat
 * file would duplicate every URL.
 */
export function getSubmittedSitemapUrls() {
	return [
		getSiteUrl("/sitemap-index.xml"),
		...SITEMAP_SEGMENTS.filter((segment) => segment.submit).map(
			(segment) => segment.url,
		),
	];
}
