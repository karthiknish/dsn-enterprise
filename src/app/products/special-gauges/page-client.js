"use client";

import { Cta10 } from "@/components/cta10";
import ProductCategoryHero from "@/components/layout/ProductCategoryHero";
import SpecialGaugesCapabilitiesSection from "@/components/products/special-gauges/SpecialGaugesCapabilitiesSection";
import SpecialGaugesIntroSection from "@/components/products/special-gauges/SpecialGaugesIntroSection";
import SpecialGaugesProductsGrid from "@/components/products/special-gauges/SpecialGaugesProductsGrid";
import SpecialGaugesRelatedCategories from "@/components/products/special-gauges/SpecialGaugesRelatedCategories";
import SpecialGaugesSpecsSection from "@/components/products/special-gauges/SpecialGaugesSpecsSection";
import { pageHeroes } from "@/content/page-heroes";

export default function SpecialGaugesPage() {
	return (
		<div>
			<ProductCategoryHero
				title="Custom & Special Gauges"
				quoteProduct="Custom Gauges"
				description={pageHeroes.productCategoryHeroes.specialGauges}
				image={{
					src: "/images/thread-setting-plug-gauge.png",
					alt: "Custom thread setting plug gauge manufactured to customer drawing",
				}}
			/>

			<SpecialGaugesCapabilitiesSection />
			<SpecialGaugesIntroSection />
			<SpecialGaugesProductsGrid />
			<SpecialGaugesSpecsSection />
			{/* No <CityLinks> — custom-gauge-manufacturing has no live city page
			    (docs/SEO-STRATEGY.md §2K), so the component would render nothing. */}
			<SpecialGaugesRelatedCategories />

			<Cta10
				reference="Ref. DSN-SPG-01"
				heading="Have a Custom Gauge Requirement?"
				description="Send us your drawings or specifications and our engineering team will provide a detailed quote. We specialize in solving complex measurement challenges."
				buttons={{
					primary: {
						text: "Get a Quote",
						url: "/contact?product=Custom%20Gauge",
					},
					secondary: { text: "Contact Engineering", url: "/contact" },
				}}
			/>
		</div>
	);
}
