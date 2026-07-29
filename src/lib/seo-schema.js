import { getSiteUrl, SITE_URL } from "@/lib/site";

/**
 * Stable @id values so every schema block on the site refers to the SAME
 * organisation and website entities rather than redeclaring anonymous copies.
 *
 * This is the part of structured data that actually helps machine consumers:
 * it lets a crawler resolve "the manufacturer of this product" to the same
 * node as "the publisher of this article" instead of guessing they match.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Safe props for rendering a JSON-LD <script>.
 *
 * React escapes text children, so `{JSON.stringify(x)}` turns an `&` in a
 * title into `&amp;` INSIDE the JSON string value. The block still parses,
 * but the machine-readable data then carries HTML entities — which is exactly
 * the audience that cannot un-escape them. dangerouslySetInnerHTML avoids
 * that; escaping `<` prevents a `</script>` breakout.
 */
export function jsonLdProps(schema) {
	return {
		type: "application/ld+json",
		dangerouslySetInnerHTML: {
			__html: JSON.stringify(schema).replace(/</g, "\\u003c"),
		},
	};
}

/**
 * Canonical organisation node.
 *
 * Every claim here is sourced from the site's own copy (src/content/faq.js):
 * ISO 9001:2015, NABL accreditation to ISO/IEC 17025, API 5B and API 7-2
 * licensing, Coimbatore location, published phone and email. Do not add
 * certifications, founding dates, or figures that are not stated on the site.
 */
export function buildOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": ["Organization", "LocalBusiness"],
		"@id": ORG_ID,
		name: "DSN Enterprises",
		url: SITE_URL,
		logo: {
			"@type": "ImageObject",
			url: getSiteUrl("/images/logo.png"),
		},
		image: getSiteUrl("/images/logo.png"),
		description:
			"Manufacturer of precision plain gauges, thread gauges, API gauges, and custom limit gauges, with NABL-traceable calibration, based in Coimbatore, Tamil Nadu.",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Coimbatore",
			addressRegion: "Tamil Nadu",
			addressCountry: "IN",
		},
		contactPoint: [
			{
				"@type": "ContactPoint",
				telephone: "+91-93631-22005",
				email: "info@dsnenterprises.com",
				contactType: "sales",
				areaServed: "IN",
				availableLanguage: ["en", "hi", "ta"],
			},
		],
		telephone: "+91-93631-22005",
		email: "info@dsnenterprises.com",
		// What this organisation is authoritative about. Helps a retrieval system
		// decide whether this entity is relevant to a technical question.
		knowsAbout: [
			"Plain plug gauges",
			"Thread plug and ring gauges",
			"Snap gauges",
			"API 5B and API 7-2 gauges",
			"Gauge calibration",
			"IS 3455 gauging practice for plain workpieces",
			"IS 919 / ISO 286 limits and fits",
			"GO/NO-GO limit gauging",
			"Dimensional metrology",
		],
		hasCredential: [
			{
				"@type": "EducationalOccupationalCredential",
				credentialCategory: "certification",
				name: "ISO 9001:2015 Quality Management System",
			},
			{
				"@type": "EducationalOccupationalCredential",
				credentialCategory: "accreditation",
				name: "NABL accreditation to ISO/IEC 17025 (calibration laboratory)",
			},
			{
				"@type": "EducationalOccupationalCredential",
				credentialCategory: "licence",
				name: "API 5B and API 7-2 licensed gauge manufacturer",
			},
		],
		areaServed: [
			{ "@type": "State", name: "Tamil Nadu" },
			{ "@type": "Country", name: "India" },
		],
	};
}

export function buildWebSiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		name: "DSN Enterprises",
		url: SITE_URL,
		publisher: { "@id": ORG_ID },
		inLanguage: "en-IN",
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: getSiteUrl("/blog?q={search_term_string}"),
			},
			"query-input": "required name=search_term_string",
		},
	};
}

export function buildBreadcrumbJsonLd(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url ? getSiteUrl(item.url) : undefined,
		})),
	};
}

export function buildFaqJsonLd(faqs) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

export function buildProductLocationJsonLd({
	pageData,
	productSlug,
	citySlug: _citySlug,
	path,
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: `${pageData.productName} in ${pageData.cityName}`,
		description: pageData.description,
		brand: { "@type": "Brand", name: "DSN Enterprises" },
		// Reference the canonical org node instead of redeclaring it, so the
		// manufacturer here resolves to the same entity as the site publisher.
		manufacturer: { "@id": ORG_ID },
		offers: {
			"@type": "Offer",
			availability: "https://schema.org/InStock",
			priceCurrency: "INR",
			url: getSiteUrl(path),
			areaServed: {
				"@type": "City",
				name: pageData.cityName,
				containedInPlace: { "@type": "State", name: "Tamil Nadu" },
			},
		},
		category: productSlug,
	};
}

export function buildServiceLocationJsonLd({ pageData, path }) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: `${pageData.serviceName} in ${pageData.cityName}`,
		description: pageData.description,
		provider: { "@id": ORG_ID },
		areaServed: {
			"@type": "City",
			name: pageData.cityName,
			containedInPlace: { "@type": "State", name: "Tamil Nadu" },
		},
		url: getSiteUrl(path),
	};
}
