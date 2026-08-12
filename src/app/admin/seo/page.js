import SeoDashboard from "./SeoDashboard";

/**
 * Admin SEO page.
 *
 * Like /admin/analytics, this renders nothing on the server. Admin protection
 * is a client-side redirect in AdminLayout, so a server component would run
 * before any auth check and leak its payload into the RSC flight data for an
 * anonymous request. The dashboard fetches /api/seo with the user's Firebase ID
 * token after mount instead.
 */

export const dynamic = "force-dynamic";

export default function SeoPage() {
	return <SeoDashboard />;
}
