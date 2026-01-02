export const metadata = {
  title: "Services - Calibration & Custom Gauge Manufacturing",
  description:
    "Explore DSN Enterprises services: gauge calibration, custom gauge manufacturing, certification and testing for precision gauging applications.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services - DSN Enterprises",
    description:
      "Gauge calibration, custom gauge manufacturing, certification and testing services for precision gauging applications.",
    type: "website",
    url: "/services",
    images: ["/images/featured.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - DSN Enterprises",
    description:
      "Gauge calibration, custom gauge manufacturing, certification and testing services for precision gauging applications.",
    images: ["/images/featured.png"],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
