"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * @param {{ href: string, label: string }[]} [breadcrumbs]
 * @param {{ src: string, alt: string }} [image] Optional hero visual. When
 *   supplied the hero switches to a two-column layout (copy left, image
 *   right) and ignores `centered`, so text-only pages get artwork without
 *   every caller re-implementing the layout.
 */
export default function PageHero({
	title,
	description,
	breadcrumbs,
	children,
	image,
	centered = true,
}) {
	const isCentered = centered && !image;
	return (
		<section className="relative bg-primary text-white py-16 md:py-20 overflow-hidden">
			<div
				className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_40px]"
				aria-hidden
			/>
			<div
				className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-transparent to-black/20 pointer-events-none"
				aria-hidden
			/>
			<div
				className={`container mx-auto px-4 relative z-10 ${
					isCentered
						? "max-w-4xl mx-auto text-center"
						: image
							? "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
							: "max-w-5xl"
				}`}
			>
				<div className={image ? "lg:col-span-7" : undefined}>
					{breadcrumbs && breadcrumbs.length > 0 && (
						<nav aria-label="Breadcrumb" className="text-sm mb-6 text-white/70">
							{breadcrumbs.map((crumb, i) => (
								<span key={crumb.href}>
									{i > 0 && <span className="mx-2">/</span>}
									{i < breadcrumbs.length - 1 ? (
										<Link
											href={crumb.href}
											className="hover:text-white transition-colors"
										>
											{crumb.label}
										</Link>
									) : (
										<span className="text-white/90">{crumb.label}</span>
									)}
								</span>
							))}
						</nav>
					)}
					<m.h1
						className="text-4xl md:text-5xl font-semibold mb-5 text-balance leading-tight"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.05 }}
					>
						{title}
					</m.h1>
					{description && (
						<m.p
							className={`text-lg md:text-xl text-white/90 leading-relaxed ${children ? "mb-8" : ""} ${isCentered ? "max-w-2xl mx-auto" : "max-w-3xl"}`}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							{description}
						</m.p>
					)}
					{children && (
						<m.div
							className={`flex flex-wrap gap-3 ${isCentered ? "justify-center" : ""}`}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.15 }}
						>
							{children}
						</m.div>
					)}
				</div>

				{image && (
					<m.div
						className="lg:col-span-5"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.15 }}
					>
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 border border-white/15 backdrop-blur-sm">
							<Image
								src={image.src}
								alt={image.alt}
								fill
								priority
								className="object-contain p-6"
								sizes="(max-width: 1024px) 100vw, 40vw"
							/>
						</div>
					</m.div>
				)}
			</div>
		</section>
	);
}
