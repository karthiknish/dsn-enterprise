"use client";

export default function BlogDeleteDialog({
	dialogRef,
	target,
	onClose,
	onConfirm,
}) {
	return (
		<dialog
			ref={dialogRef}
			className="rounded-xl shadow-xl p-6 max-w-md w-[calc(100%-2rem)] mx-auto backdrop:bg-gray-950/50 animate-fadeIn"
			aria-labelledby="delete-post-title"
			onClose={onClose}
			onCancel={(e) => {
				e.preventDefault();
				onClose();
			}}
		>
			{target ? (
				<>
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</div>
						<h3
							id="delete-post-title"
							className="text-lg font-semibold text-gray-900"
						>
							Delete post?
						</h3>
					</div>
					<p className="text-gray-600 mb-4">
						Are you sure you want to delete{" "}
						<span className="font-medium text-gray-900">
							&ldquo;{target.title}&rdquo;
						</span>
						? This action cannot be undone.
					</p>
					<div className="flex flex-col-reverse sm:flex-row gap-3">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={onConfirm}
							className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
						>
							Delete
						</button>
					</div>
				</>
			) : null}
		</dialog>
	);
}
