import { NextResponse } from "next/server";
import { resolveDynamicPath } from "@/lib/dynamic-route-guard";
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
 * A 308 to a sibling path on the same host.
 *
 * The query string is carried across deliberately. These redirects exist to
 * move accumulated ranking signal onto a page that still serves the content,
 * and the campaign parameters a visitor arrived with have to survive that move
 * for the contact-form attribution added alongside this to report the channel
 * that actually earned the enquiry.
 */
function redirectTo(path, request) {
	const url = request.nextUrl.clone();
	url.pathname = path;
	return NextResponse.redirect(url, 308);
}

/**
 * Node.js request proxy (formerly middleware).
 *
 * Next.js 16 renamed the convention so the network boundary is obvious: this
 * runs on the Node runtime before a route renders. Keep it cheap — path
 * checks and header work only, no Firestore.
 *
 * ## Why the redirect and the 404 are decided here
 *
 * `notFound()` and `permanentRedirect()` called from a dynamic route's page
 * component cannot set the HTTP status. By the time the page throws, the
 * response has already begun, so the observed results were HTTP 200 for a
 * missing slug (a soft 404) and HTTP 200 carrying a client-side redirect for a
 * retired slug (a soft redirect that kept the "Page Not Found" title and got
 * cached for a year). Both are documented behaviour, and the documented remedy
 * is the same: decide before the route renders.
 *
 * `resolveDynamicPath` is the same function the pages use to make the same
 * call, so the proxy cannot disagree with them about which slugs exist. The
 * pages keep their `notFound()` / `permanentRedirect()` calls as a fallback for
 * anything that reaches them directly, but in normal operation the proxy has
 * already answered and they never run for a missing or retired slug.
 */
export function proxy(request) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/api/")) {
		return withVary(NextResponse.next());
	}

	if (shouldNegotiateNotFound(pathname)) {
		return negotiatedErrorResponse(request, { status: 404 });
	}

	const verdict = resolveDynamicPath(pathname);

	if (verdict?.decision === "missing") {
		return negotiatedErrorResponse(request, { status: 404 });
	}

	if (verdict?.decision === "redirect") {
		return withVary(redirectTo(verdict.to, request));
	}

	return withVary(NextResponse.next());
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|mp4|webm|mov|avi|mp3|wav|ogg|m4a|pdf)$).*)",
	],
};
