"use client";

import { useMemo, useState } from "react";
import {
	DEFAULT_DOMAIN,
	formatUsd,
	LOCATIONS,
	SEO_TABS,
	SUGGESTED_KEYWORDS,
} from "./seo-constants";

const INPUT_CLASS =
	"w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";
const LABEL_CLASS = "block text-xs font-medium text-gray-600 mb-1.5";

/**
 * One form, three shapes. The fields differ per task but the submit path,
 * cost hint and disabled logic are identical, so they share a component rather
 * than being duplicated three times.
 */
export default function SeoQueryForm({
	task,
	loading,
	disabled,
	costs,
	defaultDomain = DEFAULT_DOMAIN,
	onSubmit,
}) {
	const [keyword, setKeyword] = useState(SUGGESTED_KEYWORDS[0]);
	const [domain, setDomain] = useState(defaultDomain);
	const [targets, setTargets] = useState(defaultDomain);
	const [locationCode, setLocationCode] = useState(LOCATIONS[0].code);
	const [limit, setLimit] = useState(40);
	const [depth, setDepth] = useState(20);
	const [ideaDepth, setIdeaDepth] = useState(2);

	const tab = SEO_TABS.find((item) => item.id === task);

	// DataForSEO bills SERP per 10 results and Moz bills per target row, so a
	// flat per-call price would understate every run but the smallest.
	const estimate = useMemo(() => {
		const base = costs?.[task];
		if (!base) return null;
		if (task === "rank") return base * Math.ceil(Number(depth) / 10);
		if (task === "authority") {
			const count = targets.split(/[\n,]/).filter((v) => v.trim()).length;
			return base * Math.max(count, 1);
		}
		return base;
	}, [costs, task, depth, targets]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (loading || disabled) return;

		if (task === "rank") {
			onSubmit({ keyword, domain, locationCode, depth: Number(depth) });
		} else if (task === "keywords") {
			onSubmit({
				keyword,
				locationCode,
				limit: Number(limit),
				ideaDepth: Number(ideaDepth),
			});
		} else {
			onSubmit({
				targets: targets
					.split(/[\n,]/)
					.map((value) => value.trim())
					.filter(Boolean),
			});
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white rounded-xl border border-gray-200 p-5 space-y-4"
		>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{task !== "authority" && (
					<div className="sm:col-span-2">
						<label className={LABEL_CLASS} htmlFor="seo-keyword">
							{task === "rank" ? "Keyword" : "Seed keyword"}
						</label>
						<input
							id="seo-keyword"
							type="text"
							value={keyword}
							onChange={(event) => setKeyword(event.target.value)}
							placeholder="thread gauges"
							className={INPUT_CLASS}
							required
						/>
					</div>
				)}

				{task === "rank" && (
					<div>
						<label className={LABEL_CLASS} htmlFor="seo-domain">
							Your domain
						</label>
						<input
							id="seo-domain"
							type="text"
							value={domain}
							onChange={(event) => setDomain(event.target.value)}
							placeholder="dsnenterprises.in"
							className={INPUT_CLASS}
							required
						/>
					</div>
				)}

				{task === "authority" && (
					<div className="sm:col-span-4">
						<label className={LABEL_CLASS} htmlFor="seo-targets">
							Domains — one per line or comma separated (max 10)
						</label>
						<textarea
							id="seo-targets"
							value={targets}
							onChange={(event) => setTargets(event.target.value)}
							rows={3}
							placeholder={"dsnenterprises.in\nuniversal-gauges.com"}
							className={`${INPUT_CLASS} font-mono`}
							required
						/>
					</div>
				)}

				{task !== "authority" && (
					<div>
						<label className={LABEL_CLASS} htmlFor="seo-location">
							Location
						</label>
						<select
							id="seo-location"
							value={locationCode}
							onChange={(event) => setLocationCode(Number(event.target.value))}
							className={INPUT_CLASS}
						>
							{LOCATIONS.map((location) => (
								<option key={location.code} value={location.code}>
									{location.label}
								</option>
							))}
						</select>
					</div>
				)}

				{task === "rank" && (
					<div>
						<label className={LABEL_CLASS} htmlFor="seo-depth">
							Results to scan
						</label>
						<select
							id="seo-depth"
							value={depth}
							onChange={(event) => setDepth(event.target.value)}
							className={INPUT_CLASS}
						>
							{[10, 20, 50, 100].map((value) => (
								<option key={value} value={value}>
									Top {value}
								</option>
							))}
						</select>
					</div>
				)}

				{task === "keywords" && (
					<>
						<div>
							<label className={LABEL_CLASS} htmlFor="seo-limit">
								Ideas to return
							</label>
							<select
								id="seo-limit"
								value={limit}
								onChange={(event) => setLimit(event.target.value)}
								className={INPUT_CLASS}
							>
								{[20, 40, 60, 100].map((value) => (
									<option key={value} value={value}>
										{value}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className={LABEL_CLASS} htmlFor="seo-idea-depth">
								Crawl breadth
							</label>
							<select
								id="seo-idea-depth"
								value={ideaDepth}
								onChange={(event) => setIdeaDepth(event.target.value)}
								className={INPUT_CLASS}
							>
								<option value={1}>Narrow — closest matches</option>
								<option value={2}>Balanced (recommended)</option>
								<option value={3}>Wide — more, looser ideas</option>
							</select>
						</div>
					</>
				)}
			</div>

			{task !== "authority" && (
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-xs text-gray-500">Try:</span>
					{SUGGESTED_KEYWORDS.map((suggestion) => (
						<button
							key={suggestion}
							type="button"
							onClick={() => setKeyword(suggestion)}
							className="px-2.5 py-1 text-xs rounded-full border border-gray-200 text-gray-600 hover:border-accent hover:text-gray-900 transition-colors"
						>
							{suggestion}
						</button>
					))}
				</div>
			)}

			<div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-100">
				<p className="text-xs text-gray-500">
					<span className="font-mono">{tab?.endpoint}</span>
					{estimate ? ` · ~${formatUsd(estimate)} per run` : null}
				</p>
				<button
					type="submit"
					disabled={loading || disabled}
					className="px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
				>
					{loading ? "Running…" : "Run query"}
				</button>
			</div>
		</form>
	);
}
