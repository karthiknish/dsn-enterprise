import { notFound, permanentRedirect } from "next/navigation";
import ServiceCityLanding from "@/components/seo/ServiceCityLanding";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { SERVICE_PROFILES } from "@/lib/seo-location-data";
import {
	generateServiceCityPages,
	getServiceCityPage,
	SERVICES,
} from "@/lib/seo-pages.config";
import { getSiteUrl } from "@/lib/site";

export async function generateStaticParams() {
	// Relevance-gated and tier-limited; see src/lib/seo-pages.config.js.
	return generateServiceCityPages().map((p) => ({
		slug: `${p.service}-${p.city}`,
	}));
}

/** Retired service x city URLs keep their signal via a 308 to the hub. */
function redirectTargetFor(serviceSlug) {
	if (!serviceSlug) return null;
	if (!SERVICES.some((s) => s.slug === serviceSlug)) return null;
	return SERVICE_PROFILES[serviceSlug]?.hubPath || "/services";
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const { citySlug, entitySlug: serviceSlug } = parseLocationSlug(slug);

	if (!citySlug || !serviceSlug) {
		return {
			title: "Page Not Found",
			robots: { index: false, follow: false },
		};
	}

	const pageData = getServiceCityPage(serviceSlug, citySlug);
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
	const { citySlug, entitySlug: serviceSlug } = parseLocationSlug(slug);
	const pageData = getServiceCityPage(serviceSlug, citySlug);

	if (!pageData) {
		const target = redirectTargetFor(serviceSlug);
		if (target) permanentRedirect(target);
		notFound();
	}

	return (
		<ServiceCityLanding
			pageData={pageData}
			serviceSlug={serviceSlug}
			citySlug={citySlug}
			slug={slug}
		/>
	);
}
