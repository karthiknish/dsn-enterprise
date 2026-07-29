import AnalyticsDashboard from "./AnalyticsDashboard";

/**
 * Admin analytics page.
 *
 * This deliberately does NOT fetch analytics on the server.
 *
 * Admin protection is a client-side redirect in AdminLayout, so a server
 * component here runs before any auth check exists. It previously called
 * getAnalyticsData() and serialised the result into the HTML, which meant an
 * anonymous `curl /admin/analytics` received the payload (topPages, referrers)
 * embedded in the RSC flight data regardless of the redirect.
 *
 * The dashboard now fetches from /api/analytics with the user's Firebase ID
 * token after mount, so there is exactly one authenticated path to the data
 * and nothing is rendered server-side for an unauthenticated caller.
 */

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
	return <AnalyticsDashboard initialPeriod="30d" />;
}
