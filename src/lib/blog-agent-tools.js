/**
 * Tool surface exposed to the blog studio agent (server-only).
 *
 * Research tools are Exa-backed; save_draft is a terminal tool whose payload
 * becomes the draft the editor can push into the post form.
 */

import { readPages, searchWeb } from "@/lib/exa-server";

export const TOOL_SCHEMAS = [
	{
		type: "function",
		function: {
			name: "web_search",
			description:
				"Search the live web for technical sources. Use specific queries: standard numbers, part names, failure modes, measurement procedures. Call several times with different angles before writing.",
			parameters: {
				type: "object",
				properties: {
					query: {
						type: "string",
						description: "Specific search query, not a topic label.",
					},
					numResults: {
						type: "integer",
						description: "How many results to return (1-10). Default 5.",
					},
					category: {
						type: "string",
						enum: ["research paper", "news", "company", "pdf"],
						description: "Optional result category filter.",
					},
					includeDomains: {
						type: "array",
						items: { type: "string" },
						description:
							"Optional domain allow-list, e.g. ['iso.org','bis.gov.in','nabl-india.org'].",
					},
					recencyDays: {
						type: "integer",
						description:
							"Only return pages published within this many days. Use for market or regulatory changes.",
					},
				},
				required: ["query"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "read_page",
			description:
				"Read the full text of up to 3 URLs found via web_search. Use when a snippet is promising but incomplete.",
			parameters: {
				type: "object",
				properties: {
					urls: {
						type: "array",
						items: { type: "string" },
						description: "URLs to read (max 3).",
					},
				},
				required: ["urls"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "save_draft",
			description:
				"Save the finished article for the editor. Call this instead of pasting the article into chat.",
			parameters: {
				type: "object",
				properties: {
					title: { type: "string", description: "Final headline." },
					excerpt: {
						type: "string",
						description: "140-200 character summary for listings and social.",
					},
					metaTitle: {
						type: "string",
						description: "SEO title, 50-60 characters.",
					},
					metaDescription: {
						type: "string",
						description: "SEO description, 150-160 characters.",
					},
					contentMarkdown: {
						type: "string",
						description:
							"Full article body in markdown, starting at the first paragraph (no H1 — the title is separate).",
					},
					keywords: {
						type: "array",
						items: { type: "string" },
						description: "Target keywords actually used in the copy.",
					},
					sources: {
						type: "array",
						description: "Every source used, with what it supported.",
						items: {
							type: "object",
							properties: {
								url: { type: "string" },
								title: { type: "string" },
								usedFor: {
									type: "string",
									description: "Which claim this source backs.",
								},
							},
							required: ["url"],
						},
					},
				},
				required: ["title", "excerpt", "contentMarkdown"],
			},
		},
	},
];

/**
 * Execute one tool call. Returns { result, draft? } — draft is set only by
 * save_draft, which the agent loop treats as a checkpoint.
 */
/**
 * Models routinely overshoot SEO length limits. Clamp at a word boundary so
 * the editor never has to hand-trim a 217-character meta description.
 */
function clamp(text = "", limit) {
	const clean = text.trim();
	if (clean.length <= limit) return clean;
	const cut = clean.slice(0, limit);
	const lastSpace = cut.lastIndexOf(" ");
	return (lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).replace(
		/[\s,;:–—-]+$/,
		"",
	);
}

export async function executeTool(name, args) {
	switch (name) {
		case "web_search": {
			const results = await searchWeb({
				query: args.query,
				numResults: args.numResults ?? 5,
				category: args.category,
				includeDomains: args.includeDomains,
				recencyDays: args.recencyDays,
			});
			if (!results.length) {
				return { result: { note: "No results. Try a different query." } };
			}
			return {
				result: {
					query: args.query,
					results: results.map((r) => ({
						title: r.title,
						url: r.url,
						published: r.publishedDate,
						highlights: r.highlights,
						excerpt: r.text,
					})),
				},
			};
		}

		case "read_page": {
			const pages = await readPages({ urls: args.urls || [] });
			return { result: { pages } };
		}

		case "save_draft": {
			const draft = {
				title: args.title || "",
				excerpt: clamp(args.excerpt || "", 200),
				metaTitle: clamp(args.metaTitle || args.title || "", 60),
				metaDescription: clamp(args.metaDescription || "", 160),
				contentMarkdown: args.contentMarkdown || "",
				keywords: args.keywords || [],
				sources: args.sources || [],
			};
			return { result: { saved: true }, draft };
		}

		default:
			return { result: { error: `Unknown tool: ${name}` } };
	}
}
