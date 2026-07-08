"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const { push } = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await login(email, password);
			push("/admin");
		} catch (error) {
			console.error("Login error:", error);
			setError(
				error.code === "auth/invalid-credential"
					? "Invalid email or password"
					: error.message,
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-sm">
				<div className="flex flex-col items-center mb-8">
					<div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-4">
						<span className="font-bold text-white">D</span>
					</div>
					<h2 className="text-xl font-semibold text-gray-900">
						Sign in to DSN Admin
					</h2>
					<p className="mt-1.5 text-sm text-gray-500">
						Enter your credentials to access the dashboard
					</p>
				</div>

				<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 sm:p-8">
					<form className="space-y-5" onSubmit={handleSubmit}>
						{error && (
							<div
								className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
								role="alert"
							>
								{error}
							</div>
						)}

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								aria-label="Email address"
								autoComplete="email"
								required
								className="block w-full p-2.5 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
								placeholder="you@company.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1.5"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								aria-label="Password"
								autoComplete="current-password"
								required
								className="block w-full p-2.5 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center items-center py-2.5 px-4 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
						>
							{loading ? (
								<span className="flex items-center">
									<svg
										aria-hidden="true"
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Signing in…
								</span>
							) : (
								"Sign in"
							)}
						</button>
					</form>
				</div>

				<p className="mt-6 text-center text-sm text-gray-500">
					<Link
						href="/"
						className="font-medium text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
					>
						← Back to website
					</Link>
				</p>
			</div>
		</div>
	);
}
