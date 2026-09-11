import { notFound, permanentRedirect } from "next/navigation";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ThreadSizeReference from "@/components/threads/ThreadSizeReference";
import { classifyThreadSize } from "@/lib/dynamic-route-guard";
import { getSiteUrl } from "@/lib/site";
import { generateMetricSizePages } from "@/lib/thread-pages.config";

/**
 * Only the metric system has per-size pages: it is the series where per-size
 * demand was actually measured ("m12 thread pitch" and its siblings returned
 * 390-590 searches/month each in India). UNC, UNF, NPT and BSP sizes are
 * tabulated in full on their system page instead, which is enough for series
 * whose per-size volume was not measurable.
 */
export async function generateStaticParams() {
	return generateMetricSizePages().map((p) => ({
		system: "metric",
		size: p.slug,
	}));
}

export async function generateMetadata({ params }) {
	const { system, size } = await params;
	const pageData = classifyThreadSize(system, size).page;

	if (!pageData) {
		return {
			title: "Page Not Found",
			robots: { index: false, follow: false },
		};
	}

	return {
		title: pageData.title,
		description: pageData.description,
		keywords: pageData.keywords.join(", "),
		alternates: { canonical: pageData.path },
		openGraph: {
			title: pageData.title,
			description: pageData.description,
			url: getSiteUrl(pageData.path),
			siteName: "DSN Enterprises",
			type: "article",
			locale: "en_IN",
			images: [
				{
					url: "/images/thread-plug-gauge.png",
					width: 1200,
					height: 630,
					alt: `M${pageData.size} thread gauge - DSN Enterprises`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: pageData.title,
			description: pageData.description,
			images: ["/images/thread-plug-gauge.png"],
		},
		robots: { index: true, follow: true },
	};
}

export default async function ThreadSizePage({ params }) {
	const { system, size } = await params;
	const verdict = classifyThreadSize(system, size);

	// Anything not under the metric system belongs on the system page, which
	// carries the full table; a real ISO 261 size above the rollout gate belongs
	// on the full chart; and the pitch-qualified and upper-case forms a reader
	// might type (m6x1, M6) collapse onto the one canonical URL.
	if (verdict.decision === "redirect") permanentRedirect(verdict.to);
	if (!verdict.page) notFound();

	const pageData = verdict.page;

	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Thread Reference", url: "/threads" },
					{ name: "Metric", url: "/threads/metric" },
					{ name: `M${pageData.size}`, url: pageData.path },
				]}
			/>
			<ThreadSizeReference page={pageData} />
		</>
	);
}
