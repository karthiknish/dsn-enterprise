export default function AnalyticsReferrersTable({ referrers }) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
				<h2 className="text-lg font-semibold text-gray-900">Top Traffic Sources</h2>
				<span className="text-xs text-gray-500">By sessions</span>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50/50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Source / Medium
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Sessions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{referrers.length > 0 ? (
							referrers.map((row) => {
								const source = row.dimensionValues[0]?.value || "(direct)";
								const medium = row.dimensionValues[1]?.value || "(none)";
								const sessions = parseInt(row.metricValues[0]?.value || "0", 10);
								const label = `${source} / ${medium}`;

								return (
									<tr key={label} className="hover:bg-gray-50 transition-colors">
										<td
											className="px-6 py-4 text-sm font-medium text-gray-900 truncate max-w-[240px]"
											title={label}
										>
											{label}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
											{sessions.toLocaleString()}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="2" className="px-6 py-12 text-center text-gray-500">
									No referrer data available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
