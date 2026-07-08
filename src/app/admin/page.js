"use client";

import { useEffect, useState } from "react";
import AdminDashboardView from "@/components/admin/AdminDashboardView";
import { fetchAdminDashboardStats } from "@/lib/admin-firestore";
import { describeFirestoreError } from "@/lib/firebase-errors";

export default function AdminDashboardPage() {
	const [stats, setStats] = useState({
		totalPosts: 0,
		publishedPosts: 0,
		draftPosts: 0,
	});
	const [recentPosts, setRecentPosts] = useState([]);
	const [fetchError, setFetchError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setFetchError(null);

		fetchAdminDashboardStats()
			.then((data) => {
				if (!cancelled) {
					setStats(data.stats);
					setRecentPosts(data.recentPosts);
					setLoading(false);
				}
			})
			.catch((error) => {
				if (!cancelled) {
					console.error("Error fetching dashboard data:", error);
					setFetchError(
						describeFirestoreError(
							error,
							"Could not load dashboard data. Check connection and try again.",
						),
					);
					setLoading(false);
				}
			});

		return () => { cancelled = true; };
	}, []);

	if (loading) {
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

	return (
		<AdminDashboardView
			stats={stats}
			recentPosts={recentPosts}
			fetchError={fetchError}
		/>
	);
}
