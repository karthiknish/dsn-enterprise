import JsonLdScripts from "@/components/seo/JsonLdScripts";
import ProductCityBottomSections from "@/components/seo/product-city/ProductCityBottomSections";
import ProductCityHero from "@/components/seo/product-city/ProductCityHero";
import ProductCityOverview from "@/components/seo/product-city/ProductCityOverview";
import ProductCityProductProfile from "@/components/seo/product-city/ProductCityProductProfile";
import {
	buildProductFaqs,
	getCityProfile,
	getProductHub,
	PRODUCT_PROFILES,
} from "@/lib/seo-location-data";
import { PRODUCTS } from "@/lib/seo-pages.config";
import {
	buildBreadcrumbJsonLd,
	buildFaqJsonLd,
	buildProductLocationJsonLd,
} from "@/lib/seo-schema";

export default function ProductCityLanding({
	pageData,
	productSlug,
	citySlug,
	slug,
}) {
	const product = PRODUCTS.find((p) => p.slug === productSlug);
	const cityProfile = getCityProfile(citySlug);
	const productProfile = PRODUCT_PROFILES[productSlug];
	const hub = getProductHub(productSlug);
	const faqs = buildProductFaqs(pageData, productSlug, citySlug);
	const path = `/products/${slug}`;

	const schemas = [
		buildBreadcrumbJsonLd([
			{ name: "Home", url: "/" },
			{ name: "Products", url: "/products" },
			{ name: hub.hubLabel, url: hub.hubPath },
			{ name: `${pageData.productName} in ${pageData.cityName}`, url: path },
		]),
		buildProductLocationJsonLd({ pageData, productSlug, citySlug, path }),
		buildFaqJsonLd(faqs),
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<JsonLdScripts schemas={schemas} />

			<ProductCityHero pageData={pageData} product={product} hub={hub} />

			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-8">
						<ProductCityOverview
							pageData={pageData}
							product={product}
							cityProfile={cityProfile}
						/>

						<ProductCityProductProfile productProfile={productProfile} />

						<ProductCityBottomSections
							pageData={pageData}
							productSlug={productSlug}
							citySlug={citySlug}
							hub={hub}
							faqs={faqs}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
