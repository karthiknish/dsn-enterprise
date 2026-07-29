/**
 * Fallback for the post grid only.
 *
 * Deliberately does not include the page hero or the search bar. Those are
 * static and are rendered by the page itself outside the Suspense boundary,
 * so they appear immediately instead of pulsing while Firestore responds.
 */
export default function BlogPostsSkeleton({ count = 9 }) {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
			aria-hidden="true"
		>
			{Array.from({ length: count }, (_, i) => `post-skeleton-${i + 1}`).map(
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
	);
}
