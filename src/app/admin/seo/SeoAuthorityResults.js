"use client";

import { formatNumber } from "./seo-constants";

/**
 * Moz authority metrics, one card per target.
 *
 * DA/PA are logarithmic 0-100 scores, so the bar is a rough visual only — a
 * jump from 20 to 30 is far harder than 10 to 20.
 */
export default function SeoAuthorityResults({ data }) {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			{data.results.map((row) => (
				<div
					key={row.page}
					className="bg-white rounded-xl border border-gray-200 p-5"
				>
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0">
							<p className="font-semibold text-gray-900 truncate">
								{row.rootDomain}
							</p>
							<p className="text-xs text-gray-500 truncate">{row.page}</p>
						</div>
						{row.spamScore !== null && (
							<span
								className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
									row.spamScore <= 5
										? "bg-green-100 text-green-800"
										: row.spamScore <= 30
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
								}`}
								title="Moz spam score — share of similar sites Google has penalised"
							>
								Spam {row.spamScore}%
							</span>
						)}
					</div>

					<div className="mt-4 grid grid-cols-2 gap-4">
						<ScoreBar label="Domain Authority" value={row.domainAuthority} />
						<ScoreBar label="Page Authority" value={row.pageAuthority} />
					</div>

					<dl className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
						<div>
							<dt className="text-xs text-gray-500">Linking root domains</dt>
							<dd className="font-semibold text-gray-900">
								{formatNumber(row.linkingRootDomains)}
							</dd>
						</div>
						<div>
							<dt className="text-xs text-gray-500">External links</dt>
							<dd className="font-semibold text-gray-900">
								{formatNumber(row.externalLinks)}
							</dd>
						</div>
						<div>
							<dt className="text-xs text-gray-500">Last crawled</dt>
							<dd className="font-semibold text-gray-900">
								{row.lastCrawled || "—"}
							</dd>
						</div>
						<div>
							<dt className="text-xs text-gray-500">HTTP status</dt>
							<dd className="font-semibold text-gray-900">
								{row.httpCode ?? "—"}
							</dd>
						</div>
					</dl>
				</div>
			))}
		</div>
	);
}

function ScoreBar({ label, value }) {
	const score = value ?? 0;
	return (
		<div>
			<p className="text-xs text-gray-500">{label}</p>
			<p className="text-2xl font-bold text-gray-900">{value ?? "—"}</p>
			<div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
				<div
					className="h-full rounded-full bg-accent"
					style={{ width: `${Math.min(score, 100)}%` }}
				/>
			</div>
		</div>
	);
}
