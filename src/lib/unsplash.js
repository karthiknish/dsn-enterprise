async function fetchUnsplash(params) {
	const search = new URLSearchParams(params);
	const response = await fetch(`/api/unsplash?${search}`);

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data.error || `Failed to load photos (${response.status})`);
	}

	return data;
}

/**
 * Search for photos on Unsplash (via server proxy)
 */
export async function searchUnsplashPhotos(query, perPage = 15, page = 1) {
	return fetchUnsplash({
		type: "search",
		query,
		per_page: String(perPage),
		page: String(page),
	});
}

/**
 * Get latest photos from Unsplash (via server proxy)
 */
export async function getUnsplashPhotos(perPage = 15, page = 1) {
	return fetchUnsplash({
		type: "photos",
		per_page: String(perPage),
		page: String(page),
	});
}

