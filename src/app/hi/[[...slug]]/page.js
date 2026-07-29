import Link from "next/link";
import { notFound } from "next/navigation";
import { getHindiPage, HI_TRANSLATED_PATHS } from "@/content/hi/pages";
import { HINDI_ENABLED, HREFLANG } from "@/lib/i18n/config";
import { buildBreadcrumbJsonLd } from "@/lib/seo-schema";
import { getSiteUrl } from "@/lib/site";

/**
 * Hindi layer, served from /hi/**.
 *
 * This is a single catch-all rather than a mirrored route tree on purpose:
 * the English routes are the indexed ones and must not move. Adding a
 * [locale] segment would have rewritten every existing URL.
 *
 * Known tradeoff: Next.js only allows <html> in the root layout, so these
 * pages inherit lang="en" from src/app/layout.js. The content wrapper below
 * carries lang="hi" for assistive tech, and hreflang + og:locale carry the
 * targeting signal. Google determines page language from visible content and
 * documents that it ignores lang attributes, so this is safe — but if the
 * Hindi layer is ever widened to the whole site, move to app/[locale]/ with
 * two root layouts and do it properly.
 */

export const dynamicParams = false;

export async function generateStaticParams() {
	return HI_TRANSLATED_PATHS.map((p) => ({
		slug: p === "/" ? [] : p.replace(/^\//, "").split("/"),
	}));
}

function pathFromSlug(slug) {
	return !slug || slug.length === 0 ? "/" : `/${slug.join("/")}`;
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const enPath = pathFromSlug(slug);
	const page = getHindiPage(enPath);

	if (!page) {
		return { title: "पृष्ठ नहीं मिला", robots: { index: false, follow: false } };
	}

	const hiPath = enPath === "/" ? "/hi" : `/hi${enPath}`;

	return {
		// Absolute: the root template appends "| DSN Enterprises", which would
		// read oddly after Devanagari and push past the title budget.
		title: { absolute: `${page.title} | DSN Enterprises` },
		description: page.description,
		// While gated off these pages are noindex, and hreflang must never point
		// at a noindex URL — Google drops the whole language cluster when it does.
		// So the alternates only appear once the layer is actually published.
		alternates: HINDI_ENABLED
			? {
					canonical: hiPath,
					languages: {
						[HREFLANG.en]: enPath,
						[HREFLANG.hi]: hiPath,
						"x-default": enPath,
					},
				}
			: { canonical: hiPath },
		openGraph: {
			title: page.title,
			description: page.description,
			url: getSiteUrl(hiPath),
			type: "website",
			siteName: "DSN Enterprises",
			locale: "hi_IN",
			alternateLocale: ["en_IN"],
		},
		// While the layer is gated off, build it but keep it out of the index.
		robots: HINDI_ENABLED
			? { index: true, follow: true, googleBot: { index: true, follow: true } }
			: { index: false, follow: false },
	};
}

export default async function HindiPage({ params }) {
	const { slug } = await params;
	const enPath = pathFromSlug(slug);
	const page = getHindiPage(enPath);

	if (!page) notFound();

	const hiPath = enPath === "/" ? "/hi" : `/hi${enPath}`;
	const crumbs = [{ name: "होम", url: "/hi" }];
	if (enPath !== "/") crumbs.push({ name: page.h1, url: hiPath });

	return (
		// lang="hi" here because the root layout owns <html lang="en">.
		<div className="min-h-screen bg-gray-50" lang="hi">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(buildBreadcrumbJsonLd(crumbs)),
				}}
			/>

			<section className="relative bg-primary text-white py-16 md:py-20">
				<div className="container mx-auto px-4 max-w-4xl text-center">
					<nav aria-label="Breadcrumb" className="text-sm mb-6 text-white/70">
						<Link href="/hi" className="hover:text-white">
							होम
						</Link>
						{enPath !== "/" && (
							<>
								<span className="mx-2">/</span>
								<span className="text-white/90">{page.h1}</span>
							</>
						)}
					</nav>
					<h1 className="text-4xl md:text-5xl font-semibold mb-5 leading-tight">
						{page.h1}
					</h1>
					<p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
						{page.intro}
					</p>
					<p className="mt-6 text-sm text-white/70">
						<Link href={page.enPath} className="underline hover:text-white">
							Read this page in English
						</Link>
					</p>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-8">
						{page.sections.map((s) => (
							<div
								key={s.heading}
								className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
							>
								{s.heading && (
									<h2 className="text-2xl font-semibold text-primary mb-4">
										{s.heading}
									</h2>
								)}
								{s.body?.map((para) => (
									<p
										key={para.slice(0, 40)}
										className="text-gray-700 mb-4 leading-relaxed last:mb-0"
									>
										{para}
									</p>
								))}
								{s.list && (
									<ul className="space-y-3 mt-4">
										{s.list.map((item) => (
											<li key={item} className="flex items-start text-gray-700">
												<span
													className="text-accent mr-3 mt-1 shrink-0"
													aria-hidden
												>
													▪
												</span>
												<span>{item}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						))}

						{page.cta && (
							<div className="bg-secondary-light rounded-xl p-8 text-center border border-primary/10">
								<h2 className="text-2xl font-semibold text-primary mb-3">
									{page.cta.heading}
								</h2>
								<p className="text-gray-700 mb-6 max-w-xl mx-auto">
									{page.cta.body}
								</p>
								<Link
									href={page.cta.href || "/contact"}
									className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark font-medium"
								>
									{page.cta.label || "संपर्क करें"}
								</Link>
							</div>
						)}

						<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
							<h2 className="text-xl font-semibold text-primary mb-4">
								हिन्दी में अन्य पृष्ठ
							</h2>
							<div className="grid sm:grid-cols-2 gap-3 text-sm">
								{HI_TRANSLATED_PATHS.filter((p) => p !== enPath).map((p) => (
									<Link
										key={p}
										href={p === "/" ? "/hi" : `/hi${p}`}
										className="text-accent hover:text-accent-700 hover:underline"
									>
										{getHindiPage(p).h1}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
