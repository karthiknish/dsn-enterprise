import { SITE_URL } from "@/lib/site";

// Web manifest for PWA installability and SEO signals.
export default function manifest() {
	return {
		name: "DSN Enterprises - Precision Gauges & Measuring Instruments",
		short_name: "DSN Enterprises",
		description:
			"Leading manufacturer of high-precision gauges including plain gauges, thread gauges, API gauges, and custom gauges with NABL calibration services.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#1a3c5e",
		lang: "en-IN",
		scope: "/",
		categories: ["business", "industrial", "manufacturing"],
		icons: [
			{
				src: "/images/logo.png",
				sizes: "150x150",
				type: "image/png",
				purpose: "any",
			},
		],
		site_url: SITE_URL,
	};
}
