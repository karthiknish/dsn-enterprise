/**
 * Exa search client (server-only).
 *
 * Exa is used as the research layer for the blog studio: the model can only
 * state facts it has actually read, and every claim carries a real URL.
 */

const EXA_API_URL = "https://api.exa.ai";

function getApiKey() {
	const key = process.env.EXA_API_KEY;
	if (!key) throw new Error("EXA_API_KEY is not configured");
	return key;
}

async function exaFetch(path, body) {
	const response = await fetch(`${EXA_API_URL}${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": getApiKey(),
		},
		body: JSON.stringify(body),
		cache: "no-store",
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		throw new Error(
			`Exa API error (${response.status}): ${detail.slice(0, 300)}`,
		);
	}

	return response.json();
}

function trim(text = "", limit) {
	const clean = text.replace(/\s+/g, " ").trim();
	return clean.length > limit ? `${clean.slice(0, limit)}…` : clean;
}

function isoDaysAgo(days) {
	const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
	return date.toISOString();
}

/**
 * Semantic search with page text, shaped for a model's context budget.
 */
export async function searchWeb({
	query,
	numResults = 5,
	category,
	includeDomains,
	recencyDays,
	maxCharacters = 1800,
}) {
	const body = {
		query,
		numResults: Math.min(Math.max(numResults, 1), 10),
		type: "auto",
		contents: {
			text: { maxCharacters },
			highlights: { numSentences: 3, highlightsPerUrl: 2, query },
		},
	};

	if (category) body.category = category;
	if (includeDomains?.length) body.includeDomains = includeDomains;
	if (recencyDays) body.startPublishedDate = isoDaysAgo(recencyDays);

	const data = await exaFetch("/search", body);

	return (data.results || []).map((result) => ({
		title: result.title || result.url,
		url: result.url,
		publishedDate: result.publishedDate || null,
		author: result.author || null,
		highlights: (result.highlights || []).map((h) => trim(h, 400)),
		text: trim(result.text || "", maxCharacters),
	}));
}

/**
 * Full text for URLs the model decided are worth reading properly.
 */
export async function readPages({ urls, maxCharacters = 6000 }) {
	const data = await exaFetch("/contents", {
		urls: urls.slice(0, 3),
		text: { maxCharacters },
	});

	return (data.results || []).map((result) => ({
		title: result.title || result.url,
		url: result.url,
		publishedDate: result.publishedDate || null,
		text: trim(result.text || "", maxCharacters),
	}));
}
