import { SITE_URL } from "@/lib/site";

export const metadata = {
	title: "Contact Us - DSN Enterprises | Precision Gauge Manufacturers",
	description:
		"Get in touch with DSN Enterprises for precision gauges, calibration services, and custom solutions. Call us at +91 9363122005. Located in Coimbatore, Tamil Nadu, India.",
	keywords: [
		"contact DSN Enterprises",
		"gauge manufacturers contact",
		"precision gauges inquiry",
		"gauge calibration services",
		"custom gauges quote",
		"Coimbatore gauge suppliers",
		"Tamil Nadu precision tools",
		"DSN Enterprises phone",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/contact",
	},
	openGraph: {
		title: "Contact Us - DSN Enterprises | Precision Gauge Manufacturers",
		description:
			"Get in touch with DSN Enterprises for precision gauges, calibration services, and custom solutions. Call us at +91 9363122005.",
		url: "/contact",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/featured.png",
				width: 1200,
				height: 630,
				alt: "Contact DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact Us - DSN Enterprises",
		description:
			"Get in touch with DSN Enterprises for precision gauges, calibration services, and custom solutions.",
		images: ["/images/featured.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
