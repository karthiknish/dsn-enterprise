const RANGES = [
	{ id: "7d", label: "7D", title: "Last 7 days" },
	{ id: "30d", label: "30D", title: "Last 30 days" },
	{ id: "90d", label: "90D", title: "Last 90 days" },
	{ id: "365d", label: "12M", title: "Last 12 months" },
];

export default function AnalyticsPeriodSelector({
	period,
	onPeriodChange,
	disabled = false,
}) {
	return (
		<fieldset
			className="inline-flex items-center gap-1 rounded-lg border border-gray-200/80 bg-gray-50 p-1"
			aria-label="Reporting period"
		>
			{RANGES.map((range) => (
				<button
					type="button"
					key={range.id}
					title={range.title}
					disabled={disabled}
					aria-pressed={period === range.id}
					onClick={() => onPeriodChange(range.id)}
					className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-all disabled:opacity-60 ${
						period === range.id
							? "bg-white text-gray-900 shadow-sm"
							: "text-gray-500 hover:text-gray-700"
					}`}
				>
					{range.label}
				</button>
			))}
		</fieldset>
	);
}
