import { SITE_URL } from "@/lib/site";

export const metadata = {
	// Rendered with the root layout's " | DSN Enterprises" suffix, so this is
	// budgeted at 34 raw / ~52 rendered.
	title: "Limits and Fits: IT Grades & H7/g6",
	description:
		"What IT grades mean, how to read H7/g6 and H7/h6, hole-basis versus shaft-basis, and how a fit is chosen — with no tolerance tables, and why.",
	keywords: [
		"limits and fits",
		"IT grades",
		"IT grade meaning",
		"H7 g6",
		"H7 h6",
		"hole basis",
		"shaft basis",
		"clearance fit",
		"interference fit",
		"transition fit",
		"fundamental deviation",
		"IS 919",
		"ISO 286",
		"tolerance grade",
		"fits and tolerances",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: "/fits",
	},
	openGraph: {
		title: "Limits and Fits: IT Grades, H7/g6 and How a Fit Is Chosen",
		description:
			"What an IT grade is, how the deviation letter positions a tolerance zone, and why hole-basis H7 fits are the shop default.",
		url: "/fits",
		siteName: "DSN Enterprises",
		type: "article",
		locale: "en_IN",
		images: [
			{
				url: "/images/plain-plug-gauge.png",
				width: 1200,
				height: 630,
				alt: "Limits and fits reference - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Limits and Fits: IT Grades & H7/g6",
		description:
			"What IT grades mean, how to read H7/g6, and why a fit is chosen the way it is.",
		images: ["/images/plain-plug-gauge.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
