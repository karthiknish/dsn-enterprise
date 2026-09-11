import { notFound, permanentRedirect } from "next/navigation";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ThreadSystemReference from "@/components/threads/ThreadSystemReference";
import { classifyThreadSystem } from "@/lib/dynamic-route-guard";
import { getSiteUrl } from "@/lib/site";
import { generateThreadSystemPages } from "@/lib/thread-pages.config";

export async function generateStaticParams() {
	// Tier-gated the same way the city pages are; see
	// src/lib/thread-pages.config.js for the demand evidence behind each tier.
	return generateThreadSystemPages().map((p) => ({ system: p.system }));
}

/**
 * A system that has a real page but sits above the rollout gate still has (or
 * will have) a URL, so it keeps its signal via a 308 to the hub rather than a
 * 404. That call, and the 404 for an unknown system, both live in
 * `classifyThreadSystem` because `src/proxy.js` needs the same verdict before
 * this route runs.
 */
export async function generateMetadata({ params }) {
	const { system } = await params;
	const pageData = classifyThreadSystem(system).page;

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
					alt: `${pageData.systemName} thread dimensions - DSN Enterprises`,
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

export default async function ThreadSystemPage({ params }) {
	const { system } = await params;
	const verdict = classifyThreadSystem(system);

	if (verdict.decision === "redirect") permanentRedirect(verdict.to);
	if (!verdict.page) notFound();

	const pageData = verdict.page;

	// Sibling links and related sizes are resolved inside the component from the
	// same tier gate, so the page body cannot drift from the sitemap.
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Thread Reference", url: "/threads" },
					{ name: pageData.systemName, url: pageData.path },
				]}
			/>
			<ThreadSystemReference page={pageData} />
		</>
	);
}
