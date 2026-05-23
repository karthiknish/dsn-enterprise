import { CITIES } from "@/lib/seo-pages.config";

/**
 * Parse combined slugs like "plain-plug-gauges-chennai" into product/service + city.
 */
const citySlugSet = new Set(CITIES.map((c) => c.slug));

export function parseLocationSlug(slug) {
	const parts = slug.split("-");

	for (let i = parts.length - 1; i >= 0; i--) {
		if (citySlugSet.has(parts[i])) {
			return {
				citySlug: parts[i],
				entitySlug: parts.slice(0, i).join("-"),
			};
		}
	}

	return { citySlug: null, entitySlug: null };
}
