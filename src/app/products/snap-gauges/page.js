import RelatedReading from "@/components/blog/RelatedReading";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { RELATED_READING } from "@/content/related-reading";
import { metadata as routeMetadata } from "./metadata";
import PageClient from "./page-client";

export const metadata = routeMetadata;

export default function SnapGaugesPage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Products", url: "/products" },
					{ name: "Snap Gauges", url: "/products/snap-gauges" },
				]}
			/>
			<PageClient />
			<RelatedReading items={RELATED_READING["snap-gauges"]} />
		</>
	);
}
