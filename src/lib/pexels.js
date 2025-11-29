const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const PEXELS_API_URL = "https://api.pexels.com/v1";

/**
 * Search for photos on Pexels
 * @param {string} query - Search query
 * @param {number} perPage - Number of results per page (default: 15)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Pexels search response
 */
export async function searchPhotos(query, perPage = 15, page = 1) {
  if (!PEXELS_API_KEY) {
    throw new Error("Pexels API key is not configured");
  }

  const response = await fetch(
    `${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get curated photos from Pexels
 * @param {number} perPage - Number of results per page (default: 15)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Pexels curated response
 */
export async function getCuratedPhotos(perPage = 15, page = 1) {
  if (!PEXELS_API_KEY) {
    throw new Error("Pexels API key is not configured");
  }

  const response = await fetch(
    `${PEXELS_API_URL}/curated?per_page=${perPage}&page=${page}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get a specific photo by ID
 * @param {number} id - Photo ID
 * @returns {Promise<Object>} Pexels photo object
 */
export async function getPhoto(id) {
  if (!PEXELS_API_KEY) {
    throw new Error("Pexels API key is not configured");
  }

  const response = await fetch(`${PEXELS_API_URL}/photos/${id}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }

  return response.json();
}
