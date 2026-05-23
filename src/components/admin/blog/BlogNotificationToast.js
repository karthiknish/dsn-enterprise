"use client";

export default function BlogNotificationToast({ notification, onDismiss }) {
	if (!notification) return null;

	const toneClasses = {
		error: "bg-red-50 border border-red-200 text-red-800",
		success: "bg-accent-50 border border-accent-200 text-accent-800",
		default: "bg-gray-50 border border-gray-200 text-gray-800",
	};

	return (
		<div
			role={notification.type === "error" ? "alert" : "status"}
			className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn max-w-[min(100vw-2rem,24rem)] ${
				toneClasses[notification.type] || toneClasses.default
			}`}
		>
			{notification.type === "error" && (
				<svg
					aria-hidden="true"
					className="w-5 h-5 text-red-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			)}
			{notification.type === "success" && (
				<svg
					aria-hidden="true"
					className="w-5 h-5 text-accent"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			)}
			<span className="font-medium">{notification.message}</span>
			<button
				type="button"
				onClick={onDismiss}
				className="ml-2 shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
				aria-label="Dismiss notification"
			>
				<svg
					aria-hidden="true"
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
