import { alternatesFor } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

export const metadata = {
	title: "Plain Gauge Manufacturer – Plug, Ring & Snap Gauges",
	description:
		"Plain gauge and plain snap gauges manufacturer in Coimbatore: plug, ring, pins and setting masters. 1–250 mm, OHNS/carbide, NABL certificates.",
	keywords: [
		"plain gauges",
		"plain plug gauges",
		"plain ring gauges",
		"cylindrical setting masters",
		"measuring pins",
		"snap gauges",
		"GO NOGO gauges",
		"precision gauges",
		"OHNS gauges",
		"carbide gauges",
		"NABL calibration",
		"gauge manufacturers",
		"Coimbatore",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	// hreflang is emitted only when the Hindi layer is live and this
	// route actually has a translation. See src/lib/i18n/config.js.
	alternates: alternatesFor("/products/plain-gauges", { hasHindi: true }),
	openGraph: {
		title:
			"Plain Gauge Manufacturer | Plug, Ring & Snap Gauges - DSN Enterprises",
		description:
			"Plain gauge and plain snap gauges manufacturer in Coimbatore: plug, ring, pins and setting masters. 1–250 mm, OHNS/carbide, NABL certificates.",
		url: "/products/plain-gauges",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/plain-plug-gauge.png",
				width: 1200,
				height: 630,
				alt: "Plain Plug Gauges - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Plain Gauge Manufacturer | Plug, Ring & Snap Gauges",
		description:
			"Plain gauge manufacturer in Coimbatore: plain snap gauges, plug, ring, pins and setting masters, NABL certificates.",
		images: ["/images/plain-plug-gauge.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
