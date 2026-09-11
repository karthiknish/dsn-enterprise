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

/**
 * Every published slug, for the build-time route set.
 *
 * `/blog/[slug]` builds with `dynamicParams = false`, so this list *is* the set
 * of blog URLs that exist: anything missing from it is refused by the router
 * with a real 404 instead of rendering a 200 "Post Not Found" page. That makes
 * an empty list catastrophic rather than harmless, so this returns `ok` to let
 * callers tell "the read failed" (network, IAM, quota) apart from "there are no
 * published posts yet". `getRecentPosts` above can swallow the difference; this
 * cannot.
 *
 * The sitemap reads the same function, so the two cannot advertise different
 * URL sets.
 */
export async function getPublishedPosts() {
	try {
		const snapshot = await getDocs(
			query(
				collection(db, "blogs"),
				where("status", "==", "published"),
				orderBy("createdAt", "desc"),
			),
		);

		const posts = snapshot.docs
			.map((doc) => ({
				slug: doc.data().slug,
				updatedAt:
					doc.data().updatedAt?.toDate?.() ||
					doc.data().createdAt?.toDate?.() ||
					new Date(),
			}))
			.filter((post) => typeof post.slug === "string" && post.slug.length > 0);

		// A duplicate slug would collapse two routes into one at build time.
		const seen = new Set();
		const unique = posts.filter((post) => {
			if (seen.has(post.slug)) return false;
			seen.add(post.slug);
			return true;
		});

		if (unique.length !== posts.length) {
			console.warn(
				`Blog slugs: ${posts.length - unique.length} duplicate slug(s) among published posts; keeping the newest of each.`,
			);
		}

		return { ok: true, posts: unique };
	} catch (error) {
		console.error("Blog slugs: unable to read published posts", error);
		return { ok: false, posts: [] };
	}
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
