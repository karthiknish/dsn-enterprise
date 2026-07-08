"use client";

import { useCallback, useEffect, useState } from "react";

export default function StatusPage() {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchHealth = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/health");
			if (!response.ok) {
				throw new Error("Health endpoint returned an error");
			}
			const data = await response.json();
			setResult(data);
		} catch (err) {
			setError(err?.message || "Failed to load status");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchHealth();
	}, [fetchHealth]);

	return (
		<div className="space-y-6 max-w-4xl">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">System Status</h1>
				<p className="text-gray-600 mt-1">
					Real-time health of DSN APIs and integrations.
				</p>
			</div>

			{loading && !result ? (
				<div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
					<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent mx-auto" />
					<p className="mt-4 text-gray-600">Checking service health...</p>
				</div>
			) : error ? (
				<div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-800">
					<p className="font-medium">Unable to load status</p>
					<p className="text-sm mt-1">{error}</p>
					<button
						type="button"
						onClick={fetchHealth}
						className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						Retry
					</button>
				</div>
			) : (
				<>
					<div
						className={`rounded-xl border p-4 flex items-center justify-between ${
							result?.overall === "healthy"
								? "bg-green-50 border-green-200 text-green-800"
								: "bg-yellow-50 border-yellow-200 text-yellow-800"
						}`}
					>
						<div className="flex items-center gap-3">
							<span
								className={`w-3 h-3 rounded-full ${
									result?.overall === "healthy"
										? "bg-green-500"
										: "bg-yellow-500"
								}`}
							/>
							<span className="font-semibold">
								{result?.overall === "healthy"
									? "All systems operational"
									: "Some services are experiencing issues"}
							</span>
						</div>
						<button
							type="button"
							onClick={fetchHealth}
							disabled={loading}
							className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
						>
							{loading ? "Refreshing..." : "Refresh"}
						</button>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<table className="min-w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
										Service
									</th>
									<th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
										Status
									</th>
									<th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
										Response
									</th>
									<th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
										Message
									</th>
								</tr>
							</thead>
							<tbody>
								{result?.checks?.map((check) => (
									<tr
										key={check.name}
										className="border-b border-gray-100 last:border-0"
									>
										<td className="py-4 px-4 font-medium text-gray-900">
											{check.name}
										</td>
										<td className="py-4 px-4">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													check.status === "healthy"
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												}`}
											>
												{check.status === "healthy" ? "Operational" : "Down"}
											</span>
										</td>
										<td className="py-4 px-4 text-sm text-gray-600">
											{check.responseTime}ms
										</td>
										<td className="py-4 px-4 text-sm text-gray-600">
											{check.message}
										</td>
									</tr>
								))}
								{!result?.checks?.length && (
									<tr>
										<td
											colSpan="4"
											className="py-8 px-4 text-center text-gray-500"
										>
											No health checks available.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{result?.checkedAt && (
						<p className="text-sm text-gray-500">
							Last checked: {new Date(result.checkedAt).toLocaleString()}
						</p>
					)}
				</>
			)}
		</div>
	);
}
