import Link from "next/link";
import BlogPostImage from "@/components/blog/BlogPostImage";

/**
 * A compact grid of post links, shared by the homepage "Latest articles"
 * block and the related-posts block on each post.
 *
 * Deliberately plain anchors with the post title as the link text: these
 * exist to give Googlebot a crawl path and an anchor-text signal to posts
 * that were previously reachable only through robots-blocked pagination.
 */
export default function PostCardList({ posts, headingLevel = "h3" }) {
	if (!posts || posts.length === 0) return null;
	const Heading = headingLevel;

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{posts.map((post) => {
				const displayDate = post.publishedDate || post.createdAt;
				return (
					<article
						key={post.id}
						className="bg-white rounded-xl border border-gray-200/80 overflow-hidden hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
					>
						<Link href={`/blog/${post.slug}`} className="block">
							{post.featuredImage ? (
								<BlogPostImage
									src={post.featuredImage}
									alt={post.title}
									width={600}
									height={160}
									className="w-full h-40"
									imageClassName="w-full h-40 object-cover"
								/>
							) : (
								<div className="w-full h-40 bg-gray-50 border-b border-gray-100" />
							)}
						</Link>
						<div className="p-5 flex flex-col flex-1">
							{displayDate && (
								<time
									dateTime={displayDate}
									className="text-xs text-gray-500 mb-2"
								>
									{new Date(displayDate).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
							)}
							<Heading className="text-lg font-semibold text-gray-900 leading-snug mb-2">
								<Link
									href={`/blog/${post.slug}`}
									className="hover:text-accent transition-colors"
								>
									{post.title}
								</Link>
							</Heading>
							{post.excerpt && (
								<p className="text-sm text-gray-600 line-clamp-3">
									{post.excerpt}
								</p>
							)}
						</div>
					</article>
				);
			})}
		</div>
	);
}
