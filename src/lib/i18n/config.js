/**
 * Locale configuration for the Hindi layer.
 *
 * READ docs/SEO-STRATEGY.md section "Hindi layer" before widening this.
 *
 * Design rules, in order of importance:
 *
 * 1. English URLs never change. They are the indexed ones. Hindi is additive,
 *    served from /hi/... and nothing else moves.
 *
 * 2. A page is only emitted in Hindi if a human-written translation exists in
 *    src/content/hi/pages.js. There is no machine-translation fallback and no
 *    "translate the rest automatically" path, because a machine-translated
 *    near-duplicate of an English page that Google already declined to crawl
 *    is strictly worse than no page at all.
 *
 * 3. HINDI_ENABLED gates the whole layer. While it is false the routes still
 *    build (so the work is reviewable and testable) but they are noindex and
 *    are kept out of the sitemap.
 *
 * Why the caution: as of 2026-07-29 Search Console showed ZERO Devanagari-script
 * queries across 180 days, and 71% of the existing English pages were sitting at
 * "Discovered - currently not indexed" because Google was already rationing
 * crawl budget for this domain. Doubling the URL count works directly against
 * the pruning done in section 2 of the strategy doc. Turn this on when there is
 * a reason to, not by default.
 */

export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en", "hi"];

/** hreflang values. Regional targeting: this business sells into India. */
export const HREFLANG = {
	en: "en-IN",
	hi: "hi-IN",
};

export const LOCALE_LABELS = {
	en: "English",
	hi: "हिन्दी",
};

/**
 * Master switch. Set NEXT_PUBLIC_HINDI_ENABLED=true to publish the Hindi layer
 * (indexable + present in sitemap.xml). Default off.
 */
export const HINDI_ENABLED = process.env.NEXT_PUBLIC_HINDI_ENABLED === "true";

/** Prefix for the Hindi tree. Kept as a constant so it is greppable. */
export const HI_PREFIX = "/hi";

/**
 * Map an English path to its Hindi counterpart, and back.
 * `/products` <-> `/hi/products`
 */
export function toLocalePath(path, locale) {
	const clean = path === "/" ? "" : path.replace(/\/+$/, "");
	if (locale === "hi") return `${HI_PREFIX}${clean}` || HI_PREFIX;
	return clean || "/";
}

export function stripLocale(path) {
	if (path === HI_PREFIX) return "/";
	if (path.startsWith(`${HI_PREFIX}/`)) return path.slice(HI_PREFIX.length);
	return path;
}

export function localeFromPath(path) {
	return path === HI_PREFIX || path.startsWith(`${HI_PREFIX}/`) ? "hi" : "en";
}

/**
 * Build the `alternates` block for an ENGLISH page.
 *
 * Only emits hreflang when the Hindi layer is live AND a translation actually
 * exists for this path. Pointing hreflang at a page that is noindex or absent
 * is worse than omitting it — Google drops the whole cluster when the return
 * link is missing or broken.
 *
 * Usage in an English page's metadata:
 *   alternates: alternatesFor("/products")
 */
export function alternatesFor(enPath, { hasHindi } = {}) {
	const base = { canonical: enPath };
	if (!HINDI_ENABLED || !hasHindi) return base;

	const hiPath = toLocalePath(enPath, "hi");
	return {
		...base,
		languages: {
			[HREFLANG.en]: enPath,
			[HREFLANG.hi]: hiPath,
			"x-default": enPath,
		},
	};
}
