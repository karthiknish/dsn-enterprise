import { SITEMAP_SEGMENTS } from "@/lib/sitemap-entries";
import { renderSitemapIndex, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

/**
 * Sitemap index. robots.txt points here, so Google discovers both segments
 * without either being submitted by hand, while Search Console still reports
 * coverage per segment.
 *
 * Segment membership is intentional, not a size split: the 50k-URL limit is
 * nowhere near binding at ~90 URLs. See lib/sitemap-entries.js.
 */
export async function GET() {
	return xmlResponse(
		renderSitemapIndex(
			SITEMAP_SEGMENTS.map((segment) => ({
				url: segment.url,
				lastModified: segment.lastModified(),
			})),
		),
	);
}
