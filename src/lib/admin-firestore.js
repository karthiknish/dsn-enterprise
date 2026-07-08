import {
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

function mapBlogDoc(docSnap) {
	return {
		id: docSnap.id,
		...docSnap.data(),
	};
}

export async function fetchBlogPosts(options = {}) {
	const page = Math.max(1, Number(options.page) || 1);
	const perPage = Math.max(1, Number(options.limit) || 10);
	const searchTerm = (options.searchTerm || "").trim();

	const postsRef = collection(db, "blogs");
	const baseQuery = query(postsRef, orderBy("createdAt", "desc"));

	if (searchTerm) {
		const snapshot = await withTimeout(
			getDocs(baseQuery),
			FETCH_TIMEOUT_MS,
			"Timed out loading blog posts. Check your connection and try again.",
		);
		const allPosts = snapshot.docs.map(mapBlogDoc);
		const filtered = allPosts.filter((post) =>
			post.title?.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		const start = (page - 1) * perPage;
		const paginated = filtered.slice(start, start + perPage);
		const total = filtered.length;
		const totalPages = Math.max(1, Math.ceil(total / perPage));
		return { posts: paginated, total, totalPages };
	}

	const countSnapshot = await withTimeout(
		getCountFromServer(postsRef),
		FETCH_TIMEOUT_MS,
		"Timed out loading blog posts count. Check your connection and try again.",
	);
	const total = countSnapshot.data().count;
	const totalPages = Math.max(1, Math.ceil(total / perPage));

	const pageLimit = Math.max(perPage, page * perPage);
	const snapshot = await withTimeout(
		getDocs(query(postsRef, orderBy("createdAt", "desc"), limit(pageLimit))),
		FETCH_TIMEOUT_MS,
		"Timed out loading blog posts. Check your connection and try again.",
	);
	const allPosts = snapshot.docs.map(mapBlogDoc);
	const start = (page - 1) * perPage;
	const paginated = allPosts.slice(start, start + perPage);
	return { posts: paginated, total, totalPages };
}

export const FETCH_TIMEOUT_MS = 12000;

export function withTimeout(promise, ms, message) {
	let timer;
	const timeout = new Promise((_, reject) => {
		timer = setTimeout(() => reject(new Error(message)), ms);
	});
	return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
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
	const snapshot = await withTimeout(
		getDocs(q),
		FETCH_TIMEOUT_MS,
		"Timed out loading contacts. Check your connection and try again.",
	);
	return snapshot.docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data(),
	}));
}

export async function fetchAdminDashboardStats() {
	const postsRef = collection(db, "blogs");
	const postsSnapshot = await withTimeout(
		getDocs(postsRef),
		FETCH_TIMEOUT_MS,
		"Timed out loading dashboard stats. Check your connection and try again.",
	);

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

	const recentQuery = query(postsRef, orderBy("createdAt", "desc"), limit(5));
	const recentSnapshot = await withTimeout(
		getDocs(recentQuery),
		FETCH_TIMEOUT_MS,
		"Timed out loading recent posts. Check your connection and try again.",
	);
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
