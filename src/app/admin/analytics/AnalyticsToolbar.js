"use client";

import { Download, RefreshCw } from "lucide-react";
import { downloadAnalyticsCsv } from "@/lib/analytics-csv";
import { formatTimestamp, PERIOD_LABELS } from "@/lib/analytics-format";
import AnalyticsPeriodSelector from "./AnalyticsPeriodSelector";

export default function AnalyticsToolbar({
	period,
	onPeriodChange,
	onRefresh,
	loading,
	data,
}) {
	return (
		<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
				<p className="mt-1 text-sm text-gray-500">
					{PERIOD_LABELS[period] || "Website performance"}
					<span className="mx-2 text-gray-300">|</span>
					compared with the preceding {data?.days ?? "—"} days
				</p>
				<p className="mt-1 text-xs text-gray-400">
					{/* Surfaced because the payload is served from a short-lived
					    server cache to stay inside the GA4 request quota — a stale
					    timestamp would otherwise look like a stalled dashboard. */}
					Updated {formatTimestamp(data?.fetchedAt)}
					{data?.cached ? " (cached)" : ""}
				</p>
			</div>

			<div className="flex flex-wrap items-center gap-2">
				<AnalyticsPeriodSelector
					period={period}
					onPeriodChange={onPeriodChange}
					disabled={loading}
				/>
				<button
					type="button"
					onClick={onRefresh}
					disabled={loading}
					className="inline-flex items-center gap-2 rounded-lg border border-gray-200/80 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-60"
				>
					<RefreshCw
						className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
						aria-hidden
					/>
					Refresh
				</button>
				<button
					type="button"
					onClick={() => downloadAnalyticsCsv(data)}
					disabled={!data}
					className="inline-flex items-center gap-2 rounded-lg border border-gray-200/80 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-60"
				>
					<Download className="h-4 w-4" aria-hidden />
					Export CSV
				</button>
			</div>
		</div>
	);
}
