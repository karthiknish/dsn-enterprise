"use client";

import { AlertTriangle, Coins, Search, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import SeoAuthorityResults from "./SeoAuthorityResults";
import SeoKeywordResults from "./SeoKeywordResults";
import SeoQueryForm from "./SeoQueryForm";
import SeoRankResults from "./SeoRankResults";
import { DEFAULT_DOMAIN, formatUsd, SEO_TABS } from "./seo-constants";

/**
 * SEO console.
 *
 * Every run costs a fraction of a cent from the team's treg balance, so this
 * deliberately never auto-runs a query — results only appear after an explicit
 * submit, and the running total for the session is shown next to the balance.
 */
export default function SeoDashboard() {
	const { user, loading: authLoading } = useAuth();
	const [activeTab, setActiveTab] = useState("rank");
	const [status, setStatus] = useState(null);
	const [results, setResults] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [sessionSpend, setSessionSpend] = useState(0);

	const authedFetch = useCallback(async (path, init = {}) => {
		const current = auth.currentUser;
		if (!current) throw new Error("Your session has expired. Sign in again.");

		const token = await current.getIdToken();
		const response = await fetch(path, {
			...init,
			headers: {
				...(init.headers || {}),
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		const payload = await response.json().catch(() => ({}));

		if (response.status === 401) {
			throw new Error("Your session has expired. Sign in again.");
		}
		if (response.status === 403) {
			throw new Error("This account is not authorised to view SEO data.");
		}
		if (!response.ok) {
			throw new Error(payload.error || "Request failed");
		}

		return payload;
	}, []);

	// Config + balance only; no billable call runs on page load.
	useEffect(() => {
		if (authLoading || !user) return;
		authedFetch("/api/seo")
			.then(setStatus)
			.catch((err) => setError(err.message));
	}, [authLoading, user, authedFetch]);

	const runTask = useCallback(
		async (task, params) => {
			setLoading(true);
			setError(null);
			try {
				const data = await authedFetch("/api/seo", {
					method: "POST",
					body: JSON.stringify({ task, ...params }),
				});
				setResults((prev) => ({ ...prev, [task]: data }));
				setSessionSpend((prev) => prev + (data.costUsd || 0));
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		},
		[authedFetch],
	);

	const activeResult = results[activeTab] || null;
	const notConfigured = status && status.configured === false;

	return (
		<div className="space-y-6 max-w-6xl">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">SEO data</h1>
					<p className="text-gray-600 mt-1">
						Live rankings, keyword research and authority metrics via{" "}
						<a
							href="https://treg.superdesign.dev"
							target="_blank"
							rel="noreferrer"
							className="text-accent underline underline-offset-2"
						>
							treg
						</a>
						. Provider keys stay server-side.
					</p>
				</div>

				<div className="flex items-center gap-2 text-sm">
					{status?.balance ? (
						<span
							className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
								status.balance.balanceUsd < 0.05
									? "bg-red-50 border-red-200 text-red-700"
									: "bg-white border-gray-200 text-gray-700"
							}`}
							title="Remaining treg prepaid balance"
						>
							<Coins className="w-4 h-4" aria-hidden />
							{formatUsd(status.balance.balanceUsd)} left
						</span>
					) : null}
					{sessionSpend > 0 && (
						<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700">
							<Sparkles className="w-4 h-4" aria-hidden />
							{formatUsd(sessionSpend)} this session
						</span>
					)}
				</div>
			</div>

			{notConfigured && (
				<div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-900">
					<p className="font-medium flex items-center gap-2">
						<AlertTriangle className="w-4 h-4" aria-hidden />
						treg is not configured
					</p>
					<p className="text-sm mt-1">
						Add <code className="font-mono">TREG_TOKEN</code>,{" "}
						<code className="font-mono">TREG_ORG</code> and{" "}
						<code className="font-mono">TREG_ORG_ID</code> to the environment,
						then redeploy. See <code className="font-mono">.env.example</code>.
					</p>
				</div>
			)}

			<div
				className="flex flex-wrap gap-2 border-b border-gray-200"
				role="tablist"
				aria-label="SEO tools"
			>
				{SEO_TABS.map((tab) => {
					const isActive = tab.id === activeTab;
					return (
						<button
							key={tab.id}
							type="button"
							role="tab"
							aria-selected={isActive}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2.5 text-sm font-medium -mb-px border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t-md ${
								isActive
									? "border-accent text-gray-900"
									: "border-transparent text-gray-500 hover:text-gray-800"
							}`}
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			<SeoQueryForm
				task={activeTab}
				loading={loading}
				disabled={Boolean(notConfigured)}
				costs={status?.costs}
				defaultDomain={DEFAULT_DOMAIN}
				onSubmit={(params) => runTask(activeTab, params)}
			/>

			{error && (
				<div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
					<p className="font-medium">Lookup failed</p>
					<p className="text-sm mt-1">{error}</p>
				</div>
			)}

			{loading && (
				<div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
					<div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-accent mx-auto" />
					<p className="mt-4 text-gray-600">
						Querying live provider data — this can take a few seconds.
					</p>
				</div>
			)}

			{!loading && !activeResult && !error && (
				<div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
					<Search className="w-8 h-8 mx-auto text-gray-400" aria-hidden />
					<p className="mt-3 text-sm">
						{SEO_TABS.find((tab) => tab.id === activeTab)?.blurb}
					</p>
					<p className="mt-1 text-xs text-gray-400">
						Nothing runs until you submit — each query bills the treg balance.
					</p>
				</div>
			)}

			{!loading && activeResult && activeTab === "rank" && (
				<SeoRankResults data={activeResult} />
			)}
			{!loading && activeResult && activeTab === "keywords" && (
				<SeoKeywordResults data={activeResult} />
			)}
			{!loading && activeResult && activeTab === "authority" && (
				<SeoAuthorityResults data={activeResult} />
			)}
		</div>
	);
}
