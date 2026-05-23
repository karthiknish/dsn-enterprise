"use client";

import { useEffect, useRef } from "react";

export default function BlogRestoreDraftDialog({
	isOpen,
	savedDraft,
	onRestore,
	onDiscard,
}) {
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen) {
			if (!dialog.open) dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className="rounded-xl shadow-xl p-6 max-w-md w-[calc(100%-2rem)] mx-auto backdrop:bg-gray-950/50 animate-fadeIn"
			aria-labelledby="restore-draft-title"
			onClose={onDiscard}
			onCancel={(e) => {
				e.preventDefault();
				onDiscard();
			}}
		>
			{isOpen ? (
				<>
					<h3
						id="restore-draft-title"
						className="text-lg font-semibold text-gray-900 mb-2"
					>
						Restore Draft?
					</h3>
					<p className="text-gray-600 mb-4">
						We found an unsaved draft from a previous session
						{savedDraft?.savedAt &&
							` (${new Date(savedDraft.savedAt).toLocaleString()})`}
						. Would you like to restore it?
					</p>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={onDiscard}
							className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
						>
							Discard
						</button>
						<button
							type="button"
							onClick={onRestore}
							className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors font-medium"
						>
							Restore Draft
						</button>
					</div>
				</>
			) : null}
		</dialog>
	);
}
