"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function ContactFormActions({
	isSubmitting,
	lastSaved,
	onClear,
}) {
	const [confirming, setConfirming] = useState(false);

	const handleClearClick = () => {
		if (confirming) {
			onClear();
			setConfirming(false);
		} else {
			setConfirming(true);
		}
	};

	const handleClearBlur = () => {
		setConfirming(false);
	};

	return (
		<>
			<div className="flex gap-3">
				<button
					type="submit"
					className={`flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
						isSubmitting ? "opacity-70 cursor-not-allowed" : ""
					}`}
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<span className="flex items-center justify-center">
							<svg
								aria-hidden="true"
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
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
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Sending…
						</span>
					) : (
						"Send Message"
					)}
				</button>

				<button
					type="button"
					onClick={handleClearClick}
					onBlur={handleClearBlur}
					className={`px-6 py-3 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
						confirming
							? "bg-red-600 text-white hover:bg-red-700"
							: "border border-gray-300 text-gray-700 hover:bg-gray-50"
					}`}
					disabled={isSubmitting}
					aria-label={confirming ? "Confirm clear form" : "Clear form"}
				>
					{confirming ? "Confirm?" : "Clear"}
				</button>
			</div>

			{lastSaved && (
				<div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
					<FaCheck className="mr-1" aria-hidden />
					Draft saved at {lastSaved.toLocaleTimeString()}
				</div>
			)}
		</>
	);
}
