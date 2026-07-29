import { alternatesFor } from "@/lib/i18n/config";
import { getSiteUrl, SITE_URL } from "@/lib/site";
import AboutSection from "../components/home/AboutSection";
import CertificationsSection from "../components/home/CertificationsSection";
import ConsultancySection from "../components/home/ConsultancySection";
import ContactSection from "../components/home/ContactSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/ServicesSection";

export const metadata = {
	// Homepage title is absolute so the root template does not append a second
	// "| DSN Enterprises" on top of the brand name already in the title.
	title: {
		absolute: "DSN Enterprises | Precision Gauge Manufacturers, Coimbatore",
	},
	// Kept under ~158 chars; the previous 218-char description was truncated
	// mid-sentence in the SERP.
	description:
		"Precision plain, thread, and API gauges made in Coimbatore. ISO 9001 manufacture with NABL-traceable calibration. Supplying industry across Tamil Nadu.",
	keywords: [
		"precision gauges",
		"plain plug gauges",
		"ring gauges",
		"thread gauges",
		"gauge calibration",
		"NABL calibration",
		"gauge manufacturers",
		"Coimbatore",
		"Tamil Nadu",
		"India",
		"API gauges",
		"custom gauges",
		"measuring instruments",
		"quality control gauges",
		"gauge engineering consultancy",
		"dimensional metrology advisory",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(SITE_URL),
	// hreflang is emitted only when the Hindi layer is live and this
	// route actually has a translation. See src/lib/i18n/config.js.
	alternates: alternatesFor("/", { hasHindi: true }),
	openGraph: {
		title:
			"DSN Enterprises - Precision Gauge Manufacturers in Coimbatore, India",
		description:
			"Leading manufacturer of precision gauges including plain plug gauges, ring gauges, thread gauges, and custom gauges. ISO certified quality with NABL calibration services.",
		url: SITE_URL,
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/featured.png",
				width: 1200,
				height: 630,
				alt: "DSN Enterprises - Precision Gauges",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "DSN Enterprises - Precision Gauge Manufacturers",
		description:
			"Leading manufacturer of precision gauges including plain plug gauges, ring gauges, thread gauges, and custom gauges.",
		images: ["/images/featured.png"],
		creator: "@dsnenterprises",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function Home() {
	// ItemList schema for featured products, helps Google understand the
	// product catalogue surfaced on the home page.
	const itemListSchema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Featured Precision Gauges",
		itemListElement: [
			{
				name: "Plain Plug Gauges",
				url: getSiteUrl("/products/plain-gauges"),
			},
			{
				name: "Thread Plug Gauges",
				url: getSiteUrl("/products/thread-gauges"),
			},
			{
				name: "API Master Gauges",
				url: getSiteUrl("/products/api-gauges"),
			},
			{
				name: "Special & Custom Gauges",
				url: getSiteUrl("/products/special-gauges"),
			},
		].map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Product",
				name: item.name,
				brand: { "@type": "Brand", name: "DSN Enterprises" },
				url: item.url,
			},
		})),
	};

	return (
		<div>
			<script type="application/ld+json">
				{JSON.stringify(itemListSchema)}
			</script>
			<Hero />
			<FeaturedProducts />
			<AboutSection />
			<ConsultancySection />
			<ServicesSection />
			<CertificationsSection />
			<ContactSection />
		</div>
	);
}
