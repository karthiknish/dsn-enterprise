import Link from "next/link";
import { Suspense } from "react";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import BlogPostsSkeleton from "@/components/blog/BlogPostsSkeleton";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ searchParams }) {
	const params = await searchParams;
	const searchQuery = params?.q || "";
	const pageNumber = parseInt(params?.page, 10) || 1;
	// Search results are a user-generated view of content that already exists
	// at clean URLs, so they stay out of the index. Paginated views do NOT:
	// pages 2+ are the only link path to older posts, so they must be indexable
	// and self-canonical. Pointing them at /blog told Google they were
	// duplicates of page 1 and threw away the link equity to every post only
	// reachable from them.
	const isSearch = Boolean(searchQuery);

	// The root title template already appends "| DSN Enterprises"; including
	// the brand here as well produced "Blog - DSN Enterprises | DSN Enterprises".
	// Pages 2+ get their own title so self-canonicalised pagination does not
	// ship five identical <title>s.
	const title = searchQuery
		? `Search results for "${searchQuery}"`
		: pageNumber > 1
			? `Gauge & Metrology Articles - Page ${pageNumber}`
			: "Gauge & Metrology Articles";

	const description =
		"Practical articles on gauge selection, calibration intervals, Indian and ISO standards, and shop-floor inspection from the DSN engineering team.";

	return {
		title,
		description,
		alternates: {
			canonical: pageNumber > 1 ? `/blog?page=${pageNumber}` : "/blog",
		},
		openGraph: {
			title,
			description,
			url:
				pageNumber > 1
					? `${SITE_URL}/blog?page=${pageNumber}`
					: `${SITE_URL}/blog`,
			type: "website",
		},
		robots: isSearch
			? { index: false, follow: true }
			: { index: true, follow: true },
	};
}

/**
 * The page shell renders immediately — hero, search bar, layout — because none
 * of it depends on Firestore. Only BlogPostsSection suspends, so the reader
 * sees the static chrome instantly and a skeleton only where posts will land.
 *
 * Previously this file was an async component that awaited Firestore before
 * returning any JSX, and loading.js wrapped the whole segment. The result:
 * 107 animate-pulse elements appeared at offset 11k in the byte stream while
 * the real hero didn't arrive until offset 41k.
 */
export default async function BlogPage({ searchParams }) {
	const params = await searchParams;
	const requestedPage = parseInt(params?.page, 10) || 1;
	const searchQuery = params?.q || "";

	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero
				eyebrow="Blog"
				title="Our Blog"
				description={pageHeroes.blog}
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/blog", label: "Blog" },
				]}
			/>

			{/* Search bar — static, renders immediately */}
			<section className="bg-white border-b border-gray-200 py-4 sticky top-16 z-10 shadow-sm">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto">
						<search>
							<form action="/blog" method="GET" className="relative group">
								<label
									id="blog-search-label"
									htmlFor="blog-search"
									className="sr-only"
								>
									Search blog posts
								</label>
								<input
									id="blog-search"
									aria-labelledby="blog-search-label"
									type="search"
									name="q"
									defaultValue={searchQuery}
									placeholder="Search articles by title, content or topic..."
									autoComplete="off"
									className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none focus-visible:outline-none"
								/>
								<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors">
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
								{searchQuery && (
									<Link
										href="/blog"
										aria-label="Clear search"
										className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
									>
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</Link>
								)}
							</form>
						</search>
					</div>
				</div>
			</section>

			{/* Posts — only this suspends */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<Suspense fallback={<BlogPostsSkeleton />}>
						<BlogPostsSection
							searchQuery={searchQuery}
							requestedPage={requestedPage}
						/>
					</Suspense>
				</div>
			</section>
		</div>
	);
}
