import { LinkButton } from "@/components/ui/button";

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
					<LinkButton
						href={primaryHref}
						variant="onDark"
						className="font-bold focus-visible:ring-offset-secondary"
					>
						{primaryLabel}
					</LinkButton>
					{secondaryHref && secondaryLabel && (
						<LinkButton
							href={secondaryHref}
							variant="outline"
							className="font-bold border-primary/30 hover:border-primary/50 bg-white/70 hover:bg-white focus-visible:ring-offset-secondary"
						>
							{secondaryLabel}
						</LinkButton>
					)}
				</div>
			</div>
		</section>
	);
}
