import { Target, UserCheck, Users } from "lucide-react";
import { formatChange, formatCount, PLACEHOLDER } from "@/lib/analytics-format";

/**
 * Leads panel.
 *
 * The dashboard used to show traffic only, so the one number the business
 * actually acts on — how many enquiries arrived, and from where — was not on
 * it. Firestore (`contacts`) is the record of enquiries that arrived; GA4
 * `generate_lead` is the record of tracking events. They are shown together and
 * deliberately not reconciled, because the gap between them is itself the
 * signal: a wide gap means tracking is losing leads, and a channel row reading
 * "(not captured)" means attribution did not run for that enquiry.
 */
export default function AnalyticsLeadsPanel({ leads, days }) {
	const firestore = leads?.firestore || null;
	const ga4 = leads?.ga4 || null;

	const periodTotal = firestore?.current?.total ?? null;
	const channelRows =
		firestore?.current?.byChannel?.length > 0
			? firestore.current.byChannel
			: firestore?.allTime?.byChannel || [];
	const channelScope =
		firestore?.current?.byChannel?.length > 0 ? "this period" : "all time";
	const channelTotal = channelRows.reduce((sum, row) => sum + row.count, 0);

	const coverage =
		firestore && firestore.sampled > 0
			? Math.round((firestore.attributed / firestore.sampled) * 100)
			: null;

	return (
		<section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
			<div className="mb-5 flex items-start justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold text-gray-900">Leads</h2>
					<p className="mt-1 text-sm text-gray-500">
						Enquiries stored in Firestore against the GA4 lead event. The two
						will not match — the difference is how many leads tracking missed.
					</p>
				</div>
				<span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
					last {days || ""}d
				</span>
			</div>

			{!firestore && (
				<p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
					Firestore lead counts are unavailable, so only the GA4 figure is
					shown. The enquiry total is the one to trust when they disagree.
				</p>
			)}

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<LeadStat
					icon={Users}
					name="Enquiries received"
					value={periodTotal}
					change={firestore?.change}
					comparisonLabel={`vs prev ${days || ""}d`}
					format={formatCount}
				/>
				<LeadStat
					icon={Target}
					name="GA4 generate_lead"
					value={ga4?.current ?? null}
					change={ga4?.change}
					comparisonLabel={`vs prev ${days || ""}d`}
					format={formatCount}
				/>
				<LeadStat
					icon={UserCheck}
					name="Attribution captured"
					value={coverage}
					change={null}
					comparisonLabel=""
					format={(v) => `${v}%`}
				/>
			</div>

			<div className="mt-6">
				<div className="mb-3 flex items-baseline justify-between">
					<h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
						Enquiries by channel
					</h3>
					<span className="text-xs text-gray-400">{channelScope}</span>
				</div>

				{channelRows.length === 0 ? (
					<p className="text-sm text-gray-500">No enquiries recorded yet.</p>
				) : (
					<ul className="space-y-2.5">
						{channelRows.map((row) => {
							const share =
								channelTotal > 0 ? (row.count / channelTotal) * 100 : 0;
							return (
								<li key={row.label} className="text-sm">
									<div className="mb-1 flex items-center justify-between gap-4">
										<span className="truncate text-gray-700">{row.label}</span>
										<span className="tabular-nums font-medium text-gray-900">
											{row.count}
										</span>
									</div>
									<div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
										<div
											className="h-full rounded-full bg-accent"
											style={{ width: `${Math.max(share, 2)}%` }}
										/>
									</div>
								</li>
							);
						})}
					</ul>
				)}

				{firestore?.capped && (
					<p className="mt-3 text-xs text-gray-400">
						Channel mix is computed from the most recent {firestore.sampled}{" "}
						enquiries; older ones are excluded from the breakdown.
					</p>
				)}
				{firestore?.undated > 0 && (
					<p className="mt-3 text-xs text-gray-400">
						{firestore.undated} enquir
						{firestore.undated === 1 ? "y has" : "ies have"} no timestamp and
						fall outside the period comparison.
					</p>
				)}
			</div>
		</section>
	);
}

function LeadStat({
	icon: Icon,
	name,
	value,
	change,
	comparisonLabel,
	format,
}) {
	const label = formatChange(change);
	return (
		<div className="rounded-xl border border-gray-200/80 bg-gray-50/50 px-4 py-3">
			<div className="flex items-center gap-2 text-gray-500">
				<Icon className="h-3.5 w-3.5" aria-hidden />
				<span className="text-[11px] font-semibold uppercase tracking-wide">
					{name}
				</span>
			</div>
			<p className="mt-1.5 text-2xl font-semibold tabular-nums text-gray-900">
				{value === null || value === undefined ? PLACEHOLDER : format(value)}
			</p>
			<div className="mt-1 text-xs">
				{label === null ? (
					<span className="text-gray-400">
						{comparisonLabel ? "No comparison data" : ""}
					</span>
				) : (
					<span
						className={
							change > 0
								? "text-green-600"
								: change < 0
									? "text-red-600"
									: "text-gray-500"
						}
					>
						{label} <span className="text-gray-400">{comparisonLabel}</span>
					</span>
				)}
			</div>
		</div>
	);
}
