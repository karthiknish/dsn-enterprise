import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { metadata as routeMetadata } from './metadata';

export const metadata = routeMetadata;
import PageClient from './page-client';

export default function ThreadGaugesPage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Products", url: "/products" },
					{ name: "Thread Gauges", url: "/products/thread-gauges" },
				]}
			/>
			<PageClient />
		</>
	);
}
