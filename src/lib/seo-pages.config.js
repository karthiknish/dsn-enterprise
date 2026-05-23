// SEO Pages Configuration for City-Based Landing Pages
// Generates pages targeting industrial cities in Tamil Nadu

import { getCityProfile } from "@/lib/seo-location-data";

export const CITIES = [
	{
		name: "Chennai",
		slug: "chennai",
		description: "industrial hub of Tamil Nadu",
	},
	{
		name: "Coimbatore",
		slug: "coimbatore",
		description: "Manchester of South India",
	},
	{
		name: "Madurai",
		slug: "madurai",
		description: "cultural capital and industrial center",
	},
	{
		name: "Salem",
		slug: "salem",
		description: "major industrial city in western Tamil Nadu",
	},
	{
		name: "Tiruchirappalli",
		slug: "tiruchirappalli",
		description: "industrial center in central Tamil Nadu",
	},
	{
		name: "Erode",
		slug: "erode",
		description: "turmeric city and trading hub",
	},
	{
		name: "Tiruppur",
		slug: "tiruppur",
		description: "knitwear capital of India",
	},
	{
		name: "Thoothukudi",
		slug: "thoothukudi",
		description: "port city and industrial center",
	},
];

function buildProductTitle(productName, cityName) {
	return `${productName} in ${cityName}, Tamil Nadu | Supplier & Manufacturer`;
}

function buildProductDescription(product, city) {
	const profile = getCityProfile(city.slug);
	const industries = profile.keyIndustries.slice(0, 2).join(" and ");
	return `${product.name} for ${city.name}—supplied by DSN Enterprises from Coimbatore. ${product.description}. Serving ${industries}. ISO manufacture, traceable certificates, and reliable TN logistics.`;
}

function buildServiceTitle(serviceName, cityName) {
	return `${serviceName} in ${cityName}, Tamil Nadu | DSN Enterprises`;
}

function buildServiceDescription(service, city) {
	const _profile = getCityProfile(city.slug);
	return `${service.name} in ${city.name} from DSN Enterprises, Coimbatore. ${service.description}. Pickup and return across ${city.name}; NABL-aligned documentation. Call +91 93631 22005.`;
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
			"Thread ring gauges for external threads—Metric, UN, BSP, and specials with matched calibration",
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
			"Thread plug gauges for internal threads after tapping—production and incoming inspection",
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

// Generate all combinations for static page generation
export function generateProductCityPages() {
	const pages = [];
	for (const product of PRODUCTS) {
		for (const city of CITIES) {
			pages.push({
				product: product.slug,
				city: city.slug,
				productName: product.name,
				cityName: city.name,
				title: buildProductTitle(product.name, city.name),
				description: buildProductDescription(product, city),
				keywords: [
					...product.keywords,
					city.name,
					`${city.name} ${product.name}`,
					`${product.name} supplier ${city.name}`,
					`gauge manufacturer near ${city.name}`,
					"DSN Enterprises",
					"Tamil Nadu",
				],
			});
		}
	}
	return pages;
}

export function generateServiceCityPages() {
	const pages = [];
	for (const service of SERVICES) {
		for (const city of CITIES) {
			pages.push({
				service: service.slug,
				city: city.slug,
				serviceName: service.name,
				cityName: city.name,
				title: buildServiceTitle(service.name, city.name),
				description: buildServiceDescription(service, city),
				keywords: [
					...service.keywords,
					city.name,
					`${city.name} ${service.name}`,
					`${service.name} ${city.name}`,
					"gauge services Tamil Nadu",
					"DSN Enterprises Coimbatore",
				],
			});
		}
	}
	return pages;
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
