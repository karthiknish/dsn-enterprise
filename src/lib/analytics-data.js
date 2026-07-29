import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getServiceAccountCredentials } from "@/lib/google-credentials";

const dateRangeMap = {
	"7d": "7daysAgo",
	"30d": "30daysAgo",
	"90d": "90daysAgo",
};

/** Allowlist check so the API route can reject junk before doing any work. */
export function isValidPeriod(period) {
	return Object.hasOwn(dateRangeMap, period);
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

export async function getAnalyticsData(period = "30d") {
	const propertyId = process.env.GA_PROPERTY_ID;
	const startDate = dateRangeMap[period] || "30daysAgo";

	if (!propertyId) {
		throw new Error("GA_PROPERTY_ID is not configured");
	}

	// Throws a sanitised message if the credential is missing or malformed.
	const client = getClient();

	const property = `properties/${propertyId.replace("properties/", "")}`;
	const dateRanges = [{ startDate, endDate: "today" }];

	const [
		[totalResponse],
		[trendResponse],
		[topPagesResponse],
		[referrersResponse],
	] = await Promise.all([
		client.runReport({
			property,
			dateRanges,
			metrics: [
				{ name: "activeUsers" },
				{ name: "sessions" },
				{ name: "screenPageViews" },
				{ name: "bounceRate" },
			],
		}),
		client.runReport({
			property,
			dateRanges,
			dimensions: [{ name: "date" }],
			metrics: [{ name: "activeUsers" }, { name: "sessions" }],
			orderBys: [{ dimension: { dimensionName: "date" } }],
		}),
		client.runReport({
			property,
			dateRanges,
			dimensions: [{ name: "pagePath" }],
			metrics: [{ name: "screenPageViews" }],
			limit: 10,
		}),
		client.runReport({
			property,
			dateRanges,
			dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
			metrics: [{ name: "sessions" }],
			orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
			limit: 10,
		}),
	]);

	// `hasData` lets the UI distinguish "GA returned nothing" from "the site
	// genuinely had zero users". Without it an empty response rendered as a
	// confident row of zeros, which is how a completely disconnected GA4
	// property went unnoticed.
	const metricRow = totalResponse.rows?.[0]?.metricValues || [];

	return {
		metrics: metricRow,
		// Map by header name rather than array position. Positional access meant
		// reordering the metrics in the request above would silently relabel the
		// dashboard cards (bounce rate showing page views, etc).
		metricsByName: Object.fromEntries(
			(totalResponse.metricHeaders || []).map((h, i) => [
				h.name,
				metricRow[i]?.value ?? null,
			]),
		),
		trends: trendResponse.rows || [],
		topPages: topPagesResponse.rows || [],
		referrers: referrersResponse.rows || [],
		hasData: (totalResponse.rows?.length || 0) > 0,
		period,
	};
}
