"use client";

import { m } from "framer-motion";

export default function SectionHeader({
	title,
	description,
	align = "center",
	id,
}) {
	const isCenter = align === "center";

	return (
		<m.header
			id={id}
			className={`mb-12 md:mb-14 ${isCenter ? "text-center max-w-2xl mx-auto" : "max-w-prose"}`}
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.45 }}
		>
			<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-balance leading-tight">
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
		</m.header>
	);
}
