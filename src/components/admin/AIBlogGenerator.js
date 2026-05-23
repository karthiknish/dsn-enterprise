"use client";

import { FaLightbulb, FaMagic, FaSpinner } from "react-icons/fa";
import { useAIBlogGenerator } from "@/hooks/useAIBlogGenerator";
import AIBlogGeneratorIdeas from "./AIBlogGeneratorIdeas";
import AIBlogGeneratorPreview from "./AIBlogGeneratorPreview";

export default function AIBlogGenerator({
	onContentGenerated,
	onMetadataGenerated,
}) {
	const {
		state,
		dispatch,
		generateContent,
		generateMetadata,
		loadBlogIdeas,
		improveContent,
		copyContent,
	} = useAIBlogGenerator({ onContentGenerated, onMetadataGenerated });

	return (
		<div className="bg-secondary-light border border-primary rounded-lg p-6 mb-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900 flex items-center">
					<FaMagic className="mr-2 text-purple-600" />
					AI Blog Generator
				</h3>
				<button
					type="button"
					onClick={loadBlogIdeas}
					disabled={state.isLoadingIdeas}
					className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
				>
					{state.isLoadingIdeas ? (
						<FaSpinner className="animate-spin mr-1" />
					) : (
						<FaLightbulb className="mr-1" />
					)}
					Get Blog Ideas
				</button>
			</div>

			{state.error && (
				<div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
					{state.error}
				</div>
			)}

			{state.showIdeas && (
				<AIBlogGeneratorIdeas
					ideas={state.blogIdeas}
					onSelect={(idea) =>
						dispatch({
							type: "SELECT_IDEA",
							title: idea.title,
							keywords: idea.keywords.join(", "),
						})
					}
					onHide={() => dispatch({ type: "HIDE_IDEAS" })}
				/>
			)}

			<div className="space-y-4">
				<div>
					<label
						id="ai-blog-topic-label"
						htmlFor="ai-blog-topic"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Blog Topic / Title
					</label>
					<input
						id="ai-blog-topic"
						aria-labelledby="ai-blog-topic-label"
						type="text"
						value={state.topic}
						onChange={(e) =>
							dispatch({ type: "SET_TOPIC", topic: e.target.value })
						}
						placeholder="e.g., Guide to Thread Gauge Selection for Manufacturing"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
					/>
				</div>

				<div>
					<label
						id="ai-blog-keywords-label"
						htmlFor="ai-blog-keywords"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Target Keywords (comma-separated)
					</label>
					<input
						id="ai-blog-keywords"
						aria-labelledby="ai-blog-keywords-label"
						type="text"
						value={state.keywords}
						onChange={(e) =>
							dispatch({ type: "SET_KEYWORDS", keywords: e.target.value })
						}
						placeholder="e.g., thread gauges, plug gauge, ring gauge, gauge selection"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
					/>
				</div>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={generateContent}
						disabled={state.isGenerating || !state.topic.trim()}
						className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center"
					>
						{state.isGenerating ? (
							<>
								<FaSpinner className="animate-spin mr-2" />
								Generating…
							</>
						) : (
							<>
								<FaMagic className="mr-2" />
								Generate Blog Content
							</>
						)}
					</button>
				</div>
			</div>

			<AIBlogGeneratorPreview
				content={state.generatedContent}
				copied={state.copied}
				isGeneratingMeta={state.isGeneratingMeta}
				isGenerating={state.isGenerating}
				isImproving={state.isImproving}
				improveInstruction={state.improveInstruction}
				onCopy={copyContent}
				onGenerateMetadata={generateMetadata}
				onRegenerate={generateContent}
				onImproveInstructionChange={(instruction) =>
					dispatch({ type: "SET_IMPROVE_INSTRUCTION", instruction })
				}
				onImprove={improveContent}
				onUseContent={(htmlContent) => onContentGenerated?.(htmlContent)}
			/>
		</div>
	);
}
