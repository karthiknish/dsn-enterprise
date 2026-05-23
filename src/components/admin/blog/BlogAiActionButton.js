export default function BlogAiActionButton({
	label,
	loadingLabel = "Generating…",
	isLoading,
	disabled,
	onClick,
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled || isLoading}
			className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 disabled:opacity-50"
		>
			{isLoading ? (
				<>
					<svg
						aria-hidden="true"
						className="w-3 h-3 animate-spin"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						/>
					</svg>
					{loadingLabel}
				</>
			) : (
				<>
					<svg
						aria-hidden="true"
						className="w-3 h-3"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
					{label}
				</>
			)}
		</button>
	);
}
