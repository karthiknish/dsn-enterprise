export const metadata = {
  title: "Products - Precision Gauges & Measuring Instruments",
  description:
    "Browse DSN Enterprises product range: plain gauges, thread gauges, API gauges, and special/custom gauges for industrial inspection.",
  alternates: {
    canonical: "/products",
  },
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
