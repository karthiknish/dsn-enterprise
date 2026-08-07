import { getMainEntries } from "@/lib/sitemap-entries";
import { renderUrlset, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

/**
 * Primary segment: hubs, product categories, blog posts, Hindi layer.
 * This is the file submitted to Search Console first — it contains only URLs
 * with unique content and internal links, so crawl budget lands on pages that
 * can actually index.
 */
export async function GET() {
	return xmlResponse(renderUrlset(await getMainEntries()));
}
