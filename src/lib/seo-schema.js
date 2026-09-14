import {
	EMAIL,
	getSiteUrl,
	LINKEDIN_URL,
	NAP_COUNTRY,
	NAP_LOCALITY,
	NAP_REGION,
	PHONE_SCHEMA,
	SITE_URL,
} from "@/lib/site";

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
		alternateName: ["DSN Enterprises Coimbatore"],
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
			addressLocality: NAP_LOCALITY,
			addressRegion: NAP_REGION,
			addressCountry: NAP_COUNTRY,
		},
		contactPoint: [
			{
				"@type": "ContactPoint",
				telephone: PHONE_SCHEMA,
				email: EMAIL,
				contactType: "sales",
				areaServed: "IN",
				availableLanguage: ["en", "hi", "ta"],
			},
		],
		telephone: PHONE_SCHEMA,
		email: EMAIL,
		sameAs: [LINKEDIN_URL],
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
			{ "@type": "State", name: "Karnataka" },
			{ "@type": "State", name: "Telangana" },
			{ "@type": "City", name: "Coimbatore" },
			{ "@type": "City", name: "Bengaluru" },
			{ "@type": "City", name: "Hyderabad" },
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

export function buildFaqJsonLd(faqs, { id, aboutId, isPartOfId } = {}) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		...(id ? { "@id": id } : {}),
		...(isPartOfId ? { isPartOf: { "@id": isPartOfId } } : {}),
		...(aboutId ? { about: { "@id": aboutId } } : {}),
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

/**
 * Extract question→answer pairs that already exist in a post's HTML.
 *
 * This is deliberately an extractor, not a generator: it returns only a
 * heading that ends in "?" followed by a paragraph. The rule matters because
 * the only way FAQ markup becomes a liability is by stating a question or
 * answer the page itself never shows. A post with no question headings gets an
 * empty list and therefore no FAQ block — which is the correct outcome, not a
 * gap to fill with invented questions.
 */
export function extractFaqPairsFromHtml(html, limit = 8) {
	if (typeof html !== "string" || !html) return [];
	const strip = (s) =>
		s
			.replace(/<[^>]+>/g, " ")
			.replace(/&[a-z#0-9]+;/gi, " ")
			.replace(/\s+/g, " ")
			.trim();

	const pairs = [];
	const re = /<h[23][^>]*>([\s\S]*?)<\/h[23]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
	for (const match of html.matchAll(re)) {
		if (pairs.length >= limit) break;
		const question = strip(match[1]);
		const answer = strip(match[2]);
		if (
			question.endsWith("?") &&
			question.length <= 160 &&
			answer.length >= 40
		) {
			pairs.push({ question, answer });
		}
	}
	return pairs;
}

/**
 * A post's FAQ list, preferring the hand-written `faq` field on the Firestore
 * document and falling back to questions already visible in the body.
 *
 * The field exists because the posts worth marking up are not the posts that
 * happen to phrase their headings as questions: the highest-traffic article on
 * the site had exactly one, while a buyer's guide with no search demand had
 * seven. Editorial Q&A can be added without rewriting the article.
 */
export function resolvePostFaqs(post, limit = 8) {
	const authored = Array.isArray(post?.faq)
		? post.faq
				.filter(
					(entry) =>
						entry &&
						typeof entry.question === "string" &&
						typeof entry.answer === "string",
				)
				.map((entry) => ({
					question: entry.question.trim(),
					answer: entry.answer.trim(),
				}))
		: [];
	if (authored.length > 0) return authored.slice(0, limit);
	return extractFaqPairsFromHtml(post?.content, limit);
}

/**
 * The BlogPosting node for a single article.
 *
 * Every entity reference here is an `@id` pointer into the one graph defined at
 * the top of this module rather than an inline re-declaration — the same fix
 * §2C applied to Product, Service and FAQPage. Before this, a post's author and
 * publisher were two more anonymous Organizations that a machine consumer had
 * to guess were the company.
 */
export function buildBlogPostingSchema(post, postUrl) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${postUrl}#article`,
		mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
		headline: post.title,
		image: post.featuredImage
			? [post.featuredImage]
			: [getSiteUrl("/images/featured.png")],
		datePublished: post.publishedDate || post.createdAt,
		dateModified: post.updatedAt || post.publishedDate || post.createdAt,
		author: { "@id": ORG_ID },
		publisher: { "@id": ORG_ID },
		isPartOf: { "@id": WEBSITE_ID },
		about: { "@id": ORG_ID },
		inLanguage: "en-IN",
		description: post.excerpt || post.title,
		...(Array.isArray(post.keywords) && post.keywords.length > 0
			? { keywords: post.keywords.join(", ") }
			: {}),
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
				containedInPlace: {
					"@type": "State",
					name: pageData.state || "Tamil Nadu",
				},
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
			containedInPlace: {
				"@type": "State",
				name: pageData.state || "Tamil Nadu",
			},
		},
		url: getSiteUrl(path),
	};
}
