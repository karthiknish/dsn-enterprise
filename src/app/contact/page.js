import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getSiteUrl, SITE_URL } from "@/lib/site";
import { metadata as routeMetadata } from "./metadata";

export const metadata = routeMetadata;

import { jsonLdProps, ORG_ID, WEBSITE_ID } from "@/lib/seo-schema";
import PageClient from "./page-client";

// LocalBusiness schema strengthens local SEO for Coimbatore searches.
/**
 * ContactPage that points at the canonical organisation node.
 *
 * This previously declared a second, standalone LocalBusiness for the same
 * company. Two unlinked nodes describing one business is worse than one: a
 * consumer cannot tell whether they are the same entity, and the duplicate
 * carried a slightly different phone format and description. Referencing
 * ORG_ID keeps a single source of truth in src/lib/seo-schema.js.
 */
const contactPageSchema = {
	"@context": "https://schema.org",
	"@type": "ContactPage",
	"@id": `${SITE_URL}/contact#contactpage`,
	url: getSiteUrl("/contact"),
	name: "Contact DSN Enterprises",
	description:
		"Contact details and enquiry form for precision gauges, calibration, and custom gauge manufacture.",
	isPartOf: { "@id": WEBSITE_ID },
	about: { "@id": ORG_ID },
	mainEntity: { "@id": ORG_ID },
};

export default function ContactPage({ searchParams }) {
	const prefillProduct =
		typeof searchParams?.product === "string" ? searchParams.product : "";
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Contact", url: "/contact" },
				]}
			/>
			<script {...jsonLdProps(contactPageSchema)} />
			<PageClient prefillProduct={prefillProduct} />
		</>
	);
}
