/**
 * Transactional email templates.
 *
 * Written for real mail clients, not for a browser preview:
 *   - table layout with inline styles (Gmail strips <style> blocks in the
 *     clipped/forwarded view, and Outlook ignores most modern CSS)
 *   - a single accent colour, used for links and one rule
 *   - no gradient hero band, no emoji, no exclamation marks, no centred
 *     marketing slab — this is correspondence, not a campaign
 *   - preheader text so the inbox preview says something useful
 */

import { getSiteUrl } from "@/lib/site";

const LOGO_URL = getSiteUrl("/images/logo.png");
const WHATSAPP_NUMBER = "919363122005";
const WHATSAPP_DISPLAY = "+91 93631 22005";
const SUPPORT_EMAIL = "info@dsnenterprises.com";

const COLORS = {
	text: "#1f2937",
	muted: "#6b7280",
	faint: "#9ca3af",
	rule: "#e5e7eb",
	accent: "#374941",
	panel: "#f8fafc",
	white: "#ffffff",
};

const FONT =
	"-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function escapeHtml(value = "") {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function whatsappLink(message) {
	const text = encodeURIComponent(message);
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function formatTimestamp(date = new Date()) {
	return date.toLocaleString("en-IN", {
		timeZone: "Asia/Kolkata",
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

/**
 * Shared shell: preheader, logo, content, footer.
 */
function layout({ preheader, body }) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>DSN Enterprises</title>
</head>
<body style="margin:0; padding:0; background-color:${COLORS.panel};">
<div style="display:none; font-size:1px; color:${COLORS.panel}; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.panel};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; background-color:${COLORS.white}; border:1px solid ${COLORS.rule}; border-radius:6px;">
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <a href="${getSiteUrl("/")}" style="text-decoration:none;">
              <img src="${LOGO_URL}" width="132" alt="DSN Enterprises" style="display:block; width:132px; max-width:132px; height:auto; border:0;" />
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 0 32px;">
            <hr style="border:0; border-top:2px solid ${COLORS.accent}; margin:0; width:40px;" />
          </td>
        </tr>
        ${body}
        <tr>
          <td style="padding:28px 32px 32px 32px; border-top:1px solid ${COLORS.rule};">
            <p style="margin:0 0 4px 0; font-family:${FONT}; font-size:13px; line-height:20px; color:${COLORS.muted};">
              DSN Enterprises &middot; Precision gauge manufacturing and calibration
            </p>
            <p style="margin:0; font-family:${FONT}; font-size:13px; line-height:20px; color:${COLORS.faint};">
              Coimbatore, Tamil Nadu, India &middot;
              <a href="mailto:${SUPPORT_EMAIL}" style="color:${COLORS.muted}; text-decoration:underline;">${SUPPORT_EMAIL}</a> &middot;
              <a href="tel:+${WHATSAPP_NUMBER}" style="color:${COLORS.muted}; text-decoration:underline;">${WHATSAPP_DISPLAY}</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function heading(text) {
	return `<tr>
          <td style="padding:16px 32px 0 32px;">
            <h1 style="margin:0; font-family:${FONT}; font-size:19px; line-height:26px; font-weight:600; color:${COLORS.text};">${escapeHtml(text)}</h1>
          </td>
        </tr>`;
}

function paragraph(html, { top = 12 } = {}) {
	return `<tr>
          <td style="padding:${top}px 32px 0 32px;">
            <p style="margin:0; font-family:${FONT}; font-size:15px; line-height:24px; color:${COLORS.text};">${html}</p>
          </td>
        </tr>`;
}

/**
 * Label/value rows. Kept as a two-column table so long values wrap sensibly
 * and the admin can scan the submission without reading prose.
 */
function detailRows(rows) {
	const cells = rows
		.filter((row) => row.value)
		.map(
			({ label, value, href }) => `
              <tr>
                <td width="130" valign="top" style="padding:8px 12px 8px 0; font-family:${FONT}; font-size:13px; line-height:20px; color:${COLORS.muted}; border-bottom:1px solid ${COLORS.rule};">${escapeHtml(label)}</td>
                <td valign="top" style="padding:8px 0; font-family:${FONT}; font-size:14px; line-height:21px; color:${COLORS.text}; border-bottom:1px solid ${COLORS.rule}; word-break:break-word;">${
									href
										? `<a href="${href}" style="color:${COLORS.accent}; text-decoration:underline;">${escapeHtml(value)}</a>`
										: escapeHtml(value)
								}</td>
              </tr>`,
		)
		.join("");

	return `<tr>
          <td style="padding:20px 32px 0 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${cells}</table>
          </td>
        </tr>`;
}

function messageBlock(label, message) {
	return `<tr>
          <td style="padding:22px 32px 0 32px;">
            <p style="margin:0 0 8px 0; font-family:${FONT}; font-size:13px; line-height:20px; color:${COLORS.muted};">${escapeHtml(label)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:14px 16px; background-color:${COLORS.panel}; border-left:2px solid ${COLORS.accent}; border-radius:0 4px 4px 0;">
                  <p style="margin:0; font-family:${FONT}; font-size:14px; line-height:22px; color:${COLORS.text}; white-space:pre-line;">${escapeHtml(message)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
}

function button(label, href) {
	return `<tr>
          <td style="padding:24px 32px 0 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:${COLORS.accent}; border-radius:4px;">
                  <a href="${href}" style="display:inline-block; padding:11px 22px; font-family:${FONT}; font-size:14px; line-height:20px; font-weight:600; color:${COLORS.white}; text-decoration:none;">${escapeHtml(label)}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
}

function spacer(height = 8) {
	return `<tr><td style="height:${height}px; line-height:${height}px; font-size:0;">&nbsp;</td></tr>`;
}

/**
 * Internal notification sent to the DSN inbox.
 */
export function renderAdminNotificationEmail(contact) {
	const submitted = formatTimestamp();
	const replyLink = `mailto:${contact.email}?subject=${encodeURIComponent(
		"Re: your enquiry to DSN Enterprises",
	)}`;

	const body = [
		heading(`New enquiry from ${contact.name}`),
		paragraph(
			`<span style="color:${COLORS.muted}; font-size:14px;">Received ${escapeHtml(submitted)} IST</span>`,
			{ top: 6 },
		),
		detailRows([
			{ label: "Name", value: contact.name },
			{ label: "Email", value: contact.email, href: `mailto:${contact.email}` },
			{
				label: "Phone",
				value: contact.phone || "",
				href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : null,
			},
			{ label: "Company", value: contact.company || "" },
			{ label: "Product interest", value: contact.productInterest || "" },
		]),
		messageBlock("Message", contact.message),
		button("Reply to this enquiry", replyLink),
		spacer(24),
	].join("");

	const text = `New enquiry from ${contact.name}
Received ${submitted} IST

Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || "Not provided"}
Company: ${contact.company || "Not provided"}
Product interest: ${contact.productInterest || "Not specified"}

Message:
${contact.message}

--
DSN Enterprises | Precision gauge manufacturing and calibration
Coimbatore, Tamil Nadu, India`;

	return {
		subject: `New enquiry: ${contact.name}${contact.company ? ` (${contact.company})` : ""}`,
		html: layout({
			preheader: `${contact.name} enquired about ${contact.productInterest || "precision gauges"}.`,
			body,
		}),
		text,
	};
}

/**
 * Auto-reply to the person who submitted the form.
 */
export function renderContactAutoReplyEmail(contact) {
	const firstName = (contact.name || "").trim().split(/\s+/)[0] || "there";
	const waHref = whatsappLink(
		`Hello DSN Enterprises, I just submitted an enquiry on your website${
			contact.productInterest ? ` about ${contact.productInterest}` : ""
		}. My name is ${contact.name}.`,
	);

	const body = [
		heading(`Thanks ${firstName}, we have your enquiry`),
		paragraph(
			"A member of our team will review it and reply as soon as possible, usually within one working day.",
		),
		paragraph(
			`If you need an answer sooner, message us on WhatsApp at <a href="${waHref}" style="color:${COLORS.accent}; text-decoration:underline;">${WHATSAPP_DISPLAY}</a>. That reaches us fastest, and you can send drawings or photographs of the part directly.`,
		),
		button("Message us on WhatsApp", waHref),
		paragraph(
			`Anything to add? Reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color:${COLORS.accent}; text-decoration:underline;">${SUPPORT_EMAIL}</a>.`,
			{ top: 26 },
		),
		spacer(24),
	].join("");

	const text = `Thanks ${firstName}, we have your enquiry.

A member of our team will review it and reply as soon as possible, usually within one working day.

If you need an answer sooner, message us on WhatsApp at ${WHATSAPP_DISPLAY}:
${waHref}
That reaches us fastest, and you can send drawings or photographs of the part directly.

Anything to add? Reply to this email or write to ${SUPPORT_EMAIL}.

--
DSN Enterprises | Precision gauge manufacturing and calibration
Coimbatore, Tamil Nadu, India
${WHATSAPP_DISPLAY} | ${SUPPORT_EMAIL}`;

	return {
		subject: "We received your enquiry — DSN Enterprises",
		html: layout({
			preheader: `We'll reply within one working day. For a faster answer, WhatsApp ${WHATSAPP_DISPLAY}.`,
			body,
		}),
		text,
	};
}
