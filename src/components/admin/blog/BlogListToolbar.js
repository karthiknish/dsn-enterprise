"use client";

import Link from "next/link";

export default function BlogListToolbar({
	searchTerm,
	onSearchChange,
}) {
	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="sr-only">Blog posts</h1>
					<p className="text-gray-600">Manage your blog posts</p>
				</div>
				<div className="flex gap-3">
					<Link
						href="/blog"
						target="_blank"
						className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
						View Live
					</Link>
					<Link
						href="/admin/blog/new"
						className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors shadow-sm"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5 mr-2"
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
						New Post
					</Link>
				</div>
			</div>

			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg
						aria-hidden="true"
						className="h-5 w-5 text-gray-400"
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
				<input
					type="search"
					placeholder="Search posts..."
					aria-label="Search posts by title"
					className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition duration-150 ease-in-out"
					value={searchTerm}
					onChange={onSearchChange}
				/>
			</div>
		</>
	);
}
