import { getMainEntries } from "@/lib/sitemap-entries";
import { renderUrlset, xmlResponse } from "@/lib/sitemap-xml";

/**
 * Primary segment: hubs, product categories, blog posts, Hindi layer.
 * This is the file submitted to Search Console first — it contains only URLs
 * with unique content and internal links, so crawl budget lands on pages that
 * can actually index.
 *
 * No `revalidate`: the blog URL set is fixed at build time by the post route's
 * `dynamicParams = false`, so a revalidated sitemap could list a post published
 * after that build and advertise a URL that 404s. Building this file from the
 * same `getPublishedPosts()` call as the route keeps the two in step. A new
 * post enters both at the next deploy. See docs/SEO-STRATEGY.md §2I.
 *
 * Route Handlers are uncached by default, so `force-static` is what makes this
 * prerender once at build. Dropping the old `revalidate = 3600` alone left it
 * dynamic — re-reading Firestore per request and re-introducing exactly the
 * drift this is meant to remove.
 */
export const dynamic = "force-static";
export async function GET() {
	return xmlResponse(renderUrlset(await getMainEntries()));
}
