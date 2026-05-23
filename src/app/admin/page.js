"use client";

import { Suspense, use } from "react";
import AdminDashboardView from "@/components/admin/AdminDashboardView";
import { fetchAdminDashboardStats } from "@/lib/admin-firestore";

const dashboardResource = fetchAdminDashboardStats()
	.then((data) => ({ ok: true, data }))
	.catch((error) => {
		console.error("Error fetching dashboard data:", error);
		return {
			ok: false,
			error: "Could not load dashboard data. Check connection and try again.",
		};
	});

function AdminDashboardContent() {
	const result = use(dashboardResource);

	if (!result.ok) {
		return (
			<AdminDashboardView
				stats={{ totalPosts: 0, publishedPosts: 0, draftPosts: 0 }}
				recentPosts={[]}
				fetchError={result.error}
			/>
		);
	}

	return (
		<AdminDashboardView
			stats={result.data.stats}
			recentPosts={result.data.recentPosts}
			fetchError={null}
		/>
	);
}

function AdminDashboardLoading() {
	return (
		<output
			className="flex items-center justify-center min-h-[40vh] w-full"
			aria-live="polite"
		>
			<span className="sr-only">Loading dashboard</span>
			<div
				className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
				aria-hidden
			/>
		</output>
	);
}

export default function AdminDashboardPage() {
	return (
		<Suspense fallback={<AdminDashboardLoading />}>
			<AdminDashboardContent />
		</Suspense>
	);
}
