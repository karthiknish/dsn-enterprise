import Link from "next/link";

/**
 * The conversion path from an article to the product line it is about.
 *
 * Every blog post ended at a share bar and a "Back to All Posts" button. The
 * most-read post on the site — the IS 3455 / IS 919 article, 56 of the site's
 * 146 clicks in the 90 days to 2026-09-21 and 21 of 54 in the last 28 — closes
 * with "send us the drawing. We manufacture plain plug, ring, and snap gauges"
 * and then offered no way to do either. Rendered HTML confirms it: the article
 * body's only links were the share buttons and the ReferenceLinks block. The
 * product and contact links in the page come from the site chrome, not the
 * article.
 *
 * So the one page with traffic could not convert it, while /products/plain-gauges
 * sat on 26 impressions and 0 clicks for the same 28 days. This block is the
 * missing hop, and it sits directly under the body because a reader who has
 * just finished the article is the only reader this can convert.
 *
 * Which product line an article is about is derived from the article's own
 * fields rather than a slug→product table, so a new post gets a sensible target
 * without anyone remembering to add one. The order of the tests matters: an API
 * thread-gauge post matches both "api" and "thread", and the API line is the
 * narrower and more useful of the two.
 *
 * The four product paths are the ones the nav, the footer and
 * `known-paths.js` already use, so this cannot point at a page that does not
 * exist.
 */

const PRODUCT_LINES = {
	plain: {
		path: "/products/plain-gauges",
		linkLabel: "Plain plug, ring & snap gauges",
		heading: "Need plain gauges made to order?",
		body: "DSN Enterprises manufactures plain plug, ring and snap gauges to order at our Coimbatore works, 1–250 mm. Send us the drawing and the certificate will state the measured size, the gauge tolerance applied, and the wear limit.",
	},
	thread: {
		path: "/products/thread-gauges",
		linkLabel: "Thread plug & ring gauges",
		heading: "Need thread gauges for these threads?",
		body: "DSN Enterprises manufactures thread plug, ring and setting gauges to order in Coimbatore — metric, NPT, BSP, UNC and UNF — with NABL-traceable certificates.",
	},
	api: {
		path: "/products/api-gauges",
		linkLabel: "API 5B & 7-2 thread gauges",
		heading: "Need certified API thread gauges?",
		body: "DSN Enterprises manufactures API thread gauges to API 5B and 7-2 for casing, tubing and rotary connections, with certificates that state the gauge tolerance applied.",
	},
	special: {
		path: "/products/special-gauges",
		linkLabel: "Custom gauges to drawing",
		heading: "Need a gauge that is not in a catalogue?",
		body: "Send us the feature and the drawing. DSN Enterprises manufactures custom gauges — form, spline, ACME, buttress and taper — for the cases where a catalogue tool cannot inspect the feature.",
	},
};

/** The product line an article is about, from the article's own fields. */
export function productLineForPost(post = {}) {
	const haystack = [
		post.slug,
		post.title,
		post.metaTitle,
		...(Array.isArray(post.keywords) ? post.keywords : []),
	]
		.filter((value) => typeof value === "string")
		.join(" ")
		.toLowerCase();

	if (/\bapi\b|api 5b|api 7-2|oil|gas|oilfield|octg|rotary/.test(haystack)) {
		return PRODUCT_LINES.api;
	}
	// Before the "thread" test: an ACME or buttress post is a special-gauge job
	// even though it is also a thread gauge. "drawing" is deliberately not in
	// this pattern — most thread posts mention one.
	if (/acme|buttress|spline|stub acme/.test(haystack)) {
		return PRODUCT_LINES.special;
	}
	if (/thread/.test(haystack)) return PRODUCT_LINES.thread;
	if (/custom|special|form gauge/.test(haystack)) {
		return PRODUCT_LINES.special;
	}
	return PRODUCT_LINES.plain;
}

export default function PostCta({ post }) {
	const line = productLineForPost(post);

	return (
		<section
			aria-labelledby="post-cta-heading"
			className="mt-8 rounded-xl border border-secondary bg-secondary/20 p-6 md:p-8"
		>
			<h2
				id="post-cta-heading"
				className="text-xl md:text-2xl font-semibold text-gray-900 mb-2"
			>
				{line.heading}
			</h2>
			<p className="text-gray-700 leading-relaxed mb-5">{line.body}</p>
			<div className="flex flex-wrap gap-3">
				<Link
					href={line.path}
					className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
				>
					{line.linkLabel}
				</Link>
				<Link
					href="/contact"
					className="inline-flex items-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
				>
					Send us your drawing
				</Link>
			</div>
			<p className="mt-4 text-sm text-gray-600">
				Or call{" "}
				<a
					href="tel:+919363122005"
					className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
				>
					+91 93631 22005
				</a>
				.
			</p>
		</section>
	);
}
