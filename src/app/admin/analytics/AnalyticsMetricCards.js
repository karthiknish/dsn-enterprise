const metricToneClasses = {
	accent: "bg-accent-50 text-accent-700",
	sessions: "bg-accent-100 text-accent-800",
	secondary: "bg-secondary-light text-primary",
	warning: "bg-yellow-50 text-yellow-700",
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
			{stats.map((stat) => (
				<div
					key={stat.name}
					className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
				>
					<div className="flex items-center justify-between mb-4">
						<div className={`p-3 rounded-lg ${metricToneClasses[stat.tone]}`}>
							<span className="text-xs font-semibold uppercase tracking-wide">
								{stat.name}
							</span>
						</div>
					</div>
					<p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
				</div>
			))}
		</div>
	);
}
