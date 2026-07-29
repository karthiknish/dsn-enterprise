import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/brevo";
import {
	renderAdminNotificationEmail,
	renderContactAutoReplyEmail,
} from "@/lib/email-templates";
import { db } from "@/lib/firebase";
import { rateLimit } from "@/lib/rateLimit";

// Force dynamic rendering to prevent build-time execution
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Security headers for all responses
const securityHeaders = {
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"X-XSS-Protection": "1; mode=block",
	"Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function POST(request) {
	try {
		// Apply rate limiting
		const rateLimitResult = await rateLimit(request);
		if (!rateLimitResult.success) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again later." },
				{
					status: 429,
					headers: {
						...securityHeaders,
						"Retry-After": "60",
					},
				},
			);
		}

		// Parse and validate request body
		let body;
		try {
			body = await request.json();
		} catch (_parseError) {
			return NextResponse.json(
				{ error: "Invalid JSON in request body" },
				{ status: 400, headers: securityHeaders },
			);
		}

		console.log("Received contact form submission:", {
			...body,
			email: body.email ? "[REDACTED]" : "MISSING",
		});

		// Enhanced validation with specific error messages
		const validationErrors = {};

		if (
			!body.name ||
			typeof body.name !== "string" ||
			body.name.trim().length === 0
		) {
			validationErrors.name = "Name is required and must be a valid string";
		} else if (body.name.trim().length < 2) {
			validationErrors.name = "Name must be at least 2 characters long";
		} else if (body.name.trim().length > 100) {
			validationErrors.name = "Name must be less than 100 characters";
		}

		if (
			!body.email ||
			typeof body.email !== "string" ||
			body.email.trim().length === 0
		) {
			validationErrors.email = "Email is required";
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(body.email.trim())) {
				validationErrors.email = "Please enter a valid email address";
			} else if (body.email.trim().length > 254) {
				validationErrors.email = "Email address is too long";
			}
		}

		if (
			!body.message ||
			typeof body.message !== "string" ||
			body.message.trim().length === 0
		) {
			validationErrors.message = "Message is required";
		} else if (body.message.trim().length < 10) {
			validationErrors.message = "Message must be at least 10 characters long";
		} else if (body.message.trim().length > 2000) {
			validationErrors.message = "Message must be less than 2000 characters";
		}

		if (body.phone) {
			if (typeof body.phone !== "string") {
				validationErrors.phone = "Phone number must be a string";
			} else {
				const phoneRegex = /^[\d\s+\-()]{6,20}$/;
				if (!phoneRegex.test(body.phone.trim())) {
					validationErrors.phone =
						"Please enter a valid phone number (6-20 digits, +, -, () allowed)";
				}
			}
		}

		if (
			body.company &&
			typeof body.company === "string" &&
			body.company.trim().length > 200
		) {
			validationErrors.company =
				"Company name must be less than 200 characters";
		}

		if (
			body.productInterest &&
			typeof body.productInterest === "string" &&
			body.productInterest.trim().length > 100
		) {
			validationErrors.productInterest =
				"Product interest must be less than 100 characters";
		}

		if (Object.keys(validationErrors).length > 0) {
			console.log("Validation failed:", validationErrors);
			return NextResponse.json(
				{
					error: "Validation failed",
					validationErrors,
				},
				{ status: 400, headers: securityHeaders },
			);
		}

		// Sanitize and format the data
		const contactData = {
			name: body.name.trim().replace(/[<>]/g, ""),
			email: body.email.trim().toLowerCase().replace(/[<>]/g, ""),
			phone: body.phone ? body.phone.trim().replace(/[<>]/g, "") : "",
			company: body.company ? body.company.trim().replace(/[<>]/g, "") : "",
			message: body.message.trim().replace(/[<>]/g, ""),
			productInterest: body.productInterest
				? body.productInterest.trim().replace(/[<>]/g, "")
				: "",
		};

		console.log("Attempting to save contact to Firebase:", {
			name: contactData.name,
			email: "[REDACTED]",
		});

		// Create entry in Firebase Firestore
		const docRef = await addDoc(collection(db, "contacts"), {
			...contactData,
			createdAt: serverTimestamp(),
			status: "new",
		});

		if (!docRef || !docRef.id) {
			console.error("Failed to create Firebase entry - no document returned");
			return NextResponse.json(
				{ error: "Failed to save your message. Please try again." },
				{ status: 500, headers: securityHeaders },
			);
		}

		console.log("Successfully saved contact to Firebase with ID:", docRef.id);

		// Internal notification + auto-reply to the sender. Neither is allowed to
		// fail the request: the enquiry is already saved in Firestore.
		const adminNotification = renderAdminNotificationEmail(contactData);
		const autoReply = renderContactAutoReplyEmail(contactData);

		const adminEmails = [
			{ email: "microfin2001@gmail.com", name: "DSN Enterprises Admin" },
		];

		const emailPromises = [
			...adminEmails.map((admin) =>
				sendEmail({
					to: admin.email,
					toName: admin.name,
					subject: adminNotification.subject,
					htmlContent: adminNotification.html,
					textContent: adminNotification.text,
					replyTo: { email: contactData.email, name: contactData.name },
				}).catch((emailError) => {
					console.error(`Failed to notify ${admin.email}:`, emailError);
					return null;
				}),
			),
			sendEmail({
				to: contactData.email,
				toName: contactData.name,
				subject: autoReply.subject,
				htmlContent: autoReply.html,
				textContent: autoReply.text,
				replyTo: { email: "info@dsnenterprises.com", name: "DSN Enterprises" },
			}).catch((emailError) => {
				console.error("Failed to send auto-reply:", emailError);
				return null;
			}),
		];

		try {
			await Promise.allSettled(emailPromises);
			console.log("Contact emails processed");
		} catch (emailError) {
			console.error("Error processing contact emails:", emailError);
		}

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Thank you for your message! We'll get back to you soon.",
				entryId: docRef.id,
			},
			{
				status: 201,
				headers: securityHeaders,
			},
		);
	} catch (error) {
		console.error("Unexpected error in contact API:", error);

		// Check for specific Firebase errors
		if (error.code === "permission-denied") {
			return NextResponse.json(
				{ error: "Service temporarily unavailable. Please try again later." },
				{ status: 503, headers: securityHeaders },
			);
		}

		// Generic error response
		return NextResponse.json(
			{
				error: "An unexpected error occurred. Please try again later.",
				message:
					process.env.NODE_ENV === "development" ? error.message : undefined,
			},
			{
				status: 500,
				headers: securityHeaders,
			},
		);
	}
}

// Handle unsupported methods
export async function GET() {
	return NextResponse.json(
		{ error: "Method not allowed" },
		{ status: 405, headers: securityHeaders },
	);
}

export async function PUT() {
	return NextResponse.json(
		{ error: "Method not allowed" },
		{ status: 405, headers: securityHeaders },
	);
}

export async function DELETE() {
	return NextResponse.json(
		{ error: "Method not allowed" },
		{ status: 405, headers: securityHeaders },
	);
}
