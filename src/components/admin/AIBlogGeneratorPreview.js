"use client";

import {
	FaCheck,
	FaCopy,
	FaMagic,
	FaRedo,
	FaSpinner,
} from "react-icons/fa";
import { markdownToHtml } from "@/lib/markdown-to-html";

export default function AIBlogGeneratorPreview({
	content,
	copied,
	isGeneratingMeta,
	isGenerating,
	isImproving,
	improveInstruction,
	onCopy,
	onGenerateMetadata,
	onRegenerate,
	onImproveInstructionChange,
	onImprove,
	onUseContent,
}) {
	if (!content) return null;

	return (
		<div className="mt-6">
			<div className="flex items-center justify-between mb-2">
				<h4 className="font-medium text-gray-900">Generated Content Preview:</h4>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={onCopy}
						aria-label="Copy generated content"
						className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
					>
						{copied ? (
							<FaCheck className="mr-1 text-accent" />
						) : (
							<FaCopy className="mr-1" />
						)}
						{copied ? "Copied!" : "Copy"}
					</button>
					<button
						type="button"
						onClick={onGenerateMetadata}
						disabled={isGeneratingMeta}
						aria-label="Generate SEO metadata"
						className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
					>
						{isGeneratingMeta ? (
							<FaSpinner className="animate-spin mr-1" />
						) : (
							<FaMagic className="mr-1" />
						)}
						Generate SEO Metadata
					</button>
					<button
						type="button"
						onClick={onRegenerate}
						disabled={isGenerating}
						aria-label="Regenerate content"
						className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
					>
						<FaRedo className="mr-1" />
						Regenerate
					</button>
				</div>
			</div>
			<div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
				<div className="prose prose-sm max-w-none">
					<pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
						{content}
					</pre>
				</div>
			</div>

			<div className="mt-4 space-y-3">
				<label
					id="ai-improve-instruction-label"
					htmlFor="ai-improve-instruction"
					className="block text-sm font-medium text-gray-700"
				>
					Improve with AI
				</label>
				<div className="flex flex-wrap gap-2">
					{[
						"Make it more concise",
						"Add more technical detail",
						"Improve SEO keyword usage",
					].map((preset) => (
						<button
							key={preset}
							type="button"
							disabled={isImproving}
							onClick={() => onImprove(preset)}
							className="text-xs px-3 py-1.5 rounded-full border border-purple-200 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
						>
							{preset}
						</button>
					))}
				</div>
				<div className="flex gap-2">
					<input
						id="ai-improve-instruction"
						aria-labelledby="ai-improve-instruction-label"
						type="text"
						value={improveInstruction}
						onChange={(e) => onImproveInstructionChange(e.target.value)}
						placeholder="Custom instruction, e.g. add a FAQ section"
						className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
					/>
					<button
						type="button"
						onClick={() => onImprove(improveInstruction)}
						disabled={isImproving || !improveInstruction.trim()}
						className="px-4 py-2 text-sm bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 disabled:opacity-50 flex items-center"
					>
						{isImproving ? <FaSpinner className="animate-spin" /> : "Apply"}
					</button>
				</div>
			</div>

			<button
				type="button"
				onClick={() => onUseContent(markdownToHtml(content))}
				className="mt-3 w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-700 flex items-center justify-center"
			>
				<FaCheck className="mr-2" />
				Use This Content in Editor
			</button>
		</div>
	);
}
