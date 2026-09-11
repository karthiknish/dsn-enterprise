import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ThreadHub from "@/components/threads/ThreadHub";
import { metadata as routeMetadata } from "./metadata";

export const metadata = routeMetadata;

export default function ThreadReferencePage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Thread Reference", url: "/threads" },
				]}
			/>
			<ThreadHub />
		</>
	);
}
