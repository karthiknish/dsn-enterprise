/**
 * Firebase Admin SDK singleton, used to verify ID tokens on the server.
 *
 * The browser holds a Firebase ID token (AuthContext / firebase-auth). Client
 * code sends it as `Authorization: Bearer <token>`; only the Admin SDK can
 * actually verify that token's signature, expiry, and issuer. Without this,
 * an API route has no way to know whether a caller is signed in — which is
 * how /api/analytics ended up publicly readable.
 *
 * Server-only. Never import from a client component.
 */

import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getServiceAccountCredentials } from "@/lib/google-credentials";

const APP_NAME = "dsn-admin";

function getAdminApp() {
	const existing = getApps().find((a) => a.name === APP_NAME);
	if (existing) return existing;

	const { clientEmail, privateKey, projectId } = getServiceAccountCredentials();

	try {
		return initializeApp(
			{
				credential: cert({ projectId, clientEmail, privateKey }),
				projectId,
			},
			APP_NAME,
		);
	} catch (err) {
		// Two callers can race during a cold start; the loser gets
		// "app already exists" and should just use the winner's app.
		if (err?.code === "app/duplicate-app") return getApp(APP_NAME);
		throw err;
	}
}

export function getAdminAuth() {
	return getAuth(getAdminApp());
}

/**
 * Verify a Firebase ID token.
 * Returns the decoded token, or null if it is missing/invalid/expired.
 * Never throws for an untrusted token — callers treat null as "not signed in".
 */
export async function verifyIdToken(idToken) {
	if (!idToken || typeof idToken !== "string") return null;
	try {
		return await getAdminAuth().verifyIdToken(idToken);
	} catch {
		// Invalid signature, expired, wrong project, revoked, malformed.
		// The specific reason is not useful to the caller and leaks detail.
		return null;
	}
}
