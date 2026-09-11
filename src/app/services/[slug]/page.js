import { notFound, permanentRedirect } from "next/navigation";
import ServiceCityLanding from "@/components/seo/ServiceCityLanding";
import { classifyServiceCitySlug } from "@/lib/dynamic-route-guard";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { generateServiceCityPages } from "@/lib/seo-pages.config";
import { getSiteUrl } from "@/lib/site";

export async function generateStaticParams() {
	// Relevance-gated and tier-limited; see src/lib/seo-pages.config.js.
	return generateServiceCityPages().map((p) => ({
		slug: `${p.service}-${p.city}`,
	}));
}

// Render, 308, or 404 is decided in `classifyServiceCitySlug` so that
// `src/proxy.js` can reach the same verdict before this route runs. See that
// module for why the proxy has to own the 404.

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const pageData = classifyServiceCitySlug(slug).page;

	if (!pageData) {
		return {
			title: "Page Not Found",
			robots: { index: false, follow: false },
		};
	}

	const canonical = `/services/${slug}`;

	return {
		title: pageData.title,
		description: pageData.description,
		keywords: pageData.keywords.join(", "),
		alternates: { canonical },
		openGraph: {
			title: pageData.title,
			description: pageData.description,
			url: getSiteUrl(canonical),
			type: "website",
			siteName: "DSN Enterprises",
			locale: "en_IN",
			images: [
				{
					url: "/images/featured.png",
					width: 1200,
					height: 630,
					alt: `${pageData.serviceName} in ${pageData.cityName}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: pageData.title,
			description: pageData.description,
			images: ["/images/featured.png"],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true },
		},
	};
}

export default async function ServiceCityPage({ params }) {
	const { slug } = await params;
	const verdict = classifyServiceCitySlug(slug);

	// Retired service x city URLs keep their signal via a 308 to the hub.
	if (verdict.decision === "redirect") permanentRedirect(verdict.to);
	if (!verdict.page) notFound();

	const { citySlug, entitySlug: serviceSlug } = parseLocationSlug(slug);

	return (
		<ServiceCityLanding
			pageData={verdict.page}
			serviceSlug={serviceSlug}
			citySlug={citySlug}
			slug={slug}
		/>
	);
}
