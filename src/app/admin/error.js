"use client";

import { useEffect } from "react";

export default function AdminError({ error, reset }) {
	useEffect(() => {
		console.error("Admin panel error:", error);
	}, [error]);

	return (
		<div className="flex min-h-[40vh] w-full flex-col items-center justify-center text-center px-4">
			<div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
				<svg
					aria-hidden="true"
					className="w-6 h-6 text-red-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<h2 className="text-lg font-semibold text-gray-900 mb-1">
				Something went wrong
			</h2>
			<p className="text-sm text-gray-500 max-w-sm mb-6">
				{error?.message ||
					"An unexpected error occurred while loading this page."}
			</p>
			<button
				type="button"
				onClick={reset}
				className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
			>
				Try again
			</button>
		</div>
	);
}
