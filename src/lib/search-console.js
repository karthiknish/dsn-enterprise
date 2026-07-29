/**
 * Google Search Console sitemap operations (server-only).
 *
 * Note on what is worth automating. The old unauthenticated ping endpoint
 * (google.com/ping?sitemap=) was deprecated in June 2023 and now returns 404,
 * so "pinging Google" is not a thing any more.
 *
 * Submitting through the API does prompt Google to re-read the sitemap file,
 * measurably: in testing, `lastDownloaded` moved within two minutes of a
 * submit. What it does not do is make Google index the URLs inside it any
 * faster. That is driven by `lastmod` and by Google's own scheduling, so a
 * daily submit is not a growth lever.
 *
 * What automation is actually good for is catching a sitemap that has quietly
 * stopped working: a fetch error, a parse warning, or a `lastDownloaded` date
 * that has stopped moving. That is what this module is built around, with
 * submission as a cheap idempotent side effect.
 *
 * Auth: a service account added to the Search Console property. Submission
 * needs the full `webmasters` scope and at least Owner or Full permission on
 * the property; a Restricted user gets 403.
 */

import { google } from "googleapis";

const SCOPE_WRITE = "https://www.googleapis.com/auth/webmasters";

/**
 * Domain property, as shown in Search Console. `sc-domain:` covers every
 * subdomain and protocol; a URL-prefix property would be the full origin.
 */
export const SEARCH_CONSOLE_SITE =
	process.env.SEARCH_CONSOLE_SITE || "sc-domain:dsnenterprises.in";

function decodeServiceAccount() {
	// A dedicated variable is preferred: the Search Console property may be
	// shared with a different service account than the GA4/Firebase one.
	const raw =
		process.env.SEARCH_CONSOLE_SERVICE_ACCOUNT_BASE64 ||
		process.env.GOOGLE_SERVICES_JSON_BASE64;

	if (!raw) {
		throw new Error("SEARCH_CONSOLE_SERVICE_ACCOUNT_BASE64 is not configured");
	}

	let parsed;
	try {
		const clean = raw.trim().replace(/^"|"$/g, "");
		parsed = JSON.parse(Buffer.from(clean, "base64").toString("utf8"));
	} catch {
		// Never echo the original error: a parse failure on key material can
		// put fragments of the private key into logs.
		throw new Error(
			"SEARCH_CONSOLE_SERVICE_ACCOUNT_BASE64 is not valid base64-encoded JSON",
		);
	}

	if (!parsed.client_email || !parsed.private_key) {
		throw new Error(
			"Search Console service account is missing client_email or private_key",
		);
	}
	return parsed;
}

function getClient() {
	const key = decodeServiceAccount();
	const auth = new google.auth.JWT({
		email: key.client_email,
		key: key.private_key.replace(/\\n/g, "\n"),
		scopes: [SCOPE_WRITE],
	});
	return google.webmasters({ version: "v3", auth });
}

function describeApiError(error, action) {
	const status = error?.code || error?.response?.status;
	if (status === 403) {
		return new Error(
			`Search Console refused to ${action}. The service account needs Owner or Full permission on ${SEARCH_CONSOLE_SITE}; Restricted is not enough.`,
		);
	}
	if (status === 404) {
		return new Error(
			`Search Console has no property matching ${SEARCH_CONSOLE_SITE}, or the sitemap has never been submitted.`,
		);
	}
	const detail =
		error?.errors?.[0]?.message || error?.message || "unknown error";
	return new Error(`Search Console failed to ${action}: ${detail}`);
}

/**
 * Register or re-register a sitemap. Idempotent; an already-known sitemap is
 * simply reconfirmed.
 */
export async function submitSitemap(sitemapUrl) {
	const webmasters = getClient();
	try {
		await webmasters.sitemaps.submit({
			siteUrl: SEARCH_CONSOLE_SITE,
			feedpath: sitemapUrl,
		});
		return { submitted: true, sitemapUrl };
	} catch (error) {
		throw describeApiError(error, `submit ${sitemapUrl}`);
	}
}

/**
 * Read back what Google knows about a sitemap. This is the part with the
 * diagnostic value: errors, warnings, and when it was last actually read.
 */
export async function getSitemapStatus(sitemapUrl) {
	const webmasters = getClient();
	try {
		const { data } = await webmasters.sitemaps.get({
			siteUrl: SEARCH_CONSOLE_SITE,
			feedpath: sitemapUrl,
		});

		const submitted = data.contents?.reduce(
			(sum, entry) => sum + Number(entry.submitted || 0),
			0,
		);

		return {
			sitemapUrl,
			lastSubmitted: data.lastSubmitted || null,
			lastDownloaded: data.lastDownloaded || null,
			isPending: Boolean(data.isPending),
			isSitemapsIndex: Boolean(data.isSitemapsIndex),
			errors: Number(data.errors || 0),
			warnings: Number(data.warnings || 0),
			urlCount: submitted || 0,
		};
	} catch (error) {
		throw describeApiError(error, `read the status of ${sitemapUrl}`);
	}
}

export async function listSitemaps() {
	const webmasters = getClient();
	try {
		const { data } = await webmasters.sitemaps.list({
			siteUrl: SEARCH_CONSOLE_SITE,
		});
		return (data.sitemap || []).map((entry) => ({
			path: entry.path,
			lastDownloaded: entry.lastDownloaded || null,
			errors: Number(entry.errors || 0),
			warnings: Number(entry.warnings || 0),
		}));
	} catch (error) {
		throw describeApiError(error, "list sitemaps");
	}
}

/**
 * Turn a status into something worth alerting on. Google re-reads an active
 * sitemap well inside a fortnight, so a stale `lastDownloaded` means it has
 * stopped being fetched, which is silent unless someone looks.
 */
export function assessSitemap(status, { staleAfterDays = 14 } = {}) {
	const problems = [];

	if (status.errors > 0) {
		problems.push(`${status.errors} error(s) parsing the sitemap`);
	}
	if (status.warnings > 0) {
		problems.push(`${status.warnings} warning(s) in the sitemap`);
	}
	if (status.urlCount === 0 && !status.isPending) {
		problems.push("Google recorded 0 URLs in this sitemap");
	}

	if (status.lastDownloaded) {
		const ageDays = Math.floor(
			(Date.now() - new Date(status.lastDownloaded).getTime()) / 86_400_000,
		);
		if (ageDays > staleAfterDays) {
			problems.push(`not fetched by Google for ${ageDays} days`);
		}
	} else if (!status.isPending) {
		problems.push("never fetched by Google");
	}

	return { healthy: problems.length === 0, problems };
}
