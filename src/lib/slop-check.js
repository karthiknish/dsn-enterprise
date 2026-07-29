/**
 * Deterministic "AI slop" detector.
 *
 * The model is not trusted to grade its own prose. This module scans a draft
 * for the measurable tells of generated content and returns concrete, fixable
 * issues. The blog agent feeds those issues back for a revision pass, and the
 * admin UI shows the final report next to the draft.
 *
 * Pure function, no I/O — usable on both server and client.
 */

const BANNED_PHRASES = [
	"in today's fast-paced",
	"in today's world",
	"in the world of",
	"in the realm of",
	"in the ever-evolving",
	"ever-evolving landscape",
	"digital landscape",
	"delve into",
	"dive deep",
	"it is important to note",
	"it's important to note",
	"it's worth noting",
	"needless to say",
	"at the end of the day",
	"when it comes to",
	"plays a crucial role",
	"plays a vital role",
	"is key to unlocking",
	"unlock the power",
	"unlock the potential",
	"take it to the next level",
	"game-changer",
	"game changer",
	"cutting-edge technology",
	"state-of-the-art solutions",
	"seamless integration",
	"robust solution",
	"tailored solutions",
	"holistic approach",
	"navigate the complexities",
	"embark on a journey",
	"in conclusion",
	"in summary",
	"we've got you covered",
	"look no further",
	"the bottom line",
	"revolutionize",
	"elevate your",
	"empower your",
	"harness the power",
	"testament to",
	"paramount importance",
	"foster innovation",
	"drive success",
	"stay ahead of the curve",
	"leverage the power",
];

const HYPE_WORDS = [
	"seamless",
	"robust",
	"cutting-edge",
	"world-class",
	"best-in-class",
	"unparalleled",
	"unrivalled",
	"unrivaled",
	"revolutionary",
	"innovative",
	"transformative",
	"comprehensive",
	"holistic",
	"synergy",
	"paradigm",
	"vital",
	"crucial",
	"pivotal",
	"myriad",
	"plethora",
];

const CONNECTIVE_TICS = [
	"moreover",
	"furthermore",
	"additionally",
	"consequently",
	"notably",
	"importantly",
	"ultimately",
];

function stripMarkup(markdown = "") {
	return markdown
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[*_>#`|]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function sentences(text) {
	return text
		.split(/(?<=[.!?])\s+/)
		.map((s) => s.trim())
		.filter((s) => s.length > 2);
}

function words(text) {
	return text.split(/\s+/).filter(Boolean);
}

function countMatches(haystack, needles) {
	const found = [];
	for (const needle of needles) {
		const pattern = new RegExp(
			`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
			"gi",
		);
		const hits = haystack.match(pattern);
		if (hits) found.push({ term: needle, count: hits.length });
	}
	return found;
}

function issue(id, severity, detail, samples = []) {
	return { id, severity, detail, samples };
}

/**
 * @param {string} markdown  Draft body (markdown or HTML)
 * @param {{sources?: Array<{url:string}>}} [meta]
 * @returns {{score:number, verdict:string, wordCount:number, issues:Array}}
 */
export function checkSlop(markdown = "", meta = {}) {
	const prose = stripMarkup(markdown);
	const allWords = words(prose);
	const allSentences = sentences(prose);
	const wordCount = allWords.length;
	const issues = [];

	if (wordCount < 120) {
		return {
			score: 0,
			verdict: "too-short",
			wordCount,
			issues: [issue("length", "high", "Draft is too short to assess.")],
		};
	}

	const per1k = (n) => (n / wordCount) * 1000;

	// 1. Outright banned filler phrases.
	const banned = countMatches(prose, BANNED_PHRASES);
	if (banned.length) {
		issues.push(
			issue(
				"banned-phrases",
				"high",
				`Remove ${banned.length} filler phrase(s) that mark text as generated.`,
				banned.map((b) => `"${b.term}" ×${b.count}`),
			),
		);
	}

	// 2. Hype adjectives with no measurable meaning.
	const hype = countMatches(prose, HYPE_WORDS);
	const hypeTotal = hype.reduce((sum, h) => sum + h.count, 0);
	if (per1k(hypeTotal) > 4) {
		issues.push(
			issue(
				"hype-density",
				"medium",
				`${hypeTotal} hype adjectives (${per1k(hypeTotal).toFixed(1)} per 1k words). Replace with a number, a standard, or a tolerance.`,
				hype
					.sort((a, b) => b.count - a.count)
					.slice(0, 6)
					.map((h) => `"${h.term}" ×${h.count}`),
			),
		);
	}

	// 3. Essay-bot connectives.
	const tics = countMatches(prose, CONNECTIVE_TICS);
	const ticTotal = tics.reduce((sum, t) => sum + t.count, 0);
	if (per1k(ticTotal) > 3) {
		issues.push(
			issue(
				"connective-tics",
				"medium",
				`${ticTotal} formal connectives. Cut most of them; sentences should follow each other without signposting.`,
				tics.map((t) => `"${t.term}" ×${t.count}`),
			),
		);
	}

	// 4. "Not only X but also Y" and triadic list padding.
	const notOnly = prose.match(/not only[^.]{0,80}but also/gi) || [];
	if (notOnly.length) {
		issues.push(
			issue(
				"not-only-but-also",
				"medium",
				"Rewrite 'not only … but also' constructions as plain statements.",
				notOnly.slice(0, 3),
			),
		);
	}

	// 5. Uniform sentence length = machine rhythm.
	const lengths = allSentences.map((s) => words(s).length);
	if (lengths.length > 8) {
		const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
		const sd = Math.sqrt(
			lengths.reduce((sum, l) => sum + (l - mean) ** 2, 0) / lengths.length,
		);
		const shortShare = lengths.filter((l) => l <= 8).length / lengths.length;
		if (sd < 6 && shortShare < 0.12) {
			issues.push(
				issue(
					"flat-rhythm",
					"medium",
					`Sentence lengths are too uniform (mean ${mean.toFixed(1)}, sd ${sd.toFixed(1)}). Break some up; land a short one after a long one.`,
				),
			);
		}
	}

	// 6. Repeated sentence openers.
	const openers = {};
	for (const sentence of allSentences) {
		const first = words(sentence)[0]?.toLowerCase();
		if (first) openers[first] = (openers[first] || 0) + 1;
	}
	const repeatedOpeners = Object.entries(openers)
		.filter(([word, count]) => count >= 4 && word.length > 2)
		.sort((a, b) => b[1] - a[1]);
	if (repeatedOpeners.length) {
		issues.push(
			issue(
				"repeated-openers",
				"low",
				"Vary how sentences start.",
				repeatedOpeners.slice(0, 4).map(([w, c]) => `"${w}…" ×${c}`),
			),
		);
	}

	// 7. Em-dash overuse — a strong current tell.
	const emDashes = (markdown.match(/—/g) || []).length;
	if (per1k(emDashes) > 2.5) {
		issues.push(
			issue(
				"em-dash-overuse",
				"low",
				`${emDashes} em dashes. Keep at most one per few hundred words.`,
			),
		);
	}

	// 8. Specificity floor: real technical writing carries numbers and standards.
	const numbers = (
		prose.match(/\b\d+(?:\.\d+)?\s?(?:mm|µm|um|in|°C|%|h|kg|N)?\b/g) || []
	).length;
	const standards = (
		markdown.match(
			/\b(?:ISO|IS|DIN|ANSI|ASME|BS|JIS|EN|NABL|IATF)[\s-]?\d+/g,
		) || []
	).length;
	if (per1k(numbers) < 6) {
		issues.push(
			issue(
				"low-specificity",
				"high",
				`Only ${numbers} numeric facts in ${wordCount} words. Add tolerances, intervals, dimensions, temperatures or class designations.`,
			),
		);
	}
	if (standards === 0) {
		issues.push(
			issue(
				"no-standards",
				"medium",
				"No standard is cited (ISO/IS/DIN/ANSI/ASME). Technical readers expect at least one.",
			),
		);
	}

	// 9. Sourcing.
	const links = (markdown.match(/https?:\/\/[^\s)"']+/g) || []).length;
	const sourceCount = meta.sources?.length || 0;
	if (sourceCount === 0 && links === 0) {
		issues.push(
			issue(
				"no-sources",
				"high",
				"No sources attached. Research the claims and cite them.",
			),
		);
	}

	// 10. Throat-clearing opener.
	const firstSentence = allSentences[0] || "";
	if (
		/^(in|as|with|when|the world|today|nowadays|these days)\b/i.test(
			firstSentence,
		) &&
		words(firstSentence).length > 18
	) {
		issues.push(
			issue(
				"weak-opening",
				"medium",
				"Opening sentence is throat-clearing. Start with the specific situation, symptom or number the reader came for.",
				[firstSentence.slice(0, 140)],
			),
		);
	}

	// 11. Heading uniformity.
	const headings = markdown.match(/^#{2,3}\s+(.+)$/gm) || [];
	if (headings.length >= 4) {
		const firstWords = headings.map((h) =>
			h
				.replace(/^#+\s+/, "")
				.split(/\s+/)[0]
				.toLowerCase(),
		);
		const dominant = Math.max(
			...Object.values(
				firstWords.reduce((acc, w) => {
					acc[w] = (acc[w] || 0) + 1;
					return acc;
				}, {}),
			),
		);
		if (dominant / headings.length > 0.5) {
			issues.push(
				issue(
					"formulaic-headings",
					"low",
					"Headings follow one template. Make each one say something specific.",
					headings.slice(0, 4).map((h) => h.replace(/^#+\s+/, "")),
				),
			);
		}
	}

	const weight = { high: 18, medium: 9, low: 4 };
	const penalty = issues.reduce((sum, i) => sum + weight[i.severity], 0);
	const score = Math.max(0, 100 - penalty);

	return {
		score,
		verdict: score >= 85 ? "clean" : score >= 65 ? "needs-work" : "sloppy",
		wordCount,
		issues,
	};
}

/**
 * Compact, model-readable rendering of a report for the revision pass.
 */
export function formatSlopReport(report) {
	if (!report.issues.length) {
		return `Slop check passed (score ${report.score}/100, ${report.wordCount} words).`;
	}
	const lines = report.issues.map(
		(i) =>
			`- [${i.severity}] ${i.id}: ${i.detail}${
				i.samples?.length ? ` (e.g. ${i.samples.join("; ")})` : ""
			}`,
	);
	return `Slop check score ${report.score}/100 (${report.verdict}), ${report.wordCount} words.\n${lines.join("\n")}`;
}
