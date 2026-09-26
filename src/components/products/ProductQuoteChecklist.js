import { UilCheck } from "@iconscout/react-unicons";
import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from "@/lib/site";

const COMMON_ITEMS = [
	"Quantity, and whether you need GO and NO-GO as a pair or separately",
	"Whether a calibration certificate should ship with the gauges",
	"Your drawing, if you have one — it answers most of the questions above",
];

/**
 * "What to send us" block for the product hub pages.
 *
 * The product pages are where buying-intent searches land, and until 26 Sep
 * 2026 each one ended at a generic "Get a Quote" banner. A buyer who does not
 * know what a gauge maker needs to price a job has to guess, and an enquiry
 * that arrives without a size or tolerance costs a round trip before it can be
 * quoted. The list is what the contact form's message box should contain, so
 * the enquiry arrives quotable.
 *
 * Deliberately no lead times, prices or minimum quantities: none are on record
 * in the codebase, and rule 5 in docs/SEO-STRATEGY.md forbids inventing them.
 * Add them here once the client confirms figures.
 *
 * @param {string} product - the contact form's `productInterest` value
 * @param {string} productLabel - how the product is named in the heading
 * @param {string[]} items - product-specific items, shown before the common ones
 */
export default function ProductQuoteChecklist({
	product,
	productLabel,
	items = [],
}) {
	const contactHref = `/contact?product=${encodeURIComponent(product)}`;
	const whatsappHref = whatsappUrl(
		`Hello, I would like a quote for ${productLabel}s.`,
	);

	return (
		<section
			aria-labelledby="quote-checklist-heading"
			className="py-16 bg-white"
		>
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto rounded-2xl border border-secondary bg-secondary/20 p-6 md:p-10">
					<h2
						id="quote-checklist-heading"
						className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3"
					>
						What to send us for a quote on {productLabel}s
					</h2>
					<p className="text-gray-700 leading-relaxed mb-6">
						A limit gauge is made to the limits of the feature it checks, so a
						quote starts from the feature, not from a catalogue number. Send
						these and we can price the job without coming back with questions.
					</p>
					<ul className="space-y-3 mb-8">
						{[...items, ...COMMON_ITEMS].map((item) => (
							<li key={item} className="flex items-start text-gray-700">
								<UilCheck className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
								<span>{item}</span>
							</li>
						))}
					</ul>
					<div className="flex flex-wrap gap-3">
						<Link
							href={contactHref}
							className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
						>
							Request a quote
						</Link>
						<TrackedLink
							href={whatsappHref}
							kind="whatsapp"
							location={`${productLabel} quote checklist`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
						>
							Send the drawing on WhatsApp
						</TrackedLink>
					</div>
					<p className="mt-4 text-sm text-gray-600">
						Or call{" "}
						<TrackedLink
							href={`tel:${PHONE_TEL}`}
							kind="phone"
							location={`${productLabel} quote checklist`}
							className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
						>
							{PHONE_DISPLAY}
						</TrackedLink>
						.
					</p>
				</div>
			</div>
		</section>
	);
}
