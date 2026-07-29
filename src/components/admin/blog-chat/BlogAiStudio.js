"use client";

import { useEffect, useRef } from "react";
import { FaMagic, FaSpinner } from "react-icons/fa";
import { useBlogChat } from "@/hooks/useBlogChat";
import ChatTimelineEntry from "./ChatTimelineEntry";
import DraftReviewCard from "./DraftReviewCard";

const STARTERS = [
	"Find an angle our competitors haven't covered on thread gauge wear limits, then write it.",
	"What changed in gauge calibration compliance for Indian automotive suppliers this year?",
	"Write a buyer's guide: choosing between plug, ring and snap gauges for a new CNC line.",
	"Research why API 5B thread gauges fail inspection, then draft the article.",
];

/**
 * Research-grounded blog studio: DeepSeek does the thinking and writing, Exa
 * supplies live sources, and a deterministic slop check gates the draft before
 * the editor ever sees it.
 */
export default function BlogAiStudio({ postContext, onApplyDraft }) {
	const { state, send, stop, applyDraft, setInput, reset } = useBlogChat({
		postContext,
		onApplyDraft,
	});
	const scrollRef = useRef(null);
	const endRef = useRef(null);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		send(state.input);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			send(state.input);
		}
	};

	const empty = state.timeline.length === 0;

	return (
		<div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
			<div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
				<h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
					<FaMagic className="text-purple-600" />
					Blog studio
					<span className="font-normal text-xs text-gray-500">
						Exa research + DeepSeek + anti-slop check
					</span>
				</h3>
				{state.timeline.length > 0 && (
					<button
						type="button"
						onClick={reset}
						disabled={state.running}
						className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-40"
					>
						New session
					</button>
				)}
			</div>

			<div
				ref={scrollRef}
				className="px-5 py-4 space-y-3 max-h-[28rem] overflow-y-auto"
			>
				{empty && (
					<div className="py-2">
						<p className="text-sm text-gray-600">
							Describe the article you want. The agent searches live sources
							first, tells you what it found, then writes — and its draft has to
							pass a slop check before it reaches you.
						</p>
						<div className="mt-3 grid gap-2">
							{STARTERS.map((starter) => (
								<button
									key={starter}
									type="button"
									onClick={() => send(starter)}
									className="text-left text-xs text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:border-accent hover:bg-gray-50 transition-colors"
								>
									{starter}
								</button>
							))}
						</div>
					</div>
				)}

				{state.timeline.map((entry) => (
					<ChatTimelineEntry key={entry.id} entry={entry} />
				))}

				{state.running && (
					<div className="flex items-center gap-2 text-xs text-gray-500">
						<FaSpinner className="animate-spin" />
						Researching and writing — this takes a minute or two.
						<button
							type="button"
							onClick={stop}
							className="text-gray-400 hover:text-red-600 underline"
						>
							stop
						</button>
					</div>
				)}

				{state.error && (
					<div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
						{state.error}
					</div>
				)}

				<div ref={endRef} />
			</div>

			{state.draft && (
				<div className="px-5 pb-4">
					<DraftReviewCard
						draft={state.draft}
						report={state.report}
						applied={Boolean(state.appliedAt)}
						onApply={applyDraft}
					/>
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="border-t border-gray-100 p-3 flex gap-2 items-end bg-gray-50"
			>
				<label htmlFor="blog-studio-input" className="sr-only">
					Message the blog studio
				</label>
				<textarea
					id="blog-studio-input"
					rows={2}
					value={state.input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					disabled={state.running}
					placeholder="e.g. Research bore gauge calibration drift in high-humidity plants, then draft it. ⌘↵ to send"
					className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:bg-gray-100"
				/>
				<button
					type="submit"
					disabled={state.running || !state.input.trim()}
					className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed"
				>
					Send
				</button>
			</form>
		</div>
	);
}
