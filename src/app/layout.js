import { Geist, Geist_Mono } from "next/font/google";
import { Oswald } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

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
  metadataBase: new URL('https://www.dsnenterprises.in'),
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

import GoogleAnalytics from "@/components/Analytics";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <Analytics />
        {/* End Meta Pixel Code */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DSN Enterprises",
              "url": "https://www.dsnenterprises.in",
              "logo": "https://www.dsnenterprises.in/images/logo.png",
              "description": "Leading manufacturer and supplier of high-precision gauges and measuring instruments.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9363122005",
                "contactType": "customer service"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "DSN Enterprises",
              "url": "https://www.dsnenterprises.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.dsnenterprises.in/blog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
