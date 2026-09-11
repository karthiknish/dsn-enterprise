// Thread specification reference data.
//
// WHY THE METRIC AND UNIFIED DIMENSIONS ARE COMPUTED, NOT TRANSCRIBED
// ------------------------------------------------------------------
// The basic dimensions of any 60-degree thread follow directly from the
// profile geometry defined in the standard itself, so d2, d3 and D1 are
// derived here from those formulae instead of being copied out of a published
// table. Two reasons:
//
//   1. Verifiability. Every value can be checked against the formula, and the
//      formula is the standard's own definition of the profile.
//   2. It avoids reproducing a standards body's data tables verbatim.
//
// Cross-checked against published tables (all three formulae agree to the
// last published digit):
//
//     M6  x 1.0   d2 5.350  d3 4.773  D1 4.917
//     M8  x 1.25  d2 7.188  d3 6.466  D1 6.647
//     M10 x 1.5   d2 9.026  d3 8.160  D1 8.376
//     M12 x 1.75  d2 10.863 d3 9.853  D1 10.106
//     M20 x 2.5   d2 18.376 d3 16.933 D1 17.294
//
// WHAT IS DELIBERATELY NOT HERE
// -----------------------------
// Tolerance LIMITS (6g / 6H / 4h etc.) are absent on purpose. Those come from
// ISO 965 / IS 4218, and the published values are a rounded preferred-number
// series that does NOT reproduce from the IT formula. Measured across 104
// cells of ISO 286-1, the formula disagreed with the published table 50 times
// — including IT11 for 18-30mm, which computes to 131um against a published
// 130um. Stating a computed number where the standard states a different one
// is wrong on precisely the digit a metrology customer checks, so the
// tolerance layer is gated behind a transcription decision rather than
// generated. See docs/SEO-STRATEGY.md.
//
// Inch pipe threads (NPT, BSP) are transcribed: their basic dimensions are not
// a simple function of a single pitch because the gauging plane, taper and
// engagement lengths all move the numbers. Sources are recorded per table.

/** Height factor of a sharp 60-degree V: (sqrt(3) / 2) * P. */
const H60 = Math.sqrt(3) / 2;

/** Exact by definition (the international inch), not a rounded conversion. */
export const INCH_IN_MM = 25.4;

/** Pitch-diameter reduction per unit pitch: (3/4) * H. */
const D2_FACTOR = 0.75 * H60;

/** External minor-diameter reduction per unit pitch: 2 * (17/24) * H. */
const D3_FACTOR = 2 * (17 / 24) * H60;

/** Internal minor-diameter reduction per unit pitch: 2 * (5/8) * H. */
const D1_FACTOR = 2 * (5 / 8) * H60;

/** Round to a fixed number of decimals, avoiding -0 and float dust. */
function round(value, decimals) {
	const factor = 10 ** decimals;
	return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * ISO 68-1 / ISO 965 basic profile for a 60-degree thread.
 *
 * `decimals` defaults to 3 for millimetre sizes. Inch threads need 4: a
 * 1/4"-20 pitch diameter is 0.2175in, and rounding that to 3 places gives
 * 0.218, which is not the number on any chart.
 */
function basicProfile(diameter, pitch, decimals = 3) {
	return {
		major: round(diameter, decimals),
		pitch: round(pitch, decimals + 2 > 5 ? 5 : decimals + 2),
		pitchDiameter: round(diameter - D2_FACTOR * pitch, decimals),
		externalMinor: round(diameter - D3_FACTOR * pitch, decimals),
		internalMinor: round(diameter - D1_FACTOR * pitch, decimals),
		externalDepth: round((D3_FACTOR / 2) * pitch, decimals),
		internalDepth: round((D1_FACTOR / 2) * pitch, decimals),
	};
}

/**
 * ISO metric coarse pitch series (ISO 261). `[nominal diameter, pitch]`.
 */
export const METRIC_COARSE = [
	[1, 0.25],
	[1.2, 0.25],
	[1.4, 0.3],
	[1.6, 0.35],
	[1.8, 0.35],
	[2, 0.4],
	[2.2, 0.45],
	[2.5, 0.45],
	[3, 0.5],
	[3.5, 0.6],
	[4, 0.7],
	[5, 0.8],
	[6, 1],
	[7, 1],
	[8, 1.25],
	[10, 1.5],
	[12, 1.75],
	[14, 2],
	[16, 2],
	[18, 2.5],
	[20, 2.5],
	[22, 2.5],
	[24, 3],
	[27, 3],
	[30, 3.5],
	[33, 3.5],
	[36, 4],
	[39, 4],
	[42, 4.5],
	[45, 4.5],
	[48, 5],
	[52, 5],
	[56, 5.5],
	[60, 5.5],
	[64, 6],
];

/**
 * ISO metric fine pitch series (ISO 261), keyed by nominal diameter.
 * Only the sizes a gauge shop is routinely asked for are listed.
 */
export const METRIC_FINE = {
	3: [0.35],
	4: [0.5],
	5: [0.5],
	6: [0.75],
	8: [0.75, 1],
	10: [0.75, 1, 1.25],
	12: [1, 1.25, 1.5],
	14: [1, 1.25, 1.5],
	16: [1, 1.5],
	18: [1, 1.5, 2],
	20: [1, 1.5, 2],
	22: [1, 1.5, 2],
	24: [1.5, 2],
	27: [1.5, 2, 3],
	30: [1.5, 2, 3],
	33: [1.5, 2, 3],
	36: [1.5, 2, 3],
	39: [2, 3],
	42: [2, 3, 4],
	45: [2, 3, 4],
	48: [2, 3, 4],
	52: [3, 4],
	56: [3, 4],
	60: [3, 4],
	64: [3, 4],
};

/**
 * Width across flats for metric hexagon bolts and nuts (ISO 272, 1999 series).
 *
 * Three sizes changed in the 1999 revision and both sets are still found in
 * Indian workshops because the superseded spanners are still in toolboxes, so
 * the previous value is carried alongside rather than dropped.
 */
export const METRIC_ACROSS_FLATS = {
	3: 5.5,
	4: 7,
	5: 8,
	6: 10,
	8: 13,
	10: 16,
	12: 18,
	14: 21,
	16: 24,
	18: 27,
	20: 30,
	22: 32,
	24: 36,
	27: 41,
	30: 46,
	33: 50,
	36: 55,
	39: 60,
	42: 65,
	45: 70,
	48: 75,
	52: 80,
	56: 85,
	60: 90,
	64: 95,
};

/** Sizes whose spanner changed in the ISO 272:1999 revision. */
export const METRIC_ACROSS_FLATS_SUPERSEDED = {
	10: 17,
	12: 19,
	14: 22,
};

/**
 * Unified inch thread series (ASME B1.1). `[designation, major diameter (in),
 * threads per inch]`.
 */
export const UNC_SERIES = [
	["#0-80", 0.06, 80],
	["#1-64", 0.073, 64],
	["#2-56", 0.086, 56],
	["#3-48", 0.099, 48],
	["#4-40", 0.112, 40],
	["#5-40", 0.125, 40],
	["#6-32", 0.138, 32],
	["#8-32", 0.164, 32],
	["#10-24", 0.19, 24],
	["#12-24", 0.216, 24],
	['1/4"-20', 0.25, 20],
	['5/16"-18', 0.3125, 18],
	['3/8"-16', 0.375, 16],
	['7/16"-14', 0.4375, 14],
	['1/2"-13', 0.5, 13],
	['9/16"-12', 0.5625, 12],
	['5/8"-11', 0.625, 11],
	['3/4"-10', 0.75, 10],
	['7/8"-9', 0.875, 9],
	['1"-8', 1, 8],
	['1-1/8"-7', 1.125, 7],
	['1-1/4"-7', 1.25, 7],
	['1-3/8"-6', 1.375, 6],
	['1-1/2"-6', 1.5, 6],
];

export const UNF_SERIES = [
	["#0-80", 0.06, 80],
	["#1-72", 0.073, 72],
	["#2-64", 0.086, 64],
	["#3-56", 0.099, 56],
	["#4-48", 0.112, 48],
	["#5-44", 0.125, 44],
	["#6-40", 0.138, 40],
	["#8-36", 0.164, 36],
	["#10-32", 0.19, 32],
	["#12-28", 0.216, 28],
	['1/4"-28', 0.25, 28],
	['5/16"-24', 0.3125, 24],
	['3/8"-24', 0.375, 24],
	['7/16"-20', 0.4375, 20],
	['1/2"-20', 0.5, 20],
	['9/16"-18', 0.5625, 18],
	['5/8"-18', 0.625, 18],
	['3/4"-16', 0.75, 16],
	['7/8"-14', 0.875, 14],
	['1"-12', 1, 12],
	['1-1/8"-12', 1.125, 12],
	['1-1/4"-12', 1.25, 12],
	['1-3/8"-12', 1.375, 12],
	['1-1/2"-12', 1.5, 12],
];

/**
 * Build dimension rows for a Unified series. The 60-degree profile is the same
 * as ISO metric, so the same constants apply with the pitch expressed in
 * inches; values are reported in both inch and millimetre because Indian
 * drawings mix the two constantly.
 */
export function unifiedRows(series) {
	return series.map(([designation, major, tpi]) => {
		const pitch = 1 / tpi;
		const profile = basicProfile(major, pitch, 4);
		return {
			designation,
			major: round(major, 4),
			tpi,
			pitch: round(pitch, 5),
			pitchMm: round(pitch * 25.4, 3),
			pitchDiameter: profile.pitchDiameter,
			pitchDiameterMm: round(profile.pitchDiameter * 25.4, 3),
			externalMinor: profile.externalMinor,
			externalMinorMm: round(profile.externalMinor * 25.4, 3),
			internalMinor: profile.internalMinor,
			internalMinorMm: round(profile.internalMinor * 25.4, 3),
		};
	});
}

/**
 * NPT taper pipe thread, ASME B1.20.1 basic dimensions.
 *
 * Transcribed, not computed: the gauging plane sits L1 in from the small end
 * and the diameter grows 1:16 along the thread, so a single pitch figure does
 * not determine the gauging diameters.
 *
 * Source: ASME B1.20.1 basic dimensions as tabulated at
 * https://en.wikipedia.org/wiki/National_pipe_thread
 *
 * E1 is the pitch diameter at hand-tight engagement (L1); E2 is the pitch
 * diameter at wrench-tight engagement (L2). D is the actual outside diameter
 * of the pipe, which is NOT the nominal size — 1/2" NPT measures 0.840".
 */
export const NPT_SERIES = [
	{
		size: "1/16",
		tpi: 27,
		pitch: 0.03704,
		pitchMm: 0.941,
		l1: 0.16,
		e1: 0.28118,
		l2: 0.2611,
		e2: 0.2875,
		d: 0.313,
		dMm: 7.95,
	},
	{
		size: "1/8",
		tpi: 27,
		pitch: 0.03704,
		pitchMm: 0.941,
		l1: 0.1615,
		e1: 0.3736,
		l2: 0.2639,
		e2: 0.38,
		d: 0.405,
		dMm: 10.287,
	},
	{
		size: "1/4",
		tpi: 18,
		pitch: 0.05556,
		pitchMm: 1.411,
		l1: 0.2278,
		e1: 0.49163,
		l2: 0.4018,
		e2: 0.5025,
		d: 0.54,
		dMm: 13.716,
	},
	{
		size: "3/8",
		tpi: 18,
		pitch: 0.05556,
		pitchMm: 1.411,
		l1: 0.24,
		e1: 0.62701,
		l2: 0.4078,
		e2: 0.6375,
		d: 0.675,
		dMm: 17.145,
	},
	{
		size: "1/2",
		tpi: 14,
		pitch: 0.07143,
		pitchMm: 1.814,
		l1: 0.32,
		e1: 0.77843,
		l2: 0.5337,
		e2: 0.79178,
		d: 0.84,
		dMm: 21.336,
	},
	{
		size: "3/4",
		tpi: 14,
		pitch: 0.07143,
		pitchMm: 1.814,
		l1: 0.339,
		e1: 0.98887,
		l2: 0.5457,
		e2: 1.00178,
		d: 1.05,
		dMm: 26.67,
	},
	{
		size: "1",
		tpi: 11.5,
		pitch: 0.08696,
		pitchMm: 2.209,
		l1: 0.4,
		e1: 1.23863,
		l2: 0.6828,
		e2: 1.25631,
		d: 1.315,
		dMm: 33.401,
	},
	{
		size: "1-1/4",
		tpi: 11.5,
		pitch: 0.08696,
		pitchMm: 2.209,
		l1: 0.42,
		e1: 1.58338,
		l2: 0.7068,
		e2: 1.60131,
		d: 1.66,
		dMm: 42.164,
	},
	{
		size: "1-1/2",
		tpi: 11.5,
		pitch: 0.08696,
		pitchMm: 2.209,
		l1: 0.42,
		e1: 1.82234,
		l2: 0.7235,
		e2: 1.84131,
		d: 1.9,
		dMm: 48.26,
	},
	{
		size: "2",
		tpi: 11.5,
		pitch: 0.08696,
		pitchMm: 2.209,
		l1: 0.436,
		e1: 2.29627,
		l2: 0.7565,
		e2: 2.3163,
		d: 2.375,
		dMm: 60.325,
	},
	{
		size: "2-1/2",
		tpi: 8,
		pitch: 0.125,
		pitchMm: 3.175,
		l1: 0.682,
		e1: 2.76216,
		l2: 1.1375,
		e2: 2.79063,
		d: 2.875,
		dMm: 73.025,
	},
	{
		size: "3",
		tpi: 8,
		pitch: 0.125,
		pitchMm: 3.175,
		l1: 0.766,
		e1: 3.3885,
		l2: 1.2,
		e2: 3.41563,
		d: 3.5,
		dMm: 88.9,
	},
	{
		size: "4",
		tpi: 8,
		pitch: 0.125,
		pitchMm: 3.175,
		l1: 0.844,
		e1: 4.38713,
		l2: 1.3,
		e2: 4.41563,
		d: 4.5,
		dMm: 114.3,
	},
	{
		size: "6",
		tpi: 8,
		pitch: 0.125,
		pitchMm: 3.175,
		l1: 0.958,
		e1: 6.50597,
		l2: 1.5125,
		e2: 6.54063,
		d: 6.625,
		dMm: 168.275,
	},
];

/**
 * British Standard Pipe, parallel (G, BSPP) and taper (R, BSPT).
 *
 * Whitworth form: 55-degree included angle with rounded crests and roots, so
 * the metric 60-degree constants do NOT apply. Major and minor diameters are
 * as tabulated for the external thread; BSPT shares the same diameter basis at
 * the gauge length and differs only in the taper. The nominal size is a
 * historic bore reference, not a diameter — 1/2" BSP has a 20.955mm major
 * diameter.
 *
 * Source: ISO 228-1 / ISO 7-1 dimensions as tabulated at
 * https://en.wikipedia.org/wiki/British_Standard_Pipe
 */
export const BSP_SERIES = [
	{
		size: "1/16",
		tpi: 28,
		pitchMm: 0.907,
		major: 7.723,
		minor: 6.561,
		gaugeLengthMm: 4.0,
		tapDrillMm: 6.6,
	},
	{
		size: "1/8",
		tpi: 28,
		pitchMm: 0.907,
		major: 9.728,
		minor: 8.566,
		gaugeLengthMm: 4.0,
		tapDrillMm: 8.6,
	},
	{
		size: "1/4",
		tpi: 19,
		pitchMm: 1.337,
		major: 13.157,
		minor: 11.445,
		gaugeLengthMm: 6.0,
		tapDrillMm: 11.5,
	},
	{
		size: "3/8",
		tpi: 19,
		pitchMm: 1.337,
		major: 16.662,
		minor: 14.95,
		gaugeLengthMm: 6.4,
		tapDrillMm: 15.0,
	},
	{
		size: "1/2",
		tpi: 14,
		pitchMm: 1.814,
		major: 20.955,
		minor: 18.631,
		gaugeLengthMm: 8.2,
		tapDrillMm: 18.7,
	},
	{
		size: "5/8",
		tpi: 14,
		pitchMm: 1.814,
		major: 22.911,
		minor: 20.587,
		gaugeLengthMm: 8.2,
		tapDrillMm: 20.7,
	},
	{
		size: "3/4",
		tpi: 14,
		pitchMm: 1.814,
		major: 26.441,
		minor: 24.117,
		gaugeLengthMm: 9.5,
		tapDrillMm: 24.2,
	},
	{
		size: "7/8",
		tpi: 14,
		pitchMm: 1.814,
		major: 30.201,
		minor: 27.877,
		gaugeLengthMm: 9.5,
		tapDrillMm: 28.0,
	},
	{
		size: "1",
		tpi: 11,
		pitchMm: 2.309,
		major: 33.249,
		minor: 30.291,
		gaugeLengthMm: 10.4,
		tapDrillMm: 30.4,
	},
	{
		size: "1-1/4",
		tpi: 11,
		pitchMm: 2.309,
		major: 41.91,
		minor: 38.952,
		gaugeLengthMm: 12.7,
		tapDrillMm: 39.1,
	},
	{
		size: "1-1/2",
		tpi: 11,
		pitchMm: 2.309,
		major: 47.803,
		minor: 44.845,
		gaugeLengthMm: 12.7,
		tapDrillMm: 45.0,
	},
	{
		size: "2",
		tpi: 11,
		pitchMm: 2.309,
		major: 59.614,
		minor: 56.656,
		gaugeLengthMm: 15.9,
		tapDrillMm: 56.8,
	},
	{
		size: "2-1/2",
		tpi: 11,
		pitchMm: 2.309,
		major: 75.184,
		minor: 72.226,
		gaugeLengthMm: 17.5,
		tapDrillMm: 72.4,
	},
	{
		size: "3",
		tpi: 11,
		pitchMm: 2.309,
		major: 87.884,
		minor: 84.926,
		gaugeLengthMm: 20.6,
		tapDrillMm: 85.1,
	},
	{
		size: "4",
		tpi: 11,
		pitchMm: 2.309,
		major: 113.03,
		minor: 110.072,
		gaugeLengthMm: 25.4,
		tapDrillMm: 110.2,
	},
];

/**
 * Tapping drill for a metric thread: d - P, the standard rule for roughly
 * 75-80% thread engagement.
 *
 * Reported to two decimals deliberately. Published tap drill charts disagree
 * at the half-tenth on exactly the sizes where d - P lands there: M8x1.25 is
 * given as 6.8 (rounded up from 6.75) while M12x1.75 is given as 10.2 (rounded
 * down from 10.25). There is no single convention behind that — the charts are
 * quoting the nearest stocked drill. Stating the arithmetic value and telling
 * the reader to pick the nearest preferred drill is correct for every size,
 * where picking a rounding rule would be wrong on one of the two.
 */
export function metricTapDrill(diameter, pitch) {
	return round(diameter - pitch, 2);
}

/** Metric fine pitches offered for a nominal diameter. */
export function finePitchesFor(diameter) {
	return METRIC_FINE[diameter] || [];
}

/** Coarse pitch for a nominal diameter, or null if outside the series. */
export function coarsePitchFor(diameter) {
	const entry = METRIC_COARSE.find(([d]) => d === diameter);
	return entry ? entry[1] : null;
}

/**
 * Full specification block for one metric size, including every fine pitch
 * alternative. This is the payload each per-size page renders.
 */
export function metricSizeSpec(diameter) {
	const coarse = coarsePitchFor(diameter);
	if (coarse === null) return null;

	const fine = finePitchesFor(diameter);

	return {
		diameter,
		designation: `M${diameter}`,
		coarse: {
			pitch: coarse,
			...basicProfile(diameter, coarse),
			tapDrill: metricTapDrill(diameter, coarse),
		},
		fine: fine.map((pitch) => ({
			pitch,
			...basicProfile(diameter, pitch),
			tapDrill: metricTapDrill(diameter, pitch),
		})),
		acrossFlats: METRIC_ACROSS_FLATS[diameter] ?? null,
		acrossFlatsSuperseded: METRIC_ACROSS_FLATS_SUPERSEDED[diameter] ?? null,
	};
}

/** Rows for the full metric coarse chart. */
export function metricCoarseRows() {
	return METRIC_COARSE.map(([diameter, pitch]) => ({
		designation: `M${diameter}`,
		diameter,
		pitch,
		...basicProfile(diameter, pitch),
		tapDrill: metricTapDrill(diameter, pitch),
		acrossFlats: METRIC_ACROSS_FLATS[diameter] ?? null,
	}));
}

/** Rows for the full metric fine chart. */
export function metricFineRows() {
	const rows = [];
	for (const [diameter, pitches] of Object.entries(METRIC_FINE)) {
		for (const pitch of pitches) {
			rows.push({
				designation: `M${diameter}x${pitch}`,
				diameter: Number(diameter),
				pitch,
				...basicProfile(Number(diameter), pitch),
				tapDrill: metricTapDrill(Number(diameter), pitch),
			});
		}
	}
	return rows;
}

/**
 * Thread systems that get a reference page. `tier` follows the same
 * evidence-gated rollout as the city pages: only systems with measured search
 * demand AND a reason to exist for a gauge buyer are in tier 1.
 *
 * Volume figures are Google Keyword Planner, India, and are recorded in
 * docs/SEO-STRATEGY.md. They are plan-side numbers, not observed impressions.
 */
export const THREAD_SYSTEMS = [
	{
		slug: "metric",
		name: "ISO Metric",
		title: "Metric Thread Pitch Chart",
		tier: 1,
		standard: "ISO 68-1 / ISO 261 / ISO 965",
		indianStandard: "IS 919 / IS 4218",
		angle: "60°",
		unit: "mm",
		peakQuery: "metric thread pitch chart",
		peakVolume: 210,
		blurb:
			"Coarse and fine pitch series with pitch, pitch diameter and minor diameters from M1 to M64.",
		intro:
			"Metric is the default thread system on Indian drawings, and almost every thread gauge DSN manufactures is cut to it. The tables below cover the ISO 261 coarse series and the fine pitches that are actually specified in practice, with the basic dimensions derived from the ISO 68-1 profile.",
	},
	{
		slug: "npt",
		name: "NPT",
		title: "NPT Thread Chart",
		tier: 1,
		standard: "ASME B1.20.1",
		indianStandard: "IS 554",
		angle: "60°",
		unit: "inch",
		peakQuery: "npt thread chart",
		peakVolume: 1600,
		blurb:
			"Taper pipe thread dimensions with gauging diameters at hand-tight and wrench-tight engagement.",
		intro:
			"NPT is a taper pipe thread, which is why its dimensions look nothing like a machine screw thread: the gauging plane sits L1 in from the small end and the diameter grows at 1:16 along the thread. The tables give the pitch diameter at both hand-tight and wrench-tight engagement, because a taper thread gauge is set to those planes and not to a single diameter.",
	},
	{
		slug: "unc",
		name: "UNC",
		title: "UNC Thread Chart",
		tier: 1,
		standard: "ASME B1.1",
		indianStandard: "IS 4406",
		angle: "60°",
		unit: "inch",
		peakQuery: "unc thread chart",
		peakVolume: 1900,
		blurb:
			'Unified National Coarse dimensions in inch and millimetre, covering #0 through 1-1/2".',
		intro:
			"Unified National Coarse is the inch-series default, and it still turns up on imported machinery, hydraulic fittings and legacy spares. Dimensions are given in both inch and millimetre because Indian maintenance drawings are routinely marked up in whichever unit the original equipment used.",
	},
	{
		slug: "unf",
		name: "UNF",
		title: "UNF Thread Chart",
		tier: 2,
		standard: "ASME B1.1",
		indianStandard: "IS 4406",
		angle: "60°",
		unit: "inch",
		peakQuery: "unf thread chart",
		peakVolume: null,
		blurb:
			"Unified National Fine dimensions, the fine-pitch counterpart to UNC on the same 60° form.",
		intro:
			"Unified National Fine shares the 60° form with UNC and differs only in threads per inch, which shifts every derived diameter. It is the series of choice where wall thickness or vibration resistance matters, and it is a frequent source of gauging mix-ups with UNC at the same nominal size.",
	},
	{
		slug: "bsp",
		name: "BSP",
		title: "BSP Thread Sizes Chart",
		tier: 2,
		standard: "ISO 228-1 (G, parallel) / ISO 7-1 (R, taper)",
		indianStandard: "IS 554",
		angle: "55°",
		unit: "mm",
		peakQuery: "bsp thread sizes",
		peakVolume: 110,
		blurb:
			"BSPP and BSPT major and minor diameters on the 55° Whitworth form, with gauge lengths.",
		intro:
			"BSP uses the 55° Whitworth form with rounded crests and roots, so the 60° constants used for metric and Unified do not apply and the diameters cannot be derived from them. Both the parallel (G) and taper (R) series are tabulated, along with the gauge length that a BSPT gauge is set to.",
	},
];

/** System lookup by slug. */
export function getThreadSystem(slug) {
	return THREAD_SYSTEMS.find((s) => s.slug === slug) || null;
}
