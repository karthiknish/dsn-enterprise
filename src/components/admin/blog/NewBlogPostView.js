"use client";

import BlogFeaturedImagePanel from "./BlogFeaturedImagePanel";
import BlogNotificationToast from "./BlogNotificationToast";
import BlogPostContentSection from "./BlogPostContentSection";
import BlogPostDetailsSection from "./BlogPostDetailsSection";
import BlogPostSeoPanel from "./BlogPostSeoPanel";
import BlogPublishSidebar from "./BlogPublishSidebar";
import BlogRestoreDraftDialog from "./BlogRestoreDraftDialog";

export default function NewBlogPostView({
	formData,
	setFormData,
	saving,
	generatingTitle,
	generatingContent,
	titleSuggestions,
	showTitleSuggestions,
	notification,
	dismissNotification,
	showRestoreDialog,
	savedDraft,
	imageTab,
	setImageTab,
	uploading,
	showPexelsPicker,
	setShowPexelsPicker,
	onSubmit,
	onTitleChange,
	onSlugChange,
	onExcerptChange,
	onContentChange,
	onGenerateTitles,
	onSelectTitle,
	onCloseTitleSuggestions,
	onGenerateContent,
	onImageUpload,
	onFeaturedUrlChange,
	onClearFeaturedImage,
	onPexelsSelect,
	onRestoreDraft,
	onDiscardDraft,
	onCancel,
}) {
	return (
		<div className="max-w-7xl mx-auto">
			<h1 className="sr-only">Create new post</h1>

			<BlogNotificationToast
				notification={notification}
				onDismiss={dismissNotification}
			/>

			<form onSubmit={onSubmit}>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<BlogPostDetailsSection
							formData={formData}
							generatingTitle={generatingTitle}
							titleSuggestions={titleSuggestions}
							showTitleSuggestions={showTitleSuggestions}
							onTitleChange={onTitleChange}
							onSlugChange={onSlugChange}
							onGenerateTitles={onGenerateTitles}
							onSelectTitle={onSelectTitle}
							onCloseTitleSuggestions={onCloseTitleSuggestions}
							onExcerptChange={onExcerptChange}
						/>

						<BlogPostContentSection
							content={formData.content}
							generatingContent={generatingContent}
							onContentChange={onContentChange}
							onGenerateContent={onGenerateContent}
						/>

						<BlogPostSeoPanel formData={formData} setFormData={setFormData} />
					</div>

					<div className="space-y-6">
						<BlogPublishSidebar
							formData={formData}
							setFormData={setFormData}
							saving={saving}
							onCancel={onCancel}
						/>

						<BlogFeaturedImagePanel
							formData={formData}
							imageTab={imageTab}
							setImageTab={setImageTab}
							uploading={uploading}
							showPexelsPicker={showPexelsPicker}
							setShowPexelsPicker={setShowPexelsPicker}
							onImageUpload={onImageUpload}
							onFeaturedUrlChange={onFeaturedUrlChange}
							onClearFeaturedImage={onClearFeaturedImage}
							onPexelsSelect={onPexelsSelect}
						/>
					</div>
				</div>
			</form>

			<BlogRestoreDraftDialog
				isOpen={showRestoreDialog}
				savedDraft={savedDraft}
				onRestore={onRestoreDraft}
				onDiscard={onDiscardDraft}
			/>
		</div>
	);
}
