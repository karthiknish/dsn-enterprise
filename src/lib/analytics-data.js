import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getServiceAccountCredentials } from "@/lib/google-credentials";
import { getLeadStats } from "@/lib/lead-stats";

/**
 * Number of days each selectable period covers. The day count is also used to
 * build the comparison window, so it has to be a real number rather than the
 * opaque "30daysAgo" string GA4 accepts.
 */
const PERIOD_DAYS = {
	"7d": 7,
	"30d": 30,
	"90d": 90,
	"365d": 365,
};

export const ANALYTICS_PERIODS = Object.keys(PERIOD_DAYS);

/** Allowlist check so the API route can reject junk before doing any work. */
export function isValidPeriod(period) {
	return Object.hasOwn(PERIOD_DAYS, period);
}

// The client performs a JWT exchange on construction. Building a new one per
// request added an avoidable round trip to every dashboard load, so it is
// created once per process and reused.
let cachedClient = null;

function getClient() {
	if (cachedClient) return cachedClient;
	const { clientEmail, privateKey, projectId } = getServiceAccountCredentials();
	cachedClient = new BetaAnalyticsDataClient({
		credentials: { client_email: clientEmail, private_key: privateKey },
		projectId,
	});
	return cachedClient;
}

/**
 * In-process response cache.
 *
 * The GA Data API has a per-property token quota and the dashboard is easy to
 * hammer (period switches, refresh button, a second admin tab). Serving a
 * short-lived cached payload keeps repeated views off the quota entirely.
 */
const CACHE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map();

function readCache(key) {
	const hit = responseCache.get(key);
	if (!hit) return null;
	if (Date.now() - hit.at > CACHE_TTL_MS) {
		responseCache.delete(key);
		return null;
	}
	return {
		...hit.data,
		cached: true,
		fetchedAt: new Date(hit.at).toISOString(),
	};
}

function writeCache(key, data) {
	responseCache.set(key, { at: Date.now(), data });
}

const num = (value) => {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
};

/** Percentage change, or null when there is no comparable baseline. */
function changePct(current, previous) {
	if (!Number.isFinite(current) || !Number.isFinite(previous)) return null;
	if (previous === 0) return current === 0 ? 0 : null;
	return ((current - previous) / previous) * 100;
}

function rowsByDateRange(response) {
	const headers = (response?.metricHeaders || []).map((h) => h.name);
	const buckets = { current: {}, previous: {} };

	for (const row of response?.rows || []) {
		// With two date ranges GA4 appends a synthetic `dateRange` dimension.
		const tag = row.dimensionValues?.[0]?.value || "date_range_0";
		const target = tag === "date_range_1" ? buckets.previous : buckets.current;
		headers.forEach((name, i) => {
			target[name] = num(row.metricValues?.[i]?.value);
		});
	}

	return { headers, buckets };
}

/** Turn a single-dimension report into `[{ label, ...metrics }]`. */
function mapDimensionRows(response, labelFn) {
	const headers = (response?.metricHeaders || []).map((h) => h.name);
	return (response?.rows || []).map((row) => {
		const dims = (row.dimensionValues || []).map((d) => d.value ?? "");
		const out = { label: labelFn ? labelFn(dims) : dims[0] || "(not set)" };
		headers.forEach((name, i) => {
			out[name] = num(row.metricValues?.[i]?.value);
		});
		return out;
	});
}

/**
 * Sum one metric across the two date ranges of a report.
 *
 * `rowsByDateRange` above keys off dimensionValues[0], which is only correct
 * for the totals report (no real dimensions). A filtered report — eventName
 * plus the synthetic dateRange — puts the range tag last, so it is found rather
 * than assumed.
 */
function splitByDateRange(response) {
	const out = { current: 0, previous: 0 };
	for (const row of response?.rows || []) {
		const dims = (row.dimensionValues || []).map((d) => d.value || "");
		const tag = dims.find((value) => /^date_range_\d$/.test(value));
		const value = num(row.metricValues?.[0]?.value);
		if (tag === "date_range_1") out.previous += value;
		else out.current += value;
	}
	return out;
}

/**
 * GA4 `countryId` is normally a 2-letter ISO code, but returns junk like "ZZ"
 * for unspecified regions. Anything that is not a clean alpha-2 code becomes
 * empty so the client can skip the flag icon instead of guessing.
 */
function normalizeCountryCode(raw) {
	const value = (raw || "").trim().toUpperCase();
	return /^[A-Z]{2}$/.test(value) ? value : "";
}

/** Attach each row's share of the column total, for inline bar rendering. */
function withShare(rows, metric) {
	const total = rows.reduce((acc, row) => acc + num(row[metric]), 0);
	return rows.map((row) => ({
		...row,
		share: total > 0 ? (num(row[metric]) / total) * 100 : 0,
	}));
}

const TOTAL_METRICS = [
	"activeUsers",
	"newUsers",
	"sessions",
	"screenPageViews",
	"bounceRate",
	"engagementRate",
	"averageSessionDuration",
	"screenPageViewsPerSession",
];

export async function getAnalyticsData(period = "30d") {
	const propertyId = process.env.GA_PROPERTY_ID;
	if (!propertyId) {
		throw new Error("GA_PROPERTY_ID is not configured");
	}
	if (!isValidPeriod(period)) {
		throw new Error(`Unsupported analytics period: ${period}`);
	}

	const cached = readCache(period);
	if (cached) return cached;

	// Throws a sanitised message if the credential is missing or malformed.
	const client = getClient();
	const property = `properties/${propertyId.replace("properties/", "")}`;

	const days = PERIOD_DAYS[period];
	const currentRange = { startDate: `${days}daysAgo`, endDate: "today" };
	const previousRange = {
		startDate: `${days * 2}daysAgo`,
		endDate: `${days + 1}daysAgo`,
	};
	const dateRanges = [currentRange];

	// batchRunReports keeps this to two HTTP round trips instead of seven, which
	// matters for both latency and the API's per-property request quota.
	const [[firstBatch], [secondBatch]] = await Promise.all([
		client.batchRunReports({
			property,
			requests: [
				{
					// Both windows in one report so the deltas always come from an
					// identical query shape.
					dateRanges: [currentRange, previousRange],
					metrics: TOTAL_METRICS.map((name) => ({ name })),
				},
				{
					dateRanges,
					dimensions: [{ name: "date" }],
					metrics: [
						{ name: "activeUsers" },
						{ name: "sessions" },
						{ name: "screenPageViews" },
					],
					orderBys: [{ dimension: { dimensionName: "date" } }],
					limit: 400,
				},
				{
					dateRanges,
					dimensions: [{ name: "pagePath" }],
					metrics: [
						{ name: "screenPageViews" },
						{ name: "activeUsers" },
						{ name: "averageSessionDuration" },
					],
					orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
					limit: 10,
				},
				{
					dateRanges,
					dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
					metrics: [{ name: "sessions" }, { name: "activeUsers" }],
					orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
					limit: 10,
				},
				{
					dateRanges,
					dimensions: [{ name: "sessionDefaultChannelGroup" }],
					metrics: [{ name: "sessions" }, { name: "engagementRate" }],
					orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
					limit: 8,
				},
			],
		}),
		client.batchRunReports({
			property,
			requests: [
				{
					dateRanges,
					dimensions: [{ name: "deviceCategory" }],
					metrics: [{ name: "sessions" }, { name: "bounceRate" }],
					orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
				},
				{
					dateRanges,
					dimensions: [{ name: "country" }, { name: "countryId" }],
					metrics: [{ name: "activeUsers" }, { name: "sessions" }],
					orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
					limit: 8,
				},
				{
					dateRanges,
					dimensions: [{ name: "landingPage" }],
					metrics: [{ name: "sessions" }, { name: "bounceRate" }],
					orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
					limit: 8,
				},
				{
					// The GA4 side of the lead count. Filtered to generate_lead so
					// the event volume is comparable to a lead count rather than to
					// all traffic.
					dateRanges,
					dimensions: [{ name: "eventName" }],
					metrics: [{ name: "eventCount" }],
					dimensionFilter: {
						filter: {
							fieldName: "eventName",
							stringFilter: { value: "generate_lead" },
						},
					},
				},
			],
		}),
	]);

	const [totalsRes, trendRes, topPagesRes, referrersRes, channelsRes] =
		firstBatch.reports || [];
	const [devicesRes, countriesRes, landingRes, leadEventsRes] =
		secondBatch.reports || [];

	const leadEvents = splitByDateRange(leadEventsRes);

	// Firestore is the record of enquiries that actually arrived; GA4 only sees
	// the ones whose browser ran the tracking. Best-effort so a Firestore blip
	// cannot blank the whole dashboard.
	let firestoreLeads = null;
	try {
		firestoreLeads = await getLeadStats(days);
	} catch (error) {
		console.error("Lead stats unavailable:", error?.message);
	}

	const { buckets } = rowsByDateRange(totalsRes);

	const metrics = Object.fromEntries(
		TOTAL_METRICS.map((name) => {
			const current = buckets.current[name] ?? null;
			const previous = buckets.previous[name] ?? null;
			return [
				name,
				{
					value: current,
					previous,
					change:
						current === null || previous === null
							? null
							: changePct(current, previous),
				},
			];
		}),
	);

	const trends = mapDimensionRows(trendRes).map((row) => ({
		date: row.label,
		users: row.activeUsers,
		sessions: row.sessions,
		pageViews: row.screenPageViews,
	}));

	const topPages = withShare(
		mapDimensionRows(topPagesRes).map((row) => ({
			path: row.label,
			views: row.screenPageViews,
			users: row.activeUsers,
			avgDuration: row.averageSessionDuration,
		})),
		"views",
	);

	const referrers = withShare(
		mapDimensionRows(
			referrersRes,
			(dims) => `${dims[0] || "(direct)"} / ${dims[1] || "(none)"}`,
		).map((row) => ({
			label: row.label,
			sessions: row.sessions,
			users: row.activeUsers,
		})),
		"sessions",
	);

	const channels = withShare(
		mapDimensionRows(channelsRes).map((row) => ({
			label: row.label,
			sessions: row.sessions,
			engagementRate: row.engagementRate,
		})),
		"sessions",
	);

	const devices = withShare(
		mapDimensionRows(devicesRes).map((row) => ({
			label: row.label,
			sessions: row.sessions,
			bounceRate: row.bounceRate,
		})),
		"sessions",
	);

	const countries = withShare(
		(countriesRes?.rows || []).map((row) => {
			const dims = (row.dimensionValues || []).map((d) => d.value ?? "");
			// Single date range here, so dims are exactly [country, countryId].
			// countryId is GA4's ISO 3166-1 alpha-2 code, used client-side for
			// flag icons.
			const out = {
				label: dims[0] || "(not set)",
				code: normalizeCountryCode(dims[1]),
			};
			const headers = (countriesRes?.metricHeaders || []).map((h) => h.name);
			headers.forEach((name, i) => {
				out[name] = num(row.metricValues?.[i]?.value);
			});
			// The breakdown card reads `users`; GA4's metric is `activeUsers`.
			out.users = out.activeUsers;
			return out;
		}),
		"users",
	);

	const landingPages = withShare(
		mapDimensionRows(landingRes).map((row) => ({
			label: row.label || "/",
			sessions: row.sessions,
			bounceRate: row.bounceRate,
		})),
		"sessions",
	);

	const payload = {
		period,
		days,
		range: currentRange,
		comparisonRange: previousRange,
		fetchedAt: new Date().toISOString(),
		cached: false,
		// `hasData` lets the UI distinguish "GA returned nothing" from "the site
		// genuinely had zero users". Without it an empty response rendered as a
		// confident row of zeros, which is how a completely disconnected GA4
		// property went unnoticed.
		hasData: (totalsRes?.rows?.length || 0) > 0,
		hasComparison: Object.keys(buckets.previous).length > 0,
		metrics,
		trends,
		topPages,
		referrers,
		channels,
		devices,
		countries,
		landingPages,
		// Leads, from both sides. They will not match, and that is the point:
		// GA4 counts events, Firestore counts enquiries. Showing one alone hid
		// the gap for months.
		leads: {
			ga4: {
				current: leadEvents.current,
				previous: leadEvents.previous,
				change: changePct(leadEvents.current, leadEvents.previous),
			},
			firestore: firestoreLeads
				? {
						...firestoreLeads,
						change: changePct(
							firestoreLeads.current.total,
							firestoreLeads.previous.total,
						),
					}
				: null,
		},
	};

	writeCache(period, payload);
	return payload;
}
