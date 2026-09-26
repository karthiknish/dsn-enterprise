/**
 * Links the first mention of a product line in an article body to that line's
 * product page.
 *
 * The 26 Sep 2026 Search Console pass (docs/SEO-STRATEGY.md §2O) found the
 * product pages ranking 18–56 for every buying-intent query they are titled
 * for — "plain snap gauges manufacturer" 18.6, "npt thread gauges
 * manufacturer" 26.8, "thread gauge manufacturers in india" 48 — while the blog
 * holds the site's only page-one rankings. The product pages already had the
 * right words; what they lacked was internal signal. Every inbound link they
 * had came from the site chrome or a CTA box, and neither says what the target
 * page is about the way a descriptive in-text anchor does.
 *
 * So the article's own wording becomes the anchor. No text is added or
 * changed; an existing phrase is wrapped. That keeps rule 5 (no invented
 * claims) out of play and means the edit is undone by removing one call.
 *
 * Rules, each for a reason:
 * - One link per target page. Repeating a link to the same URL passes nothing
 *   extra and reads as spam.
 * - At most `MAX_LINKS` per article, for the same reason.
 * - Never inside an existing link, a heading, code, or a table caption —
 *   nested anchors are invalid, and a linked heading changes the outline.
 * - A target the article already links to is skipped, so an editor's own
 *   link always wins.
 * - Patterns are ordered most specific first, so "API thread gauge" goes to
 *   the API page before "thread gauge" can claim it for the thread page.
 *
 * Every path here must exist in `known-paths.js`, otherwise the link 404s.
 */

export const MAX_LINKS = 3;

export const PRODUCT_MENTIONS = [
	{
		path: "/products/api-gauges",
		pattern: /\bAPI (?:5B |7-2 )?(?:thread |master )?gauges?\b/i,
	},
	{ path: "/products/snap-gauges", pattern: /\bsnap gauges?\b/i },
	{
		path: "/products/thread-gauges",
		pattern:
			/\b(?:thread (?:plug|ring) gauges?|(?:NPT|BSP|BSPT|metric) thread gauges?|thread gauges?)\b/i,
	},
	{
		path: "/products/special-gauges",
		pattern: /\b(?:custom|special|spline|form) gauges?\b/i,
	},
	{
		path: "/products/plain-gauges",
		pattern: /\b(?:plain (?:plug|ring) gauges?|plain gauges?)\b/i,
	},
	{
		// A bare "plug gauge" in a thread article is a thread plug gauge, so it
		// only counts as a plain-gauge mention in an article that is not about
		// threads.
		path: "/products/plain-gauges",
		pattern: /\bplug gauges?\b/i,
		unlessArticleMatches: /\bthread/i,
	},
];

// Elements whose text must never be wrapped in a link.
const SKIP_TAGS = new Set([
	"a",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"code",
	"pre",
	"caption",
	"figcaption",
	"button",
	"script",
	"style",
]);

const TAG = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

function alreadyLinked(html, path) {
	const escaped = path.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
	return new RegExp(
		`href=["'](?:https?://[^"']*)?${escaped}/?["'#?]`,
		"i",
	).test(html);
}

/**
 * The first non-overlapping match for each unused target in one text run.
 * Targets are tried in `PRODUCT_MENTIONS` order, so a more specific pattern
 * claims its span before a broader one can match inside it.
 */
function findRanges(text, targets, used, budget) {
	const ranges = [];
	for (const entry of targets) {
		if (ranges.length >= budget) break;
		if (used.has(entry.path)) continue;
		const global = new RegExp(entry.pattern.source, "gi");
		for (const match of text.matchAll(global)) {
			const start = match.index;
			const end = start + match[0].length;
			if (ranges.some((r) => start < r.end && end > r.start)) continue;
			ranges.push({ start, end, path: entry.path });
			used.add(entry.path);
			break;
		}
	}
	return ranges.sort((a, b) => a.start - b.start);
}

/**
 * @param {string} html - the article body as stored
 * @returns {string} the same HTML with up to MAX_LINKS product links added
 */
export function linkProductMentions(html) {
	if (typeof html !== "string" || html === "") return html ?? "";

	const targets = PRODUCT_MENTIONS.filter(
		(entry) =>
			!alreadyLinked(html, entry.path) &&
			!entry.unlessArticleMatches?.test(html),
	);
	if (targets.length === 0) return html;

	const used = new Set();
	// Depth per skipped tag name; text is linkable only when all are zero.
	const open = new Map();
	const skipping = () => [...open.values()].some((depth) => depth > 0);

	const linkText = (text) => {
		const budget = MAX_LINKS - used.size;
		if (budget <= 0 || skipping() || text.trim() === "") return text;
		const ranges = findRanges(text, targets, used, budget);
		if (ranges.length === 0) return text;
		let result = "";
		let last = 0;
		for (const { start, end, path } of ranges) {
			result += `${text.slice(last, start)}<a href="${path}">${text.slice(start, end)}</a>`;
			last = end;
		}
		return result + text.slice(last);
	};

	let out = "";
	let cursor = 0;
	for (const match of html.matchAll(TAG)) {
		out += linkText(html.slice(cursor, match.index));
		out += match[0];
		cursor = match.index + match[0].length;

		const name = match[1].toLowerCase();
		if (!SKIP_TAGS.has(name) || match[0].endsWith("/>")) continue;
		const delta = match[0].startsWith("</") ? -1 : 1;
		open.set(name, Math.max(0, (open.get(name) ?? 0) + delta));
	}
	return out + linkText(html.slice(cursor));
}
