"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { useCallback, useEffect, useReducer, useRef } from "react";

import BlogDeleteDialog from "@/components/admin/blog/BlogDeleteDialog";
import BlogListToolbar from "@/components/admin/blog/BlogListToolbar";
import BlogNotificationToast from "@/components/admin/blog/BlogNotificationToast";
import BlogPostsEmptyState from "@/components/admin/blog/BlogPostsEmptyState";
import BlogPostsPagination from "@/components/admin/blog/BlogPostsPagination";
import BlogPostsTable from "@/components/admin/blog/BlogPostsTable";
import { fetchBlogPosts } from "@/lib/admin-firestore";
import {
	BLOG_LIST_ITEMS_PER_PAGE,
	blogListReducer,
	initialBlogListState,
} from "@/lib/blog-list-reducer";
import { db } from "@/lib/firebase";
import { describeFirestoreError } from "@/lib/firebase-errors";

export default function BlogListPage() {
	const [state, dispatch] = useReducer(blogListReducer, {
		...initialBlogListState,
		posts: [],
		loading: true,
	});
	const deleteDialogRef = useRef(null);

	const loadPosts = useCallback(() => {
		dispatch({ type: "LOAD_START" });
		fetchBlogPosts({
			page: state.currentPage,
			limit: BLOG_LIST_ITEMS_PER_PAGE,
			searchTerm: state.searchTerm,
		})
			.then((result) => {
				dispatch({
					type: "LOAD_SUCCESS",
					posts: result.posts,
					total: result.total,
					totalPages: result.totalPages,
				});
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				dispatch({
					type: "LOAD_ERROR",
					error: describeFirestoreError(
						error,
						error instanceof Error
							? error.message
							: "Failed to load blog posts",
					),
				});
			});
	}, [state.currentPage, state.searchTerm]);

	useEffect(() => {
		loadPosts();
	}, [loadPosts]);

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
			loadPosts();
		} catch (error) {
			console.error("Error deleting post:", error);
			dispatch({ type: "DELETE_ERROR" });
			showNotification(
				describeFirestoreError(error, "Failed to delete post"),
				"error",
			);
		}
	};

	if (state.loading) {
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

	const startIndex = (state.currentPage - 1) * BLOG_LIST_ITEMS_PER_PAGE;
	const endIndex = Math.min(startIndex + BLOG_LIST_ITEMS_PER_PAGE, state.total);

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

			{state.posts.length > 0 && (
				<div className="text-sm text-gray-500">
					Showing {startIndex + 1} to {endIndex} of {state.total} entries
				</div>
			)}

			{state.posts.length === 0 ? (
				<BlogPostsEmptyState />
			) : (
				<BlogPostsTable
					posts={state.posts}
					searchTerm={state.searchTerm}
					deleting={state.deleting}
					onDelete={handleDelete}
				/>
			)}

			<BlogPostsPagination
				currentPage={state.currentPage}
				totalPages={state.totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
