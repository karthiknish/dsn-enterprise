/**
 * Auth guard for admin API routes.
 *
 * Trust model matches firestore.rules, which grants admin access on
 * `request.auth != null` — i.e. any authenticated user of the Firebase project
 * is an admin. Account creation is not exposed in the UI (the login page only
 * signs in), so accounts are provisioned manually in the Firebase console.
 *
 * ADMIN_EMAILS optionally narrows this further. Set it to a comma-separated
 * list to require that the token's email is on the list. Left unset, behaviour
 * matches firestore.rules exactly, so enabling it is opt-in and cannot lock
 * anyone out by surprise.
 *
 * Server-only.
 */

import { verifyIdToken } from "@/lib/firebase-admin";
import { ERROR_CODES, jsonError } from "@/lib/http-error";

function allowlist() {
	return (process.env.ADMIN_EMAILS || "")
		.split(",")
		.map((e) => e.trim().toLowerCase())
		.filter(Boolean);
}

function bearerToken(request) {
	const header = request.headers.get("authorization") || "";
	const match = /^Bearer\s+(.+)$/i.exec(header.trim());
	return match ? match[1].trim() : null;
}

/**
 * Resolve the caller's admin identity.
 * @returns {Promise<{ ok: true, uid: string, email: string|null } | { ok: false, response: import("next/server").NextResponse }>}
 */
export async function requireAdmin(request) {
	const token = bearerToken(request);

	if (!token) {
		return {
			ok: false,
			response: jsonError({
				code: ERROR_CODES.unauthorized,
				message: "Authentication required",
				status: 401,
				headers: { "WWW-Authenticate": "Bearer" },
			}),
		};
	}

	const decoded = await verifyIdToken(token);
	if (!decoded) {
		return {
			ok: false,
			response: jsonError({
				code: ERROR_CODES.unauthorized,
				message: "Invalid or expired session",
				status: 401,
				headers: { "WWW-Authenticate": "Bearer" },
			}),
		};
	}

	const emails = allowlist();
	if (emails.length > 0) {
		const email = (decoded.email || "").toLowerCase();
		if (!email || !emails.includes(email)) {
			// 403, not 404: the caller is authenticated but not permitted.
			return {
				ok: false,
				response: jsonError({
					code: ERROR_CODES.forbidden,
					message: "Not authorised",
					status: 403,
				}),
			};
		}
	}

	return { ok: true, uid: decoded.uid, email: decoded.email || null };
}
