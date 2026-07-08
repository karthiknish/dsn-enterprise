import { notFound } from "next/navigation";
import ServiceCityLanding from "@/components/seo/ServiceCityLanding";
import { parseLocationSlug } from "@/lib/parse-location-slug";
import { CITIES, getServiceCityPage, SERVICES } from "@/lib/seo-pages.config";
import { getSiteUrl } from "@/lib/site";

export async function generateStaticParams() {
	const routes = [];
	for (const service of SERVICES) {
		for (const city of CITIES) {
			routes.push({ slug: `${service.slug}-${city.slug}` });
		}
	}
	return routes;
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
