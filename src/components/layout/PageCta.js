import Link from "next/link";

/**
 * Bottom-of-page call-to-action band. Uses the secondary palette so it
 * reads clearly above the primary-colored site footer.
 */
export default function PageCta({
	title,
	description,
	primaryHref = "/contact",
	primaryLabel = "Contact Us",
	secondaryHref,
	secondaryLabel,
	className = "",
}) {
	return (
		<section
			className={`py-16 md:py-20 bg-secondary border-y border-secondary-dark/25 relative ${className}`}
			aria-labelledby="page-cta-heading"
		>
			<div
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
				aria-hidden
			/>
			<div className="container mx-auto px-4 text-center">
				<h2
					id="page-cta-heading"
					className="text-3xl md:text-4xl font-semibold mb-5 text-primary-dark text-balance"
				>
					{title}
				</h2>
				{description && (
					<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary/90 leading-relaxed">
						{description}
					</p>
				)}
				<div className="flex flex-wrap justify-center gap-4">
					<Link
						href={primaryHref}
						className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
					>
						{primaryLabel}
					</Link>
					{secondaryHref && secondaryLabel && (
						<Link
							href={secondaryHref}
							className="inline-flex items-center justify-center bg-white/70 hover:bg-white text-primary-dark font-bold py-3 px-8 rounded-lg border-2 border-primary/30 hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
						>
							{secondaryLabel}
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
