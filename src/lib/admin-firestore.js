import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
} from "firebase/firestore";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";

export async function fetchBlogPosts() {
	const postsRef = collection(db, "blogs");
	const q = query(postsRef, orderBy("createdAt", "desc"));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data(),
	}));
}

const FETCH_TIMEOUT_MS = 12000;

function withTimeout(promise, ms, message) {
	let timer;
	const timeout = new Promise((_, reject) => {
		timer = setTimeout(() => reject(new Error(message)), ms);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function loadEditBlogPost(postId) {
	return withTimeout(
		fetchBlogPostById(postId),
		FETCH_TIMEOUT_MS,
		"Timed out loading this post. Check your connection and try again.",
	)
		.then((data) => {
			if (!data) notFound();
			return data;
		})
		.catch((error) => {
			// notFound() throws internally to trigger the not-found page; let
			// that pass through instead of being treated as a fetch failure.
			// Its digest is "NEXT_HTTP_ERROR_FALLBACK;404", not "NEXT_NOT_FOUND".
			if (String(error?.digest || "").startsWith("NEXT_HTTP_ERROR_FALLBACK")) {
				throw error;
			}
			console.error("Error loading post for edit:", error);
			throw new Error(
				error?.code === "permission-denied"
					? "You don't have permission to view this post."
					: error?.message?.startsWith("Timed out")
						? error.message
						: "Could not load this post. Check your connection and try again.",
			);
		});
}

export async function fetchBlogPostById(id) {
	const docRef = doc(db, "blogs", id);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return null;
	}
	const data = docSnap.data();
	return {
		title: data.title || "",
		slug: data.slug || "",
		excerpt: data.excerpt || "",
		content: data.content || "",
		featuredImage: data.featuredImage || "",
		imageAttribution: data.imageAttribution || null,
		status: data.status || "draft",
		metaTitle: data.metaTitle || "",
		metaDescription: data.metaDescription || "",
		publishedDate: data.publishedDate
			? data.publishedDate.toDate().toISOString().split("T")[0]
			: data.createdAt?.toDate?.()?.toISOString().split("T")[0] || "",
	};
}

export async function fetchContacts() {
	const contactsRef = collection(db, "contacts");
	const q = query(contactsRef, orderBy("createdAt", "desc"));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data(),
	}));
}

export async function fetchAdminDashboardStats() {
	const postsRef = collection(db, "blogs");
	const postsSnapshot = await getDocs(postsRef);

	let published = 0;
	let draft = 0;

	postsSnapshot.docs.forEach((docSnap) => {
		const data = docSnap.data();
		if (data.status === "published") {
			published++;
		} else {
			draft++;
		}
	});

	const recentQuery = query(
		postsRef,
		orderBy("createdAt", "desc"),
		limit(5),
	);
	const recentSnapshot = await getDocs(recentQuery);
	const recentPosts = recentSnapshot.docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data(),
	}));

	return {
		stats: {
			totalPosts: postsSnapshot.size,
			publishedPosts: published,
			draftPosts: draft,
		},
		recentPosts,
	};
}
