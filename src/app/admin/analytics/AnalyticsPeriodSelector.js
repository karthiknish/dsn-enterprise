const RANGES = [
	{ id: "7d", label: "7 Days" },
	{ id: "30d", label: "30 Days" },
	{ id: "90d", label: "90 Days" },
];

export default function AnalyticsPeriodSelector({ period, onPeriodChange }) {
	return (
		<div className="inline-flex items-center gap-1 rounded-lg border border-gray-200/80 bg-gray-50 p-1">
			{RANGES.map((range) => (
				<button
					type="button"
					key={range.id}
					onClick={() => onPeriodChange(range.id)}
					className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-all ${
						period === range.id
							? "bg-white text-gray-900 shadow-sm"
							: "text-gray-500 hover:text-gray-700"
					}`}
				>
					{range.label}
				</button>
			))}
		</div>
	);
}
