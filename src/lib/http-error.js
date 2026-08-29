/**
 * Structured HTTP errors for humans and agents.
 *
 * JSON bodies keep a string `error` for existing admin/contact clients, and add
 * `code`, `message`, and `hint` so agents can parse them without scraping HTML.
 * Markdown bodies are for Accept: text/markdown (or text/plain) 404s.
 */

import { NextResponse } from "next/server";
import { NEGOTIATE_VARY, preferredFormat } from "@/lib/accept";
import { getSiteUrl, SITE_URL } from "@/lib/site";

export const ERROR_CODES = {
	notFound: "not_found",
	gone: "gone",
	methodNotAllowed: "method_not_allowed",
	unauthorized: "unauthorized",
	forbidden: "forbidden",
	validationError: "validation_error",
	badRequest: "bad_request",
	rateLimited: "rate_limited",
	internalError: "internal_error",
	badGateway: "bad_gateway",
	serviceUnavailable: "service_unavailable",
};

const DEFAULT_HINTS = {
	[ERROR_CODES.notFound]: `This path is not on the site. Read ${getSiteUrl("/llms.txt")} for the agent index, or ${getSiteUrl("/sitemap.xml")} for every published URL.`,
	[ERROR_CODES.gone]: `This URL has been removed. Read ${getSiteUrl("/llms.txt")} or ${getSiteUrl("/sitemap.xml")} for current pages.`,
	[ERROR_CODES.methodNotAllowed]:
		"Use the HTTP method listed in the Allow header.",
	[ERROR_CODES.unauthorized]:
		"Send Authorization: Bearer <Firebase ID token>. Sign in at /admin/login.",
	[ERROR_CODES.forbidden]:
		"This account is authenticated but not permitted for this action.",
	[ERROR_CODES.validationError]:
		"Fix the fields in validationErrors and resubmit.",
	[ERROR_CODES.badRequest]: "Check the request body or query string and retry.",
	[ERROR_CODES.rateLimited]: "Wait for the Retry-After window, then retry.",
	[ERROR_CODES.internalError]: "Retry shortly. If it persists, email the site.",
	[ERROR_CODES.badGateway]:
		"An upstream service failed. Retry shortly; nothing on your side needs changing.",
	[ERROR_CODES.serviceUnavailable]:
		"A required integration is not configured or is down. Retry later.",
};

export function errorPayload({
	code,
	message,
	hint,
	status,
	path,
	extra = {},
}) {
	return {
		error: message,
		code,
		message,
		hint: hint || DEFAULT_HINTS[code] || undefined,
		status,
		path: path || undefined,
		...extra,
	};
}

export function jsonError({
	code,
	message,
	hint,
	status = 400,
	headers,
	path,
	extra,
}) {
	return NextResponse.json(
		errorPayload({ code, message, hint, status, path, extra }),
		{
			status,
			headers: {
				"Cache-Control": "private, no-store",
				...headers,
			},
		},
	);
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function markdownNotFoundBody({ status, message, path }) {
	const lines = [
		`# ${status === 410 ? "Gone" : "Not found"}`,
		"",
		message,
		"",
		path ? `Requested path: \`${path}\`` : null,
		"",
		"DSN Enterprises (precision gauges, Coimbatore) does not have a page here. This is a real HTTP error, not an app shell.",
		"",
		"## Where to go next",
		"",
		`- [Agent index (llms.txt)](${getSiteUrl("/llms.txt")})`,
		`- [Sitemap](${getSiteUrl("/sitemap.xml")})`,
		`- [Home](${SITE_URL}/)`,
		`- [Products](${getSiteUrl("/products")})`,
		`- [Contact](${getSiteUrl("/contact")})`,
		"",
	];
	return lines.filter((line) => line !== null).join("\n");
}

/**
 * 404/410 (or other) response whose body follows Accept: JSON, markdown, or
 * HTML. Always sets Vary so a CDN cannot serve the HTML variant to an agent.
 *
 * @param {Request} request
 * @param {{ status?: number, code?: string, message?: string, hint?: string, defaultFormat?: "html" | "json" | "markdown" }} [opts]
 */
export function negotiatedErrorResponse(
	request,
	{ status = 404, code, message, hint, defaultFormat = "html" } = {},
) {
	const path = new URL(request.url).pathname;
	const resolvedCode =
		code || (status === 410 ? ERROR_CODES.gone : ERROR_CODES.notFound);
	const resolvedMessage =
		message ||
		(status === 410
			? "This URL has been removed."
			: "No page exists at this path.");
	const format = preferredFormat(request.headers.get("accept"), {
		defaultFormat,
	});
	const payload = errorPayload({
		code: resolvedCode,
		message: resolvedMessage,
		hint,
		status,
		path,
	});

	const headers = {
		Vary: NEGOTIATE_VARY,
		"Cache-Control": "private, no-store",
		"X-Content-Type-Options": "nosniff",
	};

	if (format === "json") {
		return NextResponse.json(payload, {
			status,
			headers: {
				...headers,
				"Content-Type": "application/json; charset=utf-8",
			},
		});
	}

	if (format === "markdown") {
		return new NextResponse(
			markdownNotFoundBody({
				status,
				message: resolvedMessage,
				path,
			}),
			{
				status,
				headers: {
					...headers,
					"Content-Type": "text/markdown; charset=utf-8",
				},
			},
		);
	}

	return new NextResponse(
		`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${status} — ${resolvedMessage}</title>
</head>
<body>
<h1>${status} ${status === 410 ? "Gone" : "Not found"}</h1>
<p>${resolvedMessage}</p>
<p>DSN Enterprises does not publish a page at <code>${escapeHtml(path)}</code>. This is a real HTTP ${status}, not an app shell.</p>
<p>For agents: read <a href="${getSiteUrl("/llms.txt")}">llms.txt</a> or the <a href="${getSiteUrl("/sitemap.xml")}">sitemap</a>.</p>
<p><a href="${SITE_URL}/">Home</a> · <a href="${getSiteUrl("/products")}">Products</a> · <a href="${getSiteUrl("/contact")}">Contact</a></p>
</body>
</html>
`,
		{
			status,
			headers: {
				...headers,
				"Content-Type": "text/html; charset=utf-8",
			},
		},
	);
}
