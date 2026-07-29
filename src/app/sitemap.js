import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { HI_TRANSLATED_PATHS } from "@/content/hi/pages";
import { db } from "@/lib/firebase";
import { HINDI_ENABLED, HREFLANG } from "@/lib/i18n/config";
import {
	generateProductCityPages,
	generateServiceCityPages,
} from "@/lib/seo-pages.config";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600; // Revalidate every hour

// Last-modified timestamp for static pages, update when content changes.
const NOW = new Date();

async function getBlogPosts() {
	try {
		const blogRef = collection(db, "blogs");
		const q = query(
			blogRef,
			where("status", "==", "published"),
			orderBy("createdAt", "desc"),
		);
		const snapshot = await getDocs(q);
		return snapshot.docs.map((doc) => ({
			slug: doc.data().slug,
			updatedAt:
				doc.data().updatedAt?.toDate?.() ||
				doc.data().createdAt?.toDate?.() ||
				new Date(),
		}));
	} catch (_error) {
		// Return empty array if Firebase is not accessible
		console.log("Sitemap: Unable to fetch blog posts, continuing without them");
		return [];
	}
}

export default async function sitemap() {
	// Static pages
	const staticPages = [
		{
			url: SITE_URL,
			lastModified: NOW,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${SITE_URL}/about`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/products`,
			lastModified: NOW,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/products/plain-gauges`,
			lastModified: NOW,
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${SITE_URL}/products/thread-gauges`,
			lastModified: NOW,
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${SITE_URL}/products/api-gauges`,
			lastModified: NOW,
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${SITE_URL}/products/special-gauges`,
			lastModified: NOW,
			changeFrequency: "weekly",
			priority: 0.85,
		},
		{
			url: `${SITE_URL}/services`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/industries`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/quality`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/calibration`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/resources`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/faq`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${SITE_URL}/contact`,
			lastModified: NOW,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: NOW,
			changeFrequency: "daily",
			priority: 0.7,
		},
	];

	// Dynamic blog posts
	const blogPosts = await getBlogPosts();
	const blogPages = blogPosts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: post.updatedAt,
		changeFrequency: "weekly",
		priority: 0.6,
	}));

	// Product-City SEO pages.
	// Priority now comes from city tier and product rank instead of a flat 0.5,
	// so the crawler is pointed at the pages most likely to rank rather than
	// treating every location URL as equally important.
	const productCityPages = generateProductCityPages().map((page) => ({
		url: `${SITE_URL}/products/${page.product}-${page.city}`,
		lastModified: NOW,
		changeFrequency: "monthly",
		priority: page.priority ?? 0.5,
	}));

	// Service-City SEO pages
	const serviceCityPages = generateServiceCityPages().map((page) => ({
		url: `${SITE_URL}/services/${page.service}-${page.city}`,
		lastModified: NOW,
		changeFrequency: "monthly",
		priority: page.priority ?? 0.5,
	}));

	// Hindi layer. Only included once NEXT_PUBLIC_HINDI_ENABLED=true, because
	// while gated the pages are noindex and listing them would send Google to
	// URLs it is told not to index.
	//
	// Each entry declares its alternates both ways; hreflang requires reciprocal
	// links or Google discards the cluster. The English side of the pair is
	// annotated too, which is why this runs after staticPages is built.
	const hindiPages = HINDI_ENABLED
		? HI_TRANSLATED_PATHS.map((p) => {
				const hiPath = p === "/" ? "/hi" : `/hi${p}`;
				return {
					url: `${SITE_URL}${hiPath}`,
					lastModified: NOW,
					changeFrequency: "monthly",
					// Deliberately below the English equivalents: the English pages
					// are the proven ones and should keep crawl priority.
					priority: 0.5,
					alternates: {
						languages: {
							[HREFLANG.en]: `${SITE_URL}${p === "/" ? "" : p}`,
							[HREFLANG.hi]: `${SITE_URL}${hiPath}`,
						},
					},
				};
			})
		: [];

	// Annotate the English pages that have a Hindi counterpart so the hreflang
	// pairing is reciprocal inside the sitemap itself.
	const withAlternates = (entry) => {
		if (!HINDI_ENABLED) return entry;
		const path = entry.url.replace(SITE_URL, "") || "/";
		if (!HI_TRANSLATED_PATHS.includes(path)) return entry;
		const hiPath = path === "/" ? "/hi" : `/hi${path}`;
		return {
			...entry,
			alternates: {
				languages: {
					[HREFLANG.en]: entry.url,
					[HREFLANG.hi]: `${SITE_URL}${hiPath}`,
				},
			},
		};
	};

	return [
		...staticPages.map(withAlternates),
		...blogPages,
		...productCityPages,
		...serviceCityPages,
		...hindiPages,
	];
}
