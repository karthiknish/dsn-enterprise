import { NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/analytics-data";
import { getAdminDb } from "@/lib/firebase-admin";
import { getCuratedPhotos } from "@/lib/pexels-server";
import {
	assessSitemap,
	getSitemapStatus,
	SEARCH_CONSOLE_SITE,
} from "@/lib/search-console";
import { getSubmittedSitemapUrls } from "@/lib/sitemap-entries";
import { getPhotos } from "@/lib/unsplash-server";

export const dynamic = "force-dynamic";

const HEALTH_TIMEOUT_MS = 10000;

function withTimeout(promise, ms, message = "Operation timed out") {
	return Promise.race([
		promise,
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error(message)), ms),
		),
	]);
}

async function checkFirestore() {
	// Admin SDK: bypasses security rules, which is correct for a health check.
	// The client SDK was getting PERMISSION_DENIED because the query had no
	// status filter and the rules require one for unauthenticated reads.
	const adminDb = getAdminDb();
	const snapshot = await adminDb.collection("blogs").limit(1).count().get();
	return { ok: true, count: snapshot.data().count };
}

async function checkAnalytics() {
	await getAnalyticsData("7d");
	return { ok: true };
}

async function checkPexels() {
	await getCuratedPhotos(1, 1);
	return { ok: true };
}

async function checkUnsplash() {
	await getPhotos(1, 1);
	return { ok: true };
}

async function checkBrevo() {
	const apiKey = process.env.BREVO_API_KEY;
	if (!apiKey) {
		throw new Error("Brevo API key is not configured");
	}
	const response = await fetch("https://api.brevo.com/v3/account", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"api-key": apiKey,
		},
	});
	if (!response.ok) {
		throw new Error(`Brevo API returned ${response.status}`);
	}
	return { ok: true };
}

async function checkDeepSeek() {
	const apiKey = process.env.DEEPSEEK_API_KEY;
	if (!apiKey) {
		throw new Error("DeepSeek API key is not configured");
	}
	const response = await fetch("https://api.deepseek.com/models", {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
	});
	if (!response.ok) {
		throw new Error(`DeepSeek API returned ${response.status}`);
	}
	return { ok: true };
}

async function checkSitemapAutomation() {
	const envKey =
		process.env.SEARCH_CONSOLE_SERVICE_ACCOUNT_BASE64 ||
		process.env.GOOGLE_SERVICES_JSON_BASE64;
	if (!envKey) {
		throw new Error("SEARCH_CONSOLE_SERVICE_ACCOUNT_BASE64 is not configured");
	}

	const sitemapUrls = getSubmittedSitemapUrls();
	const results = await Promise.all(
		sitemapUrls.map(async (sitemapUrl) => {
			const status = await getSitemapStatus(sitemapUrl);
			return { sitemapUrl, status, health: assessSitemap(status) };
		}),
	);

	const problems = results.flatMap((result) =>
		result.health.problems.map((problem) => `${result.sitemapUrl}: ${problem}`),
	);
	if (problems.length > 0) {
		throw new Error(problems.join("; "));
	}

	const lastDownloaded = results
		.map((result) => result.status.lastDownloaded)
		.filter(Boolean)
		.sort()
		.at(-1);

	return {
		ok: true,
		site: SEARCH_CONSOLE_SITE,
		sitemaps: sitemapUrls,
		urls: results.reduce((sum, result) => sum + result.status.urlCount, 0),
		lastDownloaded,
	};
}

async function runCheck(name, checker) {
	const start = Date.now();
	try {
		const details = await withTimeout(checker(), HEALTH_TIMEOUT_MS);
		return {
			name,
			status: "healthy",
			responseTime: Date.now() - start,
			message: "Operational",
			...details,
		};
	} catch (error) {
		return {
			name,
			status: "unhealthy",
			responseTime: Date.now() - start,
			message: error?.message || "Check failed",
		};
	}
}

export async function GET() {
	const checks = await Promise.all([
		runCheck("Firebase (Firestore)", checkFirestore),
		runCheck("Google Analytics", checkAnalytics),
		runCheck("Pexels", checkPexels),
		runCheck("Unsplash", checkUnsplash),
		runCheck("Brevo (Email)", checkBrevo),
		runCheck("DeepSeek (AI)", checkDeepSeek),
		runCheck("Sitemap (Search Console)", checkSitemapAutomation),
	]);

	const healthy = checks.filter((c) => c.status === "healthy");
	const overall = checks.length === healthy.length ? "healthy" : "degraded";

	return NextResponse.json(
		{
			overall,
			checkedAt: new Date().toISOString(),
			checks,
		},
		{
			headers: {
				"Cache-Control": "no-store, max-age=0",
			},
		},
	);
}
