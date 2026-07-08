import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { metadata as routeMetadata } from './metadata';

export const metadata = routeMetadata;
import PageClient from './page-client';

export default function PlainGaugesPage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Products", url: "/products" },
					{ name: "Plain Gauges", url: "/products/plain-gauges" },
				]}
			/>
			<PageClient />
		</>
	);
}
