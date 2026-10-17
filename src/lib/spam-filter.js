/**
 * Content screening for the public contact endpoint.
 *
 * Targets cold B2B solicitations (lead-gen, SEO, marketing-automation pitches)
 * that arrive through the form like a real enquiry. Scoring rather than a single
 * rule keeps genuine buyers safe: one pasted link alone never blocks a message.
 *
 * Server-only.
 */

const BLOCKED_EMAIL_DOMAINS = new Set(["licscript.com"]);

const BLOCK_THRESHOLD = 4;

// Each pattern is a phrase typical of outbound sales pitches, not of someone
// asking about gauges. Weights: strong signals 3, supporting signals 2.
const SOLICITATION_PATTERNS = [
	[
		/reach (millions|thousands|more) of (businesses|customers|buyers|clients)/i,
		3,
	],
	[/\b(we|i) can help you (reach|grow|rank|get|generate|increase|scale)/i, 3],
	[
		/\b(b2b|lead generation|outreach) (system|service|campaign|automation|marketing)/i,
		3,
	],
	[
		/\b(auto(mated)? marketing|ai[- ]powered marketing|marketing automation)/i,
		3,
	],
	[
		/\b(seo|backlinks?|guest posts?)\b.*\b(service|package|ranking|first page|top ranking)/i,
		3,
	],
	[/\b(first page|top rankings?) (of )?google/i, 3],
	[/\bweb(site)? (design|development) (service|company|agency)/i, 3],
	[/\b(grow|scale) your (business|sales|revenue|leads)/i, 2],
	[/\blet'?s (talk|connect|schedule a (call|demo))/i, 2],
	[/\b(free (trial|demo|audit|consultation)|limited[- ]time offer)/i, 2],
	[
		/\b(our|my) (team|company|agency|software|platform|product)s? (helps?|offers?|provides?|specializes)/i,
		2,
	],
	[/\bthe way we reached you\b/i, 3],
];

const URL_PATTERN = /(https?:\/\/|www\.)\S+/gi;

/**
 * @param {{ name?: string, email?: string, company?: string, message?: string }} contact
 * @returns {{ spam: boolean, score: number, reasons: string[] }}
 */
export function screenContact(contact) {
	const reasons = [];
	let score = 0;

	const domain = (contact.email || "").split("@")[1]?.toLowerCase();
	if (domain && BLOCKED_EMAIL_DOMAINS.has(domain)) {
		return { spam: true, score: 99, reasons: [`blocked-domain:${domain}`] };
	}

	const text = `${contact.message || ""} ${contact.company || ""}`;

	for (const [pattern, weight] of SOLICITATION_PATTERNS) {
		if (pattern.test(text)) {
			score += weight;
			reasons.push(`phrase:${pattern.source.slice(0, 30)}`);
		}
	}

	const urls = (contact.message || "").match(URL_PATTERN) || [];
	if (urls.length > 0) {
		score += Math.min(urls.length, 2) * 2;
		reasons.push(`urls:${urls.length}`);
	}

	return { spam: score >= BLOCK_THRESHOLD, score, reasons };
}
