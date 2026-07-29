import { alternatesFor } from "@/lib/i18n/config";
export const metadata = {
	title: "Products – Precision Gauges",
	description:
		"Browse DSN Enterprises product range: plain gauges, thread gauges, API gauges, and special/custom gauges for industrial inspection.",
	// hreflang is emitted only when the Hindi layer is live and this
	// route actually has a translation. See src/lib/i18n/config.js.
	alternates: alternatesFor("/products", { hasHindi: true }),
	openGraph: {
		title: "Products - DSN Enterprises",
		description:
			"Browse plain gauges, thread gauges, API gauges, and special/custom gauges for industrial inspection.",
		type: "website",
		url: "/products",
		images: ["/images/featured.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Products - DSN Enterprises",
		description:
			"Browse plain gauges, thread gauges, API gauges, and special/custom gauges for industrial inspection.",
		images: ["/images/featured.png"],
	},
};

export default function ProductsLayout({ children }) {
	return children;
}
