import { getCityEntries } from "@/lib/sitemap-entries";
import { renderUrlset, xmlResponse } from "@/lib/sitemap-xml";

export const revalidate = 86400;

/**
 * Location segment: generated product/service x city pages.
 *
 * Served but deliberately held back from Search Console submission until the
 * pages earn internal links (footer "Serving Tamil Nadu" block) and less
 * templated copy. Submitting them today only spends crawls on URLs Google has
 * already declined to index. Revalidation is daily rather than hourly because
 * the lastmod is pinned anyway.
 */
export async function GET() {
	return xmlResponse(renderUrlset(getCityEntries()), { maxAge: 86400 });
}
