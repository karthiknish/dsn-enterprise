export default function SurfaceCard({
	children,
	className = "",
	hover = false,
	as: Component = "div",
}) {
	return (
		<Component
			className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm ${
				hover
					? "transition-all duration-300 hover:border-accent/25 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5"
					: ""
			} ${className}`}
		>
			{children}
		</Component>
	);
}
