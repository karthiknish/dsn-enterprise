export const metadata = {
	// Brand is appended by the root title template.
	// No founding year is claimed here — nothing in the site content supports
	// a specific date, so do not add one without confirming it with the client.
	title: "About Us – Precision Gauge Makers",
	description:
		"Learn about DSN Enterprises, a manufacturer of precision gauges and measuring instruments, committed to quality, innovation, and customer satisfaction.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		title: "About DSN Enterprises",
		description:
			"Learn about DSN Enterprises, a manufacturer of precision gauges and measuring instruments, committed to quality, innovation, and customer satisfaction.",
		type: "website",
		url: "/about",
		images: ["/images/featured.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "About DSN Enterprises",
		description:
			"Learn about DSN Enterprises, a manufacturer of precision gauges and measuring instruments, committed to quality, innovation, and customer satisfaction.",
		images: ["/images/featured.png"],
	},
};

export default function AboutLayout({ children }) {
	return children;
}
