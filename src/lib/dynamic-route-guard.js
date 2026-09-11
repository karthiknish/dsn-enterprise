import { getLegacyBlogSlug } from "@/lib/blog-legacy-slugs";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { getProductHub, SERVICE_PROFILES } from "@/lib/seo-location-data";
import {
	getProductCityPage,
	getServiceCityPage,
	PRODUCTS,
	SERVICES,
} from "@/lib/seo-pages.config";
import {
	getMetricSizePage,
	getThreadSystemPage,
	isKnownMetricSize,
	parseSizeSlug,
} from "@/lib/thread-pages.config";
import { THREAD_SYSTEMS } from "@/lib/thread-specs";

/**
 * The single decision point for the dynamic route families whose parameter
 * space is fixed at build time: "render this, send a 308 there, or 404".
 *
 * ## Why this module exists
 *
 * Next.js cannot turn a `notFound()` thrown from a dynamic route's page
 * component into a 404 status. The response has already begun, so a request for
 * `/products/thread-gauges-bogus` is served as HTTP **200** carrying the
 * not-found UI. This is documented behaviour, not a bug — see
 * `docs/01-app/03-api-reference/03-file-conventions/loading.md`, section
 * "Status Codes", and the "Calling notFound() after streaming has started"
 * section of `04-functions/not-found.md`. Both conclude the same way:
 *
 * > If you need a 404 status, ... ensure the resource exists before the response
 * > body is streamed ... You can run this check in proxy.
 *
 * So the proxy has to answer 404 before the route renders, which means the
 * proxy and the pages must agree about which slugs exist. They agree here, by
 * calling the same functions: each page uses these classifiers to decide
 * whether to render or redirect, and `src/proxy.js` uses `dynamicPathIsMissing`
 * to decide whether to answer 404 before any rendering happens. If those two
 * ever disagreed, one side would 404 a page the other serves — so the
 * classifiers are deliberately the only place the question is asked.
 *
 * `/blog/[slug]` is covered only for the retired slugs listed in
 * `blog-legacy-slugs.js`. Its live slugs come from Firestore, and the proxy is
 * the wrong place for a database read (it runs on every request, and the docs
 * say to keep it to path checks), so an unrecognised blog slug returns `null`
 * from here and is refused by the router instead — the `dynamicParams = false`
 * + `generateStaticParams` pair described in `docs/SEO-STRATEGY.md` §2I. A
 * legacy slug is a fixed string known at build time, so answering it costs a
 * path comparison and no I/O.
 */

/** A bare slug here is a prerendered page that Next matches before `[slug]`. */
const STATIC_PRODUCT_SLUGS = new Set([
	"api-gauges",
	"plain-gauges",
	"special-gauges",
	"thread-gauges",
]);

const MISSING = { decision: "missing" };

function redirect(to) {
	return { decision: "redirect", to };
}

/**
 * Every `render` verdict carries a `page` key. It is `null` only for a static
 * page (see `STATIC_PRODUCT_SLUGS`), which Next matches before `[slug]` ever
 * runs — so a `[slug]` page can rely on `page` being populated.
 */
function render(page = null) {
	return { decision: "render", page };
}

/**
 * `/products/<slug>`, where `<slug>` is either a static product page or a
 * combined `<product>-<city>` pair.
 *
 * @param {string} slug
 * @returns {{decision: "render", page: object} | {decision: "redirect", to: string} | {decision: "missing"}}
 */
export function classifyProductCitySlug(slug) {
	if (STATIC_PRODUCT_SLUGS.has(slug)) return render();

	const { citySlug, entitySlug } = parseLocationSlug(slug);
	if (!citySlug || !entitySlug) return MISSING;

	const page = getProductCityPage(entitySlug, citySlug);
	if (page) return render(page);

	// The product exists but this combination was retired or never generated, so
	// the hub is the right destination. An unknown product is a real 404.
	if (!PRODUCTS.some((p) => p.slug === entitySlug)) return MISSING;
	return redirect(getProductHub(entitySlug).hubPath || "/products");
}

/**
 * `/services/<slug>` — always a combined `<service>-<city>` pair; there are no
 * static pages beneath `/services`.
 *
 * @param {string} slug
 * @returns {{decision: "render", page: object} | {decision: "redirect", to: string} | {decision: "missing"}}
 */
export function classifyServiceCitySlug(slug) {
	const { citySlug, entitySlug } = parseLocationSlug(slug);
	if (!citySlug || !entitySlug) return MISSING;

	const page = getServiceCityPage(entitySlug, citySlug);
	if (page) return render(page);

	if (!SERVICES.some((s) => s.slug === entitySlug)) return MISSING;
	return redirect(SERVICE_PROFILES[entitySlug]?.hubPath || "/services");
}

/**
 * `/threads/<system>`. A system above the rollout gate has a real page waiting,
 * so it goes to the hub with a 308 rather than a 404.
 *
 * @param {string} system
 * @returns {{decision: "render", page: object} | {decision: "redirect", to: string} | {decision: "missing"}}
 */
export function classifyThreadSystem(system) {
	const page = getThreadSystemPage(system);
	if (page) return render(page);

	if (!THREAD_SYSTEMS.some((s) => s.slug === system)) return MISSING;
	return redirect("/threads");
}

/**
 * `/threads/<system>/<size>`. Only the metric system has per-size pages, so
 * every other system routes to the page that carries its full table.
 *
 * @param {string} system
 * @param {string} size
 * @returns {{decision: "render", page: object} | {decision: "redirect", to: string} | {decision: "missing"}}
 */
export function classifyThreadSize(system, size) {
	if (system !== "metric") {
		// Resolve the system rather than pointing at its URL unconditionally: a
		// size under a system that is itself only a redirect would otherwise cost
		// the visitor two hops to reach the same hub.
		const systemVerdict = classifyThreadSystem(system);
		if (systemVerdict.decision === "missing") return MISSING;
		if (systemVerdict.decision === "redirect")
			return redirect(systemVerdict.to);
		return redirect(`/threads/${system}`);
	}

	const sizeValue = parseSizeSlug(size);
	if (sizeValue === null) return MISSING;

	const page = getMetricSizePage(sizeValue);
	if (page) {
		// Accepts the pitch-qualified and upper-case forms a reader might type
		// (m6x1, M6) and collapses them onto the one canonical URL.
		return size === page.slug ? render(page) : redirect(page.path);
	}

	if (isKnownMetricSize(sizeValue)) return redirect("/threads/metric");
	return MISSING;
}

/**
 * Proxy-facing entry point: the path-shaped wrapper around the classifiers.
 *
 * Returns `null` when the path is not part of a family this module owns, so the
 * proxy falls through to normal routing. Every shape it does not recognise
 * resolves to `null` rather than `missing`: a false `missing` here would take a
 * working page offline, so "unrecognised" must never mean "refuse".
 *
 * @param {string} pathname
 * @returns {{decision: "render", page: object} | {decision: "redirect", to: string} | {decision: "missing"} | null}
 */
export function resolveDynamicPath(pathname) {
	let path = pathname || "/";
	try {
		path = decodeURIComponent(path);
	} catch {
		// A malformed escape is not something to guess about; let the router
		// decide what it is.
		return null;
	}

	const segments = path.split("/").filter(Boolean);
	const [root] = segments;

	if (root === "products" && segments.length === 2) {
		return classifyProductCitySlug(segments[1]);
	}
	if (root === "services" && segments.length === 2) {
		return classifyServiceCitySlug(segments[1]);
	}
	if (root === "threads") {
		if (segments.length === 2) return classifyThreadSystem(segments[1]);
		if (segments.length === 3) {
			return classifyThreadSize(segments[1], segments[2]);
		}
	}

	if (root === "blog" && segments.length === 2) {
		// Only a retired slug is answered here; everything else falls through to
		// the router, which refuses unknown blog slugs because the published set
		// is frozen by `dynamicParams = false`. This branch must therefore never
		// return `missing` — a `missing` here would 404 the blog's own live posts,
		// which the proxy cannot distinguish from unknown ones without a read.
		const currentSlug = getLegacyBlogSlug(segments[1]);
		return currentSlug ? redirect(`/blog/${currentSlug}`) : null;
	}

	return null;
}
