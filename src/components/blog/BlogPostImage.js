"use client";

import { useState } from "react";
import Image from "next/image";

export default function BlogPostImage({
	src,
	alt,
	width,
	height,
	className = "",
	imageClassName = "",
}) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	if (error) {
		return (
			<div
				className={`relative overflow-hidden bg-gray-50 border-b border-gray-100 flex flex-col items-center justify-center text-gray-400 ${className}`}
			>
				<svg
					aria-hidden="true"
					className="w-10 h-10 mb-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span className="text-xs">Image unavailable</span>
			</div>
		);
	}

	return (
		<div className={`relative overflow-hidden bg-gray-100 ${className}`}>
			{!loaded && (
				<div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden />
			)}
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				unoptimized
				loading="lazy"
				onLoad={() => setLoaded(true)}
				onError={() => setError(true)}
				className={`transition-opacity duration-500 ${
					loaded ? "opacity-100" : "opacity-0"
				} ${imageClassName}`}
			/>
		</div>
	);
}
