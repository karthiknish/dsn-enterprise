import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function AnalyticsTopPagesTable({ topPages }) {
	const totalViews = topPages.reduce(
		(acc, row) => acc + parseInt(row.metricValues[0].value, 10),
		0,
	);

	return (
		<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-200/80 flex items-center justify-between">
				<div>
					<h2 className="text-base font-semibold text-gray-900">
						Most Visited Pages
					</h2>
					<p className="text-sm text-gray-500">By page views</p>
				</div>
				<span className="text-xs font-medium text-gray-500">Top 10 Pages</span>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-200 hover:bg-transparent">
							<TableHead className="text-xs uppercase tracking-wide text-gray-500">
								Page Path
							</TableHead>
							<TableHead className="text-xs uppercase tracking-wide text-gray-500 text-right">
								Views
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topPages.length > 0 ? (
							topPages.map((row, index) => {
								const views = parseInt(row.metricValues[0].value, 10);
								const percentage =
									totalViews > 0
										? ((views / totalViews) * 100).toFixed(1)
										: "0";

								return (
									<TableRow
										key={row.dimensionValues[0].value}
										className={`hover:bg-gray-50 ${
											index % 2 === 1 ? "bg-gray-50/40" : ""
										}`}
									>
										<TableCell
											className="py-3 px-4 text-sm font-medium text-gray-900 truncate max-w-[200px]"
											title={row.dimensionValues[0].value}
										>
											{row.dimensionValues[0].value}
										</TableCell>
										<TableCell className="py-3 px-4 text-right">
											<div className="flex flex-col items-end">
												<span className="text-sm font-semibold text-gray-900 tabular-nums">
													{views.toLocaleString()}
												</span>
												<div className="flex items-center gap-2 mt-1">
													<div className="w-16 bg-gray-100 rounded-full h-1">
														<div
															className="bg-accent h-1 rounded-full"
															style={{ width: `${percentage}%` }}
														/>
													</div>
													<span className="text-[10px] text-gray-400 tabular-nums">
														{percentage}%
													</span>
												</div>
											</div>
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow className="hover:bg-transparent">
								<TableCell
									colSpan={2}
									className="py-12 px-4 text-center text-gray-500"
								>
									No data available
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
