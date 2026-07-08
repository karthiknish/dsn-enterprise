import Image from "next/image";
import PexelsImagePicker from "@/components/admin/PexelsImagePicker";

export default function BlogFeaturedImagePanel({
	formData,
	imageTab,
	setImageTab,
	uploading,
	showPexelsPicker,
	setShowPexelsPicker,
	onImageUpload,
	onFeaturedUrlChange,
	onClearFeaturedImage,
	onPexelsSelect,
}) {
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
			</div>

			{formData.featuredImage && (
				<div className="mb-4 relative rounded-lg overflow-hidden border border-gray-200">
					<Image
						src={formData.featuredImage}
						alt="Featured preview"
						width={400}
						height={225}
						unoptimized
						className="w-full h-48 object-cover"
					/>
					<button
						type="button"
						onClick={onClearFeaturedImage}
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
						onChange={onFeaturedUrlChange}
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

			{showPexelsPicker && (
				<PexelsImagePicker
					onSelect={onPexelsSelect}
					onClose={() => setShowPexelsPicker(false)}
				/>
			)}
		</div>
	);
}
