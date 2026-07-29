"use client";

import { useState } from "react";

const TOOL_LABELS = {
	web_search: "Searched the web",
	read_page: "Read source",
	save_draft: "Wrote the draft",
};

function hostOf(url) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}

function ToolEntry({ entry }) {
	const [open, setOpen] = useState(false);
	const label = TOOL_LABELS[entry.name] || entry.name;
	const query = entry.args?.query;
	const sources = entry.summary || [];

	return (
		<div className="border-l-2 border-gray-200 pl-3 py-1">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 text-left"
			>
				{entry.status === "running" ? (
					<span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
				) : entry.status === "error" ? (
					<span className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
				) : (
					<span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
				)}
				<span className="font-medium">{label}</span>
				{query && <span className="truncate max-w-xs">“{query}”</span>}
				{sources.length > 0 && (
					<span className="text-gray-400">· {sources.length} results</span>
				)}
			</button>

			{open && sources.length > 0 && (
				<ul className="mt-2 space-y-1">
					{sources.map((source) => (
						<li key={source.url} className="text-xs">
							<a
								href={source.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-accent hover:underline"
							>
								{source.title || source.url}
							</a>
							<span className="text-gray-400"> · {hostOf(source.url)}</span>
						</li>
					))}
				</ul>
			)}

			{entry.status === "error" && (
				<p className="text-xs text-red-600 mt-1">{entry.error}</p>
			)}
		</div>
	);
}

export default function ChatTimelineEntry({ entry }) {
	if (entry.kind === "user") {
		return (
			<div className="flex justify-end">
				<div className="bg-primary text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] text-sm whitespace-pre-wrap">
					{entry.content}
				</div>
			</div>
		);
	}

	if (entry.kind === "assistant") {
		return (
			<div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[92%] text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
				{entry.content}
			</div>
		);
	}

	if (entry.kind === "tool") {
		return <ToolEntry entry={entry} />;
	}

	if (entry.kind === "revision") {
		return (
			<div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
				Slop check failed — revision pass {entry.attempt}
				{entry.issues?.length ? `: ${entry.issues.join(", ")}` : ""}
			</div>
		);
	}

	if (entry.kind === "draft") {
		return (
			<div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
				Draft saved · {entry.wordCount} words · quality {entry.score}/100
			</div>
		);
	}

	return null;
}
