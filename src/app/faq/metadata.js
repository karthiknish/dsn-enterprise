import { SITE_URL } from "@/lib/site";

export const metadata = {
	title: "FAQ - Frequently Asked Questions | DSN Enterprises",
	description:
		"Answers on precision gauges, calibration services, API gauges, custom manufacturing, ordering, lead times, and quality certifications.",
	keywords: [
		"gauge FAQ",
		"precision gauges questions",
		"calibration services FAQ",
		"API gauges FAQ",
		"custom gauge manufacturing FAQ",
		"gauge lead time",
		"gauge pricing",
		"NABL calibration",
		"ISO certification",
		"gauge ordering",
		"thread gauges FAQ",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/faq",
	},
	openGraph: {
		title: "FAQ - Frequently Asked Questions | DSN Enterprises",
		description:
			"Find answers to common questions about our precision gauges, calibration services, API gauges, custom manufacturing, and ordering process.",
		url: "/faq",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/featured.png",
				width: 1200,
				height: 630,
				alt: "FAQ - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "FAQ - Frequently Asked Questions | DSN Enterprises",
		description:
			"Find answers to common questions about our precision gauges, calibration services, and ordering process.",
		images: ["/images/featured.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
