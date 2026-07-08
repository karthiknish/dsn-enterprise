import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getSiteUrl, SITE_URL } from "@/lib/site";
import { metadata as routeMetadata } from './metadata';

export const metadata = routeMetadata;
import PageClient from './page-client';

// LocalBusiness schema strengthens local SEO for Coimbatore searches.
const localBusinessSchema = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: "DSN Enterprises",
	image: getSiteUrl("/images/featured.png"),
	url: SITE_URL,
	telephone: "+91-9363122005",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Coimbatore",
		addressRegion: "Tamil Nadu",
		addressCountry: "IN",
	},
	areaServed: {
		"@type": "State",
		name: "Tamil Nadu",
	},
	description:
		"Manufacturer and supplier of precision gauges and measuring instruments with NABL-aligned calibration services.",
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
			<script type="application/ld+json">
				{JSON.stringify(localBusinessSchema)}
			</script>
			<PageClient prefillProduct={prefillProduct} />
		</>
	);
}
