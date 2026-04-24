import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import AboutSection from "../components/home/AboutSection";
import ConsultancySection from "../components/home/ConsultancySection";
import ServicesSection from "../components/home/ServicesSection";
import CertificationsSection from "../components/home/CertificationsSection";
import ContactSection from "../components/home/ContactSection";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "DSN Enterprises - Precision Gauge Manufacturers in Coimbatore, India",
  description: "Leading manufacturer of precision gauges including plain plug gauges, ring gauges, thread gauges, and custom gauges. ISO certified quality with NABL calibration services. Serving industries across Tamil Nadu and India.",
  keywords: ["precision gauges", "plain plug gauges", "ring gauges", "thread gauges", "gauge calibration", "NABL calibration", "gauge manufacturers", "Coimbatore", "Tamil Nadu", "India", "API gauges", "custom gauges", "measuring instruments", "quality control gauges", "gauge engineering consultancy", "dimensional metrology advisory"],
  authors: [{ name: "DSN Enterprises" }],
  creator: "DSN Enterprises",
  publisher: "DSN Enterprises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DSN Enterprises - Precision Gauge Manufacturers in Coimbatore, India",
    description: "Leading manufacturer of precision gauges including plain plug gauges, ring gauges, thread gauges, and custom gauges. ISO certified quality with NABL calibration services.",
    url: SITE_URL,
    siteName: "DSN Enterprises",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/featured.png",
        width: 1200,
        height: 630,
        alt: "DSN Enterprises - Precision Gauges",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSN Enterprises - Precision Gauge Manufacturers",
    description: "Leading manufacturer of precision gauges including plain plug gauges, ring gauges, thread gauges, and custom gauges.",
    images: ["/images/featured.png"],
    creator: "@dsnenterprises",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ConsultancySection />
      <ServicesSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
}
