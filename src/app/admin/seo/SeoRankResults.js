"use client";

import { ExternalLink } from "lucide-react";
import { formatNumber } from "./seo-constants";

/** Live SERP for one keyword, with the tracked domain highlighted in place. */
export default function SeoRankResults({ data }) {
	const found = data.position !== null && data.position !== undefined;

	return (
		<div className="space-y-4">
			<div
				className={`rounded-xl border p-5 ${
					found
						? "bg-green-50 border-green-200"
						: "bg-yellow-50 border-yellow-200"
				}`}
			>
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div>
						<p className="text-xs uppercase tracking-wide text-gray-500">
							“{data.keyword}” · {data.domain}
						</p>
						<p
							className={`mt-1 text-2xl font-bold ${found ? "text-green-800" : "text-yellow-800"}`}
						>
							{found
								? `Position #${data.position}`
								: `Not in the top ${data.results.length}`}
						</p>
						{found && data.rankingUrl && (
							<a
								href={data.rankingUrl}
								target="_blank"
								rel="noreferrer"
								className="mt-1 inline-flex items-center gap-1 text-sm text-green-800 underline underline-offset-2 break-all"
							>
								{data.rankingUrl}
								<ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
							</a>
						)}
					</div>
					<dl className="flex gap-6 text-sm">
						<div>
							<dt className="text-gray-500 text-xs">Indexed results</dt>
							<dd className="font-semibold text-gray-900">
								{formatNumber(data.totalResults)}
							</dd>
						</div>
						<div>
							<dt className="text-gray-500 text-xs">Checked</dt>
							<dd className="font-semibold text-gray-900">
								{new Date(data.checkedAt).toLocaleString("en-IN", {
									dateStyle: "medium",
									timeStyle: "short",
								})}
							</dd>
						</div>
					</dl>
				</div>

				{data.serpFeatures?.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-1.5">
						{data.serpFeatures.map((feature) => (
							<span
								key={feature}
								className="px-2 py-0.5 text-[11px] rounded-full bg-white/70 border border-gray-200 text-gray-600"
							>
								{feature.replace(/_/g, " ")}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
				<div className="px-5 py-3 border-b border-gray-100">
					<h2 className="font-semibold text-gray-900">Organic results</h2>
				</div>
				<ol className="divide-y divide-gray-100">
					{data.results.map((item) => (
						<li
							key={`${item.position}-${item.url}`}
							className={`px-5 py-3.5 flex gap-4 ${item.isTarget ? "bg-green-50/60" : ""}`}
						>
							<span
								className={`shrink-0 w-8 h-8 rounded-lg grid place-items-center text-sm font-semibold ${
									item.isTarget
										? "bg-green-600 text-white"
										: "bg-gray-100 text-gray-600"
								}`}
							>
								{item.position}
							</span>
							<div className="min-w-0">
								<p className="font-medium text-gray-900 truncate">
									{item.title}
								</p>
								<a
									href={item.url}
									target="_blank"
									rel="noreferrer"
									className="text-xs text-gray-500 hover:text-accent break-all"
								>
									{item.domain}
								</a>
								{item.description && (
									<p className="text-sm text-gray-600 mt-1 line-clamp-2">
										{item.description}
									</p>
								)}
							</div>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
