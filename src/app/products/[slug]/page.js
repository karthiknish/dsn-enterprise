import { notFound, permanentRedirect } from "next/navigation";
import ProductCityLanding from "@/components/seo/ProductCityLanding";
import { classifyProductCitySlug } from "@/lib/dynamic-route-guard";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { generateProductCityPages } from "@/lib/seo-pages.config";
import { getSiteUrl } from "@/lib/site";

export async function generateStaticParams() {
	// Only relevance-approved, in-tier combinations are prerendered. Previously
	// this emitted every product x city pair, most of which Google discovered
	// and declined to crawl.
	return generateProductCityPages().map((p) => ({
		slug: `${p.product}-${p.city}`,
	}));
}

// Render, 308, or 404 is decided in `classifyProductCitySlug` rather than here,
// because `src/proxy.js` has to reach the same verdict before this route runs
// in order to answer a real 404 for an unknown slug. See that module.

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const pageData = classifyProductCitySlug(slug).page;

	if (!pageData) {
		return {
			title: "Page Not Found",
			robots: { index: false, follow: false },
		};
	}

	const canonical = `/products/${slug}`;

	return {
		title: pageData.title,
		description: pageData.description,
		keywords: pageData.keywords.join(", "),
		alternates: { canonical },
		openGraph: {
			title: pageData.title,
			description: pageData.description,
			url: getSiteUrl(canonical),
			type: "website",
			siteName: "DSN Enterprises",
			locale: "en_IN",
			images: [
				{
					url: "/images/featured.png",
					width: 1200,
					height: 630,
					alt: `${pageData.productName} in ${pageData.cityName}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: pageData.title,
			description: pageData.description,
			images: ["/images/featured.png"],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true },
		},
	};
}

export default async function ProductCityPage({ params }) {
	const { slug } = await params;
	const verdict = classifyProductCitySlug(slug);

	// A combination that was generated before and is now out of scope still has
	// URLs in Google's index, so it keeps its signal via a 308 to the hub.
	if (verdict.decision === "redirect") permanentRedirect(verdict.to);
	if (!verdict.page) notFound();

	const { citySlug, entitySlug: productSlug } = parseLocationSlug(slug);

	return (
		<ProductCityLanding
			pageData={verdict.page}
			productSlug={productSlug}
			citySlug={citySlug}
			slug={slug}
		/>
	);
}
