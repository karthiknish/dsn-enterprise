"use client";

import { useState } from "react";

const STYLE_OPTIONS = [
	{ id: "editorial", label: "Editorial photo" },
	{ id: "macro", label: "Macro detail" },
	{ id: "workshop", label: "Workshop scene" },
	{ id: "technical", label: "Technical illustration" },
	{ id: "abstract", label: "Abstract material study" },
];

const SIZE_OPTIONS = [
	{ id: "1K", label: "1K — fast" },
	{ id: "2K", label: "2K — recommended" },
	{ id: "4K", label: "4K — print grade, may time out" },
];

const RATIO_OPTIONS = [
	{ id: "16:9", label: "16:9 — blog hero" },
	{ id: "3:2", label: "3:2 — card" },
	{ id: "4:3", label: "4:3 — inline" },
	{ id: "1:1", label: "1:1 — square" },
];

/**
 * Generates a featured image with Gemini (Nano Banana 2) from the post's own
 * title/excerpt/content. The server art-directs the prompt first, so the
 * result is grounded in the article rather than generic stock-AI imagery.
 */
export default function AiImageGenerator({
	disabled,
	generating,
	lastResult,
	onGenerate,
}) {
	const [style, setStyle] = useState("editorial");
	const [imageSize, setImageSize] = useState("2K");
	const [aspectRatio, setAspectRatio] = useState("16:9");
	const [instructions, setInstructions] = useState("");
	const [showPrompt, setShowPrompt] = useState(false);

	const handleClick = () => {
		onGenerate({ style, imageSize, aspectRatio, instructions });
	};

	return (
		<div className="space-y-3">
			<div className="grid grid-cols-2 gap-3">
				<div>
					<label
						htmlFor="ai-image-style"
						className="block text-xs font-medium text-gray-600 mb-1"
					>
						Style
					</label>
					<select
						id="ai-image-style"
						value={style}
						onChange={(e) => setStyle(e.target.value)}
						disabled={generating}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
					>
						{STYLE_OPTIONS.map((option) => (
							<option key={option.id} value={option.id}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="ai-image-ratio"
						className="block text-xs font-medium text-gray-600 mb-1"
					>
						Aspect ratio
					</label>
					<select
						id="ai-image-ratio"
						value={aspectRatio}
						onChange={(e) => setAspectRatio(e.target.value)}
						disabled={generating}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
					>
						{RATIO_OPTIONS.map((option) => (
							<option key={option.id} value={option.id}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label
					htmlFor="ai-image-size"
					className="block text-xs font-medium text-gray-600 mb-1"
				>
					Resolution
				</label>
				<select
					id="ai-image-size"
					value={imageSize}
					onChange={(e) => setImageSize(e.target.value)}
					disabled={generating}
					className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
				>
					{SIZE_OPTIONS.map((option) => (
						<option key={option.id} value={option.id}>
							{option.label}
						</option>
					))}
				</select>
			</div>

			<div>
				<label
					htmlFor="ai-image-instructions"
					className="block text-xs font-medium text-gray-600 mb-1"
				>
					Extra direction <span className="text-gray-400">(optional)</span>
				</label>
				<textarea
					id="ai-image-instructions"
					rows={2}
					value={instructions}
					onChange={(e) => setInstructions(e.target.value)}
					disabled={generating}
					placeholder="e.g. show a bore gauge on a granite surface plate, cool morning light"
					className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
				/>
			</div>

			<button
				type="button"
				onClick={handleClick}
				disabled={disabled || generating}
				className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			>
				{generating ? (
					<>
						<span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
						Generating…
					</>
				) : (
					"Generate image from post content"
				)}
			</button>

			<p className="text-xs text-gray-500">
				Uses the post title, excerpt and body to art-direct a grounded,
				photo-real image. 2K / 16:9 is sized for the blog hero.
			</p>

			{disabled && (
				<p className="text-xs text-amber-600">
					Add a title (and ideally some content) first — the image is generated
					from the article itself.
				</p>
			)}

			{lastResult?.brief && (
				<div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
					<button
						type="button"
						onClick={() => setShowPrompt((v) => !v)}
						className="text-xs font-medium text-gray-700 hover:text-accent"
					>
						{showPrompt ? "Hide" : "Show"} generated brief
						{lastResult.model ? ` · ${lastResult.model}` : ""}
					</button>
					{showPrompt && (
						<p className="mt-2 text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
							{lastResult.brief}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
