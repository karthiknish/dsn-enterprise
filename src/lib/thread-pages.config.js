// Thread reference page configuration.
//
// STRATEGY (see docs/SEO-STRATEGY.md):
// The city matrix was templated on a label (a city name) that changed nothing
// substantive between pages, so Google treated 36 URLs as one page and indexed
// none of them. This generator deliberately inverts that: the variable is
// engineering data. An M6 page and an M12 page differ in every number they
// state, so they are unique by construction rather than by copywriting.
//
// Demand was measured externally before any of this was written (Google
// Keyword Planner, India):
//
//   metric thread pitch chart      210     m6/m8/m10/m12/m16/m20 thread pitch
//   npt thread chart              1600      390-590 each (~3,100 combined)
//   unc thread chart              1900     bsp thread sizes            110
//
// Against a city axis where 11 of 15 probes returned no volume at all.
//
// TIERS follow the same evidence-gated rollout as the city pages. Tier 1 is
// the set with measured demand; nothing is emitted on faith.

import { DESC_MAX, fit, TITLE_MAX } from "@/lib/seo-text";
import {
	getThreadSystem,
	METRIC_COARSE,
	METRIC_FINE,
	metricSizeSpec,
	THREAD_SYSTEMS,
} from "@/lib/thread-specs";

/**
 * Rollout gate, mirroring LOCATION_TIER_LIMIT.
 *
 * Tier 1 = the hub, the three systems with measured demand, and the six metric
 * sizes whose per-size queries were actually measured. That is 10 URLs.
 *
 * Tier 2 adds BSP, UNF and the remaining metric sizes. Raise to 2 only after
 * tier 1 is measurably indexed (`node scripts/gsc-index-coverage.mjs`), the
 * same discipline that produced the finding above.
 */
export const THREAD_TIER_LIMIT = Number(
	process.env.NEXT_PUBLIC_THREAD_TIER_LIMIT || 1,
);

/**
 * Metric sizes that get their own page, by tier.
 *
 * Tier 1 is exactly the set with measured volume: m6, m8, m10, m12, m16 and
 * m20 each returned 390-590 searches/month for the "<size> thread pitch"
 * pattern alone. The tier 2 sizes are common on drawings but were not
 * measured, so they wait for evidence rather than shipping on assumption.
 */
export const METRIC_SIZE_TIERS = {
	6: 1,
	8: 1,
	10: 1,
	12: 1,
	16: 1,
	20: 1,
	3: 2,
	4: 2,
	5: 2,
	14: 2,
	18: 2,
	22: 2,
	24: 2,
	27: 2,
	30: 2,
	36: 2,
};

/** Systems in scope for page generation, per the rollout gate. */
export function activeThreadSystems() {
	return THREAD_SYSTEMS.filter((s) => s.tier <= THREAD_TIER_LIMIT);
}

/** Metric sizes in scope, ascending by diameter. */
export function activeMetricSizes() {
	return Object.entries(METRIC_SIZE_TIERS)
		.filter(([, tier]) => tier <= THREAD_TIER_LIMIT)
		.map(([size]) => Number(size))
		.sort((a, b) => a - b);
}

/** Path for a system reference page. */
export function threadSystemPath(slug) {
	return `/threads/${slug}`;
}

/** Path for a per-size metric page. */
export function metricSizePath(size) {
	return `/threads/metric/m${size}`;
}

function buildSystemTitle(system) {
	if (system.slug === "metric") {
		return fit(
			[
				"Metric Thread Pitch Chart – Coarse & Fine | DSN",
				"Metric Thread Pitch Chart (ISO 261) | DSN",
				"Metric Thread Pitch Chart | DSN Enterprises",
				"Metric Thread Chart | DSN",
			],
			TITLE_MAX,
		);
	}
	return fit(
		[
			`${system.title} – Dimensions & Gauging | DSN`,
			`${system.title} | Dimensions | DSN Enterprises`,
			`${system.title} | Dimensions | DSN`,
			`${system.title} | DSN`,
		],
		TITLE_MAX,
	);
}

function buildSystemDescription(system) {
	const standard = system.standard.split(" / ")[0];
	// The bare blurb is the terminal fallback: `fit()` truncates mid-sentence
	// when nothing fits, and a description that stops at "...gauges made to" is
	// worse than a shorter one that ends properly.
	return fit(
		[
			`${system.blurb} Basic dimensions to ${standard}, with gauge limits and thread gauges made to order in Coimbatore.`,
			`${system.blurb} Dimensions to ${standard}, plus thread plug and ring gauges made to order.`,
			`${system.blurb} Dimensions to ${standard}. Thread gauges manufactured in Coimbatore.`,
			`${system.blurb} Dimensions to ${standard}, and thread gauges made to order.`,
			`${system.blurb}`,
		],
		DESC_MAX,
	);
}

/**
 * Per-size title. The size is the whole point of the page, so it leads.
 */
function buildSizeTitle(spec) {
	const fine = spec.fine.length > 0 ? " + Fine" : "";
	return fit(
		[
			`M${spec.diameter} Thread Pitch, Dimensions & Tap Drill | DSN`,
			`M${spec.diameter} Thread Pitch${fine} & Dimensions | DSN`,
			`M${spec.diameter} Thread Dimensions & Tap Drill | DSN`,
			`M${spec.diameter} Thread Pitch & Dimensions | DSN`,
			`M${spec.diameter} Thread Pitch | DSN`,
		],
		TITLE_MAX,
	);
}

/**
 * Per-size description. Unlike the city pages, this states numbers that are
 * different on every URL — which is the entire reason the generator exists.
 */
function buildSizeDescription(spec) {
	const { coarse } = spec;
	const fineNote =
		spec.fine.length > 0
			? ` Fine pitches ${spec.fine.map((f) => f.pitch).join(", ")} mm also tabulated.`
			: "";
	const fineNoteShort =
		spec.fine.length > 0
			? ` Fine pitches to ${spec.fine[spec.fine.length - 1].pitch} mm included.`
			: "";

	return fit(
		[
			`M${spec.diameter} coarse pitch is ${coarse.pitch} mm: pitch dia ${coarse.pitchDiameter} mm, minor ${coarse.externalMinor} mm, tap drill ${coarse.tapDrill} mm.${fineNote} Thread gauges made to order.`,
			`M${spec.diameter} coarse pitch ${coarse.pitch} mm, pitch dia ${coarse.pitchDiameter} mm, tap drill ${coarse.tapDrill} mm.${fineNoteShort} Thread gauges to IS 4218.`,
			`M${spec.diameter} thread: coarse pitch ${coarse.pitch} mm, pitch dia ${coarse.pitchDiameter} mm, minor ${coarse.externalMinor} mm, tap drill ${coarse.tapDrill} mm.${fineNoteShort}`,
			`M${spec.diameter} thread dimensions and tap drill, with coarse and fine pitch series tabulated.`,
		],
		DESC_MAX,
	);
}

function buildSizeKeywords(spec) {
	const d = spec.diameter;
	return [
		`m${d} thread pitch`,
		`m${d} thread dimensions`,
		`m${d} tap drill`,
		`m${d} pitch`,
		`m${d} thread`,
		`m${d} coarse pitch`,
		`m${d} fine pitch`,
		`m${d} pitch diameter`,
		"metric thread chart",
		"thread gauge",
		"DSN Enterprises",
	];
}

function buildSystemKeywords(system) {
	const base = [
		system.peakQuery,
		`${system.name} thread chart`,
		`${system.name} thread dimensions`,
		`${system.name} thread sizes`,
		`${system.name} thread pitch`,
		`${system.name} gauge`,
		"thread gauge manufacturer",
		"thread plug gauge",
		"thread ring gauge",
		"DSN Enterprises",
		"Coimbatore",
	];

	if (system.slug === "metric") {
		return [
			...base,
			"metric thread chart",
			"metric coarse thread",
			"metric fine thread",
			"iso 261 thread chart",
		];
	}
	return base;
}

/** Every system reference page in scope. */
export function generateThreadSystemPages() {
	return activeThreadSystems().map((system) => ({
		kind: "system",
		system: system.slug,
		systemName: system.name,
		tier: system.tier,
		path: threadSystemPath(system.slug),
		title: buildSystemTitle(system),
		description: buildSystemDescription(system),
		keywords: buildSystemKeywords(system),
		priority: system.tier === 1 ? 0.7 : 0.6,
	}));
}

/**
 * Every per-size metric page in scope. The spec is resolved at generation time
 * so a size that has no coarse pitch in the ISO 261 series is skipped rather
 * than emitting a page with holes in it.
 */
export function generateMetricSizePages() {
	return activeMetricSizes()
		.map((size) => {
			const spec = metricSizeSpec(size);
			if (!spec) return null;
			return {
				kind: "size",
				system: "metric",
				size,
				slug: `m${size}`,
				spec,
				tier: METRIC_SIZE_TIERS[size],
				path: metricSizePath(size),
				title: buildSizeTitle(spec),
				description: buildSizeDescription(spec),
				keywords: buildSizeKeywords(spec),
				priority: METRIC_SIZE_TIERS[size] === 1 ? 0.6 : 0.5,
			};
		})
		.filter(Boolean);
}

/** Look up a single size page. */
export function getMetricSizePage(size) {
	return generateMetricSizePages().find((p) => p.size === size) || null;
}

/** Look up a single system page. */
export function getThreadSystemPage(slug) {
	return generateThreadSystemPages().find((p) => p.system === slug) || null;
}

/**
 * Parse a size segment from the URL. Accepts `m6` and also `m6x1` / `m6-1`
 * forms, because drawings and search queries both use the pitch-qualified
 * form and a reader may well type it.
 */
export function parseSizeSlug(slug) {
	if (typeof slug !== "string") return null;
	const match = /^m(\d+(?:[.,]\d+)?)(?:[x-]\d+(?:[.,]\d+)?)?$/i.exec(
		slug.trim(),
	);
	if (!match) return null;
	const size = Number(match[1].replace(",", "."));
	return Number.isFinite(size) ? size : null;
}

/** Sizes offered as "related" links from a given size page. */
export function relatedMetricSizes(size, limit = 6) {
	const all = generateMetricSizePages().map((p) => p.size);
	const index = all.indexOf(size);
	if (index === -1) return all.slice(0, limit);

	const ordered = [];
	for (
		let offset = 1;
		offset < all.length && ordered.length < limit;
		offset += 1
	) {
		const next = all[index + offset];
		const prev = all[index - offset];
		if (next !== undefined) ordered.push(next);
		if (prev !== undefined && ordered.length < limit) ordered.push(prev);
	}
	return ordered;
}

/** Whether a metric size exists in the ISO 261 coarse series at all. */
export function isKnownMetricSize(size) {
	return METRIC_COARSE.some(([d]) => d === size);
}

/** Fine pitch list for a size, used by the size page body. */
export function finePitchesForSize(size) {
	return METRIC_FINE[size] || [];
}

export { getThreadSystem };
