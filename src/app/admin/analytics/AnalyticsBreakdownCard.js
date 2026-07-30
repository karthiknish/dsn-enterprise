import { formatCount, formatRate } from "@/lib/analytics-format";

/**
 * Horizontal bar list used for the dimension breakdowns (channels, devices,
 * landing pages, countries). A single component keeps the four sections
 * visually identical instead of four hand-rolled tables.
 *
 * `rows` items: { label, share, ...metrics }
 */
export default function AnalyticsBreakdownCard({
	title,
	description,
	rows = [],
	valueKey,
	valueLabel,
	secondaryKey,
	secondaryLabel,
	secondaryFormat = "rate",
	emptyMessage = "No data available",
	icon: Icon,
	limit,
}) {
	const visible = limit ? rows.slice(0, limit) : rows;
	const formatSecondary = secondaryFormat === "rate" ? formatRate : formatCount;

	return (
		<div className="rounded-2xl border border-gray-200/80 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-gray-200/80 px-6 py-4">
				<div className="flex items-center gap-3">
					{Icon && (
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
							<Icon className="h-4 w-4" aria-hidden />
						</span>
					)}
					<div>
						<h2 className="text-base font-semibold text-gray-900">{title}</h2>
						{description && (
							<p className="text-sm text-gray-500">{description}</p>
						)}
					</div>
				</div>
				<span className="text-xs font-medium uppercase tracking-wide text-gray-400">
					{valueLabel}
				</span>
			</div>

			{visible.length === 0 ? (
				<p className="px-6 py-12 text-center text-sm text-gray-500">
					{emptyMessage}
				</p>
			) : (
				<ul className="divide-y divide-gray-100">
					{visible.map((row) => (
						<li key={row.label} className="px-6 py-3">
							<div className="flex items-center justify-between gap-4">
								<span
									className="truncate text-sm font-medium text-gray-900"
									title={row.label}
								>
									{row.label || "(not set)"}
								</span>
								<span className="shrink-0 text-sm font-semibold tabular-nums text-gray-900">
									{formatCount(row[valueKey])}
								</span>
							</div>
							<div className="mt-2 flex items-center gap-3">
								<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
									<div
										className="h-full rounded-full bg-accent"
										style={{ width: `${Math.min(100, row.share || 0)}%` }}
									/>
								</div>
								<span className="w-10 shrink-0 text-right text-[10px] tabular-nums text-gray-400">
									{(row.share || 0).toFixed(1)}%
								</span>
								{secondaryKey && (
									<span className="w-24 shrink-0 text-right text-[10px] tabular-nums text-gray-500">
										{secondaryLabel} {formatSecondary(row[secondaryKey])}
									</span>
								)}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
