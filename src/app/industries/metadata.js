import { SITE_URL } from "@/lib/site";

export const metadata = {
	// Brand comes from the root title template; repeating it here produced
	// "... - DSN Enterprises | DSN Enterprises" at 90 characters.
	// 2026-09-07: abbreviations ("Auto, Aero") answered no ranking query;
	// /industries had 100 impr @ 7.7 with 0 clicks. Title now uses full
	// demand terms; desc leads with them instead of city names (0.2% demand).
	// Raw title is 39 chars: this route gets the root " | DSN Enterprises"
	// suffix (layout-only metadata), so it must stay under 41 raw.
	title: "Automotive, Aerospace, Oil & Gas Gauges",
	description:
		"Precision gauges for automotive, aerospace, oil & gas, defence and general engineering: plain, thread, API and custom gauges with NABL calibration.",
	keywords: [
		"oil and gas gauges",
		"automotive gauges",
		"aerospace gauges",
		"defense gauges",
		"general engineering gauges",
		"heavy machinery gauges",
		"marine gauges",
		"railway gauges",
		"electronics gauges",
		"industrial gauges",
		"OCTG gauges",
		"industry specific gauges",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/industries",
	},
	openGraph: {
		title: "Automotive, Aerospace, Oil & Gas Gauges - DSN Enterprises",
		description:
			"Precision gauges for automotive, aerospace, oil & gas, defence and general engineering: plain, thread, API and custom gauges with NABL calibration.",
		url: "/industries",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/featured.png",
				width: 1200,
				height: 630,
				alt: "Industries We Serve - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Automotive, Aerospace, Oil & Gas Gauges",
		description:
			"Precision gauges for automotive, aerospace, oil & gas, defence and general engineering, with NABL calibration.",
		images: ["/images/featured.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
