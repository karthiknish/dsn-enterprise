/**
 * treg client — one base URL, one token, ~2,600 catalogued endpoints.
 *
 * treg (https://treg.superdesign.dev) proxies third-party APIs and injects the
 * provider credential server-side, so this app never holds a DataForSEO, Moz or
 * SerpApi key. Calls are metered against the team's prepaid balance.
 *
 * Server-only: TREG_TOKEN must never reach the browser. Every consumer of this
 * module has to run in a route handler or a script.
 */

const TREG_BASE_URL = "https://treg.superdesign.dev";

/** Requests are proxied to a live provider; SERP crawls routinely take ~5s. */
const DEFAULT_TIMEOUT_MS = 45_000;

export class TregError extends Error {
	constructor(message, { status, endpoint, detail } = {}) {
		super(message);
		this.name = "TregError";
		this.status = status;
		this.endpoint = endpoint;
		this.detail = detail;
	}
}

/**
 * True when the environment carries everything a treg call needs. Used by the
 * admin UI and /api/health to show "not configured" instead of a 500.
 */
export function isTregConfigured() {
	return Boolean(process.env.TREG_TOKEN);
}

function tregHeaders() {
	const token = process.env.TREG_TOKEN;
	if (!token) {
		throw new TregError("TREG_TOKEN is not set", { status: 503 });
	}

	const headers = {
		"X-Treg-Token": token,
		"Content-Type": "application/json",
	};

	// A per-org token has the org baked in; an identity token (from `treg
	// login`) does not and needs the team slug alongside it.
	if (process.env.TREG_ORG) {
		headers["X-Treg-Org"] = process.env.TREG_ORG;
	}

	return headers;
}

/**
 * Call a treg catalog endpoint by id, e.g. "dataforseo.google.serp.organic".
 *
 * The response is the upstream provider's, verbatim. treg only interposes on
 * auth and metering, so a provider-level failure arrives as a 200 with an error
 * body — each caller has to check the provider's own status field.
 *
 * @param {string} endpointId catalog id
 * @param {object} [options]
 * @param {"GET"|"POST"} [options.method]
 * @param {object|Array} [options.body] JSON request body
 * @param {Record<string,string|number>} [options.query] query string params
 * @param {number} [options.timeoutMs]
 * @returns {Promise<any>} parsed upstream JSON
 */
export async function tregCall(
	endpointId,
	{ method = "POST", body, query, timeoutMs = DEFAULT_TIMEOUT_MS } = {},
) {
	const url = new URL(`/call/${endpointId}`, TREG_BASE_URL);
	for (const [key, value] of Object.entries(query || {})) {
		if (value !== undefined && value !== null) {
			url.searchParams.set(key, String(value));
		}
	}

	// AbortSignal.timeout would be terser, but an explicit controller lets the
	// finally-clear run on the success path too, so a resolved request does not
	// hold a timer open for the rest of the (long-lived) server process.
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	let response;
	try {
		response = await fetch(url, {
			method,
			headers: tregHeaders(),
			body: body === undefined ? undefined : JSON.stringify(body),
			signal: controller.signal,
			cache: "no-store",
		});
	} catch (error) {
		if (error?.name === "AbortError") {
			throw new TregError(`treg call timed out after ${timeoutMs}ms`, {
				status: 504,
				endpoint: endpointId,
			});
		}
		throw new TregError(`treg call failed: ${error?.message || error}`, {
			status: 502,
			endpoint: endpointId,
		});
	} finally {
		clearTimeout(timer);
	}

	const text = await response.text();
	let payload = null;
	try {
		payload = text ? JSON.parse(text) : null;
	} catch {
		payload = null;
	}

	if (!response.ok) {
		// treg reports proxy/auth problems as a JSON `detail`; anything else is
		// the upstream's own error body passed through.
		const detail =
			payload?.detail || payload?.error?.message || text.slice(0, 300);
		throw new TregError(`treg ${endpointId} returned ${response.status}`, {
			status: response.status,
			endpoint: endpointId,
			detail,
		});
	}

	return payload;
}

/**
 * The team's prepaid credit, so the admin UI can warn before a call fails with
 * a 402 rather than after. Returns null when TREG_ORG_ID is unset — the balance
 * route is keyed by numeric org id, which the token alone does not carry.
 *
 * @returns {Promise<{ balanceUsd: number, promoGrantUsd: number } | null>}
 */
export async function tregBalance() {
	const orgId = process.env.TREG_ORG_ID;
	if (!orgId || !isTregConfigured()) return null;

	const url = new URL(`/orgs/${orgId}/balance`, TREG_BASE_URL);
	const response = await fetch(url, {
		headers: tregHeaders(),
		cache: "no-store",
		signal: AbortSignal.timeout(10_000),
	});

	if (!response.ok) return null;
	const data = await response.json();

	return {
		balanceUsd: data?.balance_usd ?? 0,
		promoGrantUsd: (data?.promo_grant_micro ?? 0) / 1_000_000,
	};
}

export { TREG_BASE_URL };
