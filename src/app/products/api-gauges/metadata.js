import { SITE_URL } from "@/lib/site";

export const metadata = {
	// 2026-09-07: desc leads with "Certified" — "api certified gauges"
	// 5 impr @ 6.0, 0 clicks, term in body but not desc/H1. Title/H1 keep
	// "Thread": the blog owns bare "api gauges" (pos 7.8 vs product 30.1)
	// and links to this page, so no cannibalisation fight.
	title: "API Thread Gauges – 5B & 7-2",
	description:
		"Certified API gauges (thread gauges, not pressure gauges) to API 5B & 7-2 for casing, tubing and rotary connections.",
	keywords: [
		"API gauges",
		"API 5B gauges",
		"API 7-2 gauges",
		"API thread gauges",
		"API casing gauges",
		"API tubing gauges",
		"API rotary gauges",
		"oilfield gauges",
		"petroleum gauges",
		"API certified gauges",
		"drill pipe gauges",
		"OCTG gauges",
		"API gauge manufacturer",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/products/api-gauges",
	},
	openGraph: {
		title:
			"API Gauges Manufacturer | API 5B & 7-2 Certified Gauges - DSN Enterprises",
		description:
			"API gauges (thread gauges, not pressure gauges) manufacturer to API 5B & 7-2 for casing, tubing, line pipe, and rotary shouldered connections.",
		url: "/products/api-gauges",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/api-thread-gauge.png",
				width: 1200,
				height: 630,
				alt: "API Gauges - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "API Gauges Manufacturer | API 5B & 7-2 Certified Gauges",
		description:
			"API gauges manufacturer to API 5B & 7-2: certified thread gauges (not pressure gauges) for the oil and gas industry.",
		images: ["/images/api-thread-gauge.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
