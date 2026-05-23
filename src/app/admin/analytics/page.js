import { getAnalyticsData } from "@/lib/analytics-data";
import AnalyticsDashboard from "./AnalyticsDashboard";

export default async function AnalyticsPage() {
	const initialPeriod = "30d";

	try {
		const initialData = await getAnalyticsData(initialPeriod);
		return (
			<AnalyticsDashboard
				initialData={initialData}
				initialPeriod={initialPeriod}
			/>
		);
	} catch (error) {
		return (
			<AnalyticsDashboard
				initialPeriod={initialPeriod}
				initialError={error.message || "Failed to fetch analytics"}
			/>
		);
	}
}
