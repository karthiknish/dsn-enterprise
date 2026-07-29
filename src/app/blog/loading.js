/**
 * Loading shell for the /blog segment.
 *
 * This must NOT render a real <h1>. Next.js streams this fallback into the
 * initial HTML for every route under /blog, including /blog/[slug], so a
 * PageHero here put a second "Our Blog" <h1> ahead of the article's own <h1>
 * in the served markup of all 28 posts. Crawlers read the first <h1>, so every
 * article looked like it was titled "Our Blog".
 *
 * Keep this a purely presentational skeleton with no headings.
 */
export default function BlogLoading() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero skeleton — mirrors PageHero's dimensions, without the heading */}
			<section className="bg-primary text-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center space-y-5">
						<div className="h-4 bg-white/20 rounded w-40 mx-auto animate-pulse" />
						<div className="h-12 bg-white/20 rounded w-2/3 mx-auto animate-pulse" />
						<div className="h-5 bg-white/20 rounded w-full max-w-2xl mx-auto animate-pulse" />
					</div>
				</div>
			</section>

			{/* Search bar skeleton */}
			<section className="bg-white border-b border-gray-200 py-4">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto">
						<div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
					</div>
				</div>
			</section>

			{/* Blog posts skeleton */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{Array.from({ length: 9 }, (_, i) => `skeleton-${i + 1}`).map(
							(id) => (
								<div
									key={id}
									className="bg-white rounded-xl shadow-sm overflow-hidden"
								>
									<div className="h-48 bg-gray-200 animate-pulse" />
									<div className="p-6 space-y-3">
										<div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
										<div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
										<div className="h-16 bg-gray-200 rounded w-full animate-pulse" />
										<div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
									</div>
								</div>
							),
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
