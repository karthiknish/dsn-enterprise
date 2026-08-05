import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { cache } from "react";
import { db } from "@/lib/firebase";

/**
 * Shared read paths for published blog posts.
 *
 * These exist so crawl-path surfaces outside /blog — the homepage "Latest
 * articles" block and the related-posts block at the end of each post — can
 * link to posts without each one re-implementing the Firestore query. Google
 * only had one route to any post (the /blog listing) and pagination was
 * robots-blocked, so ~36 posts were discoverable via sitemap but never
 * crawled. More internal links from already-crawled pages is the fix.
 */

function mapPostDoc(docSnap) {
	const data = docSnap.data();
	return {
		id: docSnap.id,
		slug: data.slug,
		title: data.title,
		excerpt: data.excerpt || "",
		featuredImage: data.featuredImage || null,
		publishedDate: data.publishedDate?.toDate?.()?.toISOString() || null,
		createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
	};
}

/** Newest published posts, newest first. Empty array on failure — never throws. */
export const getRecentPosts = cache(async (count = 6) => {
	try {
		const snapshot = await getDocs(
			query(
				collection(db, "blogs"),
				where("status", "==", "published"),
				orderBy("createdAt", "desc"),
				limit(count),
			),
		);
		return snapshot.docs.map(mapPostDoc).filter((post) => post.slug);
	} catch (error) {
		console.error("Error fetching recent posts:", error);
		return [];
	}
});

// Words that appear in nearly every gauge/metrology post carry no topical
// signal, so overlap on them would make every post "related" to every other.
const STOPWORDS = new Set([
	"a",
	"an",
	"and",
	"are",
	"as",
	"at",
	"be",
	"best",
	"but",
	"by",
	"can",
	"dsn",
	"enterprises",
	"for",
	"from",
	"guide",
	"how",
	"in",
	"is",
	"it",
	"of",
	"on",
	"or",
	"the",
	"to",
	"what",
	"when",
	"why",
	"with",
	"you",
	"your",
]);

function topicTokens(post) {
	return new Set(
		`${post.title || ""} ${post.excerpt || ""}`
			.toLowerCase()
			.split(/[^a-z0-9]+/)
			.filter((word) => word.length > 2 && !STOPWORDS.has(word)),
	);
}

/**
 * Posts topically closest to `slug`, falling back to the newest posts when
 * nothing overlaps. There are no tags or categories on the post model, so
 * relatedness is scored on title/excerpt token overlap — crude, but enough
 * to build a topic cluster instead of a random "more posts" strip.
 */
export const getRelatedPosts = cache(async (slug, count = 3) => {
	// Pull a wider window than we return so scoring has something to choose
	// from; the whole corpus is well under 100 posts.
	const recent = await getRecentPosts(60);
	const current = recent.find((post) => post.slug === slug);
	const candidates = recent.filter((post) => post.slug !== slug);
	if (candidates.length === 0) return [];

	const seed = current
		? topicTokens(current)
		: new Set(
				slug
					.split("-")
					.filter((word) => word.length > 2 && !STOPWORDS.has(word)),
			);

	return candidates
		.map((post) => {
			const tokens = topicTokens(post);
			let score = 0;
			for (const token of seed) if (tokens.has(token)) score += 1;
			return { post, score };
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, count)
		.map((entry) => entry.post);
});
