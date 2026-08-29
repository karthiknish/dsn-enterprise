"use client";

import { useEffect } from "react";

/**
 * Segment error boundary.
 *
 * `retry` (Next.js 16.3) re-fetches the failed Server Components, unlike `reset`
 * which only remounts client state. Fall back to `reset` if an older runtime
 * is still serving this bundle.
 */
export default function AppError({ error, reset, retry }) {
	useEffect(() => {
		console.error("Application error:", error);
	}, [error]);

	const recover = typeof retry === "function" ? retry : reset;

	return (
		<div className="min-h-[calc(100dvh-4rem)] bg-white text-gray-900">
			<div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
				<p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
					Error
				</p>
				<h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 text-balance">
					Something went wrong
				</h1>
				<p className="text-lg text-gray-800 max-w-md mb-10 leading-relaxed">
					{error?.message ||
						"The page failed to load. You can retry without leaving this URL."}
				</p>
				<button
					type="button"
					onClick={() => recover()}
					className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
				>
					Try again
				</button>
			</div>
		</div>
	);
}
