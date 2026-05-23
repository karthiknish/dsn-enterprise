import dynamic from "next/dynamic";
import BlogAiActionButton from "./BlogAiActionButton";

const TiptapEditor = dynamic(() => import("@/components/admin/TiptapEditor"), {
	ssr: false,
	loading: () => (
		<div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
			<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent" />
		</div>
	),
});

export default function BlogPostContentSection({
	content,
	editorKey,
	generatingContent,
	onContentChange,
	onGenerateContent,
}) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium text-gray-700">
					Content <span className="text-red-500">*</span>
				</span>
				{onGenerateContent ? (
					<BlogAiActionButton
						label="AI Generate Content"
						isLoading={generatingContent}
						disabled={generatingContent}
						onClick={onGenerateContent}
					/>
				) : null}
			</div>
			<fieldset className="border-0 p-0 m-0 min-w-0">
				<legend className="sr-only">Post content</legend>
				<div className="prose-editor font-normal">
					<TiptapEditor
						key={editorKey}
						content={content}
						onChange={onContentChange}
						placeholder="Write your blog post content here..."
					/>
				</div>
			</fieldset>
		</div>
	);
}
