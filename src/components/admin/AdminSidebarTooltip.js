"use client";

import { useState } from "react";

export default function AdminSidebarTooltip({ children, content }) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div
			className="relative flex items-center justify-center"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			{children}
			{isVisible && (
				<div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
					{content}
				</div>
			)}
		</div>
	);
}
