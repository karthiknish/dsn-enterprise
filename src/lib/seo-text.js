// Shared text-budget helpers for generated SEO pages.
//
// Titles and descriptions are budgeted in characters because that is how
// Google truncates them in the SERP — a title that overflows loses its tail,
// which is usually where the brand or the qualifier sits. Generators
// therefore build a ranked list of candidates and take the first that fits,
// rather than slicing a string and hoping.

export const TITLE_MAX = 60;
export const DESC_MAX = 158;

/**
 * Pick the first candidate that fits the budget; never truncate mid-word.
 * If nothing fits, the last candidate is cut at a word boundary and stripped
 * of trailing punctuation so the result still reads as a sentence.
 */
export function fit(candidates, max) {
	for (const c of candidates) {
		if (c.length <= max) return c;
	}
	const last = candidates[candidates.length - 1];
	if (last.length <= max) return last;
	const cut = last.slice(0, max);
	return cut
		.slice(0, cut.lastIndexOf(" "))
		.replace(/[,\-|—]$/, "")
		.trim();
}
