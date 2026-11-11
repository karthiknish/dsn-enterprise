import RelatedReading from "@/components/blog/RelatedReading";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { RELATED_READING } from "@/content/related-reading";
import { metadata as routeMetadata } from './metadata';

export const metadata = routeMetadata;
import PageClient from './page-client';

export default function SpecialGaugesPage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Products", url: "/products" },
					{ name: "Special Gauges", url: "/products/special-gauges" },
				]}
			/>
			<PageClient />
			<RelatedReading items={RELATED_READING["special-gauges"]} />
		</>
	);
}
