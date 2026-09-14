/**
 * The bridge between a stored lead and the analytics events for that lead.
 *
 * The contact endpoint returns the Firestore document id (`entryId`) on success
 * and the client used to throw it away, so a GA4 `generate_lead` and the record
 * in `contacts` had nothing in common — the two counts could not be reconciled,
 * and they did not agree (over one 28-day window GA4 recorded 2 form leads while
 * Firestore held 1, and over the previous window GA4 recorded 0 while Firestore
 * held 3).
 *
 * One id fixes three things at once:
 *   - reconciliation: the GA4 event and the Ads conversion both carry it, so a
 *     lead can be traced from the analytics report to the enquiry record;
 *   - de-duplication: Ads discards a second conversion with the same
 *     `transaction_id`, so a refresh of /thank-you cannot inflate the count;
 *   - the /thank-you guard: the conversion is only fired when a *fresh* id is
 *     present, which means the visitor actually submitted the form. A direct
 *     visit or a reload has no id and fires nothing.
 *
 * sessionStorage, not localStorage: a lead is a single tab's journey. It clears
 * when the tab closes, and `consumeLeadId()` clears it on first read anyway.
 *
 * Server-only? No — this is browser-only by design. It no-ops under SSR.
 */

export const LEAD_ID_STORAGE_KEY = "dsn:lead-id.v1";

/** Remember the id of the lead just created. Best-effort; storage can be off. */
export function recordLeadId(id) {
	if (typeof window === "undefined") return;
	if (!id || typeof id !== "string") return;
	try {
		window.sessionStorage.setItem(LEAD_ID_STORAGE_KEY, id.slice(0, 128));
	} catch {
		// Private mode / storage disabled. The conversion still fires, it just
		// cannot be correlated or de-duplicated.
	}
}

/** Read the pending lead id and clear it, so a reload cannot re-fire a conversion. */
export function consumeLeadId() {
	if (typeof window === "undefined") return "";
	try {
		const id = window.sessionStorage.getItem(LEAD_ID_STORAGE_KEY) || "";
		if (id) window.sessionStorage.removeItem(LEAD_ID_STORAGE_KEY);
		return id;
	} catch {
		return "";
	}
}

/**
 * Normalise a phone number to the digits-only, country-coded form Google's
 * enhanced conversions expect (no `+`, no spaces).
 *
 * The contact form accepts free text, so this is a heuristic, not a parser. A
 * bare 10-digit number is treated as Indian and prefixed with 91 — that is the
 * only market this site sells into, and a wrong guess simply fails to match
 * (enhanced conversions degrade to unused, they never mis-attribute).
 */
export function normalizePhone(raw) {
	const digits = String(raw || "").replace(/\D/g, "");
	if (!digits) return "";
	if (digits.length === 10) return `91${digits}`;
	if (digits.length === 11 && digits.startsWith("0"))
		return `91${digits.slice(1)}`;
	if (digits.length === 12 && digits.startsWith("91")) return digits;
	return digits;
}

async function sha256Hex(value) {
	if (typeof window === "undefined") return "";
	if (!window.crypto?.subtle) return "";
	try {
		const bytes = new TextEncoder().encode(value);
		const digest = await window.crypto.subtle.digest("SHA-256", bytes);
		return Array.from(new Uint8Array(digest))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
	} catch {
		return "";
	}
}

/**
 * Hashed user data for Google enhanced conversions.
 *
 * `allow_enhanced_conversions: true` has been set on the Ads config since the
 * tag was added, but nothing ever supplied user data, so the flag did nothing.
 * These two fields are what it was waiting for.
 *
 * Google requires SHA-256 hex of the normalised value and accepts it in the
 * clear from the browser — the hashing here is for matching, not for secrecy.
 * Returns null when there is nothing to send, so callers can skip the `set`.
 */
export async function hashUserData({ email, phone } = {}) {
	const cleanEmail = String(email || "")
		.trim()
		.toLowerCase();
	const cleanPhone = normalizePhone(phone);
	if (!cleanEmail && !cleanPhone) return null;

	const [emailHash, phoneHash] = await Promise.all([
		cleanEmail ? sha256Hex(cleanEmail) : Promise.resolve(""),
		cleanPhone ? sha256Hex(cleanPhone) : Promise.resolve(""),
	]);

	if (!emailHash && !phoneHash) return null;

	return {
		...(emailHash ? { email: emailHash } : {}),
		...(phoneHash ? { phone_number: phoneHash } : {}),
	};
}
