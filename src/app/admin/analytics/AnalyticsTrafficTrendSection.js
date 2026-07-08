import AnalyticsTrendGraph from "./AnalyticsTrendGraph";

export default function AnalyticsTrafficTrendSection({ trends }) {
	return (
		<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
				<div>
					<h2 className="text-base font-semibold text-gray-900">Traffic Trend</h2>
					<p className="text-sm text-gray-500">Users and sessions over time</p>
				</div>
				<div className="flex items-center gap-4 text-xs font-medium">
					<div className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-accent" />
						<span className="text-gray-600">Users</span>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-accent-800" />
						<span className="text-gray-600">Sessions</span>
					</div>
				</div>
			</div>
			<AnalyticsTrendGraph trends={trends} />
		</div>
	);
}
