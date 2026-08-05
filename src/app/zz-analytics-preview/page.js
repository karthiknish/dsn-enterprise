import { Globe, MonitorSmartphone, Radio, SignpostBig } from "lucide-react";
import AnalyticsBreakdownCard from "@/app/admin/analytics/AnalyticsBreakdownCard";
import AnalyticsInsightsPanel from "@/app/admin/analytics/AnalyticsInsightsPanel";
import AnalyticsMetricCards from "@/app/admin/analytics/AnalyticsMetricCards";
import AnalyticsReferrersTable from "@/app/admin/analytics/AnalyticsReferrersTable";
import AnalyticsTopPagesTable from "@/app/admin/analytics/AnalyticsTopPagesTable";
import AnalyticsTrafficTrendSection from "@/app/admin/analytics/AnalyticsTrafficTrendSection";

const m = (value, previous) => ({
	value,
	previous,
	change: previous ? ((value - previous) / previous) * 100 : null,
});

const data = {
	period: "30d",
	days: 30,
	fetchedAt: new Date().toISOString(),
	hasData: true,
	hasComparison: true,
	metrics: {
		activeUsers: m(1284, 1042),
		newUsers: m(1090, 921),
		sessions: m(1610, 1499),
		screenPageViews: m(4210, 4560),
		bounceRate: m(0.412, 0.475),
		engagementRate: m(0.588, 0.525),
		averageSessionDuration: m(161, 140),
		screenPageViewsPerSession: m(2.61, 3.04),
	},
	trends: Array.from({ length: 30 }, (_, i) => {
		const d = new Date(Date.UTC(2026, 5, i + 1));
		return {
			date: `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`,
			users: 30 + Math.round(25 * Math.sin(i / 3) + i),
			sessions: 40 + Math.round(30 * Math.sin(i / 3.4) + i),
			pageViews: 110 + Math.round(60 * Math.sin(i / 2.6) + i * 2),
		};
	}),
	topPages: [
		{ path: "/", views: 1420, users: 980, avgDuration: 142, share: 33.7 },
		{ path: "/products/thread-plug-gauges-coimbatore", views: 640, users: 512, avgDuration: 201, share: 15.2 },
		{ path: "/services/gauge-calibration-coimbatore", views: 410, users: 366, avgDuration: 188, share: 9.7 },
		{ path: "/contact", views: 288, users: 250, avgDuration: 64, share: 6.8 },
	],
	referrers: [
		{ label: "google / organic", sessions: 780, users: 690, share: 48.4 },
		{ label: "(direct) / (none)", sessions: 520, users: 470, share: 32.3 },
		{ label: "indiamart.com / referral", sessions: 190, users: 165, share: 11.8 },
	],
	channels: [
		{ label: "Organic Search", sessions: 780, engagementRate: 0.61, share: 48.4 },
		{ label: "Direct", sessions: 520, engagementRate: 0.54, share: 32.3 },
		{ label: "Referral", sessions: 210, engagementRate: 0.48, share: 13.0 },
		{ label: "Organic Social", sessions: 100, engagementRate: 0.39, share: 6.2 },
	],
	devices: [
		{ label: "mobile", sessions: 940, bounceRate: 0.46, share: 58.4 },
		{ label: "desktop", sessions: 610, bounceRate: 0.33, share: 37.9 },
		{ label: "tablet", sessions: 60, bounceRate: 0.51, share: 3.7 },
	],
	countries: [
		{ label: "India", users: 1010, sessions: 1280, share: 78.7 },
		{ label: "United States", users: 122, sessions: 150, share: 9.5 },
		{ label: "Germany", users: 61, sessions: 70, share: 4.8 },
	],
	landingPages: [
		{ label: "/", sessions: 690, bounceRate: 0.38, share: 42.9 },
		{ label: "/products/plain-gauges", sessions: 310, bounceRate: 0.72, share: 19.3 },
		{ label: "/blog", sessions: 180, bounceRate: 0.55, share: 11.2 },
	],
};

export default function AnalyticsPreviewPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="mx-auto max-w-7xl space-y-8">
				<AnalyticsMetricCards metrics={data.metrics} days={data.days} />
				<AnalyticsTrafficTrendSection trends={data.trends} />
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<AnalyticsBreakdownCard
						title="Acquisition Channels"
						description="How visitors arrive"
						icon={Radio}
						rows={data.channels}
						valueKey="sessions"
						valueLabel="Sessions"
						secondaryKey="engagementRate"
						secondaryLabel="engaged"
					/>
					<AnalyticsBreakdownCard
						title="Devices"
						description="Sessions by device category"
						icon={MonitorSmartphone}
						rows={data.devices}
						valueKey="sessions"
						valueLabel="Sessions"
						secondaryKey="bounceRate"
						secondaryLabel="bounce"
					/>
				</div>
				<div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
					<AnalyticsTopPagesTable topPages={data.topPages} />
					<AnalyticsReferrersTable referrers={data.referrers} />
				</div>
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<AnalyticsBreakdownCard
						title="Landing Pages"
						description="Where sessions start"
						icon={SignpostBig}
						rows={data.landingPages}
						valueKey="sessions"
						valueLabel="Sessions"
						secondaryKey="bounceRate"
						secondaryLabel="bounce"
					/>
					<AnalyticsBreakdownCard
						title="Top Countries"
						description="Users by location"
						icon={Globe}
						rows={data.countries}
						valueKey="users"
						valueLabel="Users"
						secondaryKey="sessions"
						secondaryLabel="sessions"
						secondaryFormat="count"
					/>
				</div>
				<AnalyticsInsightsPanel data={data} />
			</div>
		</div>
	);
}
