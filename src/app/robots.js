import { SITE_URL } from "@/lib/site";

/**
 * robots.txt, including explicit AI crawler policy.
 *
 * Permissive, explicit bot access is the highest-impact technical AEO lever —
 * an answer engine cannot cite a page it was never allowed to fetch. A bare
 * `User-agent: *` group does technically permit these bots, but naming them
 * makes the policy auditable and lets training and citation access be
 * controlled separately, which a wildcard cannot express.
 *
 * AI crawlers do three different jobs. Treat the job, not the brand:
 *
 *   1. Search / index  — builds the index an answer engine cites from.
 *                        Blocking these removes you from AI answers.
 *   2. User fetch      — retrieves one page because a user asked about it.
 *                        Blocking these breaks "summarise this page" requests.
 *   3. Training        — ingests pages to train a model. Blocking these does
 *                        not affect citations, only future model knowledge.
 *
 * Current policy: allow all three. Categories 1 and 2 are required to be
 * cited at all. Category 3 is allowed because a small B2B manufacturer
 * generally benefits from models knowing the brand and its specialisms.
 *
 * To stop model training while staying citable, move the TRAINING_CRAWLERS
 * entries into the disallow branch below. Do NOT block the search or
 * user-fetch agents unless the intent is to disappear from AI answers.
 */

/** Build the AI answer engine index. Required for citations. */
const SEARCH_CRAWLERS = [
	"OAI-SearchBot", // OpenAI — powers ChatGPT search results
	"Claude-SearchBot", // Anthropic
	"PerplexityBot", // Perplexity
	"Amazonbot", // Amazon / Alexa
];

/** Fetch a single page on a user's explicit request. */
const USER_FETCH_CRAWLERS = [
	"ChatGPT-User",
	"Claude-User",
	"Perplexity-User",
	"MistralAI-User",
];

/** Ingest pages for model training. Optional — see note above. */
const TRAINING_CRAWLERS = [
	"GPTBot", // OpenAI
	"ClaudeBot", // Anthropic
	"Google-Extended", // Google (Gemini training; separate from Googlebot)
	"Applebot-Extended", // Apple
	"Meta-ExternalAgent", // Meta
	"CCBot", // Common Crawl
	"cohere-ai",
];

// Applies to every group. /api/ is disallowed because it is now authenticated
// and returns 401 to crawlers anyway; the query-string paths are duplicate
// views of content already reachable at a clean URL.
const DISALLOW = ["/admin/", "/api/", "/contact?", "/blog?page=", "/blog?q="];

export default function robots() {
	const aiAgents = [
		...SEARCH_CRAWLERS,
		...USER_FETCH_CRAWLERS,
		...TRAINING_CRAWLERS,
	];

	return {
		host: SITE_URL,
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: DISALLOW,
			},
			{
				// Named explicitly so the policy is legible and auditable rather
				// than inherited from the wildcard group.
				userAgent: aiAgents,
				allow: "/",
				disallow: DISALLOW,
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
