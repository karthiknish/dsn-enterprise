import Link from "next/link";

export default function AdminDashboardView({ stats, recentPosts, fetchError }) {
	return (
		<div>
			<h1 className="sr-only">Dashboard</h1>
			{fetchError && (
				<div
					className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
					role="alert"
				>
					{fetchError}
				</div>
			)}
			<div className="mb-8">
				<p className="text-gray-500">Welcome to the admin dashboard</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
				<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
					<div className="flex items-center justify-between">
						<div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
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
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								/>
							</svg>
						</div>
					</div>
					<p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 tabular-nums">
						{stats.totalPosts}
					</p>
					<p className="mt-1 text-sm text-gray-500">Total Posts</p>
				</div>

				<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
					<div className="flex items-center justify-between">
						<div className="w-10 h-10 rounded-lg bg-accent-100 text-accent flex items-center justify-center">
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
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
					<p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 tabular-nums">
						{stats.publishedPosts}
					</p>
					<p className="mt-1 text-sm text-gray-500">Published</p>
				</div>

				<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
					<div className="flex items-center justify-between">
						<div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
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
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
						</div>
					</div>
					<p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 tabular-nums">
						{stats.draftPosts}
					</p>
					<p className="mt-1 text-sm text-gray-500">Drafts</p>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 mb-6">
				<h2 className="text-sm font-semibold text-gray-900 mb-4">
					Quick Actions
				</h2>
				<div className="flex flex-wrap gap-3">
					<Link
						href="/admin/blog/new"
						className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						New Blog Post
					</Link>
					<Link
						href="/admin/blog"
						className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200/80 hover:bg-gray-100 transition-colors"
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 10h16M4 14h16M4 18h16"
							/>
						</svg>
						View All Posts
					</Link>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-sm font-semibold text-gray-900">Recent Posts</h2>
					<Link
						href="/admin/blog"
						className="text-primary hover:text-primary-dark text-sm font-medium"
					>
						View all →
					</Link>
				</div>

				{recentPosts.length === 0 ? (
					<div className="text-center py-8 text-gray-500">
						<p>No blog posts yet.</p>
						<Link
							href="/admin/blog/new"
							className="text-primary hover:text-primary-dark"
						>
							Create your first post
						</Link>
					</div>
				) : (
					<div className="space-y-2">
						{recentPosts.map((post) => (
							<div
								key={post.id}
								className="flex items-center justify-between p-4 rounded-xl border border-gray-200/80 hover:bg-gray-50/60 transition-colors"
							>
								<div>
									<h3 className="font-medium text-gray-900">{post.title}</h3>
									<p className="text-sm text-gray-500">
										{post.createdAt?.toDate?.()?.toLocaleDateString() ||
											"No date"}
									</p>
								</div>
								<div className="flex items-center gap-4">
									<span
										className={`px-2 py-1 text-xs font-medium rounded-full ${
											post.status === "published"
												? "bg-accent-100 text-accent-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{post.status}
									</span>
									<Link
										href={`/admin/blog/${post.id}/edit`}
										className="text-primary hover:text-primary-dark text-sm font-medium"
									>
										Edit
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
