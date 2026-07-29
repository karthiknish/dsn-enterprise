"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import AnalyticsInsightsPanel from "./AnalyticsInsightsPanel";
import AnalyticsMetricCards from "./AnalyticsMetricCards";
import AnalyticsPeriodSelector from "./AnalyticsPeriodSelector";
import AnalyticsReferrersTable from "./AnalyticsReferrersTable";
import AnalyticsTopPagesTable from "./AnalyticsTopPagesTable";
import AnalyticsTrafficTrendSection from "./AnalyticsTrafficTrendSection";

export default function AnalyticsDashboard({ initialPeriod = "30d" }) {
	const { user, loading: authLoading } = useAuth();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [period, setPeriod] = useState(initialPeriod);

	/**
	 * Data is fetched client-side with the caller's Firebase ID token. The page
	 * used to fetch on the server, which ran before any auth check and embedded
	 * the payload in HTML served to anonymous requests.
	 */
	const load = useCallback(async (rangeId) => {
		setLoading(true);
		setError(null);
		try {
			const current = auth.currentUser;
			if (!current) throw new Error("Your session has expired. Sign in again.");

			const token = await current.getIdToken();
			const response = await fetch(`/api/analytics?period=${rangeId}`, {
				headers: { Authorization: `Bearer ${token}` },
				cache: "no-store",
			});
			const result = await response.json().catch(() => ({}));

			if (response.status === 401) {
				throw new Error("Your session has expired. Sign in again.");
			}
			if (response.status === 403) {
				throw new Error("This account is not authorised to view analytics.");
			}
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
	}, []);

	// Wait for Firebase to resolve the session before the first request,
	// otherwise the initial load races auth and always 401s on a cold page.
	useEffect(() => {
		if (authLoading) return;
		if (!user) {
			setLoading(false);
			setError("Sign in to view analytics.");
			return;
		}
		load(initialPeriod);
	}, [authLoading, user, initialPeriod, load]);

	const handlePeriodChange = async (rangeId) => {
		setPeriod(rangeId);
		await load(rangeId);
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
					onClick={() => load(period)}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					Retry
				</button>
			</div>
		);
	}

	// Read by metric name rather than array position, so reordering the request
	// in analytics-data.js cannot silently relabel this value.
	const bounceRateRaw = data?.metricsByName?.bounceRate ?? null;
	const noData = data && data.hasData === false;

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

			{/* GA4 returning no rows is not the same as a quiet site. Saying so
			    prevents a disconnected property from reading as real zeros. */}
			{noData && (
				<div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
					<p className="font-semibold mb-1">
						No analytics data for this period
					</p>
					<p className="text-sm">
						Google Analytics returned no rows. If this persists, confirm the
						site is sending events to the configured GA4 property — the figures
						below are placeholders, not measured zeros.
					</p>
				</div>
			)}

			<AnalyticsMetricCards
				metrics={data?.metrics}
				metricsByName={data?.metricsByName}
			/>
			<AnalyticsTrafficTrendSection trends={data?.trends || []} />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<AnalyticsReferrersTable referrers={data?.referrers || []} />
				<AnalyticsTopPagesTable topPages={data?.topPages || []} />
				<AnalyticsInsightsPanel bounceRateRaw={bounceRateRaw} />
			</div>
		</div>
	);
}
