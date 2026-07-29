import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import GoogleAnalytics from "@/components/Analytics";
import MotionProvider from "@/components/MotionProvider";
import {
	buildOrganizationSchema,
	buildWebSiteSchema,
	jsonLdProps,
} from "@/lib/seo-schema";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import AgentationWrapper from "@/components/AgentationWrapper";
import SiteChrome from "../components/layout/SiteChrome";

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

export const viewport = {
	themeColor: "#1a3c5e",
	width: "device-width",
	initialScale: 1,
};

export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "DSN Enterprises - Precision Gauges & Measuring Instruments",
		template: "%s | DSN Enterprises",
	},
	description:
		"Leading manufacturer of high-precision gauges and measuring instruments for industrial applications in India.",
	icons: {
		icon: "/favicon.ico",
		apple: "/images/logo.png",
	},
	manifest: "/manifest.webmanifest",
	openGraph: {
		title: "DSN Enterprises - Precision Gauges & Measuring Instruments",
		description:
			"Leading manufacturer of high-precision gauges including plain gauges, thread gauges, API gauges for oil & gas industry.",
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
		description:
			"Leading manufacturer of high-precision gauges and measuring instruments.",
		images: ["/images/featured.png"],
	},
	alternates: {
		canonical: "/",
	},
};

// Canonical entity nodes, defined once in src/lib/seo-schema.js so product,
// service, and article schemas across the site can reference them by @id.
const organizationSchema = buildOrganizationSchema();
const websiteSchema = buildWebSiteSchema();

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				{/* dangerouslySetInnerHTML via jsonLdProps: React escapes text
				    children, which would put &amp; inside the JSON payload. */}
				<script {...jsonLdProps(organizationSchema)} />
				<script {...jsonLdProps(websiteSchema)} />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
			>
				<MotionProvider>
					<SiteChrome>{children}</SiteChrome>
				</MotionProvider>
				<GoogleAnalytics />
				<Analytics />
				{process.env.NODE_ENV === "development" && <AgentationWrapper />}
			</body>
		</html>
	);
}
