/**
 * Paths the request proxy must not 404 for when Accept prefers JSON or markdown.
 *
 * Anything else is treated as missing and gets a negotiated 404. Dynamic
 * segments under /products, /services, /blog, and /hi are passed through so
 * the page can 308, 404, or render. /api is handled by route handlers.
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
