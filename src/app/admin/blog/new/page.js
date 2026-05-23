"use client";

import NewBlogPostView from "@/components/admin/blog/NewBlogPostView";
import { useNewBlogPost } from "@/hooks/useNewBlogPost";

export default function NewBlogPage() {
	const blog = useNewBlogPost();

	return (
		<NewBlogPostView
			{...blog}
			onSubmit={blog.handleSubmit}
			onCancel={() => blog.back()}
		/>
	);
}
