import BlogAiActionButton from "./BlogAiActionButton";

export default function BlogPostDetailsSection({
	formData,
	generatingTitle,
	titleSuggestions,
	showTitleSuggestions,
	onTitleChange,
	onSlugChange,
	onGenerateTitles,
	onSelectTitle,
	onCloseTitleSuggestions,
	onExcerptChange,
	generatingExcerpt,
	onGenerateExcerpt,
}) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="space-y-5">
				<div>
					<div className="flex items-center justify-between mb-1">
						<label
							id="post-title-label"
							htmlFor="post-title"
							className="block text-sm font-medium text-gray-700"
						>
							Title <span className="text-red-500">*</span>
						</label>
						<BlogAiActionButton
							label="AI Suggest Titles"
							isLoading={generatingTitle}
							onClick={onGenerateTitles}
						/>
					</div>
					<div className="relative">
						<input
							id="post-title"
							type="text"
							aria-labelledby="post-title-label"
							value={formData.title}
							onChange={onTitleChange}
							className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
							placeholder="Enter post title"
							required
						/>
						{showTitleSuggestions && titleSuggestions.length > 0 && (
							<div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
								<div className="p-2 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
									<span className="text-xs font-medium text-gray-500">
										Suggested Titles
									</span>
									<button
										type="button"
										onClick={onCloseTitleSuggestions}
										aria-label="Close title suggestions"
										className="text-gray-400 hover:text-gray-600"
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
								{titleSuggestions.map((title) => (
									<button
										key={title}
										type="button"
										onClick={() => onSelectTitle(title)}
										className="w-full text-left px-4 py-2 text-sm text-purple-900 hover:bg-purple-50 hover:text-purple-800 transition-colors"
									>
										{title}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				<div>
					<label
						id="post-slug-label"
						htmlFor="post-slug"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Slug
					</label>
					<input
						id="post-slug"
						type="text"
						aria-labelledby="post-slug-label"
						value={formData.slug}
						onChange={onSlugChange}
						className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow bg-gray-50"
						placeholder="post-url-slug"
					/>
					<p className="mt-1 text-xs text-gray-500">
						Auto-generated from title. Edit if needed.
					</p>
				</div>

				<div>
					<div className="flex items-center justify-between mb-1">
						<label
							id="post-excerpt-label"
							htmlFor="post-excerpt"
							className="block text-sm font-medium text-gray-700"
						>
							Excerpt
						</label>
						{onGenerateExcerpt ? (
							<BlogAiActionButton
								label="AI Generate Excerpt"
								isLoading={generatingExcerpt}
								disabled={!formData.title}
								onClick={onGenerateExcerpt}
							/>
						) : null}
					</div>
					<textarea
						id="post-excerpt"
						aria-labelledby="post-excerpt-label"
						value={formData.excerpt}
						onChange={onExcerptChange}
						rows={3}
						className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
						placeholder="Brief description of the post for SEO and previews"
					/>
				</div>
			</div>
		</div>
	);
}
