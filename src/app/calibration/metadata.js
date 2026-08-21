import { alternatesFor } from "@/lib/i18n/config";
import { getSiteUrl, SITE_URL } from "@/lib/site";

export const metadata = {
	title: "Gauge Calibration – NABL Accredited",
	description:
		"NABL accredited gauge calibration for plain, thread, and API gauges. Express turnaround, repair, and pickup from Tamil Nadu, Bangalore, and Hyderabad.",
	keywords: [
		"gauge calibration",
		"NABL calibration",
		"gauge repair",
		"gauge refurbishment",
		"on-site calibration",
		"plain gauge calibration",
		"thread gauge calibration",
		"API gauge calibration",
		"calibration laboratory",
		"calibration certificate",
		"express calibration",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	// hreflang is emitted only when the Hindi layer is live and this
	// route actually has a translation. See src/lib/i18n/config.js.
	alternates: alternatesFor("/calibration", { hasHindi: true }),
	openGraph: {
		title:
			"Gauge Calibration Services | NABL Accredited Calibration - DSN Enterprises",
		description:
			"NABL accredited gauge calibration services for plain gauges, thread gauges, API gauges, and setting masters. Express calibration and on-site services available.",
		url: getSiteUrl("/calibration"),
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/featured.png",
				width: 1200,
				height: 630,
				alt: "Calibration Services - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Gauge Calibration Services | NABL Accredited Calibration",
		description:
			"NABL accredited gauge calibration services for plain gauges, thread gauges, and API gauges.",
		images: ["/images/featured.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
