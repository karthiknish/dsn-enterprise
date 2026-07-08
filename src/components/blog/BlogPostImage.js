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
				className={`transition-opacity duration-500 ${
					loaded ? "opacity-100" : "opacity-0"
				} ${imageClassName}`}
			/>
		</div>
	);
}
