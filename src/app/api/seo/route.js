import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import {
	fetchAuthorityMetrics,
	fetchKeywordIdeas,
	fetchKeywordRank,
	SEO_TASKS,
	TASK_COSTS_USD,
} from "@/lib/seo-intel";
import { isTregConfigured, TregError, tregBalance } from "@/lib/treg";

/**
 * SEO data for the admin console, proxied through treg.
 *
 * Behind requireAdmin for two reasons: the payload is competitive intelligence,
 * and every call spends real money from the team's prepaid balance. An open
 * endpoint here is a way for a stranger to drain it.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_KEYWORD_LENGTH = 200;

/** GET — configuration state and remaining credit, for the page's header. */
export async function GET(request) {
	const auth = await requireAdmin(request);
	if (!auth.ok) return auth.response;

	const configured = isTregConfigured();
	let balance = null;

	if (configured) {
		// A balance lookup must never be the reason the page fails to load.
		try {
			balance = await tregBalance();
		} catch (error) {
			console.error("treg balance lookup failed:", error);
		}
	}

	return NextResponse.json(
		{ configured, balance, costs: TASK_COSTS_USD },
		{ headers: { "Cache-Control": "private, no-store" } },
	);
}

/** POST — run one SEO task. Body: { task, keyword?, domain?, targets?, ... } */
export async function POST(request) {
	const auth = await requireAdmin(request);
	if (!auth.ok) return auth.response;

	if (!isTregConfigured()) {
		return NextResponse.json(
			{
				error:
					"treg is not configured. Set TREG_TOKEN (and TREG_ORG) in the environment.",
			},
			{ status: 503 },
		);
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	const { task } = body || {};
	if (!SEO_TASKS.includes(task)) {
		return NextResponse.json(
			{ error: `Invalid task. Expected one of: ${SEO_TASKS.join(", ")}` },
			{ status: 400 },
		);
	}

	try {
		const data = await runTask(task, body);
		return NextResponse.json(data, {
			headers: { "Cache-Control": "private, no-store" },
		});
	} catch (error) {
		if (error instanceof TregError) {
			// 402 is the one status worth surfacing verbatim: it means the
			// balance ran out, and the fix is a top-up, not a retry.
			const status = error.status === 402 ? 402 : error.status || 502;
			return NextResponse.json(
				{
					error:
						status === 402
							? "treg balance exhausted. Top up at treg.superdesign.dev (Team → Billing)."
							: error.message,
					detail: error.detail || null,
				},
				{ status },
			);
		}

		console.error("SEO task failed:", error);
		return NextResponse.json({ error: "SEO lookup failed" }, { status: 502 });
	}
}

async function runTask(task, body) {
	const locationCode = body.locationCode;

	if (task === "rank") {
		const keyword = cleanKeyword(body.keyword);
		const domain = String(body.domain || "").trim();
		if (!keyword || !domain) {
			throw new TregError("keyword and domain are required", { status: 400 });
		}
		return fetchKeywordRank({
			keyword,
			domain,
			locationCode,
			depth: body.depth,
		});
	}

	if (task === "keywords") {
		const keyword = cleanKeyword(body.keyword);
		if (!keyword) {
			throw new TregError("keyword is required", { status: 400 });
		}
		return fetchKeywordIdeas({
			keyword,
			locationCode,
			limit: body.limit,
			depth: body.ideaDepth,
		});
	}

	const targets = Array.isArray(body.targets) ? body.targets : [];
	if (targets.length === 0) {
		throw new TregError("targets is required", { status: 400 });
	}
	return fetchAuthorityMetrics({ targets });
}

function cleanKeyword(value) {
	const keyword = String(value || "")
		.trim()
		.slice(0, MAX_KEYWORD_LENGTH);
	return keyword || null;
}
