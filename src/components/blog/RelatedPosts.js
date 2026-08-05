import PostCardList from "@/components/blog/PostCardList";
import { getRelatedPosts } from "@/lib/blog-queries";

/**
 * Topic-cluster links at the end of a post.
 *
 * Posts previously carried almost no outbound internal links, so Google had
 * no signal of relative importance between them and no crawl path from one
 * post to the next. Three related links per post turns a flat list into a
 * connected graph.
 */
export default async function RelatedPosts({ slug }) {
	const posts = await getRelatedPosts(slug, 3);
	if (posts.length === 0) return null;

	return (
		<section aria-labelledby="related-posts-heading" className="mt-12">
			<h2
				id="related-posts-heading"
				className="text-2xl font-semibold text-gray-900 mb-6"
			>
				Related articles
			</h2>
			<PostCardList posts={posts} />
		</section>
	);
}
