export default function AnalyticsTopPagesTable({ topPages }) {
	const totalViews = topPages.reduce(
		(acc, row) => acc + parseInt(row.metricValues[0].value, 10),
		0,
	);

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
				<h2 className="text-lg font-semibold text-gray-900">Most Visited Pages</h2>
				<span className="text-xs text-gray-500">Top 10 Pages</span>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50/50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Page Path
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Views
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{topPages.length > 0 ? (
							topPages.map((row) => {
								const views = parseInt(row.metricValues[0].value, 10);
								const percentage =
									totalViews > 0
										? ((views / totalViews) * 100).toFixed(1)
										: "0";

								return (
									<tr
										key={row.dimensionValues[0].value}
										className="hover:bg-gray-50 transition-colors"
									>
										<td
											className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-[200px]"
											title={row.dimensionValues[0].value}
										>
											{row.dimensionValues[0].value}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right">
											<div className="flex flex-col items-end">
												<span className="text-sm font-semibold text-gray-900">
													{views.toLocaleString()}
												</span>
												<div className="flex items-center gap-2 mt-1">
													<div className="w-16 bg-gray-100 rounded-full h-1">
														<div
															className="bg-accent h-1 rounded-full"
															style={{ width: `${percentage}%` }}
														/>
													</div>
													<span className="text-[10px] text-gray-400">
														{percentage}%
													</span>
												</div>
											</div>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="2" className="px-6 py-12 text-center text-gray-500">
									No data available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
