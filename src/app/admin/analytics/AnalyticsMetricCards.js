import {
	Activity,
	Clock,
	Eye,
	Layers,
	MousePointerClick,
	TrendingDown,
	TrendingUp,
	UserPlus,
	Users,
} from "lucide-react";
import {
	formatChange,
	formatCount,
	formatDecimal,
	formatDuration,
	formatRate,
	PLACEHOLDER,
} from "@/lib/analytics-format";

/**
 * Card definitions.
 *
 * `goodWhenUp` exists because a rising bounce rate is bad while a rising user
 * count is good — colouring every delta green-on-up would actively mislead.
 */
const PRIMARY = [
	{
		key: "activeUsers",
		name: "Active Users",
		icon: Users,
		tone: "bg-accent-50 text-accent-700",
		format: formatCount,
		goodWhenUp: true,
	},
	{
		key: "sessions",
		name: "Sessions",
		icon: MousePointerClick,
		tone: "bg-accent-100 text-accent-800",
		format: formatCount,
		goodWhenUp: true,
	},
	{
		key: "screenPageViews",
		name: "Page Views",
		icon: Eye,
		tone: "bg-secondary-light text-primary",
		format: formatCount,
		goodWhenUp: true,
	},
	{
		key: "bounceRate",
		name: "Bounce Rate",
		icon: TrendingDown,
		tone: "bg-yellow-50 text-yellow-700",
		format: formatRate,
		goodWhenUp: false,
	},
];

const SECONDARY = [
	{
		key: "newUsers",
		name: "New Users",
		icon: UserPlus,
		format: formatCount,
		goodWhenUp: true,
	},
	{
		key: "engagementRate",
		name: "Engagement Rate",
		icon: Activity,
		format: formatRate,
		goodWhenUp: true,
	},
	{
		key: "averageSessionDuration",
		name: "Avg. Session",
		icon: Clock,
		format: formatDuration,
		goodWhenUp: true,
	},
	{
		key: "screenPageViewsPerSession",
		name: "Views / Session",
		icon: Layers,
		format: (v) => formatDecimal(v, 2),
		goodWhenUp: true,
	},
];

function DeltaBadge({ change, goodWhenUp, comparisonLabel }) {
	const label = formatChange(change);
	if (label === null) {
		return (
			<span className="text-xs font-medium text-gray-400">
				No comparison data
			</span>
		);
	}

	const flat = Math.abs(change) < 0.05;
	const up = change > 0;
	const positive = flat ? null : up === goodWhenUp;
	const Icon = up ? TrendingUp : TrendingDown;

	const classes = flat
		? "bg-gray-100 text-gray-600"
		: positive
			? "bg-green-50 text-green-600"
			: "bg-red-50 text-red-600";

	return (
		<span className="flex items-center gap-1.5 text-xs">
			<span
				className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold tabular-nums ${classes}`}
			>
				{!flat && <Icon className="h-3 w-3" aria-hidden />}
				{flat ? "0%" : label}
			</span>
			<span className="text-gray-400">{comparisonLabel}</span>
		</span>
	);
}

export default function AnalyticsMetricCards({ metrics, days }) {
	const read = (key) => metrics?.[key] || {};
	const comparisonLabel = `vs prev ${days || ""}d`.trim();

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{PRIMARY.map((card) => {
					const metric = read(card.key);
					const Icon = card.icon;
					return (
						<div
							key={card.key}
							className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="mb-4 flex items-center justify-between">
								<span
									className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.tone}`}
								>
									<Icon className="h-5 w-5" aria-hidden />
								</span>
							</div>
							<p className="text-2xl font-semibold tabular-nums text-gray-900">
								{metric.value === null || metric.value === undefined
									? PLACEHOLDER
									: card.format(metric.value)}
							</p>
							<p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
								{card.name}
							</p>
							<div className="mt-3">
								<DeltaBadge
									change={metric.change}
									goodWhenUp={card.goodWhenUp}
									comparisonLabel={comparisonLabel}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{SECONDARY.map((card) => {
					const metric = read(card.key);
					const Icon = card.icon;
					return (
						<div
							key={card.key}
							className="rounded-xl border border-gray-200/80 bg-white px-4 py-3 shadow-sm"
						>
							<div className="flex items-center gap-2 text-gray-500">
								<Icon className="h-3.5 w-3.5" aria-hidden />
								<span className="text-[11px] font-semibold uppercase tracking-wide">
									{card.name}
								</span>
							</div>
							<p className="mt-1.5 text-lg font-semibold tabular-nums text-gray-900">
								{metric.value === null || metric.value === undefined
									? PLACEHOLDER
									: card.format(metric.value)}
							</p>
							<div className="mt-1">
								<DeltaBadge
									change={metric.change}
									goodWhenUp={card.goodWhenUp}
									comparisonLabel=""
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
