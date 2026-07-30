import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCount } from "@/lib/analytics-format";

export default function AnalyticsReferrersTable({ referrers = [] }) {
	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-gray-200/80 px-6 py-4">
				<div>
					<h2 className="text-base font-semibold text-gray-900">
						Top Traffic Sources
					</h2>
					<p className="text-sm text-gray-500">By sessions</p>
				</div>
				<span className="text-xs font-medium text-gray-500">Top 10</span>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-200 hover:bg-transparent">
							<TableHead className="text-xs uppercase tracking-wide text-gray-500">
								Source / Medium
							</TableHead>
							<TableHead className="text-right text-xs uppercase tracking-wide text-gray-500">
								Users
							</TableHead>
							<TableHead className="text-right text-xs uppercase tracking-wide text-gray-500">
								Sessions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{referrers.length > 0 ? (
							referrers.map((row, index) => (
								<TableRow
									key={row.label}
									className={`hover:bg-gray-50 ${
										index % 2 === 1 ? "bg-gray-50/40" : ""
									}`}
								>
									<TableCell
										className="max-w-[240px] truncate px-4 py-3 text-sm font-medium text-gray-900"
										title={row.label}
									>
										{row.label}
									</TableCell>
									<TableCell className="px-4 py-3 text-right text-sm tabular-nums text-gray-600">
										{formatCount(row.users)}
									</TableCell>
									<TableCell className="px-4 py-3 text-right">
										<div className="flex flex-col items-end">
											<span className="text-sm font-semibold tabular-nums text-gray-900">
												{formatCount(row.sessions)}
											</span>
											<div className="mt-1 flex items-center gap-2">
												<div className="h-1 w-16 rounded-full bg-gray-100">
													<div
														className="h-1 rounded-full bg-accent"
														style={{
															width: `${Math.min(100, row.share || 0)}%`,
														}}
													/>
												</div>
												<span className="text-[10px] tabular-nums text-gray-400">
													{(row.share || 0).toFixed(1)}%
												</span>
											</div>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow className="hover:bg-transparent">
								<TableCell
									colSpan={3}
									className="px-4 py-12 text-center text-gray-500"
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
