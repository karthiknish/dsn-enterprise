"use client";

/**
 * Client helper: ask the server for a Gemini-generated featured image, then
 * persist it to Firebase Storage so the blog stores a real URL (not a
 * multi-megabyte base64 string in Firestore).
 */

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

const EXT_BY_MIME = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/webp": "webp",
};

// Gemini returns ~3 MB at 2K / ~8 MB at 4K. Downscale to a sane hero width and
// re-encode before uploading, so pages stay fast and Storage stays small.
const MAX_UPLOAD_WIDTH = 2000;
const JPEG_QUALITY = 0.86;

function dataUrlToBlob(dataUrl) {
	const [header, encoded] = dataUrl.split(",");
	const mimeType = /data:([^;]+)/.exec(header)?.[1] || "image/png";
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i += 1) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new Blob([bytes], { type: mimeType });
}

/**
 * Downscale + re-encode in the browser. Falls back to the original blob if
 * canvas encoding is unavailable for any reason.
 */
async function optimiseForWeb(blob) {
	try {
		if (typeof createImageBitmap !== "function") return blob;
		const bitmap = await createImageBitmap(blob);
		const scale = Math.min(1, MAX_UPLOAD_WIDTH / bitmap.width);
		const width = Math.round(bitmap.width * scale);
		const height = Math.round(bitmap.height * scale);

		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		ctx.drawImage(bitmap, 0, 0, width, height);
		bitmap.close?.();

		const encoded = await new Promise((resolve) =>
			canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
		);
		return encoded && encoded.size < blob.size ? encoded : blob;
	} catch (error) {
		console.warn("Image optimisation skipped:", error);
		return blob;
	}
}

/**
 * @param {object} params
 * @param {object} params.formData  Current blog form (title, excerpt, content, slug)
 * @param {object} [params.options] { style, instructions, aspectRatio, imageSize }
 * @returns {Promise<{url:string, prompt:string, brief:string, model:string}>}
 */
export async function generateAndUploadFeaturedImage({
	formData,
	options = {},
}) {
	const response = await fetch("/api/generate-image", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: formData.title,
			excerpt: formData.excerpt,
			content: formData.content,
			style: options.style,
			instructions: options.instructions,
			aspectRatio: options.aspectRatio,
			imageSize: options.imageSize,
		}),
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok || !data.success || !data.dataUrl) {
		throw new Error(data.error || "Failed to generate image");
	}

	const blob = await optimiseForWeb(dataUrlToBlob(data.dataUrl));
	const ext = EXT_BY_MIME[blob.type] || "png";
	const slug = formData.slug || "blog";
	const path = `blog-images/ai/${Date.now()}-${slug}.${ext}`;

	const storageRef = ref(storage, path);
	await uploadBytes(storageRef, blob, { contentType: blob.type });
	const url = await getDownloadURL(storageRef);

	return {
		url,
		prompt: data.prompt,
		brief: data.brief,
		model: data.model,
		aspectRatio: data.aspectRatio,
		imageSize: data.imageSize,
	};
}
