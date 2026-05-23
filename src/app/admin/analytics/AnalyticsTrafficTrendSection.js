import AnalyticsTrendGraph from "./AnalyticsTrendGraph";

export default function AnalyticsTrafficTrendSection({ trends }) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-semibold text-gray-900">Traffic Trend</h2>
				<div className="flex items-center gap-4 text-xs font-medium">
					<div className="flex items-center gap-1.5">
						<span className="w-3 h-3 rounded-full bg-accent" />
						<span className="text-gray-600">Users</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="w-3 h-3 rounded-full bg-accent-800" />
						<span className="text-gray-600">Sessions</span>
					</div>
				</div>
			</div>
			<AnalyticsTrendGraph trends={trends} />
		</div>
	);
}
