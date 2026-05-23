const PEXELS_API_URL = "https://api.pexels.com/v1";

function getApiKey() {
	return process.env.PEXELS_API_KEY || process.env.NEXT_PUBLIC_PEXELS_API_KEY;
}

async function pexelsFetch(path) {
	const apiKey = getApiKey();
	if (!apiKey) {
		throw new Error("Pexels API key is not configured");
	}

	const response = await fetch(`${PEXELS_API_URL}${path}`, {
		headers: { Authorization: apiKey },
		next: { revalidate: 300 },
	});

	if (!response.ok) {
		throw new Error(`Pexels API error: ${response.status}`);
	}

	return response.json();
}

export async function searchPhotos(query, perPage = 15, page = 1) {
	const params = new URLSearchParams({
		query,
		per_page: String(perPage),
		page: String(page),
	});
	return pexelsFetch(`/search?${params}`);
}

export async function getCuratedPhotos(perPage = 15, page = 1) {
	const params = new URLSearchParams({
		per_page: String(perPage),
		page: String(page),
	});
	return pexelsFetch(`/curated?${params}`);
}

export async function getPhoto(id) {
	return pexelsFetch(`/photos/${id}`);
}
