"use client";

import NewBlogPostView from "@/components/admin/blog/NewBlogPostView";
import { useNewBlogPost } from "@/hooks/useNewBlogPost";

export default function NewBlogPage() {
	const blog = useNewBlogPost();

	return (
		<NewBlogPostView
			{...blog}
			onSubmit={blog.handleSubmit}
			onCancel={() => blog.back()}
			onTitleChange={blog.handleTitleChange}
			onSlugChange={blog.handleSlugChange}
			onExcerptChange={blog.handleExcerptChange}
			onContentChange={blog.handleContentChange}
			onGenerateTitles={blog.handleGenerateTitles}
			onSelectTitle={blog.handleSelectTitle}
			onCloseTitleSuggestions={() => blog.setShowTitleSuggestions(false)}
			onGenerateContent={blog.handleGenerateContent}
			onApplyAiDraft={blog.handleApplyAiDraft}
			onImageUpload={blog.handleImageUpload}
			onGenerateAiImage={blog.handleGenerateAiImage}
			onFeaturedUrlChange={blog.handleFeaturedUrlChange}
			onClearFeaturedImage={blog.clearFeaturedImage}
			onPexelsSelect={blog.handlePexelsSelect}
			onUnsplashSelect={blog.handleUnsplashSelect}
			onRestoreDraft={blog.restoreDraft}
			onDiscardDraft={blog.discardDraft}
		/>
	);
}
