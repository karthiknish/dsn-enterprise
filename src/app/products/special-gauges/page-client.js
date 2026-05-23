"use client";

import PageCta from "@/components/layout/PageCta";
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
				title="Special Gauges"
				quoteProduct="Special Gauges"
				description={pageHeroes.productCategoryHeroes.specialGauges}
			/>

			<SpecialGaugesCapabilitiesSection />
			<SpecialGaugesIntroSection />
			<SpecialGaugesProductsGrid />
			<SpecialGaugesSpecsSection />
			<SpecialGaugesRelatedCategories />

			<PageCta
				title="Have a Custom Gauge Requirement?"
				description="Send us your drawings or specifications and our engineering team will provide a detailed quote. We specialize in solving complex measurement challenges."
				primaryHref="/contact?product=Custom%20Gauge"
				primaryLabel="Get a Quote"
				secondaryLabel="Contact Engineering"
			/>
		</div>
	);
}
