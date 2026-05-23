import { CITIES } from "@/lib/seo-pages.config";

/**
 * Parse combined slugs like "plain-plug-gauges-chennai" into product/service + city.
 */
export function parseLocationSlug(slug) {
	const parts = slug.split("-");
	const citySlugs = CITIES.map((c) => c.slug);

	for (let i = parts.length - 1; i >= 0; i--) {
		if (citySlugs.includes(parts[i])) {
			return {
				citySlug: parts[i],
				entitySlug: parts.slice(0, i).join("-"),
			};
		}
	}

	return { citySlug: null, entitySlug: null };
}
