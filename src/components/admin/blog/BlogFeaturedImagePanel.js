"use client";

import Image from "next/image";
import { useState } from "react";
import PexelsImagePicker from "@/components/admin/PexelsImagePicker";
import UnsplashImagePicker from "@/components/admin/UnsplashImagePicker";

function ImagePreviewPlaceholder() {
	return (
		<div className="mb-4 rounded-lg overflow-hidden border border-dashed border-gray-300 bg-gray-50">
			<div className="flex flex-col items-center justify-center h-48 text-gray-400">
				<svg
					aria-hidden="true"
					className="w-12 h-12 mb-2"
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
				<p className="text-sm font-medium">No featured image</p>
				<p className="text-xs mt-1">Upload or paste an image URL above</p>
			</div>
		</div>
	);
}

function BrokenImageFallback({ onClear }) {
	return (
		<div className="mb-4 relative rounded-lg overflow-hidden border border-red-200 bg-red-50">
			<div className="flex flex-col items-center justify-center h-48 text-red-400">
				<svg
					aria-hidden="true"
					className="w-12 h-12 mb-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p className="text-sm font-medium">Image failed to load</p>
				<p className="text-xs mt-1">The URL may be broken or unreachable</p>
			</div>
			<button
				type="button"
				onClick={onClear}
				className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
				aria-label="Remove featured image"
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}

export default function BlogFeaturedImagePanel({
	formData,
	imageTab,
	setImageTab,
	uploading,
	showPexelsPicker,
	setShowPexelsPicker,
	showUnsplashPicker,
	setShowUnsplashPicker,
	onImageUpload,
	onFeaturedUrlChange,
	onClearFeaturedImage,
	onPexelsSelect,
	onUnsplashSelect,
}) {
	const [imageError, setImageError] = useState(false);

	const handleUrlChange = (e) => {
		setImageError(false);
		onFeaturedUrlChange(e);
	};

	const handleClearImage = () => {
		setImageError(false);
		onClearFeaturedImage();
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>

			<div className="flex border-b border-gray-200 mb-4">
				<button
					type="button"
					onClick={() => setImageTab("upload")}
					className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
						imageTab === "upload"
							? "border-accent text-accent"
							: "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					Upload
				</button>
				<button
					type="button"
					onClick={() => setImageTab("url")}
					className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
						imageTab === "url"
							? "border-accent text-accent"
							: "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					URL
				</button>
				<button
					type="button"
					onClick={() => setImageTab("pexels")}
					className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
						imageTab === "pexels"
							? "border-accent text-accent"
							: "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					Pexels
				</button>
				<button
					type="button"
					onClick={() => setImageTab("unsplash")}
					className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
						imageTab === "unsplash"
							? "border-accent text-accent"
							: "border-transparent text-gray-500 hover:text-gray-700"
					}`}
				>
					Unsplash
				</button>
			</div>

			{formData.featuredImage && !imageError ? (
				<div className="mb-4 relative rounded-lg overflow-hidden border border-gray-200">
					<Image
						src={formData.featuredImage}
						alt="Featured preview"
						width={400}
						height={225}
						unoptimized
						onError={() => setImageError(true)}
						className="w-full h-48 object-cover"
					/>
					<button
						type="button"
						onClick={handleClearImage}
						className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
						aria-label="Remove featured image"
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			) : formData.featuredImage && imageError ? (
				<BrokenImageFallback onClear={handleClearImage} />
			) : (
				<ImagePreviewPlaceholder />
			)}

			{imageTab === "upload" && (
				<label className="block cursor-pointer">
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent transition-colors">
						{uploading ? (
							<div className="flex flex-col items-center">
								<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-2" />
								<p className="text-sm text-gray-600">Uploading…</p>
							</div>
						) : (
							<>
								<svg
									aria-hidden="true"
									className="mx-auto h-12 w-12 text-gray-400"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
								>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-4v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<p className="text-sm text-gray-600 font-medium">
									Click to upload
								</p>
								<p className="text-xs text-gray-400 mt-1">
									PNG, JPG, GIF up to 5MB
								</p>
							</>
						)}
					</div>
					<input
						type="file"
						accept="image/*"
						onChange={onImageUpload}
						aria-label="Upload featured image"
						className="hidden"
						disabled={uploading}
					/>
				</label>
			)}

			{imageTab === "url" && (
				<div className="space-y-2">
					<label
						id="featured-image-url-label"
						htmlFor="featured-image-url"
						className="sr-only"
					>
						Featured image URL
					</label>
					<input
						id="featured-image-url"
						type="url"
						aria-labelledby="featured-image-url-label"
						value={formData.featuredImage}
						onChange={handleUrlChange}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
						placeholder="https://example.com/image.jpg"
					/>
					<p className="text-xs text-gray-500">
						Paste a direct link to an image
					</p>
				</div>
			)}

			{imageTab === "pexels" && (
				<div className="text-center py-4">
					<button
						type="button"
						onClick={() => setShowPexelsPicker(true)}
						className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
					>
						Search Pexels Images
					</button>
				</div>
			)}

			{imageTab === "unsplash" && (
				<div className="text-center py-4">
					<button
						type="button"
						onClick={() => setShowUnsplashPicker(true)}
						className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
					>
						Search Unsplash Images
					</button>
				</div>
			)}

			{showPexelsPicker && (
				<PexelsImagePicker
					onSelect={onPexelsSelect}
					onClose={() => setShowPexelsPicker(false)}
				/>
			)}

			{showUnsplashPicker && (
				<UnsplashImagePicker
					onSelect={onUnsplashSelect}
					onClose={() => setShowUnsplashPicker(false)}
				/>
			)}
		</div>
	);
}
