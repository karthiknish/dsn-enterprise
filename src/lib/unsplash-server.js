const UNSPLASH_API_URL = "https://api.unsplash.com";

function getApiKey() {
	return process.env.UNSPLASH_ACCESS_KEY;
}

async function unsplashFetch(path, params = {}) {
	const apiKey = getApiKey();
	if (!apiKey) {
		throw new Error("Unsplash access key is not configured");
	}

	const searchParams = new URLSearchParams(params);
	const response = await fetch(`${UNSPLASH_API_URL}${path}?${searchParams}`, {
		headers: { Authorization: `Client-ID ${apiKey}` },
		next: { revalidate: 300 },
	});

	if (!response.ok) {
		throw new Error(`Unsplash API error: ${response.status}`);
	}

	return response.json();
}

export async function searchPhotos(query, perPage = 15, page = 1) {
	const data = await unsplashFetch("/search/photos", {
		query,
		per_page: String(perPage),
		page: String(page),
	});

	return { photos: data.results || [], total: data.total || 0 };
}

export async function getPhotos(perPage = 15, page = 1) {
	const photos = await unsplashFetch("/photos", {
		per_page: String(perPage),
		page: String(page),
	});

	return { photos: Array.isArray(photos) ? photos : [] };
}

export async function getPhoto(id) {
	if (!id) {
		throw new Error("Photo id is required");
	}

	return unsplashFetch(`/photos/${id}`);
}
