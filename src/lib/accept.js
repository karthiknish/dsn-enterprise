/**
 * Accept negotiation for agent-facing representations.
 *
 * A bare wildcard Accept (curl's default, and the fallback in every browser
 * list) is treated as HTML so humans keep the app 404. JSON and markdown win
 * only when they are named explicitly and outrank HTML.
 */

const HTML_TYPES = ["text/html", "application/xhtml+xml"];
const JSON_TYPES = ["application/json"];
const MARKDOWN_TYPES = ["text/markdown", "text/plain"];

function parseAccept(header) {
	return (header || "")
		.split(",")
		.map((part) => {
			const [rawType, ...params] = part.trim().split(";");
			const type = (rawType || "").trim().toLowerCase();
			if (!type) return null;
			let q = 1;
			for (const param of params) {
				const [key, value] = param.trim().split("=");
				if (key.trim() === "q") {
					const parsed = Number.parseFloat(value);
					q = Number.isFinite(parsed) ? parsed : 0;
				}
			}
			return { type, q };
		})
		.filter(Boolean);
}

function namedScore(ranges, types) {
	let best = Number.NEGATIVE_INFINITY;
	for (const range of ranges) {
		if (types.includes(range.type) && range.q > best) {
			best = range.q;
		}
	}
	return best;
}

/**
 * @param {string | null} acceptHeader
 * @param {{ defaultFormat?: "html" | "json" | "markdown" }} [opts]
 * @returns {"html" | "json" | "markdown"}
 */
export function preferredFormat(acceptHeader, { defaultFormat = "html" } = {}) {
	const ranges = parseAccept(acceptHeader);
	if (ranges.length === 0) return defaultFormat;

	const html = namedScore(ranges, HTML_TYPES);
	const json = namedScore(ranges, JSON_TYPES);
	const markdown = namedScore(ranges, MARKDOWN_TYPES);

	if (json < 0 && html < 0 && markdown < 0) return defaultFormat;

	if (json >= html && json >= markdown && json >= 0) return "json";
	if (markdown >= html && markdown >= json && markdown >= 0) return "markdown";
	return "html";
}

export const NEGOTIATE_VARY = "Accept, Accept-Encoding";
