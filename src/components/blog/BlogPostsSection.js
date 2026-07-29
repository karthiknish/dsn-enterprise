import {
	collection,
	getCountFromServer,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import Link from "next/link";
import BlogPostImage from "@/components/blog/BlogPostImage";
import { db } from "@/lib/firebase";

/**
 * Everything on /blog that depends on Firestore.
 *
 * Split out of page.js so the page can render its static hero and search bar
 * immediately and suspend only on this. Previously the whole route sat behind
 * a loading.js boundary, so a reader watched the hero and the search bar pulse
 * as skeletons while waiting for a query that had nothing to do with them.
 */

function mapPostDoc(docSnap) {
	const data = docSnap.data();
	return {
		id: docSnap.id,
		...data,
		publishedDate: data.publishedDate?.toDate?.()?.toISOString() || null,
		createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
	};
}

async function getPublishedPostsCount() {
	try {
		const postsRef = collection(db, "blogs");
		const q = query(postsRef, where("status", "==", "published"));
		const countSnapshot = await getCountFromServer(q);
		return { count: countSnapshot.data().count, error: false };
	} catch (error) {
		console.error("Error counting posts:", error);
		return { count: 0, error: true };
	}
}

async function getPublishedPostsPage(page, postsPerPage) {
	try {
		const postsRef = collection(db, "blogs");
		const q = query(
			postsRef,
			where("status", "==", "published"),
			orderBy("createdAt", "desc"),
			limit(page * postsPerPage),
		);
		const snapshot = await getDocs(q);
		const posts = snapshot.docs.map(mapPostDoc);
		const start = (page - 1) * postsPerPage;
		return { posts: posts.slice(start, start + postsPerPage), error: false };
	} catch (error) {
		console.error("Error fetching posts:", error);
		return { posts: [], error: true };
	}
}

async function getAllPublishedPosts() {
	try {
		const postsRef = collection(db, "blogs");
		const q = query(
			postsRef,
			where("status", "==", "published"),
			orderBy("createdAt", "desc"),
		);
		const snapshot = await getDocs(q);
		return { posts: snapshot.docs.map(mapPostDoc), error: false };
	} catch (error) {
		console.error("Error fetching posts:", error);
		return { posts: [], error: true };
	}
}

function EmptyState({ icon, heading, children }) {
	return (
		<div className="text-center py-16">
			{icon}
			<h2 className="text-2xl font-semibold text-gray-900 mb-2">{heading}</h2>
			{children}
		</div>
	);
}

const WarningIcon = (
	<svg
		aria-hidden="true"
		className="w-16 h-16 mx-auto text-gray-400 mb-4"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		/>
	</svg>
);

const EmptyIcon = (
	<svg
		aria-hidden="true"
		className="w-16 h-16 mx-auto text-gray-400 mb-4"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
		/>
	</svg>
);

export default async function BlogPostsSection({
	searchQuery = "",
	requestedPage = 1,
	postsPerPage = 9,
}) {
	let posts = [];
	let totalPosts = 0;
	let fetchError = false;
	let currentPage = requestedPage;

	if (searchQuery) {
		const { posts: allPosts, error } = await getAllPublishedPosts();
		fetchError = error;
		const needle = searchQuery.toLowerCase();
		const filtered = allPosts.filter(
			(post) =>
				post.title?.toLowerCase().includes(needle) ||
				post.excerpt?.toLowerCase().includes(needle) ||
				post.content?.toLowerCase().includes(needle),
		);
		totalPosts = filtered.length;
		const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
		currentPage = Math.max(1, Math.min(requestedPage, totalPages));
		const start = (currentPage - 1) * postsPerPage;
		posts = filtered.slice(start, start + postsPerPage);
	} else {
		const { count, error: countError } = await getPublishedPostsCount();
		fetchError = countError;
		totalPosts = count;
		const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
		currentPage = Math.max(1, Math.min(requestedPage, totalPages));
		const { posts: pagePosts, error: pageError } = await getPublishedPostsPage(
			currentPage,
			postsPerPage,
		);
		if (pageError) fetchError = true;
		posts = pagePosts;
	}

	const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

	return (
		<>
			{searchQuery && (
				<div className="mb-8 max-w-7xl mx-auto">
					<h2 className="text-2xl font-semibold text-gray-900">
						{totalPosts > 0
							? `Search results for "${searchQuery}" (${totalPosts})`
							: `No results found for "${searchQuery}"`}
					</h2>
					{totalPosts === 0 && (
						// A Link, not a button with onClick: this is a server component,
						// and an event handler here threw "Event handlers cannot be
						// passed to Client Component props" on every empty search.
						<Link
							href="/blog"
							className="mt-4 text-accent hover:text-accent-700 font-medium inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Clear search and show all posts
						</Link>
					)}
				</div>
			)}

			{fetchError && !searchQuery ? (
				<div role="alert">
					<EmptyState icon={WarningIcon} heading="Couldn't load blog posts">
						<p className="text-gray-600 mb-6 max-w-md mx-auto">
							We&apos;re having trouble connecting to our blog. Please try again
							in a moment.
						</p>
						<a
							href="/blog"
							className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
						>
							Try again
						</a>
					</EmptyState>
				</div>
			) : posts.length === 0 && !searchQuery ? (
				<EmptyState icon={EmptyIcon} heading="No posts yet">
					<p className="text-gray-600">
						Check back soon for new articles and updates.
					</p>
				</EmptyState>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{posts.map((post) => {
							const displayDate = post.publishedDate || post.createdAt;
							return (
								<article
									key={post.id}
									className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
								>
									<Link href={`/blog/${post.slug}`}>
										{post.featuredImage ? (
											<BlogPostImage
												src={post.featuredImage}
												alt={post.title}
												width={600}
												height={192}
												className="w-full h-48"
												imageClassName="w-full h-48 object-cover"
											/>
										) : (
											<div className="w-full h-48 bg-gray-50 border-b border-gray-100 flex flex-col items-center justify-center text-gray-400">
												<svg
													aria-hidden="true"
													className="w-10 h-10 mb-1"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1.5}
														d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
													/>
												</svg>
												<span className="text-xs">No featured image</span>
											</div>
										)}
									</Link>
									<div className="p-6 flex flex-col flex-1">
										<div className="text-sm text-gray-500 mb-2">
											{displayDate
												? new Date(displayDate).toLocaleDateString("en-US", {
														year: "numeric",
														month: "long",
														day: "numeric",
													})
												: "No date"}
										</div>
										<Link href={`/blog/${post.slug}`}>
											<h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-accent transition-colors">
												{post.title}
											</h2>
										</Link>
										{post.excerpt && (
											<p className="text-gray-600 mb-4 line-clamp-3">
												{post.excerpt}
											</p>
										)}
										<div className="mt-auto">
											<Link
												href={`/blog/${post.slug}`}
												className="inline-flex items-center text-accent hover:text-accent-700 font-medium"
											>
												Read more
												<svg
													aria-hidden="true"
													className="w-4 h-4 ml-1"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</Link>
										</div>
									</div>
								</article>
							);
						})}
					</div>

					{totalPages > 1 && (
						<div className="mt-12 flex justify-center gap-2">
							{currentPage > 1 && (
								<Link
									href={`/blog?page=${currentPage - 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
									className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-accent transition-all font-medium"
								>
									Previous
								</Link>
							)}

							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(pageNum) => (
									<Link
										key={pageNum}
										href={`/blog?page=${pageNum}${searchQuery ? `&q=${searchQuery}` : ""}`}
										className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
											currentPage === pageNum
												? "bg-accent text-white"
												: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-accent"
										}`}
									>
										{pageNum}
									</Link>
								),
							)}

							{currentPage < totalPages && (
								<Link
									href={`/blog?page=${currentPage + 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
									className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-accent transition-all font-medium"
								>
									Next
								</Link>
							)}
						</div>
					)}
				</>
			)}
		</>
	);
}
