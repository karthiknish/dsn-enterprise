import { ExternalLink } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatCount, formatDuration } from "@/lib/analytics-format";

export default function AnalyticsTopPagesTable({ topPages = [] }) {
	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-gray-200/80 px-6 py-4">
				<div>
					<h2 className="text-base font-semibold text-gray-900">
						Most Visited Pages
					</h2>
					<p className="text-sm text-gray-500">By page views</p>
				</div>
				<span className="text-xs font-medium text-gray-500">Top 10</span>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="border-b border-gray-200 hover:bg-transparent">
							<TableHead className="text-xs uppercase tracking-wide text-gray-500">
								Page Path
							</TableHead>
							<TableHead className="text-right text-xs uppercase tracking-wide text-gray-500">
								Users
							</TableHead>
							<TableHead className="text-right text-xs uppercase tracking-wide text-gray-500">
								Avg. Time
							</TableHead>
							<TableHead className="text-right text-xs uppercase tracking-wide text-gray-500">
								Views
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{topPages.length > 0 ? (
							topPages.map((row, index) => (
								<TableRow
									key={row.path}
									className={`hover:bg-gray-50 ${
										index % 2 === 1 ? "bg-gray-50/40" : ""
									}`}
								>
									<TableCell className="max-w-[220px] px-4 py-3">
										{/* Linking out saves the round trip of copying a path
										    into the address bar to inspect a page. */}
										<a
											href={row.path}
											target="_blank"
											rel="noopener noreferrer"
											title={row.path}
											className="flex items-center gap-1.5 truncate text-sm font-medium text-gray-900 hover:text-accent-700"
										>
											<span className="truncate">{row.path}</span>
											<ExternalLink
												className="h-3 w-3 shrink-0 text-gray-400"
												aria-hidden
											/>
										</a>
									</TableCell>
									<TableCell className="px-4 py-3 text-right text-sm tabular-nums text-gray-600">
										{formatCount(row.users)}
									</TableCell>
									<TableCell className="px-4 py-3 text-right text-sm tabular-nums text-gray-600">
										{formatDuration(row.avgDuration)}
									</TableCell>
									<TableCell className="px-4 py-3 text-right">
										<div className="flex flex-col items-end">
											<span className="text-sm font-semibold tabular-nums text-gray-900">
												{formatCount(row.views)}
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
									colSpan={4}
									className="px-4 py-12 text-center text-gray-500"
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
