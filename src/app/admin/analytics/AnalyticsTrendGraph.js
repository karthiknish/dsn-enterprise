"use client";

import { useMemo, useState } from "react";
import { formatCount, formatGaDate } from "@/lib/analytics-format";

const SERIES = {
	users: { label: "Users", color: "var(--color-chart-line-users)" },
	sessions: { label: "Sessions", color: "var(--color-chart-line-sessions)" },
	pageViews: { label: "Page Views", color: "var(--color-gray-400)" },
};

// Round a raw step up to a human-readable increment (1, 2, 2.5, 5, 10 × 10ⁿ) so
// gridline labels read as 25/50/75 rather than 24.25/48.5/72.75.
function niceStep(raw) {
	const magnitude = 10 ** Math.floor(Math.log10(raw));
	const normalized = raw / magnitude;
	const multiplier =
		normalized <= 1
			? 1
			: normalized <= 2
				? 2
				: normalized <= 2.5
					? 2.5
					: normalized <= 5
						? 5
						: 10;
	return multiplier * magnitude;
}

const WIDTH = 1000;
const HEIGHT = 260;
const PADDING = { top: 16, right: 24, bottom: 34, left: 52 };

export default function AnalyticsTrendGraph({ trends, activeSeries }) {
	const [hoverIndex, setHoverIndex] = useState(null);

	const data = useMemo(
		() =>
			(trends || []).map((row) => ({
				date: row.date,
				users: Number(row.users) || 0,
				sessions: Number(row.sessions) || 0,
				pageViews: Number(row.pageViews) || 0,
			})),
		[trends],
	);

	const keys = useMemo(
		() => Object.keys(SERIES).filter((k) => activeSeries?.[k]),
		[activeSeries],
	);

	if (data.length === 0) {
		return (
			<div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
				<p className="px-4 text-center text-sm text-gray-400">
					Insufficient data to generate trend visualization
				</p>
			</div>
		);
	}

	const graphWidth = WIDTH - PADDING.left - PADDING.right;
	const graphHeight = HEIGHT - PADDING.top - PADDING.bottom;

	const maxValue = Math.max(
		10,
		...keys.flatMap((key) => data.map((d) => d[key])),
	);
	// Aim for ~4 gridlines, then snap both the step and the axis ceiling to that
	// step so every label is a round number and the top label equals axisMax.
	const step = niceStep(Math.max(maxValue / 4, 1));
	const axisMax = Math.ceil(maxValue / step) * step || 10;
	const ticks = [];
	for (let value = 0; value <= axisMax + step / 1000; value += step) {
		ticks.push(value);
	}

	const getX = (index) =>
		PADDING.left + index * (graphWidth / (data.length - 1 || 1));
	const getY = (value) =>
		PADDING.top + graphHeight - (value / axisMax) * graphHeight;

	const linePath = (key) =>
		data
			.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d[key])}`)
			.join(" ");

	const areaPath = (key) =>
		`${linePath(key)} L ${getX(data.length - 1)} ${PADDING.top + graphHeight} L ${PADDING.left} ${PADDING.top + graphHeight} Z`;

	const labelStep = data.length < 12 ? 1 : Math.ceil(data.length / 10);
	const hovered = hoverIndex === null ? null : data[hoverIndex];

	// Map a pointer position back to the nearest data index. Hit rectangles are
	// used instead of per-point handlers so thin lines are still easy to hover.
	const bandWidth = graphWidth / (data.length - 1 || 1);

	return (
		<div className="relative">
			<div className="w-full overflow-x-auto scrollbar-hide">
				<div className="min-w-[600px]">
					<svg
						aria-hidden="true"
						viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
						className="h-auto w-full"
						onMouseLeave={() => setHoverIndex(null)}
					>
						<defs>
							<linearGradient
								id="usersTrendAreaGradient"
								x1="0"
								x2="0"
								y1="0"
								y2="1"
							>
								<stop
									offset="0%"
									stopColor="var(--color-chart-line-users)"
									stopOpacity="0.35"
								/>
								<stop
									offset="100%"
									stopColor="var(--color-chart-line-users)"
									stopOpacity="0"
								/>
							</linearGradient>
						</defs>

						{ticks.map((tick) => {
							const y =
								PADDING.top + graphHeight - (tick / axisMax) * graphHeight;
							return (
								<g key={tick}>
									<line
										x1={PADDING.left}
										y1={y}
										x2={WIDTH - PADDING.right}
										y2={y}
										stroke="var(--color-chart-grid)"
										strokeWidth="1"
									/>
									{/* Y axis labels: the old chart had none, so a spike had
									    no readable magnitude. */}
									<text
										x={PADDING.left - 10}
										y={y + 3}
										textAnchor="end"
										className="fill-gray-400 text-[10px] font-medium"
									>
										{formatCount(tick)}
									</text>
								</g>
							);
						})}

						{keys.includes("users") && (
							<path d={areaPath("users")} fill="url(#usersTrendAreaGradient)" />
						)}

						{keys.map((key) => (
							<path
								key={key}
								d={linePath(key)}
								fill="none"
								stroke={SERIES[key].color}
								strokeWidth={key === "users" ? 3 : 2}
								strokeDasharray={key === "pageViews" ? "4 3" : undefined}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						))}

						{data.map((d, i) =>
							i % labelStep === 0 ? (
								<text
									key={`label-${d.date}`}
									x={getX(i)}
									y={HEIGHT - 12}
									textAnchor="middle"
									className="fill-gray-400 text-[10px] font-medium"
								>
									{formatGaDate(d.date)}
								</text>
							) : null,
						)}

						{hovered && (
							<g>
								<line
									x1={getX(hoverIndex)}
									y1={PADDING.top}
									x2={getX(hoverIndex)}
									y2={PADDING.top + graphHeight}
									stroke="var(--color-gray-300)"
									strokeWidth="1"
									strokeDasharray="3 3"
								/>
								{keys.map((key) => (
									<circle
										key={key}
										cx={getX(hoverIndex)}
										cy={getY(hovered[key])}
										r="4.5"
										fill="var(--color-white)"
										stroke={SERIES[key].color}
										strokeWidth="2.5"
									/>
								))}
							</g>
						)}

						{/* One transparent hit band per day: hovering a 2px line directly
						    is impractical. Pointer-only enhancement — the same numbers are
						    exposed to assistive tech by the sr-only table below. */}
						{data.map((d, i) => (
							// biome-ignore lint/a11y/noStaticElementInteractions: transparent pointer hit area; the sr-only table carries the same data
							<rect
								key={`hit-${d.date}`}
								x={getX(i) - bandWidth / 2}
								y={PADDING.top}
								width={bandWidth || 8}
								height={graphHeight}
								fill="transparent"
								onMouseEnter={() => setHoverIndex(i)}
							/>
						))}
					</svg>
				</div>
			</div>

			{/* Text equivalent of the chart. The SVG is aria-hidden because a
			    polyline conveys nothing to a screen reader. */}
			<table className="sr-only">
				<caption>
					Daily traffic: {keys.map((k) => SERIES[k].label).join(", ")}
				</caption>
				<thead>
					<tr>
						<th scope="col">Date</th>
						{keys.map((key) => (
							<th key={key} scope="col">
								{SERIES[key].label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((d) => (
						<tr key={`row-${d.date}`}>
							<th scope="row">{formatGaDate(d.date, { withYear: true })}</th>
							{keys.map((key) => (
								<td key={key}>{formatCount(d[key])}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{hovered && (
				<div
					className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg"
					aria-live="polite"
				>
					<p className="text-[11px] font-semibold text-gray-900">
						{formatGaDate(hovered.date, { withYear: true })}
					</p>
					<div className="mt-1 space-y-0.5">
						{keys.map((key) => (
							<p
								key={key}
								className="flex items-center gap-2 text-[11px] text-gray-600"
							>
								<span
									className="h-2 w-2 rounded-full"
									style={{ backgroundColor: SERIES[key].color }}
								/>
								{SERIES[key].label}
								<span className="font-semibold tabular-nums text-gray-900">
									{formatCount(hovered[key])}
								</span>
							</p>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export { SERIES };
