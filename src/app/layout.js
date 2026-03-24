import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/Analytics";
import MotionProvider from "@/components/MotionProvider";
import { SITE_URL, getSiteUrl } from "@/lib/site";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DSN Enterprises - Precision Gauges & Measuring Instruments",
    template: "%s | DSN Enterprises",
  },
  description:
    "DSN Enterprises is a leading manufacturer and supplier of high-precision gauges and measuring instruments for industrial applications.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DSN Enterprises - Precision Gauges & Measuring Instruments",
    description: "Leading manufacturer of high-precision gauges including plain gauges, thread gauges, API gauges for oil & gas industry.",
    url: "/",
    siteName: "DSN Enterprises",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/featured.png",
        width: 960,
        height: 640,
        alt: "DSN Enterprises - Precision Gauges",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DSN Enterprises - Precision Gauges",
    description: "Leading manufacturer of high-precision gauges and measuring instruments.",
    images: ["/images/featured.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DSN Enterprises",
  url: SITE_URL,
  logo: getSiteUrl("/images/logo.png"),
  description:
    "Leading manufacturer and supplier of high-precision gauges and measuring instruments.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9363122005",
    contactType: "customer service",
  },
});

const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DSN Enterprises",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: getSiteUrl("/blog?q={search_term_string}"),
    "query-input": "required name=search_term_string",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <Analytics />
        {/* End Meta Pixel Code */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJsonLd }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <MotionProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
