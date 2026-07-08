"use client";

import { Suspense, use, useMemo } from "react";
import EditBlogPostView from "@/components/admin/blog/EditBlogPostView";
import { loadEditBlogPost } from "@/lib/admin-firestore";

function EditBlogPostLoader({ postId }) {
	// Memoized so use() always sees the same promise across re-renders
	// (e.g. when AdminLayout re-renders on auth state changes). Without
	// this, every re-render created a brand new pending promise, which
	// made the component re-suspend indefinitely instead of ever settling.
	const postDataPromise = useMemo(() => loadEditBlogPost(postId), [postId]);
	const initialPostData = use(postDataPromise);
	return (
		<EditBlogPostView postId={postId} initialPostData={initialPostData} />
	);
}

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

export default function EditBlogPostClient({ postId }) {
	return (
		<Suspense fallback={<EditBlogLoading />}>
			<EditBlogPostLoader postId={postId} />
		</Suspense>
	);
}
