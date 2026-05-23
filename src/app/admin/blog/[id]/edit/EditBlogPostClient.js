"use client";

import { Suspense, use } from "react";
import EditBlogPostView from "@/components/admin/blog/EditBlogPostView";
import { loadEditBlogPost } from "@/lib/admin-firestore";

function EditBlogPostLoader({ postId }) {
	const initialPostData = use(loadEditBlogPost(postId));
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
