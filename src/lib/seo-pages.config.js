// SEO Pages Configuration for City-Based Landing Pages
//
// STRATEGY (see docs/SEO-STRATEGY.md):
// Location pages are generated only where the product genuinely matches the
// city's industrial base. A blind product x city matrix produced 80 near-
// duplicate URLs, of which Google crawled almost none ("Discovered - currently
// not indexed"). Relevance gating plus tiering keeps the set small enough to
// earn crawl budget and distinct enough to deserve it.
//
// TIERS control rollout. Only cities at or below LOCATION_TIER_LIMIT emit
// pages, so coverage can be widened deliberately once indexing is proven
// rather than dumped on Google all at once.

import { getCityProfile } from "@/lib/seo-location-data";

/**
 * Rollout gate. Raise to 2, then 3, only after the current tier is measurably
 * indexed (`node scripts/gsc-index-coverage.mjs`). Overridable for previews.
 */
export const LOCATION_TIER_LIMIT = Number(
	process.env.NEXT_PUBLIC_LOCATION_TIER_LIMIT || 2,
);

export const CITIES = [
	{
		name: "Coimbatore",
		slug: "coimbatore",
		description: "Manchester of South India",
		tier: 1,
		state: "Tamil Nadu",
	},
	{
		name: "Chennai",
		slug: "chennai",
		description: "industrial hub of Tamil Nadu",
		tier: 1,
		state: "Tamil Nadu",
	},
	{
		name: "Tiruppur",
		slug: "tiruppur",
		description: "knitwear capital of India",
		tier: 2,
		state: "Tamil Nadu",
	},
	{
		name: "Erode",
		slug: "erode",
		description: "turmeric city and trading hub",
		tier: 2,
		state: "Tamil Nadu",
	},
	{
		name: "Salem",
		slug: "salem",
		description: "major industrial city in western Tamil Nadu",
		tier: 2,
		state: "Tamil Nadu",
	},
	{
		name: "Tiruchirappalli",
		slug: "tiruchirappalli",
		description: "industrial center in central Tamil Nadu",
		tier: 2,
		state: "Tamil Nadu",
	},
	{
		name: "Bangalore",
		slug: "bangalore",
		description: "aerospace, auto, and machine-tool hub of Karnataka",
		tier: 2,
		state: "Karnataka",
	},
	{
		name: "Hyderabad",
		slug: "hyderabad",
		description: "defence, aerospace, and energy hub of Telangana",
		tier: 2,
		state: "Telangana",
	},
	{
		name: "Madurai",
		slug: "madurai",
		description: "cultural capital and industrial center",
		tier: 3,
		state: "Tamil Nadu",
	},
	{
		name: "Thoothukudi",
		slug: "thoothukudi",
		description: "port city and industrial center",
		tier: 3,
		state: "Tamil Nadu",
	},
];

/**
 * Which products actually have a market in each city. Derived from the city's
 * dominant industries - an API master gauge page for the Tiruppur knitwear
 * belt has no audience and only dilutes crawl budget.
 */
export const PRODUCT_CITY_RELEVANCE = {
	coimbatore: [
		"plain-plug-gauges",
		"thread-plug-gauges",
		"thread-ring-gauges",
		"snap-gauges",
		"air-gauges",
		"calibration-services",
	],
	chennai: [
		"thread-plug-gauges",
		"plain-plug-gauges",
		"thread-ring-gauges",
		"air-gauges",
		"calibration-services",
	],
	tiruppur: ["snap-gauges", "thread-plug-gauges", "plain-plug-gauges"],
	erode: ["plain-plug-gauges", "snap-gauges", "calibration-services"],
	salem: ["plain-plug-gauges", "thread-ring-gauges", "snap-gauges"],
	tiruchirappalli: [
		"thread-plug-gauges",
		"thread-ring-gauges",
		"api-master-gauges",
		"calibration-services",
	],
	madurai: ["plain-plug-gauges", "snap-gauges"],
	thoothukudi: ["api-master-gauges"],
	bangalore: [
		"plain-plug-gauges",
		"thread-plug-gauges",
		"thread-ring-gauges",
		"snap-gauges",
		"air-gauges",
		"calibration-services",
	],
	hyderabad: [
		"plain-plug-gauges",
		"thread-plug-gauges",
		"thread-ring-gauges",
		"snap-gauges",
		"calibration-services",
	],
};

/** Which services are worth a dedicated city page. */
export const SERVICE_CITY_RELEVANCE = {
	coimbatore: [
		"gauge-calibration",
		"custom-gauge-manufacturing",
		"gauge-repair-and-reconditioning",
	],
	chennai: ["gauge-calibration", "custom-gauge-manufacturing"],
	tiruppur: ["gauge-calibration", "gauge-repair-and-reconditioning"],
	erode: ["gauge-calibration"],
	salem: ["gauge-calibration", "gauge-repair-and-reconditioning"],
	tiruchirappalli: ["gauge-calibration", "custom-gauge-manufacturing"],
	madurai: ["gauge-calibration"],
	thoothukudi: ["gauge-calibration"],
	bangalore: [
		"gauge-calibration",
		"custom-gauge-manufacturing",
		"gauge-repair-and-reconditioning",
	],
	hyderabad: ["gauge-calibration", "custom-gauge-manufacturing"],
};

// ---------------------------------------------------------------------------
// Metadata builders
//
// Hard length budgets. Google truncates titles near 60 chars and descriptions
// near 160; the previous builders emitted ~320-char descriptions that were cut
// mid-sentence in the SERP, which is a direct CTR loss on pages already
// ranking in positions 8-10.
// ---------------------------------------------------------------------------

const TITLE_MAX = 60;
const DESC_MAX = 158;

/** Pick the first candidate that fits the budget; never truncate mid-word. */
function fit(candidates, max) {
	for (const c of candidates) {
		if (c.length <= max) return c;
	}
	const last = candidates[candidates.length - 1];
	if (last.length <= max) return last;
	const cut = last.slice(0, max);
	return cut
		.slice(0, cut.lastIndexOf(" "))
		.replace(/[,\-|—]$/, "")
		.trim();
}

function buildProductTitle(productName, cityName) {
	return fit(
		[
			`${productName} in ${cityName} | Manufacturer | DSN`,
			`${productName} in ${cityName} | DSN Enterprises`,
			`${productName} in ${cityName} | DSN`,
			`${productName} – ${cityName}`,
		],
		TITLE_MAX,
	);
}

function buildProductDescription(product, city) {
	const profile = getCityProfile(city.slug);
	const sector = profile.sector || "precision engineering";
	const transit = profile.transitPhrase || `Delivered in ${profile.transit}`;

	// "Calibration Services" is a service even though it lives in PRODUCTS,
	// so "made in Coimbatore" would read wrong for it.
	const isService = product.slug === "calibration-services";
	const verb = isService ? "run from" : "made in";

	// Coimbatore is the works itself, so "made in Coimbatore for Coimbatore"
	// needs different phrasing from the shipped-to cities.
	const origin =
		city.slug === "coimbatore"
			? `${product.name} ${isService ? "run from our Coimbatore lab" : "made at our Coimbatore works"} for local ${sector} plants.`
			: `${product.name} ${verb} Coimbatore for ${city.name} ${sector} plants.`;
	const originShort =
		city.slug === "coimbatore"
			? `${product.name} ${isService ? "run from our Coimbatore lab" : "made at our Coimbatore works"}.`
			: `${product.name} for ${city.name} ${sector} plants.`;

	return fit(
		[
			`${origin} ${transit}. ISO 9001 manufacture with traceable calibration certificates.`,
			`${origin} ${transit}. ISO 9001 with traceable certificates.`,
			`${originShort} ${transit}. ISO 9001 manufacture, traceable certificates.`,
			`${originShort} ${transit}.`,
		],
		DESC_MAX,
	);
}

function buildServiceTitle(serviceName, cityName) {
	return fit(
		[
			`${serviceName} in ${cityName} | NABL Traceable | DSN`,
			`${serviceName} in ${cityName} | DSN Enterprises`,
			`${serviceName} in ${cityName} | DSN`,
			`${serviceName} – ${cityName}`,
		],
		TITLE_MAX,
	);
}

function buildServiceDescription(service, city) {
	const profile = getCityProfile(city.slug);
	const pickup =
		profile.distanceKm === 0
			? "Drop off and collect the same week"
			: `Pickup and return across ${city.name}`;

	const sector = profile.sector || "precision engineering";

	return fit(
		[
			`${service.name} for ${city.name} ${sector} plants. ${pickup}. NABL-traceable documentation from our Coimbatore lab.`,
			`${service.name} for ${city.name} manufacturers. ${pickup}. NABL-traceable documentation from our Coimbatore lab.`,
			`${service.name} for ${city.name}. ${pickup}. NABL-traceable certificates.`,
			`${service.name} for ${city.name} from our Coimbatore lab.`,
		],
		DESC_MAX,
	);
}

export const PRODUCTS = [
	{
		slug: "plain-plug-gauges",
		name: "Plain Plug Gauges",
		description:
			"GO/NO-GO plain plug gauges for bore and hole acceptance, built to IS tolerances and your drawing",
		keywords: [
			"plug gauge",
			"limit gauge",
			"bore gauge",
			"cylindrical plug gauge",
		],
	},
	{
		slug: "thread-ring-gauges",
		name: "Thread Ring Gauges",
		description:
			"Thread ring gauges for external threads, Metric, UN, BSP, and specials with matched calibration",
		keywords: [
			"ring gauge",
			"thread ring",
			"external thread gauge",
			"thread limit gauge",
		],
	},
	{
		slug: "api-master-gauges",
		name: "API Master Gauges",
		description:
			"API 5B and 7-2 master and working gauges for OCTG and rotary shouldered programmes",
		keywords: [
			"API gauge",
			"master gauge",
			"oil country tubular goods",
			"OCTG gauges",
		],
	},
	{
		slug: "snap-gauges",
		name: "Snap Gauges",
		description:
			"Fixed and adjustable snap gauges for fast OD checks on shafts, pins, and turned parts",
		keywords: [
			"snap gauge",
			"external snap gauge",
			"gap gauge",
			"limit snap gauge",
		],
	},
	{
		slug: "thread-plug-gauges",
		name: "Thread Plug Gauges",
		description:
			"Thread plug gauges for internal threads after tapping, production and incoming inspection",
		keywords: [
			"thread plug",
			"internal thread gauge",
			"taper pipe thread",
			"NPT gauge",
		],
	},
	{
		slug: "air-gauges",
		name: "Air Gauges",
		description:
			"Pneumatic comparative gauges and air tooling for high-repeatability bore measurement",
		keywords: ["air gauge", "pneumatic gauge", "air plug", "comparator"],
	},
	{
		slug: "calibration-services",
		name: "Gauge Calibration Services",
		description:
			"Recall and laboratory calibration for plain, thread, and special gauges with NABL traceability",
		keywords: [
			"calibration",
			"gauge calibration",
			"ISO certification",
			"measurement standards",
		],
	},
];

export const SERVICES = [
	{
		slug: "gauge-calibration",
		name: "Gauge Calibration",
		description:
			"NABL-accredited gauge calibration with as-found data and express turnaround when needed",
		keywords: [
			"calibration",
			"ISO 17025",
			"gauge calibration",
			"measurement calibration",
		],
	},
	{
		slug: "custom-gauge-manufacturing",
		name: "Custom Gauge Manufacturing",
		description:
			"Drawing-based gauge manufacture with engineering review before production",
		keywords: [
			"custom gauges",
			"special gauges",
			"bespoke gauges",
			"custom measurement tools",
		],
	},
	{
		slug: "gauge-repair-and-reconditioning",
		name: "Gauge Repair & Reconditioning",
		description:
			"Regrind, repair, and recalibration to extend service life of worn working gauges",
		keywords: [
			"gauge repair",
			"gauge reconditioning",
			"gauge restoration",
			"gauge servicing",
		],
	},
];

/** Cities currently in scope for page generation, per the rollout gate. */
export function activeCities() {
	return CITIES.filter((c) => c.tier <= LOCATION_TIER_LIMIT);
}

function isProductRelevant(productSlug, citySlug) {
	return (PRODUCT_CITY_RELEVANCE[citySlug] || []).includes(productSlug);
}

function isServiceRelevant(serviceSlug, citySlug) {
	return (SERVICE_CITY_RELEVANCE[citySlug] || []).includes(serviceSlug);
}

/**
 * Generate product x city pages, gated by both industrial relevance and the
 * tier rollout limit. Priority feeds sitemap weighting: tier-1 cities and
 * their lead products are the pages we most want crawled first.
 */
export function generateProductCityPages() {
	const pages = [];
	for (const city of activeCities()) {
		const relevant = PRODUCT_CITY_RELEVANCE[city.slug] || [];
		for (const productSlug of relevant) {
			const product = PRODUCTS.find((p) => p.slug === productSlug);
			if (!product) continue;

			// Lead product for the city ranks highest within that city.
			const rank = relevant.indexOf(productSlug);
			const priority =
				city.tier === 1 ? (rank === 0 ? 0.7 : 0.6) : rank === 0 ? 0.6 : 0.5;

			pages.push({
				product: product.slug,
				city: city.slug,
				productName: product.name,
				cityName: city.name,
				tier: city.tier,
				state: city.state,
				priority,
				title: buildProductTitle(product.name, city.name),
				description: buildProductDescription(product, city),
				keywords: [
					...product.keywords,
					`${product.name} ${city.name}`,
					`${product.name} manufacturer ${city.name}`,
					`${product.name} supplier ${city.name}`,
					"DSN Enterprises",
					city.state,
					...(city.slug === "bangalore" ? ["Bengaluru", "Bangalore gauges"] : []),
					...(city.slug === "hyderabad" ? ["Hyderabad gauges"] : []),
				],
			});
		}
	}
	return pages;
}

export function generateServiceCityPages() {
	const pages = [];
	for (const city of activeCities()) {
		const relevant = SERVICE_CITY_RELEVANCE[city.slug] || [];
		for (const serviceSlug of relevant) {
			const service = SERVICES.find((s) => s.slug === serviceSlug);
			if (!service) continue;

			const rank = relevant.indexOf(serviceSlug);
			const priority =
				city.tier === 1 ? (rank === 0 ? 0.7 : 0.6) : rank === 0 ? 0.6 : 0.5;

			pages.push({
				service: service.slug,
				city: city.slug,
				serviceName: service.name,
				cityName: city.name,
				tier: city.tier,
				state: city.state,
				priority,
				title: buildServiceTitle(service.name, city.name),
				description: buildServiceDescription(service, city),
				keywords: [
					...service.keywords,
					`${service.name} ${city.name}`,
					`gauge calibration ${city.name}`,
					`gauge services ${city.state}`,
					"DSN Enterprises Coimbatore",
					...(city.slug === "bangalore" ? ["Bengaluru"] : []),
				],
			});
		}
	}
	return pages;
}

/** Cities where a given product has a page — used for cross-linking. */
export function citiesForProduct(productSlug) {
	return activeCities().filter((c) => isProductRelevant(productSlug, c.slug));
}

/** Cities where a given service has a page — used for cross-linking. */
export function citiesForService(serviceSlug) {
	return activeCities().filter((c) => isServiceRelevant(serviceSlug, c.slug));
}

// Get page data by slug combination
export function getProductCityPage(productSlug, citySlug) {
	return generateProductCityPages().find(
		(p) => p.product === productSlug && p.city === citySlug,
	);
}

export function getServiceCityPage(serviceSlug, citySlug) {
	return generateServiceCityPages().find(
		(p) => p.service === serviceSlug && p.city === citySlug,
	);
}

// All generated page routes
export const ALL_PRODUCT_CITY_ROUTES = generateProductCityPages().map((p) => ({
	slug: `${p.product}-${p.city}`,
	product: p.product,
	city: p.city,
}));

export const ALL_SERVICE_CITY_ROUTES = generateServiceCityPages().map((p) => ({
	slug: `${p.service}-${p.city}`,
	service: p.service,
	city: p.city,
}));
