import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

export default function BlogLoading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<PageHero
				title="Our Blog"
				description={pageHeroes.blog}
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/blog", label: "Blog" },
				]}
			/>

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
