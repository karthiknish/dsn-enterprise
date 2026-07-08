import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function AnalyticsReferrersTable({ referrers }) {
	return (
		<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
			<div className="px-6 py-4 border-b border-gray-200/80 flex items-center justify-between">
				<div>
					<h2 className="text-base font-semibold text-gray-900">
						Top Traffic Sources
					</h2>
					<p className="text-sm text-gray-500">By sessions</p>
				</div>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-200 hover:bg-transparent">
							<TableHead className="text-xs uppercase tracking-wide text-gray-500">
								Source / Medium
							</TableHead>
							<TableHead className="text-xs uppercase tracking-wide text-gray-500 text-right">
								Sessions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{referrers.length > 0 ? (
							referrers.map((row, index) => {
								const source = row.dimensionValues[0]?.value || "(direct)";
								const medium = row.dimensionValues[1]?.value || "(none)";
								const sessions = parseInt(
									row.metricValues[0]?.value || "0",
									10,
								);
								const label = `${source} / ${medium}`;

								return (
									<TableRow
										key={label}
										className={`hover:bg-gray-50 ${
											index % 2 === 1 ? "bg-gray-50/40" : ""
										}`}
									>
										<TableCell
											className="py-3 px-4 text-sm font-medium text-gray-900 truncate max-w-[240px]"
											title={label}
										>
											{label}
										</TableCell>
										<TableCell className="py-3 px-4 text-right text-sm font-semibold text-gray-900 tabular-nums">
											{sessions.toLocaleString()}
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
									No referrer data available
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
