export default function BlogPostLoading() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero skeleton */}
			<section className="bg-primary text-white py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="h-5 bg-white/20 rounded w-32 mb-6 animate-pulse" />
						<div className="h-10 md:h-12 lg:h-14 bg-white/20 rounded w-full max-w-3xl mb-4 animate-pulse" />
						<div className="h-5 bg-white/20 rounded w-40 animate-pulse" />
					</div>
				</div>
			</section>

			{/* Featured image skeleton */}
			<div className="container mx-auto px-4 -mt-8">
				<div className="max-w-4xl mx-auto">
					<div className="w-full h-96 bg-gray-200 rounded-xl animate-pulse" />
				</div>
			</div>

			{/* Content skeleton */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-8">
						<article className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-4">
							<div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
							<div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
							<div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
							<div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
							<div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
							<div className="h-8 bg-gray-200 rounded w-2/3 mt-8 animate-pulse" />
							<div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
							<div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
						</article>

						{/* Share section skeleton */}
						<div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
							<div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
							<div className="flex gap-4">
								<div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
								<div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
								<div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
							</div>
						</div>

						{/* Back button skeleton */}
						<div className="text-center">
							<div className="h-12 w-40 bg-gray-200 rounded-lg mx-auto animate-pulse" />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
