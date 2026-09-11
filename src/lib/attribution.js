/**
 * First-touch attribution for contact enquiries.
 *
 * The contact form is this site's only conversion, and until now the Firestore
 * record held nothing about where the enquiry came from. That made "which page
 * earned this lead?" unanswerable, so SEO work could only be judged on
 * impressions and clicks — precisely the trap the location-page matrix fell
 * into, where 36 pages produced ~1.5% of impressions and 2 clicks in 90 days.
 *
 * This module captures the browser-side facts that answer it:
 *
 *   entryPage     first path of the browser session — the page that earned the visit
 *   referrer      external referrer origin, "" for direct or internal navigation
 *   submittedFrom path the form was submitted on
 *   utm / clickId campaign parameters, on the entry URL or the submit URL
 *   channel       derived label ("google / organic", "direct", ...)
 *
 * It is isomorphic on purpose. `captureAttribution()` and `getAttribution()`
 * run in the browser; `sanitizeAttribution()` and `classifyChannel()` run in the
 * route handler. Keeping one module means the stored shape and the accepted
 * shape cannot drift apart.
 *
 * On privacy: referrer policy (strict-origin-when-cross-origin, the browser
 * default) already reduces cross-site referrers to their origin, so the origin
 * is the most we can honestly record — and the least sensitive. Query strings
 * and hashes are never stored from a referrer.
 */

export const ATTRIBUTION_STORAGE_KEY = "dsn:attribution.v1";

const UTM_KEYS = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
];

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid"];

const MAX_PATH = 200;
const MAX_REFERRER = 200;
const MAX_PARAM = 120;
const MAX_TIMESTAMP = 40;

const SEARCH_HOSTS =
	/(^|\.)(google|bing|yahoo|duckduckgo|yandex|baidu|ecosia|brave|ask|qwant)\./i;
const SOCIAL_HOSTS =
	/(^|\.)(facebook|instagram|linkedin|twitter|x|t\.co|reddit|pinterest|youtube|whatsapp|telegram|threads)\./i;

/** Same-site path only — rejects absolute URLs, protocols, and junk. */
const SAFE_PATH = /^\/[A-Za-z0-9\-._~%!$&'()*+,;=:@/]*$/;

function clip(value, max) {
	if (typeof value !== "string") return "";
	// Angle brackets are stripped for the same reason the contact fields strip
	// them: these values are rendered in HTML email and in the admin panel.
	return value.trim().replace(/[<>]/g, "").slice(0, max);
}

function safePath(value) {
	const path = clip(value, MAX_PATH);
	return SAFE_PATH.test(path) ? path : "";
}

function readParams(search) {
	const params = new URLSearchParams(search || "");
	const utm = {};
	for (const key of UTM_KEYS) {
		const value = clip(params.get(key), MAX_PARAM);
		if (value) utm[key] = value;
	}
	const clickId = {};
	for (const key of CLICK_ID_KEYS) {
		const value = clip(params.get(key), MAX_PARAM);
		if (value) clickId[key] = value;
	}
	return { utm, clickId };
}

function externalReferrerOrigin() {
	try {
		if (!document.referrer) return "";
		const url = new URL(document.referrer);
		if (url.origin === window.location.origin) return ""; // internal navigation
		return clip(url.origin, MAX_REFERRER);
	} catch {
		return "";
	}
}

function readStore() {
	try {
		const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch {
		return null; // private mode / storage disabled
	}
}

function writeStore(record) {
	try {
		window.sessionStorage.setItem(
			ATTRIBUTION_STORAGE_KEY,
			JSON.stringify(record),
		);
	} catch {
		// Non-fatal: attribution degrades to submit-page-only.
	}
}

/**
 * Record the first touch of this browser session. Safe to call on every
 * pageview — only the first call in a session writes anything, so the entry
 * page survives client-side navigation to the contact form.
 */
export function captureAttribution() {
	if (typeof window === "undefined") return null;

	const existing = readStore();
	if (existing) return existing;

	const { utm, clickId } = readParams(window.location.search);
	const record = {
		entryPage: safePath(window.location.pathname),
		referrer: externalReferrerOrigin(),
		utm,
		clickId,
		firstSeenAt: new Date().toISOString(),
	};

	writeStore(record);
	return record;
}

/**
 * Attribution payload for the contact form. Returns null during SSR so callers
 * can spread it unconditionally.
 */
export function getAttribution() {
	if (typeof window === "undefined") return null;

	const entry = captureAttribution() || {};
	const { utm, clickId } = readParams(window.location.search);
	const submittedFrom = safePath(window.location.pathname);
	const firstSeenAt = clip(entry.firstSeenAt, MAX_TIMESTAMP);

	return {
		entryPage: entry.entryPage || submittedFrom,
		referrer: clip(entry.referrer, MAX_REFERRER),
		submittedFrom,
		// A campaign parameter on the submission URL is a stronger signal than a
		// stale one from earlier in the session, so submit-time values win.
		utm: { ...(entry.utm || {}), ...utm },
		clickId: { ...(entry.clickId || {}), ...clickId },
		firstSeenAt: Number.isNaN(Date.parse(firstSeenAt))
			? new Date().toISOString()
			: new Date(firstSeenAt).toISOString(),
	};
}

/**
 * Server-side normaliser. The contact endpoint is public and allows
 * unauthenticated creates, so nothing here is trusted: every field is
 * type-checked, bounded, and shape-validated before it reaches Firestore.
 *
 * Returns null when there is nothing usable, so the caller can skip the write
 * entirely and keep old records free of empty attribution objects.
 */
export function sanitizeAttribution(input) {
	if (!input || typeof input !== "object" || Array.isArray(input)) return null;

	const utm = {};
	if (input.utm && typeof input.utm === "object") {
		for (const key of UTM_KEYS) {
			const value = clip(input.utm[key], MAX_PARAM);
			if (value) utm[key] = value;
		}
	}

	const clickId = {};
	if (input.clickId && typeof input.clickId === "object") {
		for (const key of CLICK_ID_KEYS) {
			const value = clip(input.clickId[key], MAX_PARAM);
			if (value) clickId[key] = value;
		}
	}

	const entryPage = safePath(input.entryPage);
	const submittedFrom = safePath(input.submittedFrom);
	const referrer = clip(input.referrer, MAX_REFERRER);

	const rawFirstSeen = clip(input.firstSeenAt, MAX_TIMESTAMP);
	const firstSeenAt = Number.isNaN(Date.parse(rawFirstSeen))
		? ""
		: new Date(rawFirstSeen).toISOString();

	const hasSignal =
		Boolean(entryPage) ||
		Boolean(submittedFrom) ||
		Boolean(referrer) ||
		Object.keys(utm).length > 0 ||
		Object.keys(clickId).length > 0;

	if (!hasSignal) return null;

	return {
		entryPage,
		submittedFrom,
		referrer,
		utm,
		clickId,
		firstSeenAt,
		channel: classifyChannel({ utm, clickId, referrer }),
	};
}

/**
 * Human/machine-readable channel label. Deliberately coarse: it answers
 * "which channel produced this enquiry", not "which campaign".
 */
export function classifyChannel({
	utm = {},
	clickId = {},
	referrer = "",
} = {}) {
	const source = (utm.utm_source || "").toLowerCase();
	const medium = (utm.utm_medium || "").toLowerCase();

	if (source && medium) return `${source} / ${medium}`;
	if (source) return `${source} / (not set)`;
	if (clickId.gclid || clickId.gbraid || clickId.wbraid) return "google / cpc";
	if (clickId.msclkid) return "microsoft / cpc";
	if (clickId.fbclid) return "facebook / paid-social";

	try {
		const host = referrer
			? new URL(referrer).hostname.replace(/^www\./, "")
			: "";
		if (!host) return "direct";
		if (SEARCH_HOSTS.test(`.${host}`)) return `${host} / organic`;
		if (SOCIAL_HOSTS.test(`.${host}`)) return `${host} / social`;
		return `${host} / referral`;
	} catch {
		return "direct";
	}
}

/**
 * One-line summary shared by the admin notification email and the admin panel,
 * so both render the same phrasing.
 */
export function describeAttribution(attribution) {
	if (!attribution || typeof attribution !== "object") return "";

	const parts = [];
	if (attribution.channel) parts.push(attribution.channel);

	const entry = attribution.entryPage;
	const submitted = attribution.submittedFrom;

	if (entry) parts.push(`landed on ${entry}`);
	if (submitted && submitted !== entry) parts.push(`form on ${submitted}`);
	if (attribution.utm?.utm_campaign)
		parts.push(`campaign ${attribution.utm.utm_campaign}`);
	if (attribution.referrer && !attribution.channel)
		parts.push(`from ${attribution.referrer}`);

	return parts.join(" · ");
}
