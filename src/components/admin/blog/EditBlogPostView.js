"use client";

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
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-gray-900">Edit Blog Post</h1>
				<p className="text-gray-600 mt-1">Update your blog article</p>
			</div>

			<BlogNotificationToast
				notification={hook.notification}
				onDismiss={() => hook.setNotification(null)}
			/>

			<form onSubmit={hook.handleSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
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
							onImageUpload={hook.handleImageUpload}
							onFeaturedUrlChange={(url) =>
								hook.setFormData((prev) => ({
									...prev,
									featuredImage: url,
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
