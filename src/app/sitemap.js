import { getAllEntries } from "@/lib/sitemap-entries";

export const revalidate = 3600; // Revalidate every hour

/**
 * Legacy single-file sitemap.
 *
 * Superseded by /sitemap-index.xml + the two segments, but kept alive because
 * this URL is already submitted in Search Console and linked from external
 * references. Removing it would turn a known-good sitemap into a 404, which
 * Search Console reports as a fetch error rather than quietly forgetting.
 *
 * It composes the same builders as the segments, so the three files can never
 * disagree about which URLs exist.
 */
export default async function sitemap() {
	return await getAllEntries();
}
