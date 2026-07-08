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

function buildStats(metrics) {
	const getMetricValue = (index) => metrics?.[index]?.value || "0";

	return [
		{
			name: "Active Users",
			value: getMetricValue(0),
			tone: "accent",
		},
		{
			name: "Sessions",
			value: getMetricValue(1),
			tone: "sessions",
		},
		{
			name: "Page Views",
			value: getMetricValue(2),
			tone: "secondary",
		},
		{
			name: "Bounce Rate",
			value: `${(parseFloat(getMetricValue(3)) * 100).toFixed(1)}%`,
			tone: "warning",
		},
	];
}

export default function AnalyticsMetricCards({ metrics }) {
	const stats = buildStats(metrics);

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
