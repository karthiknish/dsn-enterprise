"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
	eyebrow,
	title,
	description,
	align = "center",
	id,
}) {
	const isCenter = align === "center";

	return (
		<motion.header
			id={id}
			className={`mb-12 md:mb-14 ${isCenter ? "text-center max-w-2xl mx-auto" : "max-w-prose"}`}
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.45 }}
		>
			{eyebrow && (
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
					{eyebrow}
				</p>
			)}
			<h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance leading-tight">
				{title}
			</h2>
			{description && (
				<p className="mt-4 text-lg text-gray-600 leading-relaxed">
					{description}
				</p>
			)}
			{isCenter && (
				<div className="mt-6 flex justify-center" aria-hidden>
					<span className="h-px w-12 bg-accent/40" />
				</div>
			)}
		</motion.header>
	);
}
