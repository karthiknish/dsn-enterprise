import { alternatesFor } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

export const metadata = {
	title: "Thread Reference – Metric, NPT, UNC & BSP Charts | DSN",
	description:
		"Thread dimension tables for ISO metric, NPT, Unified and BSP: pitch diameter, minor diameter, tap drill and gauging practice, with worked per-size pages.",
	keywords: [
		"thread reference",
		"thread chart",
		"thread dimensions",
		"thread pitch chart",
		"metric thread chart",
		"npt thread chart",
		"unc thread chart",
		"bsp thread sizes",
		"pitch diameter",
		"minor diameter",
		"tap drill chart",
		"thread gauge",
		"thread gauge manufacturer",
		"Coimbatore",
	],
	authors: [{ name: "DSN Enterprises" }],
	creator: "DSN Enterprises",
	publisher: "DSN Enterprises",
	metadataBase: new URL(SITE_URL),
	alternates: alternatesFor("/threads", { hasHindi: false }),
	openGraph: {
		title: "Thread Reference | Metric, NPT, UNC & BSP - DSN Enterprises",
		description:
			"Pitch diameters, minor diameters and tap drills for the thread systems used on Indian shop floors, with the gauging practice behind each.",
		url: "/threads",
		siteName: "DSN Enterprises",
		type: "website",
		locale: "en_IN",
		images: [
			{
				url: "/images/thread-plug-gauge.png",
				width: 1200,
				height: 630,
				alt: "Thread reference charts - DSN Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Thread Reference | Metric, NPT, UNC & BSP",
		description:
			"Thread dimension tables and gauging practice for metric, NPT, Unified and BSP threads.",
		images: ["/images/thread-plug-gauge.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};
