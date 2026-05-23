"use client";

import { useReducer } from "react";
import {
	aiBlogGeneratorReducer,
	initialAiBlogGeneratorState,
} from "@/lib/ai-blog-generator-reducer";

export function useAIBlogGenerator({ onContentGenerated, onMetadataGenerated }) {
	const [state, dispatch] = useReducer(
		aiBlogGeneratorReducer,
		initialAiBlogGeneratorState,
	);

	const generateContent = async () => {
		if (!state.topic.trim()) {
			dispatch({ type: "SET_ERROR", error: "Please enter a topic" });
			return;
		}

		dispatch({ type: "GENERATE_START" });

		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "generate",
					topic: state.topic.trim(),
					keywords: state.keywords
						.split(",")
						.flatMap((k) => {
							const trimmed = k.trim();
							return trimmed ? [trimmed] : [];
						}),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to generate content",
				});
				return;
			}

			if (data.success) {
				dispatch({ type: "GENERATE_SUCCESS", content: data.content });
				onContentGenerated?.(data.content);
			} else {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to generate content",
				});
			}
		} catch {
			dispatch({ type: "SET_ERROR", error: "Network error. Please try again." });
		} finally {
			dispatch({ type: "GENERATE_END" });
		}
	};

	const generateMetadata = async () => {
		if (!state.topic.trim() || !state.generatedContent) {
			dispatch({
				type: "SET_ERROR",
				error: "Topic and content are required for metadata generation",
			});
			return;
		}

		dispatch({ type: "META_START" });

		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "metadata",
					topic: state.topic.trim(),
					content: state.generatedContent,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to generate metadata",
				});
				return;
			}

			if (data.success && onMetadataGenerated) {
				onMetadataGenerated(data.metadata);
			} else {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to generate metadata",
				});
			}
		} catch {
			dispatch({ type: "SET_ERROR", error: "Network error. Please try again." });
		} finally {
			dispatch({ type: "META_END" });
		}
	};

	const loadBlogIdeas = async () => {
		dispatch({ type: "IDEAS_START" });

		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "ideas",
					category: "precision gauges and industrial metrology",
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to load ideas",
				});
				return;
			}

			if (data.success) {
				dispatch({ type: "IDEAS_SUCCESS", ideas: data.ideas });
			} else {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to load ideas",
				});
			}
		} catch {
			dispatch({ type: "SET_ERROR", error: "Network error. Please try again." });
		} finally {
			dispatch({ type: "IDEAS_END" });
		}
	};

	const improveContent = async (instruction) => {
		if (!state.generatedContent.trim()) {
			dispatch({
				type: "SET_ERROR",
				error: "Generate content first before improving",
			});
			return;
		}
		if (!instruction.trim()) {
			dispatch({
				type: "SET_ERROR",
				error: "Enter an improvement instruction",
			});
			return;
		}

		dispatch({ type: "IMPROVE_START" });

		try {
			const response = await fetch("/api/ai-generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "improve",
					content: state.generatedContent,
					instruction: instruction.trim(),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to improve content",
				});
				return;
			}

			if (data.success) {
				dispatch({ type: "IMPROVE_SUCCESS", content: data.content });
				onContentGenerated?.(data.content);
			} else {
				dispatch({
					type: "SET_ERROR",
					error: data.error || "Failed to improve content",
				});
			}
		} catch {
			dispatch({ type: "SET_ERROR", error: "Network error. Please try again." });
		} finally {
			dispatch({ type: "IMPROVE_END" });
		}
	};

	const copyContent = () => {
		navigator.clipboard.writeText(state.generatedContent);
		dispatch({ type: "SET_COPIED", copied: true });
		setTimeout(() => dispatch({ type: "SET_COPIED", copied: false }), 2000);
	};

	return {
		state,
		dispatch,
		generateContent,
		generateMetadata,
		loadBlogIdeas,
		improveContent,
		copyContent,
	};
}
