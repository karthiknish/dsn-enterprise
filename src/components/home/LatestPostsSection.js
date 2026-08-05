import Link from "next/link";
import PostCardList from "@/components/blog/PostCardList";
import SectionHeader from "@/components/ui/SectionHeader";
import { getRecentPosts } from "@/lib/blog-queries";

/**
 * "Latest from the blog" on the homepage.
 *
 * The homepage linked to zero blog posts, so the only crawl path into the
 * blog was the /blog listing. Linking six recent posts from the site's
 * highest-authority page gives Googlebot a direct route and passes crawl
 * priority to new posts as they publish.
 */
export default async function LatestPostsSection() {
	const posts = await getRecentPosts(6);
	if (posts.length === 0) return null;

	return (
		<section className="py-20 md:py-24 bg-surface-subtle">
			<div className="container mx-auto px-4">
				<SectionHeader
					title="Latest from the blog"
					description="Practical notes on gauge selection, calibration intervals, and shop-floor inspection from our engineering team."
				/>
				<PostCardList posts={posts} headingLevel="h3" />
				<div className="mt-10 text-center">
					<Link
						href="/blog"
						className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors font-medium"
					>
						Read all articles
					</Link>
				</div>
			</div>
		</section>
	);
}
