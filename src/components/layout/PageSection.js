const variants = {
	white: "bg-white",
	muted: "bg-gray-50",
	secondary: "bg-secondary-light/80",
	accent: "bg-accent-50/80",
};

export default function PageSection({
	children,
	variant = "white",
	className = "",
	id,
	bordered = false,
}) {
	return (
		<section
			id={id}
			className={`py-16 md:py-20 relative ${variants[variant] || variants.white} ${className}`}
		>
			{bordered && (
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
					aria-hidden
				/>
			)}
			<div className="container mx-auto px-4">{children}</div>
		</section>
	);
}
