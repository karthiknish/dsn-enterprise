import Link from "next/link";

export default function BlogPostsEmptyState() {
	return (
		<div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
			<div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
				<svg
					aria-hidden="true"
					className="w-8 h-8 text-accent"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
					/>
				</svg>
			</div>
			<h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
			<p className="text-gray-500 mb-6">
				Get started by creating your first blog post.
			</p>
			<Link
				href="/admin/blog/new"
				className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors shadow-sm"
			>
				Create First Post
			</Link>
		</div>
	);
}
