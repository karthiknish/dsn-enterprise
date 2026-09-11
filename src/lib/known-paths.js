/**
 * Paths the request proxy must not 404 for when Accept prefers JSON or markdown.
 *
 * Anything else is treated as missing and gets a negotiated 404. Dynamic
 * segments under /products, /services and /threads are passed through here
 * because a valid one must still render or 308 — the proxy decides whether the
 * parameter is servable via `dynamicPathIsMissing` in
 * `src/lib/dynamic-route-guard.js`, which is checked alongside this.
 *
 * /blog and /hi are passed through unconditionally. /blog slugs live in
 * Firestore, so the proxy cannot check them without a database read on every
 * request; those pages keep the soft 404 that `notFound()` produces in a
 * dynamic route and rely on the `noindex` Next injects. /hi declares
 * `dynamicParams = false`, so an unknown slug is a routing-level 404 already.
 * /api is handled by route handlers.
 */

const EXACT = new Set([
	"/",
	"/about",
	"/products",
	"/products/plain-gauges",
	"/products/thread-gauges",
	"/products/api-gauges",
	"/products/special-gauges",
	"/services",
	"/industries",
	"/quality",
	"/calibration",
	"/resources",
	"/threads",
	"/faq",
	"/contact",
	"/blog",
	"/thank-you",
	"/llms.txt",
	"/robots.txt",
	"/sitemap.xml",
	"/sitemap-index.xml",
	"/sitemap-main.xml",
	"/sitemap-cities.xml",
	"/manifest.webmanifest",
	"/zz-analytics-preview",
]);

const PREFIXES = [
	"/_next/",
	"/api/",
	"/admin/",
	"/blog/",
	"/products/",
	"/services/",
	// /threads/<system> and /threads/<system>/<size> may render or 308, so they
	// must reach the page; an unservable parameter is refused earlier by
	// `dynamicPathIsMissing`.
	"/threads/",
	"/images/",
	"/hi/",
];

function normalizePath(pathname) {
	if (!pathname) return "/";
	const noQuery = pathname.split("?")[0];
	if (noQuery.length > 1 && noQuery.endsWith("/")) {
		return noQuery.slice(0, -1);
	}
	return noQuery || "/";
}

export function shouldNegotiateNotFound(pathname) {
	const path = normalizePath(pathname);
	if (EXACT.has(path)) return false;
	return !PREFIXES.some(
		(prefix) => path === prefix.replace(/\/$/, "") || path.startsWith(prefix),
	);
}
