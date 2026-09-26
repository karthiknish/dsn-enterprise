import { alternatesFor } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

/**
 * Added 26 Sep 2026 (docs/SEO-STRATEGY.md §2O). Two of the four real enquiries
 * on record asked for snap gauges, and "plain snap gauges manufacturer" ranked
 * 18.6 on /products/plain-gauges, where snap gauges were one card of five.
 * One page, not a programmatic axis — rule 9 is not engaged.
 */
export const metadata = {
	title: "Snap Gauge Manufacturer – Fixed & Adjustable Snap Gauges",
	description:
		"Snap gauge manufacturer in Coimbatore: fixed progressive and adjustable snap gauges for shaft OD checks, set to your drawing's GO/NO-GO limits.",
	keywords: [
		"snap gauge",
		"snap gauges",
		"snap gauge manufacturer",
		"plain snap gauges",
		"adjustable snap gauge",
		"progressive snap gauge",
		"GO NO-GO snap gauge",
		"IS 8023",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: alternatesFor("/products/snap-gauges"),
	openGraph: {
		title: "Snap Gauge Manufacturer | Fixed & Adjustable - DSN Enterprises",
		description:
			"Fixed progressive and adjustable snap gauges for shaft OD checks, set to your drawing's GO/NO-GO limits. Made in Coimbatore.",
		url: "/products/snap-gauges",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/snap-gauge.png",
				width: 1200,
				height: 630,
				alt: "Snap gauge - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Snap Gauge Manufacturer | Fixed & Adjustable",
		description:
			"Fixed progressive and adjustable snap gauges for shaft OD checks, made to your GO/NO-GO limits in Coimbatore.",
		images: ["/images/snap-gauge.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
