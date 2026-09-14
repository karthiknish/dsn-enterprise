/**
 * The hand-written Q&A for a post, rendered as a visible section.
 *
 * Rendered with native <details> so the answers are in the served HTML with no
 * client JavaScript — an answer engine and a reader get the same document, and
 * the block is still collapsible by keyboard without a hydration boundary.
 *
 * The same array feeds the post's FAQPage JSON-LD, so the markup can never
 * describe a question the page does not show.
 */
export default function PostFaq({ faqs }) {
	if (!Array.isArray(faqs) || faqs.length === 0) return null;

	return (
		<section
			aria-labelledby="post-faq-heading"
			className="mt-8 bg-white rounded-xl shadow-sm p-6 md:p-8"
		>
			<h2
				id="post-faq-heading"
				className="text-xl font-semibold text-gray-900 mb-5"
			>
				Questions this article answers
			</h2>
			<div className="divide-y divide-gray-100 border-y border-gray-100">
				{faqs.map((faq) => (
					<details key={faq.question} className="group py-4">
						<summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-gray-900">
							<span>{faq.question}</span>
							<span
								aria-hidden
								className="mt-1 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-45"
							>
								+
							</span>
						</summary>
						<p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
					</details>
				))}
			</div>
		</section>
	);
}
