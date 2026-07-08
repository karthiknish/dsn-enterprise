import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
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
		</>
	);
}
