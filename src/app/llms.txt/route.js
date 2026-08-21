import { HI_TRANSLATED_PATHS } from "@/content/hi/pages";
import { HINDI_ENABLED } from "@/lib/i18n/config";
import {
	generateProductCityPages,
	generateServiceCityPages,
} from "@/lib/seo-pages.config";
import { SITE_URL } from "@/lib/site";

/**
 * /llms.txt — curated map of the site for AI agents and retrieval systems.
 *
 * Follows the llmstxt.org spec: an H1 (the only required section), a
 * blockquote summary, free-form markdown sections without headings, then H2
 * sections containing markdown link lists of the form `- [name](url): notes`.
 *
 * Scope, deliberately: this is agent documentation, not a marketing surface.
 * There is no published evidence that llms.txt improves citation rates. It is
 * worth having because it gives agents a reliable entry point, Google's
 * Lighthouse agentic-readiness audit checks for it, and agents have been
 * observed fetching it for technical queries. Keep it factual and keep it
 * short — padding it with sales copy is the documented failure mode.
 *
 * Generated from the same config that drives the sitemap, so it cannot drift
 * out of sync when the location-page tier limit changes.
 */

export const dynamic = "force-static";
export const revalidate = 3600;

function abs(path) {
	return `${SITE_URL}${path}`;
}

export async function GET() {
	const productCity = generateProductCityPages();
	const serviceCity = generateServiceCityPages();

	const lines = [];
	const push = (s = "") => lines.push(s);

	// H1 — required.
	push("# DSN Enterprises");
	push();

	// Blockquote summary — key facts needed to interpret the rest.
	push(
		"> Precision gauge manufacturer in Coimbatore, Tamil Nadu, India. Makes plain plug and ring gauges, thread plug and ring gauges, snap gauges, air gauges, API 5B and API 7-2 gauges, and custom limit gauges built to customer drawings. Operates a calibration laboratory. ISO 9001:2015 certified; calibration laboratory NABL accredited to ISO/IEC 17025; API 5B and API 7-2 licensed manufacturer.",
	);
	push();

	// Free-form context. No headings here, per the spec.
	push(
		"Contact: +91 93631 22005, info@dsnenterprises.com. Manufacturing and calibration facility in Coimbatore; supplies Tamil Nadu, Bangalore, Hyderabad, pan-India, and export markets.",
	);
	push();
	push(
		"Technical scope: GO/NO-GO limit gauging, gauge tolerance and wear limits per IS 3455 (Gauging Practice for Plain Workpieces), and limits and fits per IS 919 Parts 1 and 2 : 2014 (identical to ISO 286-1:2010 and ISO 286-2:2010). Thread forms include Metric, UN, BSW, BSF, BSP, NPT, BSPT, ACME, stub ACME, and buttress.",
	);
	push();
	push(
		"Note on units and standards: sizes are millimetres unless stated. Standard designations (IS 3455, IS 919, ISO 286, API 5B, API 7-2) and fit-class codes (H7, g6) are written in Latin script in all language versions of this site.",
	);
	push();

	// ── Core pages ──
	push("## Core pages");
	push();
	push(`- [Home](${abs("/")}): company overview and product range.`);
	push(
		`- [About](${abs("/about")}): manufacturing approach, inspection, and documentation practice.`,
	);
	push(`- [Products](${abs("/products")}): index of all gauge categories.`);
	push(
		`- [Services](${abs("/services")}): calibration, custom manufacture, repair and reconditioning.`,
	);
	push(
		`- [Calibration](${abs("/calibration")}): calibration process, turnaround, and documentation.`,
	);
	push(
		`- [Quality](${abs("/quality")}): ISO 9001:2015, NABL/ISO 17025, and API licensing.`,
	);
	push(
		`- [Industries](${abs("/industries")}): sectors served, including oil and gas, automotive, aerospace, and textile machinery.`,
	);
	push(`- [Resources](${abs("/resources")}): technical guides and downloads.`);
	push(
		`- [FAQ](${abs("/faq")}): answers on gauge selection, standards, certificates, and lead times.`,
	);
	push(`- [Contact](${abs("/contact")}): enquiry form, phone, and location.`);
	push();

	// ── Product categories ──
	push("## Product categories");
	push();
	push(
		`- [Plain gauges](${abs("/products/plain-gauges")}): plug, ring, snap gauges, setting masters, measuring pins. 1 mm to 250 mm, OHNS tool steel or carbide, 58-65 HRC.`,
	);
	push(
		`- [Thread gauges](${abs("/products/thread-gauges")}): thread plug and ring gauges, setting plugs, taper gauges. Metric, UN, BSP, NPT and specials.`,
	);
	push(
		`- [API gauges](${abs("/products/api-gauges")}): API 5B and API 7-2 master and working gauges for OCTG and rotary shouldered connections.`,
	);
	push(
		`- [Special gauges](${abs("/products/special-gauges")}): ACME, buttress, trapezoidal, spline, taper, form and limit gauges built to drawing.`,
	);
	push();

	// ── Reference content ──
	push("## Technical reference");
	push();
	push(
		`- [IS 3455 and IS 919 explained](${abs("/blog/using-is-919-and-is-3455-to-make-better-plain-gauging-decisions")}): what each standard covers, the 500 mm scope of IS 3455, the 20 C reference temperature, the Taylor principle as the standard states it, and how GO gauge tolerance and wear limits (the H, Y and Z framework) are positioned. Notes that the current IS 919 edition is Part 1 and Part 2 : 2014, not the 1993 or 1963 editions many drawings still cite.`,
	);
	push(
		`- [Blog index](${abs("/blog")}): articles on gauge selection, calibration intervals, standards, and shop-floor inspection practice.`,
	);
	push();

	// ── Location pages, generated ──
	if (productCity.length || serviceCity.length) {
		push("## Location pages");
		push();
		push(
			`These cover supply and service for specific industrial clusters in Tamil Nadu, Bangalore, and Hyderabad. Each carries city-specific logistics, the dominant gauging problem in that cluster, and local industry context. ${productCity.length} product-city and ${serviceCity.length} service-city pages are currently published.`,
		);
		push();
		for (const p of productCity) {
			push(
				`- [${p.productName} in ${p.cityName}](${abs(`/products/${p.product}-${p.city}`)})`,
			);
		}
		for (const s of serviceCity) {
			push(
				`- [${s.serviceName} in ${s.cityName}](${abs(`/services/${s.service}-${s.city}`)})`,
			);
		}
		push();
	}

	// ── Hindi layer, only when published ──
	if (HINDI_ENABLED && HI_TRANSLATED_PATHS.length) {
		push("## Hindi versions");
		push();
		push(
			"Hindi translations of core pages. Standards designations and fit-class codes remain in Latin script.",
		);
		push();
		for (const p of HI_TRANSLATED_PATHS) {
			push(
				`- [${p === "/" ? "Home" : p}](${abs(p === "/" ? "/hi" : `/hi${p}`)})`,
			);
		}
		push();
	}

	// ── Optional ──
	push("## Optional");
	push();
	push(
		`- [Sitemap](${abs("/sitemap.xml")}): complete machine-readable URL list with hreflang alternates.`,
	);
	push(
		`- [robots.txt](${abs("/robots.txt")}): crawler policy, including named AI crawler groups.`,
	);
	push();

	return new Response(lines.join("\n"), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}
