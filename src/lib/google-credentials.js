/**
 * Shared decoder for the base64 service-account credential.
 *
 * GOOGLE_SERVICES_JSON_BASE64 holds a service account for the `dsn-enterprises`
 * project. It is used for two different things:
 *   - the GA4 Data API (src/lib/analytics-data.js)
 *   - Firebase Admin ID-token verification (src/lib/firebase-admin.js)
 *
 * Both previously would have decoded and JSON.parsed it per request. This
 * module decodes once per process and caches, and it throws a message that is
 * safe to surface (no key material, no email) if the value is malformed.
 *
 * Server-only. Never import this from a client component.
 */

let cached = null;
let cachedError = null;

export function getServiceAccountCredentials() {
	if (cached) return cached;
	if (cachedError) throw cachedError;

	const raw = process.env.GOOGLE_SERVICES_JSON_BASE64;
	if (!raw) {
		cachedError = new Error("GOOGLE_SERVICES_JSON_BASE64 is not configured");
		throw cachedError;
	}

	let parsed;
	try {
		const clean = raw.trim().replace(/^"|"$/g, "");
		parsed = JSON.parse(Buffer.from(clean, "base64").toString("utf8"));
	} catch {
		// Deliberately not including the original error: a JSON parse failure on
		// credential material can echo fragments of the key into logs/responses.
		cachedError = new Error(
			"GOOGLE_SERVICES_JSON_BASE64 is not valid base64-encoded JSON",
		);
		throw cachedError;
	}

	if (!parsed.client_email || !parsed.private_key) {
		cachedError = new Error(
			"GOOGLE_SERVICES_JSON_BASE64 is missing client_email or private_key",
		);
		throw cachedError;
	}

	cached = {
		clientEmail: parsed.client_email,
		// Handles both real newlines and the \n-escaped form.
		privateKey: parsed.private_key.replace(/\\n/g, "\n"),
		projectId: parsed.project_id,
	};
	return cached;
}
