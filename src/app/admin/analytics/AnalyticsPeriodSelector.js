const RANGES = [
	{ id: "7d", label: "7 Days" },
	{ id: "30d", label: "30 Days" },
	{ id: "90d", label: "90 Days" },
];

export default function AnalyticsPeriodSelector({ period, onPeriodChange }) {
	return (
		<div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-100 p-1">
			{RANGES.map((range) => (
				<button
					type="button"
					key={range.id}
					onClick={() => onPeriodChange(range.id)}
					className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
						period === range.id
							? "bg-accent text-white shadow-md"
							: "text-gray-600 hover:bg-gray-50"
					}`}
				>
					{range.label}
				</button>
			))}
		</div>
	);
}
