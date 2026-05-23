"use client";

import Link from "next/link";

export default function AdminHeader({
	pageTitle,
	sidebarOpen,
	isCollapsed,
	onOpenSidebar,
}) {
	return (
		<header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-gray-200">
			<div className="flex items-center gap-3 min-w-0">
				<button
					type="button"
					className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
					onClick={onOpenSidebar}
					aria-expanded={sidebarOpen}
					aria-controls="admin-sidebar"
					aria-label="Open menu"
				>
					<svg
						aria-hidden="true"
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<p className="text-lg font-semibold text-gray-900 truncate m-0">
					{pageTitle}
				</p>
			</div>

			<div className="flex items-center gap-2 shrink-0">
				<Link
					href="/"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
				>
					<svg
						aria-hidden="true"
						className="w-4 h-4"
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
					<span className="hidden sm:inline">View site</span>
				</Link>
			</div>
		</header>
	);
}
