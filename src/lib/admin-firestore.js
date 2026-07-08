import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
} from "firebase/firestore";
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
