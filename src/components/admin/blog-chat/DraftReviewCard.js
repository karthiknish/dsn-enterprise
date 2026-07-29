"use client";

import { useState } from "react";

const SEVERITY_STYLES = {
	high: "text-red-700 bg-red-50 border-red-200",
	medium: "text-amber-700 bg-amber-50 border-amber-200",
	low: "text-gray-600 bg-gray-50 border-gray-200",
};

function scoreTone(score) {
	if (score >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
	if (score >= 65) return "text-amber-700 bg-amber-50 border-amber-200";
	return "text-red-700 bg-red-50 border-red-200";
}

/**
 * Shows the finished draft, the deterministic slop report, the sources it
 * used, and the controls to push it into the post form.
 */
export default function DraftReviewCard({ draft, report, applied, onApply }) {
	const [showBody, setShowBody] = useState(false);
	const [showSources, setShowSources] = useState(false);

	if (!draft) return null;

	return (
		<div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
			<div className="p-4 border-b border-gray-100">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<h4 className="font-medium text-gray-900 text-sm">{draft.title}</h4>
						<p className="text-xs text-gray-500 mt-1 line-clamp-2">
							{draft.excerpt}
						</p>
					</div>
					{report && (
						<span
							className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full border ${scoreTone(report.score)}`}
							title="Deterministic anti-slop score"
						>
							{report.score}/100
						</span>
					)}
				</div>

				{report && (
					<p className="text-xs text-gray-400 mt-2">
						{report.wordCount} words · {draft.sources?.length || 0} sources ·{" "}
						{report.issues.length} flag
						{report.issues.length === 1 ? "" : "s"}
					</p>
				)}
			</div>

			{report?.issues?.length > 0 && (
				<ul className="px-4 py-3 space-y-1.5 border-b border-gray-100">
					{report.issues.map((issue) => (
						<li
							key={issue.id}
							className={`text-xs border rounded-lg px-2 py-1.5 ${SEVERITY_STYLES[issue.severity]}`}
						>
							<span className="font-medium">{issue.id}</span> — {issue.detail}
							{issue.samples?.length > 0 && (
								<span className="opacity-70">
									{" "}
									({issue.samples.join("; ")})
								</span>
							)}
						</li>
					))}
				</ul>
			)}

			<div className="px-4 py-3 flex flex-wrap gap-2 border-b border-gray-100">
				<button
					type="button"
					onClick={() => onApply({})}
					className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-primary-dark transition-colors"
				>
					{applied ? "Apply again" : "Apply to post"}
				</button>
				<button
					type="button"
					onClick={() => onApply({ title: false, excerpt: false, seo: false })}
					className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors"
				>
					Body only
				</button>
				<button
					type="button"
					onClick={() => setShowBody((v) => !v)}
					className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors"
				>
					{showBody ? "Hide" : "Preview"} markdown
				</button>
				{draft.sources?.length > 0 && (
					<button
						type="button"
						onClick={() => setShowSources((v) => !v)}
						className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition-colors"
					>
						Sources ({draft.sources.length})
					</button>
				)}
			</div>

			{showSources && draft.sources?.length > 0 && (
				<ul className="px-4 py-3 space-y-2 border-b border-gray-100 max-h-56 overflow-y-auto">
					{draft.sources.map((source) => (
						<li key={source.url} className="text-xs">
							<a
								href={source.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent hover:underline break-all"
							>
								{source.title || source.url}
							</a>
							{source.usedFor && (
								<p className="text-gray-500 mt-0.5">{source.usedFor}</p>
							)}
						</li>
					))}
				</ul>
			)}

			{showBody && (
				<pre className="px-4 py-3 text-xs text-gray-700 whitespace-pre-wrap max-h-80 overflow-y-auto bg-gray-50 font-mono leading-relaxed">
					{draft.contentMarkdown}
				</pre>
			)}
		</div>
	);
}
