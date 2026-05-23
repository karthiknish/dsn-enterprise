export default function BlogPostSeoPanel({ formData, setFormData }) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
			<div className="space-y-4">
				<div>
					<label
						id="post-meta-title-label"
						htmlFor="post-meta-title"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Meta Title
					</label>
					<input
						id="post-meta-title"
						type="text"
						aria-labelledby="post-meta-title-label"
						value={formData.metaTitle}
						onChange={(e) =>
							setFormData({ ...formData, metaTitle: e.target.value })
						}
						className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
						placeholder="SEO title (auto-filled from title)"
					/>
					<p className="mt-1 text-xs text-gray-500">
						Recommended length: 50-60 characters
					</p>
				</div>

				<div>
					<label
						id="post-meta-description-label"
						htmlFor="post-meta-description"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Meta Description
					</label>
					<textarea
						id="post-meta-description"
						aria-labelledby="post-meta-description-label"
						value={formData.metaDescription}
						onChange={(e) =>
							setFormData({
								...formData,
								metaDescription: e.target.value,
							})
						}
						rows={3}
						className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
						placeholder="SEO description (auto-filled from content)"
					/>
					<p className="mt-1 text-xs text-gray-500">
						Recommended length: 150-160 characters
					</p>
				</div>
			</div>
		</div>
	);
}
