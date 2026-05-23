import { getSiteUrl } from "@/lib/site";

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
		manufacturer: {
			"@type": "Organization",
			name: "DSN Enterprises",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Coimbatore",
				addressRegion: "Tamil Nadu",
				addressCountry: "IN",
			},
		},
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
		provider: {
			"@type": "Organization",
			name: "DSN Enterprises",
			telephone: "+91-9363122005",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Coimbatore",
				addressRegion: "Tamil Nadu",
				addressCountry: "IN",
			},
		},
		areaServed: {
			"@type": "City",
			name: pageData.cityName,
			containedInPlace: { "@type": "State", name: "Tamil Nadu" },
		},
		url: getSiteUrl(path),
	};
}
