const variants = {
	white: "bg-white",
	muted: "bg-surface-muted",
	subtle: "bg-surface-subtle",
	secondary: "bg-secondary-light",
	accent: "bg-accent-50",
	warm: "bg-surface-warm",
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
