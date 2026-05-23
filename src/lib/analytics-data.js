import { BetaAnalyticsDataClient } from "@google-analytics/data";

const dateRangeMap = {
	"7d": "7daysAgo",
	"30d": "30daysAgo",
	"90d": "90daysAgo",
};

export async function getAnalyticsData(period = "30d") {
	const propertyId = process.env.GA_PROPERTY_ID;
	const credentialsBase64 = process.env.GOOGLE_SERVICES_JSON_BASE64;
	const startDate = dateRangeMap[period] || "30daysAgo";

	if (!propertyId) {
		throw new Error("GA_PROPERTY_ID is not configured");
	}

	if (!credentialsBase64) {
		throw new Error("GOOGLE_SERVICES_JSON_BASE64 is not configured");
	}

	const cleanBase64 = credentialsBase64.trim().replace(/^"|"$/g, "");
	const credentials = JSON.parse(
		Buffer.from(cleanBase64, "base64").toString("utf8"),
	);

	let privateKey = credentials.private_key;
	if (privateKey && typeof privateKey === "string") {
		privateKey = privateKey.replace(/\\n/g, "\n");
	}

	const client = new BetaAnalyticsDataClient({
		credentials: {
			client_email: credentials.client_email,
			private_key: privateKey,
		},
		projectId: credentials.project_id,
	});

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

	return {
		metrics: totalResponse.rows?.[0]?.metricValues || [],
		trends: trendResponse.rows || [],
		topPages: topPagesResponse.rows || [],
		referrers: referrersResponse.rows || [],
	};
}
