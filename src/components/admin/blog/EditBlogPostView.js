"use client";

import BlogAiStudio from "@/components/admin/blog-chat/BlogAiStudio";
import { useEditBlogPost } from "@/hooks/useEditBlogPost";
import BlogFeaturedImagePanel from "./BlogFeaturedImagePanel";
import BlogNotificationToast from "./BlogNotificationToast";
import BlogPostContentSection from "./BlogPostContentSection";
import BlogPostDetailsSection from "./BlogPostDetailsSection";
import BlogPostSeoPanel from "./BlogPostSeoPanel";
import BlogPublishSidebar from "./BlogPublishSidebar";
import BlogRestoreDraftDialog from "./BlogRestoreDraftDialog";

export default function EditBlogPostView({ postId, initialPostData }) {
	const hook = useEditBlogPost(postId, initialPostData);

	return (
		<div className="max-w-7xl mx-auto">
			<h1 className="sr-only">Edit post</h1>

			<BlogNotificationToast
				notification={hook.notification}
				onDismiss={() => hook.setNotification(null)}
			/>

			{hook.postMissing && (
				<div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4">
					<h2 className="text-sm font-semibold text-amber-900">
						This post no longer exists
					</h2>
					<p className="mt-1 text-sm text-amber-800">
						It was deleted while you had it open, so it cannot be updated.
						Nothing you have typed has been lost — save it as a new post, or
						copy what you need before leaving this page.
					</p>
					<div className="mt-3 flex flex-wrap gap-2">
						<button
							type="button"
							onClick={hook.saveAsNewPost}
							disabled={hook.saving}
							className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
						>
							{hook.saving ? "Saving…" : "Save as a new post"}
						</button>
						<button
							type="button"
							onClick={hook.back}
							className="px-3 py-1.5 text-xs font-medium rounded-lg border border-amber-300 text-amber-900 hover:bg-amber-100"
						>
							Back to posts
						</button>
					</div>
				</div>
			)}

			<form onSubmit={hook.handleSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<BlogAiStudio
							postContext={{
								title: hook.formData.title,
								excerpt: hook.formData.excerpt,
								content: hook.formData.content,
							}}
							onApplyDraft={hook.handleApplyAiDraft}
						/>

						<BlogPostDetailsSection
							formData={hook.formData}
							generatingTitle={hook.generatingTitle}
							titleSuggestions={hook.titleSuggestions}
							showTitleSuggestions={hook.showTitleSuggestions}
							onTitleChange={hook.handleTitleChange}
							onSlugChange={(e) =>
								hook.setFormData((prev) => ({ ...prev, slug: e.target.value }))
							}
							onGenerateTitles={hook.handleGenerateTitles}
							onSelectTitle={hook.handleSelectTitle}
							onCloseTitleSuggestions={() =>
								hook.setShowTitleSuggestions(false)
							}
							onExcerptChange={hook.handleExcerptChange}
						/>

						<BlogPostContentSection
							content={hook.formData.content}
							editorKey={hook.editorKey}
							onContentChange={hook.handleContentChange}
						/>

						<BlogPostSeoPanel
							formData={hook.formData}
							setFormData={hook.setFormData}
						/>
					</div>

					<div className="space-y-6">
						<BlogPublishSidebar
							formData={hook.formData}
							setFormData={hook.setFormData}
							saving={hook.saving}
							submitLabel="Update Post"
							onCancel={hook.back}
						/>

						<BlogFeaturedImagePanel
							formData={hook.formData}
							imageTab={hook.imageTab}
							setImageTab={hook.setImageTab}
							uploading={hook.uploading}
							showPexelsPicker={hook.showPexelsPicker}
							setShowPexelsPicker={hook.setShowPexelsPicker}
							showUnsplashPicker={hook.showUnsplashPicker}
							setShowUnsplashPicker={hook.setShowUnsplashPicker}
							onImageUpload={hook.handleImageUpload}
							onFeaturedUrlChange={(event) =>
								hook.setFormData((prev) => ({
									...prev,
									featuredImage: event?.target?.value ?? "",
									imageAttribution: null,
								}))
							}
							onClearFeaturedImage={() =>
								hook.setFormData((prev) => ({
									...prev,
									featuredImage: "",
									imageAttribution: null,
								}))
							}
							onPexelsSelect={hook.handlePexelsSelect}
							onUnsplashSelect={hook.handleUnsplashSelect}
							onGenerateAiImage={hook.handleGenerateAiImage}
							generatingImage={hook.generatingImage}
							aiImageResult={hook.aiImageResult}
						/>
					</div>
				</div>
			</form>

			<BlogRestoreDraftDialog
				isOpen={hook.showRestoreDialog}
				savedDraft={hook.savedDraft}
				onRestore={hook.restoreDraft}
				onDiscard={hook.discardDraft}
			/>
		</div>
	);
}
