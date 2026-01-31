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
  metadataBase: new URL('https://dsnenterprises.in'),
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) - Google Tag Manager & Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-TQKJ52Q3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Tag configuration
            gtag('config', 'GT-TQKJ52Q3', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            
            // Google Ads configuration with enhanced conversions
            gtag('config', 'AW-17769294111', {
              allow_enhanced_conversions: true,
              page_path: window.location.pathname
            });
            
            // Set default consent (adjust based on your cookie consent implementation)
            gtag('consent', 'default', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          `}
        </Script>
        <Analytics />
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1391622058130598');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1391622058130598&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DSN Enterprises",
              "url": "https://dsnenterprises.in",
              "logo": "https://dsnenterprises.in/images/logo.png",
              "description": "Leading manufacturer and supplier of high-precision gauges and measuring instruments.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9842211222",
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
              "url": "https://dsnenterprises.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://dsnenterprises.in/blog?q={search_term_string}",
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
