import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
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
		</>
	);
}
