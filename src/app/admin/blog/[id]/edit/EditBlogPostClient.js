"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import EditBlogPostView from "@/components/admin/blog/EditBlogPostView";
import {
	FETCH_TIMEOUT_MS,
	fetchBlogPostById,
	withTimeout,
} from "@/lib/admin-firestore";

function EditBlogLoading() {
	return (
		<output
			className="flex items-center justify-center min-h-[40vh] w-full"
			aria-live="polite"
		>
			<span className="sr-only">Loading post</span>
			<div
				className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"
				aria-hidden
			/>
		</output>
	);
}

function EditBlogError({ message, onRetry }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[40vh] w-full text-center px-4">
			<p className="text-gray-600 mb-4">{message}</p>
			<button
				type="button"
				onClick={onRetry}
				className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
			>
				Try again
			</button>
		</div>
	);
}

export default function EditBlogPostClient({ postId }) {
	const [state, setState] = useState({ status: "loading" });
	const [attempt, setAttempt] = useState(0);

	// Plain effect-based fetch instead of use()/Suspense: the previous
	// Suspense-based version (an async Server Component page.js passing
	// params into a client use() boundary) got stuck in an infinite
	// re-fetch loop under Next.js dev (Turbopack kept re-invoking the
	// route), even with a memoized promise. This pattern is immune to it.
	useEffect(() => {
		let cancelled = false;
		setState({ status: "loading" });

		withTimeout(
			fetchBlogPostById(postId),
			FETCH_TIMEOUT_MS,
			"Timed out loading this post. Check your connection and try again.",
		)
			.then((data) => {
				if (cancelled) return;
				if (!data) {
					setState({ status: "notfound" });
					return;
				}
				setState({ status: "ready", data });
			})
			.catch((error) => {
				if (cancelled) return;
				console.error("Error loading post for edit:", error);
				setState({
					status: "error",
					message:
						error?.code === "permission-denied"
							? "You don't have permission to view this post."
							: error?.message?.startsWith("Timed out")
								? error.message
								: "Could not load this post. Check your connection and try again.",
				});
			});

		return () => {
			cancelled = true;
		};
	}, [postId, attempt]);

	if (state.status === "loading") return <EditBlogLoading />;
	if (state.status === "notfound") notFound();
	if (state.status === "error") {
		return (
			<EditBlogError
				message={state.message}
				onRetry={() => setAttempt((a) => a + 1)}
			/>
		);
	}

	return (
		<EditBlogPostView postId={postId} initialPostData={state.data} />
	);
}
