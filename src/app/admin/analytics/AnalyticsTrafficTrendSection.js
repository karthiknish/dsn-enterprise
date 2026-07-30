"use client";

import { useMemo, useState } from "react";
import { formatCount } from "@/lib/analytics-format";
import AnalyticsTrendGraph, { SERIES } from "./AnalyticsTrendGraph";

const KEYS = Object.keys(SERIES);

export default function AnalyticsTrafficTrendSection({ trends }) {
	const [activeSeries, setActiveSeries] = useState({
		users: true,
		sessions: true,
		pageViews: false,
	});

	const toggle = (key) => {
		setActiveSeries((prev) => {
			const next = { ...prev, [key]: !prev[key] };
			// Never allow an empty chart; the last active series stays on.
			return Object.values(next).some(Boolean) ? next : prev;
		});
	};

	// Period totals next to the legend so the chart answers "how much overall?"
	// without a separate lookup at the metric cards.
	const totals = useMemo(() => {
		const acc = { users: 0, sessions: 0, pageViews: 0 };
		for (const row of trends || []) {
			acc.users += Number(row.users) || 0;
			acc.sessions += Number(row.sessions) || 0;
			acc.pageViews += Number(row.pageViews) || 0;
		}
		return acc;
	}, [trends]);

	return (
		<div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
			<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h2 className="text-base font-semibold text-gray-900">
						Traffic Trend
					</h2>
					<p className="text-sm text-gray-500">
						Daily performance — click a series to show or hide it
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					{KEYS.map((key) => {
						const on = activeSeries[key];
						return (
							<button
								type="button"
								key={key}
								onClick={() => toggle(key)}
								aria-pressed={on}
								className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
									on
										? "border-gray-200 bg-gray-50 text-gray-900"
										: "border-transparent text-gray-400 hover:text-gray-600"
								}`}
							>
								<span
									className="h-2.5 w-2.5 rounded-full"
									style={{
										backgroundColor: on
											? SERIES[key].color
											: "var(--color-gray-300)",
									}}
								/>
								{SERIES[key].label}
								<span className="tabular-nums text-gray-500">
									{formatCount(totals[key])}
								</span>
							</button>
						);
					})}
				</div>
			</div>
			<AnalyticsTrendGraph trends={trends} activeSeries={activeSeries} />
		</div>
	);
}
