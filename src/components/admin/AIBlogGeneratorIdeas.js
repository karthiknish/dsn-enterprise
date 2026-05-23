export default function AIBlogGeneratorIdeas({ ideas, onSelect, onHide }) {
	if (ideas.length === 0) return null;

	return (
		<div className="mb-4 bg-white rounded-lg p-4 border border-purple-200">
			<h4 className="font-medium text-gray-900 mb-3">Suggested Blog Topics:</h4>
			<div className="space-y-2 max-h-60 overflow-y-auto">
				{ideas.map((idea) => (
					<button
						key={idea.title}
						type="button"
						onClick={() => onSelect(idea)}
						className="w-full p-3 bg-gray-50 rounded cursor-pointer hover:bg-purple-50 transition-colors text-left"
					>
						<div className="font-medium text-gray-900 text-sm">{idea.title}</div>
						<div className="flex flex-wrap gap-1 mt-1">
							{idea.keywords?.map((kw) => (
								<span
									key={`${idea.title}-${kw}`}
									className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded"
								>
									{kw}
								</span>
							))}
						</div>
						<div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
							<span>Audience: {idea.targetAudience}</span>
							<span
								className={`px-2 py-0.5 rounded ${
									idea.estimatedSearchVolume === "high"
										? "bg-accent-100 text-accent-700"
										: idea.estimatedSearchVolume === "medium"
											? "bg-yellow-100 text-yellow-700"
											: "bg-gray-100 text-gray-700"
								}`}
							>
								{idea.estimatedSearchVolume} volume
							</span>
						</div>
					</button>
				))}
			</div>
			<button
				type="button"
				onClick={onHide}
				className="mt-3 text-sm text-gray-500 hover:text-gray-700"
			>
				Hide Ideas
			</button>
		</div>
	);
}
