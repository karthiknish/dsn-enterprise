import RelatedReading from "@/components/blog/RelatedReading";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { RELATED_READING } from "@/content/related-reading";
import { metadata as routeMetadata } from './metadata';

export const metadata = routeMetadata;
import PageClient from './page-client';

export default function ApiGaugesPage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Products", url: "/products" },
					{ name: "API Gauges", url: "/products/api-gauges" },
				]}
			/>
			<PageClient />
			<RelatedReading items={RELATED_READING["api-gauges"]} />
		</>
	);
}
