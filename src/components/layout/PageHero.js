"use client";

import { m } from "framer-motion";
import Link from "next/link";

/**
 * @param {{ href: string, label: string }[]} [breadcrumbs]
 */
export default function PageHero({
	eyebrow,
	title,
	description,
	breadcrumbs,
	children,
	centered = true,
}) {
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
				className={`container mx-auto px-4 relative z-10 ${centered ? "max-w-4xl mx-auto text-center" : "max-w-5xl"}`}
			>
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
				{eyebrow && (
					<m.p
						className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-200 mb-3"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45 }}
					>
						{eyebrow}
					</m.p>
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
						className={`text-lg md:text-xl text-white/90 leading-relaxed ${children ? "mb-8" : ""} ${centered ? "max-w-2xl mx-auto" : "max-w-3xl"}`}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						{description}
					</m.p>
				)}
				{children && (
					<m.div
						className={`flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.15 }}
					>
						{children}
					</m.div>
				)}
			</div>
		</section>
	);
}
