import { notFound, permanentRedirect } from "next/navigation";
import ProductCityLanding from "@/components/seo/ProductCityLanding";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { getProductHub } from "@/lib/seo-location-data";
import {
	generateProductCityPages,
	getProductCityPage,
	PRODUCTS,
} from "@/lib/seo-pages.config";
import { getSiteUrl } from "@/lib/site";

export async function generateStaticParams() {
	// Only relevance-approved, in-tier combinations are prerendered. Previously
	// this emitted every product x city pair, most of which Google discovered
	// and declined to crawl.
	return generateProductCityPages().map((p) => ({
		slug: `${p.product}-${p.city}`,
	}));
}

/**
 * Combinations that were previously generated but are now out of scope still
 * exist in Google's index. Send them to the product hub with a 308 instead of
 * returning a 404, so any accumulated signal is preserved rather than dropped.
 */
function redirectTargetFor(productSlug) {
	if (!productSlug) return null;
	const known = PRODUCTS.some((p) => p.slug === productSlug);
	if (!known) return null;
	return getProductHub(productSlug).hubPath || "/products";
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const { citySlug, entitySlug: productSlug } = parseLocationSlug(slug);

	if (!citySlug || !productSlug) {
		return {
			title: "Page Not Found",
			robots: { index: false, follow: false },
		};
	}

	const pageData = getProductCityPage(productSlug, citySlug);
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
	const { citySlug, entitySlug: productSlug } = parseLocationSlug(slug);
	const pageData = getProductCityPage(productSlug, citySlug);

	if (!pageData) {
		const target = redirectTargetFor(productSlug);
		if (target) permanentRedirect(target);
		notFound();
	}

	return (
		<ProductCityLanding
			pageData={pageData}
			productSlug={productSlug}
			citySlug={citySlug}
			slug={slug}
		/>
	);
}
