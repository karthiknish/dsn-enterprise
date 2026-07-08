"use client";

import { Cta10 } from "@/components/cta10";
import ProductCategoryHero from "@/components/layout/ProductCategoryHero";
import ApiGaugeHeroBadges from "@/components/products/ApiGaugeHeroBadges";
import ApiGaugesCertificationsSection from "@/components/products/api-gauges/ApiGaugesCertificationsSection";
import ApiGaugesIntroSection from "@/components/products/api-gauges/ApiGaugesIntroSection";
import ApiGaugesProductsGrid from "@/components/products/api-gauges/ApiGaugesProductsGrid";
import ApiGaugesRelatedCategories from "@/components/products/api-gauges/ApiGaugesRelatedCategories";
import ApiGaugesStandardsSection from "@/components/products/api-gauges/ApiGaugesStandardsSection";
import { pageHeroes } from "@/content/page-heroes";

export default function APIGaugesPage() {
	return (
		<div>
			<ProductCategoryHero
				title="API Gauges"
				quoteProduct="API Gauges"
				description={pageHeroes.productCategoryHeroes.apiGauges}
				badgeSlot={ApiGaugeHeroBadges}
			/>

			<ApiGaugesCertificationsSection />
			<ApiGaugesIntroSection />
			<ApiGaugesProductsGrid />
			<ApiGaugesStandardsSection />
			<ApiGaugesRelatedCategories />

			<Cta10
				heading="Need API Certified Gauges?"
				description="As an API licensed manufacturer, we provide certified gauges for the oil and gas industry. Contact us for specifications, pricing, and delivery information."
				buttons={{
					primary: { text: "Get a Quote", url: "/contact?product=API%20Gauges" },
					secondary: { text: "View Certifications", url: "/about" },
				}}
			/>
		</div>
	);
}
