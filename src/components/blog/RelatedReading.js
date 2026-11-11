import Link from "next/link";

/**
 * Curated further-reading links for commercial pages.
 *
 * Server-rendered on purpose. The links have to exist in the HTML Google
 * fetches, not appear after hydration, otherwise they pass no crawl signal at
 * all and the work of writing them is wasted. Copy lives in
 * content/related-reading.js.
 */
export default function RelatedReading({ items, title = "Further reading" }) {
	if (!items?.length) return null;

	return (
		<section
			aria-labelledby="related-reading-heading"
			className="border-t border-gray-200 bg-white py-14"
		>
			<div className="container mx-auto px-4">
				<h2
					id="related-reading-heading"
					className="mb-6 text-2xl font-semibold text-primary"
				>
					{title}
				</h2>
				<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="group flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all hover:border-secondary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
							>
								<span className="font-semibold text-primary group-hover:text-secondary">
									{item.title}
								</span>
								<span className="mt-2 text-sm leading-relaxed text-gray-600">
									{item.note}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
