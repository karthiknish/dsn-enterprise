"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "./seo-constants";

const COMPETITION_STYLES = {
	LOW: "bg-green-100 text-green-800",
	MEDIUM: "bg-yellow-100 text-yellow-800",
	HIGH: "bg-red-100 text-red-800",
};

/** Keyword ideas around a seed, sorted by volume with a client-side filter. */
export default function SeoKeywordResults({ data }) {
	const [filter, setFilter] = useState("");
	const [minVolume, setMinVolume] = useState(0);

	const rows = useMemo(() => {
		const needle = filter.trim().toLowerCase();
		return data.ideas.filter(
			(idea) =>
				(!needle || idea.keyword.toLowerCase().includes(needle)) &&
				(idea.searchVolume ?? 0) >= minVolume,
		);
	}, [data.ideas, filter, minVolume]);

	const totalVolume = useMemo(
		() => rows.reduce((sum, idea) => sum + (idea.searchVolume || 0), 0),
		[rows],
	);

	return (
		<div className="space-y-4">
			<div className="grid gap-3 sm:grid-cols-3">
				<Stat label="Ideas returned" value={formatNumber(data.ideas.length)} />
				<Stat label="Shown" value={formatNumber(rows.length)} />
				<Stat
					label="Combined monthly volume"
					value={formatNumber(totalVolume)}
				/>
			</div>

			<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
					<h2 className="font-semibold text-gray-900">
						Ideas for “{data.seed}”
					</h2>
					<div className="flex items-center gap-2">
						<input
							type="search"
							value={filter}
							onChange={(event) => setFilter(event.target.value)}
							placeholder="Filter keywords"
							aria-label="Filter keywords"
							className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
						/>
						<select
							value={minVolume}
							onChange={(event) => setMinVolume(Number(event.target.value))}
							aria-label="Minimum monthly volume"
							className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
						>
							{[0, 50, 100, 500, 1000].map((value) => (
								<option key={value} value={value}>
									{value === 0 ? "Any volume" : `${value}+ / mo`}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
							<tr>
								<th scope="col" className="px-5 py-2.5 font-medium">
									Keyword
								</th>
								<th scope="col" className="px-5 py-2.5 font-medium text-right">
									Volume / mo
								</th>
								<th scope="col" className="px-5 py-2.5 font-medium text-right">
									CPC
								</th>
								<th scope="col" className="px-5 py-2.5 font-medium text-right">
									Difficulty
								</th>
								<th scope="col" className="px-5 py-2.5 font-medium">
									Competition
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{rows.map((idea) => (
								<tr key={idea.keyword} className="hover:bg-gray-50">
									<td className="px-5 py-3 text-gray-900">{idea.keyword}</td>
									<td className="px-5 py-3 text-right font-medium text-gray-900">
										{formatNumber(idea.searchVolume)}
									</td>
									<td className="px-5 py-3 text-right text-gray-600">
										{idea.cpc === null || idea.cpc === undefined
											? "—"
											: `$${idea.cpc.toFixed(2)}`}
									</td>
									<td className="px-5 py-3 text-right text-gray-600">
										{idea.difficulty ?? "—"}
									</td>
									<td className="px-5 py-3">
										{idea.competitionLevel ? (
											<span
												className={`px-2 py-0.5 rounded-full text-xs font-medium ${
													COMPETITION_STYLES[idea.competitionLevel] ||
													"bg-gray-100 text-gray-700"
												}`}
											>
												{idea.competitionLevel}
											</span>
										) : (
											<span className="text-gray-400">—</span>
										)}
									</td>
								</tr>
							))}
							{rows.length === 0 && (
								<tr>
									<td
										colSpan={5}
										className="px-5 py-8 text-center text-gray-500"
									>
										No keywords match this filter.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

function Stat({ label, value }) {
	return (
		<div className="bg-white rounded-xl border border-gray-200 p-4">
			<p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
			<p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
		</div>
	);
}
