import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
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

	// Product-City SEO pages
	const productCityPages = generateProductCityPages().map((page) => ({
		url: `${SITE_URL}/products/${page.product}-${page.city}`,
		lastModified: NOW,
		changeFrequency: "monthly",
		priority: 0.5,
	}));

	// Service-City SEO pages
	const serviceCityPages = generateServiceCityPages().map((page) => ({
		url: `${SITE_URL}/services/${page.service}-${page.city}`,
		lastModified: NOW,
		changeFrequency: "monthly",
		priority: 0.5,
	}));

	return [
		...staticPages,
		...blogPages,
		...productCityPages,
		...serviceCityPages,
	];
}
