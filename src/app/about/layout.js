export const metadata = {
	// Brand is appended by the root title template.
	// No founding year is claimed here — nothing in the site content supports
	// a specific date, so do not add one without confirming it with the client.
	title: "Gauge Manufacturing in Coimbatore",
	description:
		"How the Coimbatore works makes plain, thread, and API gauges: plant, process, ISO 9001, NABL calibration, and API 5B / 7-2 licences.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		title: "Gauge Manufacturing in Coimbatore",
		description:
			"Plant, process, and people at the Coimbatore works — ISO 9001 manufacture with NABL calibration and API 5B / 7-2 licences.",
		type: "website",
		url: "/about",
		images: ["/images/featured.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Gauge Manufacturing in Coimbatore",
		description:
			"The Coimbatore plant behind the gauges: manufacture, heat treatment, and NABL-traceable calibration.",
		images: ["/images/featured.png"],
	},
};

export default function AboutLayout({ children }) {
	return children;
}
