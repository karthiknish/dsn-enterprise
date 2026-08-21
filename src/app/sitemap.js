import { getAllEntries } from "@/lib/sitemap-entries";

export const revalidate = 3600; // Revalidate every hour

/**
 * Legacy single-file sitemap.
 *
 * Superseded by /sitemap-index.xml + the two segments, but kept alive because
 * this URL is still linked from external references. Search Console now
 * tracks /sitemap-index.xml instead; submitting both would duplicate every
 * URL. Removing this file would 404 those old references.
 *
 * It composes the same builders as the segments, so the three files can never
 * disagree about which URLs exist.
 */
export default async function sitemap() {
	return await getAllEntries();
}
