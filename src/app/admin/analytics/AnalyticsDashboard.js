"use client";

import { useState } from "react";
import AnalyticsInsightsPanel from "./AnalyticsInsightsPanel";
import AnalyticsMetricCards from "./AnalyticsMetricCards";
import AnalyticsPeriodSelector from "./AnalyticsPeriodSelector";
import AnalyticsReferrersTable from "./AnalyticsReferrersTable";
import AnalyticsTopPagesTable from "./AnalyticsTopPagesTable";
import AnalyticsTrafficTrendSection from "./AnalyticsTrafficTrendSection";

export default function AnalyticsDashboard({
	initialData = null,
	initialPeriod = "30d",
	initialError = null,
}) {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(initialError);
	const [period, setPeriod] = useState(initialPeriod);

	const handlePeriodChange = async (rangeId) => {
		setPeriod(rangeId);

		if (rangeId === initialPeriod && initialData && !initialError) {
			setData(initialData);
			setError(null);
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`/api/analytics?period=${rangeId}`);
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to fetch analytics");
			}

			setData(result);
		} catch (err) {
			console.error("Analytics fetch error:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading && !data && !error) {
		return (
			<output
				className="flex items-center justify-center min-h-[40vh]"
				aria-live="polite"
			>
				<span className="sr-only">Loading analytics</span>
				<div
					className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"
					aria-hidden
				/>
			</output>
		);
	}

	if (error) {
		return (
			<div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800">
				<h2 className="text-lg font-semibold mb-2">Analytics Error</h2>
				<p className="mb-4">{error}</p>
				<button
					type="button"
					onClick={() => window.location.reload()}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					Retry
				</button>
			</div>
		);
	}

	const bounceRateRaw = data?.metrics?.[3]?.value;

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="sr-only">Analytics</h1>
					<p className="text-sm text-gray-500">Website performance overview</p>
				</div>
				<AnalyticsPeriodSelector
					period={period}
					onPeriodChange={handlePeriodChange}
				/>
			</div>

			{loading && (
				<div className="fixed top-20 right-8 z-50">
					<div className="animate-spin rounded-full h-6 w-6 border-2 border-accent border-t-transparent" />
				</div>
			)}

			<AnalyticsMetricCards metrics={data?.metrics} />
			<AnalyticsTrafficTrendSection trends={data?.trends || []} />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<AnalyticsReferrersTable referrers={data?.referrers || []} />
				<AnalyticsTopPagesTable topPages={data?.topPages || []} />
				<AnalyticsInsightsPanel bounceRateRaw={bounceRateRaw} />
			</div>
		</div>
	);
}
