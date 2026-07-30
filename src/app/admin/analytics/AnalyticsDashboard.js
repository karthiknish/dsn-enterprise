"use client";

import { Globe, MonitorSmartphone, Radio, SignpostBig } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import AnalyticsBreakdownCard from "./AnalyticsBreakdownCard";
import AnalyticsInsightsPanel from "./AnalyticsInsightsPanel";
import AnalyticsMetricCards from "./AnalyticsMetricCards";
import AnalyticsReferrersTable from "./AnalyticsReferrersTable";
import AnalyticsToolbar from "./AnalyticsToolbar";
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
		if (rangeId === period && data) return;
		setPeriod(rangeId);
		await load(rangeId);
	};

	if (loading && !data && !error) {
		return <AnalyticsSkeleton />;
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
				<h2 className="mb-2 text-lg font-semibold">Analytics Error</h2>
				<p className="mb-4">{error}</p>
				<button
					type="button"
					onClick={() => load(period)}
					className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					Retry
				</button>
			</div>
		);
	}

	const noData = data && data.hasData === false;

	return (
		<div className="space-y-8">
			<AnalyticsToolbar
				period={period}
				onPeriodChange={handlePeriodChange}
				onRefresh={() => load(period)}
				loading={loading}
				data={data}
			/>

			{loading && (
				<div className="fixed right-8 top-20 z-50">
					<div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
				</div>
			)}

			{/* GA4 returning no rows is not the same as a quiet site. Saying so
			    prevents a disconnected property from reading as real zeros. */}
			{noData && (
				<div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
					<p className="mb-1 font-semibold">
						No analytics data for this period
					</p>
					<p className="text-sm">
						Google Analytics returned no rows. If this persists, confirm the
						site is sending events to the configured GA4 property — the figures
						below are placeholders, not measured zeros.
					</p>
				</div>
			)}

			{data?.hasComparison === false && (
				<p className="text-xs text-gray-400">
					No data in the comparison window, so period-over-period changes are
					hidden.
				</p>
			)}

			<AnalyticsMetricCards metrics={data?.metrics} days={data?.days} />

			<AnalyticsTrafficTrendSection trends={data?.trends || []} />

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<AnalyticsBreakdownCard
					title="Acquisition Channels"
					description="How visitors arrive"
					icon={Radio}
					rows={data?.channels || []}
					valueKey="sessions"
					valueLabel="Sessions"
					secondaryKey="engagementRate"
					secondaryLabel="engaged"
				/>
				<AnalyticsBreakdownCard
					title="Devices"
					description="Sessions by device category"
					icon={MonitorSmartphone}
					rows={data?.devices || []}
					valueKey="sessions"
					valueLabel="Sessions"
					secondaryKey="bounceRate"
					secondaryLabel="bounce"
				/>
			</div>

			<div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
				<AnalyticsTopPagesTable topPages={data?.topPages || []} />
				<AnalyticsReferrersTable referrers={data?.referrers || []} />
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<AnalyticsBreakdownCard
					title="Landing Pages"
					description="Where sessions start"
					icon={SignpostBig}
					rows={data?.landingPages || []}
					valueKey="sessions"
					valueLabel="Sessions"
					secondaryKey="bounceRate"
					secondaryLabel="bounce"
				/>
				<AnalyticsBreakdownCard
					title="Top Countries"
					description="Users by location"
					icon={Globe}
					rows={data?.countries || []}
					valueKey="users"
					valueLabel="Users"
					secondaryKey="sessions"
					secondaryLabel="sessions"
					secondaryFormat="count"
				/>
			</div>

			<AnalyticsInsightsPanel data={data} />
		</div>
	);
}

/**
 * Layout-shaped skeleton rather than a lone spinner, so the first paint does
 * not jump when a slow GA4 response finally lands.
 */
function AnalyticsSkeleton() {
	return (
		<output className="block space-y-8" aria-live="polite">
			<span className="sr-only">Loading analytics</span>
			<div className="h-10 w-64 animate-pulse rounded-lg bg-gray-100" />
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{[0, 1, 2, 3].map((i) => (
					<div
						key={i}
						className="h-36 animate-pulse rounded-2xl border border-gray-200/80 bg-gray-50"
					/>
				))}
			</div>
			<div className="h-80 animate-pulse rounded-2xl border border-gray-200/80 bg-gray-50" />
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{[0, 1].map((i) => (
					<div
						key={i}
						className="h-72 animate-pulse rounded-2xl border border-gray-200/80 bg-gray-50"
					/>
				))}
			</div>
		</output>
	);
}
