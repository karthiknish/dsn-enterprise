"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { Suspense, use, useEffect, useReducer, useRef } from "react";
import BlogDeleteDialog from "@/components/admin/blog/BlogDeleteDialog";
import BlogListToolbar from "@/components/admin/blog/BlogListToolbar";
import BlogNotificationToast from "@/components/admin/blog/BlogNotificationToast";
import BlogPostsEmptyState from "@/components/admin/blog/BlogPostsEmptyState";
import BlogPostsPagination from "@/components/admin/blog/BlogPostsPagination";
import BlogPostsTable from "@/components/admin/blog/BlogPostsTable";
import {
	BLOG_LIST_ITEMS_PER_PAGE,
	blogListReducer,
	initialBlogListState,
} from "@/lib/blog-list-reducer";
import { fetchBlogPosts } from "@/lib/admin-firestore";
import { db } from "@/lib/firebase";
import { describeFirestoreError } from "@/lib/firebase-errors";

const postsResource = fetchBlogPosts()
	.then((posts) => ({ ok: true, posts }))
	.catch((error) => {
		console.error("Error fetching posts:", error);
		return {
			ok: false,
			error:
				error instanceof Error ? error.message : "Failed to load blog posts",
		};
	});

function BlogListPageContent() {
	const result = use(postsResource);
	const [state, dispatch] = useReducer(blogListReducer, {
		...initialBlogListState,
		posts: result.ok ? result.posts : [],
		loading: false,
		fetchError: result.ok ? null : result.error,
	});
	const deleteDialogRef = useRef(null);

	const showNotification = (message, type = "info") => {
		dispatch({ type: "SET_NOTIFICATION", notification: { message, type } });
		setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000);
	};

	useEffect(() => {
		if (!state.showDeleteDialog) return;
		const onKey = (e) => {
			if (e.key === "Escape") dispatch({ type: "HIDE_DELETE_DIALOG" });
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [state.showDeleteDialog]);

	useEffect(() => {
		const dialog = deleteDialogRef.current;
		if (!dialog) return;
		if (state.showDeleteDialog) {
			if (!dialog.open) dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	}, [state.showDeleteDialog]);

	const handleDelete = (id, title) => {
		dispatch({ type: "SHOW_DELETE_DIALOG", target: { id, title } });
	};

	const confirmDelete = async () => {
		if (!state.showDeleteDialog) return;

		const { id, title } = state.showDeleteDialog;
		dispatch({ type: "DELETE_START", id });

		try {
			await deleteDoc(doc(db, "blogs", id));
			dispatch({ type: "DELETE_SUCCESS", id });
			showNotification(`"${title}" deleted successfully`, "success");
		} catch (error) {
			console.error("Error deleting post:", error);
			dispatch({ type: "DELETE_ERROR" });
			showNotification(describeFirestoreError(error, "Failed to delete post"), "error");
		}
	};

	const filteredPosts = state.posts.filter((post) =>
		post.title.toLowerCase().includes(state.searchTerm.toLowerCase()),
	);

	const totalPages = Math.ceil(filteredPosts.length / BLOG_LIST_ITEMS_PER_PAGE);
	const startIndex = (state.currentPage - 1) * BLOG_LIST_ITEMS_PER_PAGE;
	const paginatedPosts = filteredPosts.slice(
		startIndex,
		startIndex + BLOG_LIST_ITEMS_PER_PAGE,
	);

	const handleSearchChange = (e) => {
		dispatch({ type: "SET_SEARCH", searchTerm: e.target.value });
	};

	const handlePageChange = (page) => {
		dispatch({ type: "SET_PAGE", page });
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="space-y-6">
			<BlogNotificationToast
				notification={state.notification}
				onDismiss={() => dispatch({ type: "CLEAR_NOTIFICATION" })}
			/>

			<BlogDeleteDialog
				dialogRef={deleteDialogRef}
				target={state.showDeleteDialog}
				onClose={() => dispatch({ type: "HIDE_DELETE_DIALOG" })}
				onConfirm={confirmDelete}
			/>

			{state.fetchError && (
				<div
					className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
					role="alert"
				>
					{state.fetchError}
				</div>
			)}

			<BlogListToolbar
				searchTerm={state.searchTerm}
				onSearchChange={handleSearchChange}
			/>

			{filteredPosts.length > 0 && (
				<div className="text-sm text-gray-500">
					Showing {startIndex + 1} to{" "}
					{Math.min(startIndex + BLOG_LIST_ITEMS_PER_PAGE, filteredPosts.length)}{" "}
					of {filteredPosts.length} entries
				</div>
			)}

			{state.posts.length === 0 ? (
				<BlogPostsEmptyState />
			) : (
				<BlogPostsTable
					posts={paginatedPosts}
					searchTerm={state.searchTerm}
					deleting={state.deleting}
					onDelete={handleDelete}
				/>
			)}

			<BlogPostsPagination
				currentPage={state.currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

function BlogListLoading() {
	return (
		<output
			className="flex items-center justify-center min-h-[40vh]"
			aria-live="polite"
		>
			<span className="sr-only">Loading blog posts</span>
			<div
				className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"
				aria-hidden
			/>
		</output>
	);
}

export default function BlogListPage() {
	return (
		<Suspense fallback={<BlogListLoading />}>
			<BlogListPageContent />
		</Suspense>
	);
}
