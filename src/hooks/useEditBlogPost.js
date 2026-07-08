"use client";

import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getEditDraftRestoreState } from "@/lib/blog-edit-init";
import { generateBlogSlug } from "@/lib/blog-form-utils";
import { applyEditPostSeoFields } from "@/lib/blog-seo";
import { db, storage } from "@/lib/firebase";
import {
	describeFirestoreError,
	describeStorageError,
} from "@/lib/firebase-errors";
import { markdownToHtml } from "@/lib/markdown-to-html";

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

export function useEditBlogPost(postId, initialPostData) {
	const { push, back } = useRouter();
	const DRAFT_KEY = `blog-draft-edit-${postId}`;
	const originalDataRef = useRef(initialPostData);

	const draftRestore = getEditDraftRestoreState(postId, initialPostData);
	const [showRestoreDialog, setShowRestoreDialog] = useState(
		draftRestore.showRestoreDialog,
	);
	const [savedDraft, setSavedDraft] = useState(draftRestore.savedDraft);
	const [formData, setFormData] = useState(initialPostData ?? EMPTY_FORM);
	const [editorKey, setEditorKey] = useState(0);

	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [showPexelsPicker, setShowPexelsPicker] = useState(false);
	const [showUnsplashPicker, setShowUnsplashPicker] = useState(false);
	const [imageTab, setImageTab] = useState("upload");
	const [generatingTitle, setGeneratingTitle] = useState(false);
	const [titleSuggestions, setTitleSuggestions] = useState([]);
	const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
	const [notification, setNotification] = useState(null);

	const showNotification = (message, type = "info") => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000);
	};

	const saveToLocalStorage = useCallback(() => {
		const original = originalDataRef.current;
		if (
			original &&
			(formData.title !== original.title ||
				formData.content !== original.content)
		) {
			localStorage.setItem(
				DRAFT_KEY,
				JSON.stringify({
					...formData,
					savedAt: new Date().toISOString(),
				}),
			);
		}
	}, [formData, DRAFT_KEY]);

	useEffect(() => {
		const timeoutId = setTimeout(saveToLocalStorage, 1000);
		return () => clearTimeout(timeoutId);
	}, [saveToLocalStorage]);

	const restoreDraft = () => {
		if (savedDraft) {
			setFormData(savedDraft);
			setEditorKey((k) => k + 1);
			setShowRestoreDialog(false);
			setSavedDraft(null);
		}
	};

	const discardDraft = () => {
		localStorage.removeItem(DRAFT_KEY);
		setShowRestoreDialog(false);
		setSavedDraft(null);
	};

	const clearDraft = () => {
		localStorage.removeItem(DRAFT_KEY);
	};

	const handleTitleChange = (e) => {
		const title = e.target.value;
		setFormData((prev) =>
			applyEditPostSeoFields(
				{ ...prev, title, slug: generateBlogSlug(title) },
				originalDataRef.current,
				{ title, excerpt: prev.excerpt, content: prev.content },
			),
		);
	};

	const handleContentChange = (content) => {
		setFormData((prev) =>
			applyEditPostSeoFields({ ...prev, content }, originalDataRef.current, {
				title: prev.title,
				excerpt: prev.excerpt,
				content,
			}),
		);
	};

	const handleExcerptChange = (e) => {
		const excerpt = e.target.value;
		setFormData((prev) =>
			applyEditPostSeoFields({ ...prev, excerpt }, originalDataRef.current, {
				title: prev.title,
				excerpt,
				content: prev.content,
			}),
		);
	};

	const handleGenerateTitles = async () => {
		const topic = formData.title || "precision gauges industrial metrology";
		setGeneratingTitle(true);
		setShowTitleSuggestions(true);

		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "titles", topic }),
			});
			const data = await response.json();
			if (data.success) {
				setTitleSuggestions(data.titles);
			} else {
				showNotification(data.error || "Failed to generate titles", "error");
			}
		} catch (error) {
			console.error("Error generating titles:", error);
			showNotification("Failed to generate titles", "error");
		} finally {
			setGeneratingTitle(false);
		}
	};

	const handleSelectTitle = (title) => {
		setFormData((prev) => ({
			...prev,
			title,
			slug: generateBlogSlug(title),
		}));
		setShowTitleSuggestions(false);
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			showNotification("Please select an image file", "error");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			showNotification("Image size must be less than 5MB", "error");
			return;
		}

		setUploading(true);
		try {
			const timestamp = Date.now();
			const fileName = `blog-images/${timestamp}-${file.name}`;
			const storageRef = ref(storage, fileName);
			await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(storageRef);
			setFormData((prev) => ({
				...prev,
				featuredImage: downloadURL,
				imageAttribution: null,
			}));
			showNotification("Image uploaded successfully", "success");
		} catch (error) {
			console.error("Error uploading image:", error);
			showNotification(
				describeStorageError(error, "Failed to upload image"),
				"error",
			);
		} finally {
			setUploading(false);
		}
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
		showNotification("Image selected from Pexels", "success");
	};

	const handleUnsplashSelect = (photo) => {
		setFormData((prev) => ({
			...prev,
			featuredImage: photo.url,
			imageAttribution: {
				photographer: photo.photographer,
				photographerUrl: photo.photographerUrl,
				unsplashUrl: photo.unsplashUrl,
			},
		}));
		setShowUnsplashPicker(false);
		showNotification("Image selected from Unsplash", "success");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			const docRef = doc(db, "blogs", postId);
			const updateData = {
				title: formData.title,
				slug: formData.slug,
				excerpt: formData.excerpt,
				content: formData.content,
				featuredImage: formData.featuredImage,
				imageAttribution: formData.imageAttribution,
				status: formData.status,
				metaTitle: formData.metaTitle,
				metaDescription: formData.metaDescription,
				updatedAt: serverTimestamp(),
			};

			if (formData.publishedDate) {
				updateData.publishedDate = Timestamp.fromDate(
					new Date(formData.publishedDate),
				);
			}

			await updateDoc(docRef, updateData);
			clearDraft();
			showNotification("Post updated successfully", "success");
			setTimeout(() => push("/admin/blog"), 1000);
		} catch (error) {
			console.error("Error updating post:", error);
			showNotification(
				describeFirestoreError(
					error,
					`Failed to update post. ${error.message}`,
				),
				"error",
			);
		} finally {
			setSaving(false);
		}
	};

	const handleAIContentGenerated = (content) => {
		const htmlContent = markdownToHtml(content);
		setFormData((prev) => ({ ...prev, content: htmlContent }));
		setEditorKey((k) => k + 1);
		showNotification("AI content applied to editor", "success");
	};

	return {
		postId,
		formData,
		setFormData,
		editorKey,
		saving,
		uploading,
		showPexelsPicker,
		setShowPexelsPicker,
		showUnsplashPicker,
		setShowUnsplashPicker,
		imageTab,
		setImageTab,
		generatingTitle,
		titleSuggestions,
		showTitleSuggestions,
		setShowTitleSuggestions,
		notification,
		setNotification,
		showRestoreDialog,
		savedDraft,
		restoreDraft,
		discardDraft,
		showNotification,
		handleTitleChange,
		handleContentChange,
		handleExcerptChange,
		handleGenerateTitles,
		handleSelectTitle,
		handleImageUpload,
		handlePexelsSelect,
		handleUnsplashSelect,
		handleSubmit,
		handleAIContentGenerated,
		back,
	};
}
