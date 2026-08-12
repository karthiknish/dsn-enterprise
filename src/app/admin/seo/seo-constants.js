/**
 * Shared shape for the SEO console: task definitions and the location codes the
 * UI offers. Kept out of the components so the tab list, the form and the empty
 * states all read from one place.
 */

export const SEO_TABS = [
	{
		id: "rank",
		label: "Rank tracker",
		blurb: "Where the site sits in Google's organic results for a keyword.",
		endpoint: "dataforseo.google.serp.organic",
	},
	{
		id: "keywords",
		label: "Keyword research",
		blurb: "Related keywords with volume, CPC and competition.",
		endpoint: "dataforseo.google.keywords.ideas",
	},
	{
		id: "authority",
		label: "Domain authority",
		blurb: "Moz DA/PA, spam score and linking root domains.",
		endpoint: "moz.web.url.metrics",
	},
];

/** DataForSEO location codes. India first — it is the site's primary market. */
export const LOCATIONS = [
	{ code: 2356, label: "India" },
	{ code: 2840, label: "United States" },
	{ code: 2826, label: "United Kingdom" },
	{ code: 2784, label: "United Arab Emirates" },
	{ code: 2276, label: "Germany" },
	{ code: 2036, label: "Australia" },
];

export const DEFAULT_DOMAIN = "dsnenterprises.in";

/** Seeds that match what the site actually sells, so the first run is useful. */
export const SUGGESTED_KEYWORDS = [
	"thread gauges",
	"plain plug gauge",
	"api thread gauges",
	"thread gauge manufacturer india",
	"calibration services",
];

export function formatNumber(value) {
	if (value === null || value === undefined) return "—";
	return new Intl.NumberFormat("en-IN").format(value);
}

export function formatUsd(value) {
	if (value === null || value === undefined) return "—";
	// Sub-cent costs are the norm here, so two decimals would round most calls
	// to $0.00 and make the spend indicator useless.
	return `$${Number(value).toFixed(4)}`;
}
