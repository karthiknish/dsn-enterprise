import { Eye, MousePointerClick, TrendingDown, Users } from "lucide-react";

const metricToneClasses = {
	accent: "bg-accent-50 text-accent-700",
	sessions: "bg-accent-100 text-accent-800",
	secondary: "bg-secondary-light text-primary",
	warning: "bg-yellow-50 text-yellow-700",
};

const metricIcons = {
	accent: Users,
	sessions: MousePointerClick,
	secondary: Eye,
	warning: TrendingDown,
};

const PLACEHOLDER = "—";

/**
 * Resolve metrics by GA4 metric name, falling back to array position only if
 * the API response carried no metricHeaders. Positional access alone meant
 * reordering the request in analytics-data.js would silently relabel every
 * card — bounce rate could render page views without anything looking wrong.
 */
function buildStats(metrics, metricsByName) {
	const byName = metricsByName || {};
	const hasNamed = Object.keys(byName).length > 0;

	const read = (name, index) => {
		const raw = hasNamed ? byName[name] : metrics?.[index]?.value;
		return raw === null || raw === undefined || raw === "" ? null : raw;
	};

	const count = (name, index) => {
		const v = read(name, index);
		if (v === null) return PLACEHOLDER;
		const n = Number(v);
		return Number.isFinite(n) ? n.toLocaleString("en-IN") : PLACEHOLDER;
	};

	const bounce = () => {
		const v = read("bounceRate", 3);
		if (v === null) return PLACEHOLDER;
		const n = parseFloat(v);
		return Number.isFinite(n) ? `${(n * 100).toFixed(1)}%` : PLACEHOLDER;
	};

	return [
		{ name: "Active Users", value: count("activeUsers", 0), tone: "accent" },
		{ name: "Sessions", value: count("sessions", 1), tone: "sessions" },
		{
			name: "Page Views",
			value: count("screenPageViews", 2),
			tone: "secondary",
		},
		{ name: "Bounce Rate", value: bounce(), tone: "warning" },
	];
}

export default function AnalyticsMetricCards({ metrics, metricsByName }) {
	const stats = buildStats(metrics, metricsByName);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{stats.map((stat) => {
				const Icon = metricIcons[stat.tone];
				return (
					<div
						key={stat.name}
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 hover:shadow-md transition-shadow"
					>
						<div className="flex items-center justify-between mb-4">
							<span
								className={`flex items-center justify-center w-10 h-10 rounded-lg ${metricToneClasses[stat.tone]}`}
							>
								<Icon className="w-5 h-5" aria-hidden />
							</span>
						</div>
						<p className="text-2xl font-semibold text-gray-900 tabular-nums">
							{stat.value}
						</p>
						<p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
							{stat.name}
						</p>
					</div>
				);
			})}
		</div>
	);
}
