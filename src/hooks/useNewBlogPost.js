"use client";

import {
	addDoc,
	collection,
	serverTimestamp,
	Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { loadNewBlogDraftRestore } from "@/lib/blog-draft";
import { applyNewPostSeoFields } from "@/lib/blog-seo";
import { generateBlogSlug } from "@/lib/blog-form-utils";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { db, storage } from "@/lib/firebase";

const STORAGE_KEY = "blog-draft-new";

const EMPTY_FORM = {
	title: "",
	slug: "",
	excerpt: "",
	content: "",
	featuredImage: "",
	imageAttribution: null,
	status: "draft",
	metaTitle: "",
	metaDescription: "",
	publishedDate: "",
};

export function useNewBlogPost() {
	const { push, back } = useRouter();
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [showPexelsPicker, setShowPexelsPicker] = useState(false);
	const [imageTab, setImageTab] = useState("upload");
	const [generatingTitle, setGeneratingTitle] = useState(false);
	const [generatingContent, setGeneratingContent] = useState(false);
	const [titleSuggestions, setTitleSuggestions] = useState([]);
	const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
	const [notification, setNotification] = useState(null);
	const [{ showRestoreDialog: initialShowRestore, savedDraft: initialSavedDraft }] =
		useState(() => loadNewBlogDraftRestore());
	const [showRestoreDialog, setShowRestoreDialog] = useState(initialShowRestore);
	const [savedDraft, setSavedDraft] = useState(initialSavedDraft);
	const [formData, setFormData] = useState(EMPTY_FORM);

	const showNotification = useCallback((message, type = "info") => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000);
	}, []);

	const dismissNotification = useCallback(() => setNotification(null), []);

	const saveToLocalStorage = useCallback(() => {
		if (formData.title || formData.content || formData.excerpt) {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ ...formData, savedAt: Date.now() }),
			);
		}
	}, [formData]);

	useEffect(() => {
		const timeoutId = setTimeout(saveToLocalStorage, 1000);
		return () => clearTimeout(timeoutId);
	}, [saveToLocalStorage]);

	const restoreDraft = () => {
		if (savedDraft) {
			setFormData(savedDraft);
			setShowRestoreDialog(false);
			setSavedDraft(null);
		}
	};

	const discardDraft = () => {
		localStorage.removeItem(STORAGE_KEY);
		setShowRestoreDialog(false);
		setSavedDraft(null);
	};

	const handleTitleChange = (e) => {
		const title = e.target.value;
		setFormData((prev) =>
			applyNewPostSeoFields(
				{ ...prev, title, slug: generateBlogSlug(title) },
				{ title, excerpt: prev.excerpt, content: prev.content },
			),
		);
	};

	const handleContentChange = (content) => {
		setFormData((prev) =>
			applyNewPostSeoFields(
				{ ...prev, content },
				{ title: prev.title, excerpt: prev.excerpt, content },
			),
		);
	};

	const handleExcerptChange = (e) => {
		const excerpt = e.target.value;
		setFormData((prev) =>
			applyNewPostSeoFields(
				{ ...prev, excerpt },
				{ title: prev.title, excerpt, content: prev.content },
			),
		);
	};

	const handleSlugChange = (e) => {
		setFormData((prev) => ({ ...prev, slug: e.target.value }));
	};

	const handleGenerateTitles = async () => {
		const topic = formData.title || "precision gauges industrial metrology";
		setGeneratingTitle(true);
		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "titles", topic }),
			});
			const data = await response.json();
			if (data.success && data.titles?.length > 0) {
				setTitleSuggestions(data.titles);
				setShowTitleSuggestions(true);
			} else {
				showNotification("Failed to generate titles", "error");
			}
		} catch (error) {
			console.error("Error generating titles:", error);
			showNotification("Error generating titles", "error");
		} finally {
			setGeneratingTitle(false);
		}
	};

	const handleSelectTitle = (title) => {
		setFormData((prev) =>
			applyNewPostSeoFields(
				{ ...prev, title, slug: generateBlogSlug(title) },
				{ title, excerpt: prev.excerpt, content: prev.content },
			),
		);
		setShowTitleSuggestions(false);
	};

	const handleGenerateContent = async () => {
		if (!formData.title) {
			showNotification("Please enter a title first", "error");
			return;
		}
		setGeneratingContent(true);
		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "generate",
					topic: formData.title,
					keywords: [],
				}),
			});
			const data = await response.json();
			if (data.success && data.content) {
				const htmlContent = markdownToHtml(data.content);
				setFormData((prev) =>
					applyNewPostSeoFields(
						{ ...prev, content: htmlContent },
						{
							title: prev.title,
							excerpt: prev.excerpt,
							content: htmlContent,
						},
					),
				);
				showNotification("Content generated successfully!", "success");
			} else {
				showNotification("Failed to generate content", "error");
			}
		} catch (error) {
			console.error("Error generating content:", error);
			showNotification("Error generating content", "error");
		} finally {
			setGeneratingContent(false);
		}
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			showNotification("Please select an image file", "error");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			showNotification("Image must be less than 5MB", "error");
			return;
		}
		setUploading(true);
		try {
			const timestamp = Date.now();
			const storageRef = ref(
				storage,
				`blog-images/${timestamp}-${file.name}`,
			);
			await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(storageRef);
			setFormData((prev) => ({
				...prev,
				featuredImage: downloadURL,
				imageAttribution: null,
			}));
			showNotification("Image uploaded successfully!", "success");
		} catch (error) {
			console.error("Error uploading image:", error);
			showNotification("Failed to upload image", "error");
		} finally {
			setUploading(false);
		}
	};

	const handleFeaturedUrlChange = (e) => {
		setFormData((prev) => ({ ...prev, featuredImage: e.target.value }));
	};

	const clearFeaturedImage = () => {
		setFormData((prev) => ({ ...prev, featuredImage: "" }));
	};

	const handlePexelsSelect = (photo) => {
		setFormData((prev) => ({
			...prev,
			featuredImage: photo.src.large,
			imageAttribution: {
				photographer: photo.photographer,
				photographerUrl: photo.photographer_url,
				pexelsUrl: photo.url,
			},
		}));
		setShowPexelsPicker(false);
		showNotification("Image selected from Pexels!", "success");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title || !formData.content) {
			showNotification("Title and content are required", "error");
			return;
		}
		setSaving(true);
		try {
			const postData = {
				...formData,
				slug: formData.slug || generateBlogSlug(formData.title),
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			};
			if (formData.publishedDate) {
				postData.publishedDate = Timestamp.fromDate(
					new Date(formData.publishedDate),
				);
			}
			await addDoc(collection(db, "blogs"), postData);
			localStorage.removeItem(STORAGE_KEY);
			showNotification("Post created successfully!", "success");
			setTimeout(() => push("/admin/blog"), 1000);
		} catch (error) {
			console.error("Error creating post:", error);
			showNotification(`Failed to create post: ${error.message}`, "error");
		} finally {
			setSaving(false);
		}
	};

	return {
		formData,
		setFormData,
		saving,
		uploading,
		imageTab,
		setImageTab,
		generatingTitle,
		generatingContent,
		titleSuggestions,
		showTitleSuggestions,
		setShowTitleSuggestions,
		notification,
		dismissNotification,
		showRestoreDialog,
		savedDraft,
		showPexelsPicker,
		setShowPexelsPicker,
		back,
		handleSubmit,
		handleTitleChange,
		handleSlugChange,
		handleContentChange,
		handleExcerptChange,
		handleGenerateTitles,
		handleSelectTitle,
		handleGenerateContent,
		handleImageUpload,
		handleFeaturedUrlChange,
		clearFeaturedImage,
		handlePexelsSelect,
		restoreDraft,
		discardDraft,
	};
}
