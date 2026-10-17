import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { sendEmail } from "@/lib/brevo";
import { renderAdminNotificationEmail } from "@/lib/email-templates";
import { getAdminDb } from "@/lib/firebase-admin";
import { ERROR_CODES, jsonError } from "@/lib/http-error";

/**
 * Re-send the internal "new enquiry" notification for a saved contact.
 * Used when the original email was lost or never delivered. The sender's
 * auto-reply is deliberately not repeated.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_EMAILS = [
	{ email: "microfin2001@gmail.com", name: "DSN Enterprises Admin" },
];

export async function POST(request) {
	const auth = await requireAdmin(request);
	if (!auth.ok) return auth.response;

	let body;
	try {
		body = await request.json();
	} catch {
		return jsonError({
			code: ERROR_CODES.badRequest,
			message: "Invalid JSON in request body",
			status: 400,
		});
	}

	const contactId = typeof body?.contactId === "string" ? body.contactId : "";
	if (!contactId || contactId.includes("/")) {
		return jsonError({
			code: ERROR_CODES.validationError,
			message: "contactId is required",
			status: 400,
		});
	}

	try {
		const snap = await getAdminDb().collection("contacts").doc(contactId).get();
		if (!snap.exists) {
			return jsonError({
				code: ERROR_CODES.notFound,
				message: "Contact not found",
				status: 404,
			});
		}

		const contact = snap.data();
		const notification = renderAdminNotificationEmail({
			name: contact.name,
			email: contact.email,
			phone: contact.phone || "",
			company: contact.company || "",
			message: contact.message,
			productInterest: contact.productInterest || "",
			attribution: contact.attribution || null,
		});

		const results = await Promise.allSettled(
			ADMIN_EMAILS.map((admin) =>
				sendEmail({
					to: admin.email,
					toName: admin.name,
					subject: notification.subject,
					htmlContent: notification.html,
					textContent: notification.text,
					replyTo: { email: contact.email, name: contact.name },
				}),
			),
		);

		const failed = results.filter((r) => r.status === "rejected");
		if (failed.length === results.length) {
			console.error("Resend admin email failed:", failed[0].reason);
			return jsonError({
				code: ERROR_CODES.badGateway,
				message: "Email provider rejected the message.",
				status: 502,
			});
		}

		return NextResponse.json(
			{ success: true },
			{ headers: { "Cache-Control": "private, no-store" } },
		);
	} catch (error) {
		console.error("Resend admin email error:", error);
		return jsonError({
			code: ERROR_CODES.internalError,
			message: "Could not resend the email.",
			status: 500,
		});
	}
}
