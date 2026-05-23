import { notFound } from "next/navigation";
import ProductCityLanding from "@/components/seo/ProductCityLanding";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { CITIES, getProductCityPage, PRODUCTS } from "@/lib/seo-pages.config";
import { getSiteUrl } from "@/lib/site";

export async function generateStaticParams() {
	const routes = [];
	for (const product of PRODUCTS) {
		for (const city of CITIES) {
			routes.push({ slug: `${product.slug}-${city.slug}` });
		}
	}
	return routes;
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
			images: ["/images/featured.png"],
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
