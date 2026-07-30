import { Lightbulb } from "lucide-react";
import {
	formatChange,
	formatCount,
	formatGaDate,
	formatRate,
} from "@/lib/analytics-format";

/**
 * Insights are derived from the payload rather than hard-coded.
 *
 * The previous version printed the same two "tips" regardless of the data,
 * which made the panel decorative — it said "monitor your peak hours" whether
 * or not GA4 had returned a single row.
 */
function buildInsights(data) {
	if (!data) return [];
	const insights = [];

	const users = data.metrics?.activeUsers?.value ?? 0;
	const usersChange = data.metrics?.activeUsers?.change;
	const newUsers = data.metrics?.newUsers?.value ?? 0;
	const bounce = data.metrics?.bounceRate?.value;
	const engagement = data.metrics?.engagementRate?.value;

	// Traffic direction
	if (Number.isFinite(usersChange)) {
		const rising = usersChange > 0;
		insights.push({
			tone: Math.abs(usersChange) < 5 ? "neutral" : rising ? "good" : "bad",
			title: `Traffic ${Math.abs(usersChange) < 5 ? "held flat" : rising ? "grew" : "declined"} ${formatChange(usersChange)}`,
			body: `${formatCount(users)} active users this period against ${formatCount(
				data.metrics.activeUsers.previous,
			)} in the preceding ${data.days} days.`,
		});
	}

	// Peak day — useful for timing posts and campaigns.
	const peak = (data.trends || []).reduce(
		(best, row) => (!best || row.users > best.users ? row : best),
		null,
	);
	if (peak && peak.users > 0) {
		insights.push({
			tone: "neutral",
			title: `Busiest day: ${formatGaDate(peak.date, { withYear: true })}`,
			body: `${formatCount(peak.users)} users and ${formatCount(peak.sessions)} sessions — the strongest day in this range.`,
		});
	}

	// Channel concentration is a real risk signal for a small site.
	const topChannel = (data.channels || [])[0];
	if (topChannel) {
		insights.push({
			tone: topChannel.share > 70 ? "bad" : "neutral",
			title: `${topChannel.label} drives ${topChannel.share.toFixed(0)}% of sessions`,
			body:
				topChannel.share > 70
					? "Most traffic depends on a single channel. A change there would hit the whole site, so it is worth developing a second source."
					: "Traffic is spread across more than one channel, which limits the impact of any single source dropping.",
		});
	}

	// Device split drives layout priorities.
	const mobile = (data.devices || []).find((d) => d.label === "mobile");
	if (mobile) {
		insights.push({
			tone: "neutral",
			title: `${mobile.share.toFixed(0)}% of sessions are on mobile`,
			body: `Mobile bounce rate is ${formatRate(mobile.bounceRate)}. Test layout changes at phone width first if this share stays dominant.`,
		});
	}

	// Worst landing page, ignoring low-volume noise.
	const weakLanding = (data.landingPages || [])
		.filter((row) => row.sessions >= 10)
		.reduce(
			(worst, row) =>
				!worst || row.bounceRate > worst.bounceRate ? row : worst,
			null,
		);
	if (weakLanding && weakLanding.bounceRate > 0.6) {
		insights.push({
			tone: "bad",
			title: `High bounce on ${weakLanding.label}`,
			body: `${formatRate(weakLanding.bounceRate)} of its ${formatCount(
				weakLanding.sessions,
			)} sessions leave without engaging. Check the above-the-fold content and its primary call to action.`,
		});
	}

	// Audience mix
	if (users > 0 && newUsers > 0) {
		// Compare on the displayed (rounded) figure so the headline and the copy
		// below it can never disagree about which side of the threshold it is on.
		const share = Math.round((newUsers / users) * 100);
		insights.push({
			tone: share >= 80 ? "bad" : "neutral",
			title: `${share}% of users are new`,
			body:
				share >= 80
					? "Almost nobody returns. Repeat visits usually need a reason to come back — a newsletter, or content that is updated on a schedule."
					: "A healthy share of visitors are returning, which suggests the content is worth a second visit.",
		});
	}

	if (Number.isFinite(Number(engagement)) && Number.isFinite(Number(bounce))) {
		insights.push({
			tone: Number(engagement) > 0.5 ? "good" : "neutral",
			title: `Engagement rate ${formatRate(engagement)}`,
			body: `Bounce rate is ${formatRate(bounce)}. Internal links between related pages are the cheapest way to move both numbers.`,
		});
	}

	return insights;
}

const TONES = {
	good: "bg-green-50 text-green-600 border-green-100",
	bad: "bg-red-50 text-red-600 border-red-100",
	neutral: "bg-accent-50 text-accent-700 border-accent-100",
};

export default function AnalyticsInsightsPanel({ data }) {
	const insights = buildInsights(data);

	return (
		<div className="rounded-2xl border border-gray-200/80 bg-white shadow-sm">
			<div className="flex items-center gap-3 border-b border-gray-200/80 px-6 py-4">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-700">
					<Lightbulb className="h-4 w-4" aria-hidden />
				</span>
				<div>
					<h2 className="text-base font-semibold text-gray-900">Insights</h2>
					<p className="text-sm text-gray-500">
						Derived from this period's figures
					</p>
				</div>
			</div>

			{insights.length === 0 ? (
				<p className="px-6 py-12 text-center text-sm text-gray-500">
					Not enough data to generate insights for this period.
				</p>
			) : (
				<ul className="divide-y divide-gray-100">
					{insights.map((insight, index) => (
						<li key={insight.title} className="flex gap-3 px-6 py-4">
							<span
								className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${TONES[insight.tone]}`}
							>
								{index + 1}
							</span>
							<div>
								<h3 className="text-sm font-semibold text-gray-800">
									{insight.title}
								</h3>
								<p className="mt-0.5 text-xs leading-relaxed text-gray-500">
									{insight.body}
								</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
