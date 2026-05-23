async function fetchPexels(params) {
	const search = new URLSearchParams(params);
	const response = await fetch(`/api/pexels?${search}`);

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data.error || `Failed to load photos (${response.status})`);
	}

	return data;
}

/**
 * Search for photos on Pexels (via server proxy)
 */
export async function searchPhotos(query, perPage = 15, page = 1) {
	return fetchPexels({
		type: "search",
		query,
		per_page: String(perPage),
		page: String(page),
	});
}

/**
 * Get curated photos from Pexels (via server proxy)
 */
export async function getCuratedPhotos(perPage = 15, page = 1) {
	return fetchPexels({
		type: "curated",
		per_page: String(perPage),
		page: String(page),
	});
}

/**
 * Get a specific photo by ID (via server proxy)
 */
export async function getPhoto(id) {
	return fetchPexels({
		type: "photo",
		id: String(id),
	});
}
