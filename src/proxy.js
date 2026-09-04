import { NextResponse } from "next/server";
import { negotiatedErrorResponse } from "@/lib/http-error";
import { shouldNegotiateNotFound } from "@/lib/known-paths";

function withVary(response) {
	const existing = response.headers.get("Vary") || "";
	const tokens = new Set(
		existing
			.split(",")
			.map((token) => token.trim())
			.filter(Boolean),
	);
	tokens.add("Accept");
	tokens.add("Accept-Encoding");
	response.headers.set("Vary", [...tokens].join(", "));
	return response;
}

/**
 * Node.js request proxy (formerly middleware).
 *
 * Next.js 16 renamed the convention so the network boundary is obvious: this
 * runs on the Node runtime before a route renders. Keep it cheap — path
 * checks and header work only, no Firestore.
 */
export function proxy(request) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/api/")) {
		return withVary(NextResponse.next());
	}

	if (shouldNegotiateNotFound(pathname)) {
		return negotiatedErrorResponse(request, { status: 404 });
	}

	return withVary(NextResponse.next());
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|mp4|webm|mov|avi|mp3|wav|ogg|m4a|pdf)$).*)",
	],
};
