/**
 * Google Ads & Analytics Tracking Library
 * Optimized for conversion tracking and remarketing
 */

import { hashUserData } from "@/lib/lead-tracking";

// Google Tag IDs — a note, not configuration.
//
// The site loads GA4 (property 514574483, stream 13066196898) and the
// GT-TQKJ52Q3 container from src/components/Analytics.js. The container
// resolves to Google Ads only and carries no GA4 destination, so GA4 has to be
// configured explicitly rather than relying on it. Nothing in this module
// addresses GA4 directly: every helper here sends to whichever destinations
// gtag() already has configured, which is kept in one place on purpose.

// Google Ads conversion tracking.
//
// AW-17769294111 is the account's real Google tag (v2 config, enhanced
// conversions, cross-domain rules) and it OWNS the five conversion actions.
// AW-3267328717 is only the legacy CID-derived tag: no conversion actions live
// behind it, so "AW-3267328717/<label>" matches nothing and Ads counts zero.
// The tag ID and the labels must come from the same account.
//
// Ads conversions ONLY count when send_to carries a conversion label
// ("AW-17769294111/<label>"). Labels are injected via env so they can change
// without a code edit.
export const GOOGLE_ADS_ID =
	process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17769294111";

export const ADS_CONVERSION_LABELS = {
	contactForm: process.env.NEXT_PUBLIC_ADS_CONTACT_FORM_LABEL || "",
	phoneCall: process.env.NEXT_PUBLIC_ADS_PHONE_CALL_LABEL || "",
	whatsapp: process.env.NEXT_PUBLIC_ADS_WHATSAPP_LABEL || "",
	quoteRequest: process.env.NEXT_PUBLIC_ADS_QUOTE_REQUEST_LABEL || "",
	thankYou: process.env.NEXT_PUBLIC_ADS_THANK_YOU_LABEL || "",
};

/**
 * Which Ads action counts a contact-form lead.
 *
 * Both the form submit and the /thank-you page view used to fire an Ads
 * conversion, so one enquiry could count as two. Exactly one action is now
 * fired, and which one is a configuration choice rather than a code change:
 *
 *   contact_form (default) — fires on the verified 201 response, carries the
 *     lead id, and cannot be triggered by visiting a URL.
 *   thank_you — fires on /thank-you, but only when a fresh lead id is present.
 *
 * The default is `contact_form` because it is the strictly better signal. Set
 * NEXT_PUBLIC_ADS_PRIMARY_LEAD_ACTION=thank_you to switch; whichever action is
 * not primary should be marked secondary (not "conversions") in Google Ads so
 * the account does not double-count the history either.
 */
export const PRIMARY_LEAD_ACTION =
	process.env.NEXT_PUBLIC_ADS_PRIMARY_LEAD_ACTION === "thank_you"
		? "thank_you"
		: "contact_form";

/**
 * Track custom events
 * @param {string} action - Event action
 * @param {object} params - Event parameters
 */
export const event = (action, params = {}) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", action, params);
	}
};

/**
 * Track Google Ads conversion
 * @param {string} conversionLabel - The conversion label from Google Ads
 * @param {object} params - Additional parameters
 */
export const trackConversion = (conversionLabel, params = {}) => {
	if (typeof window === "undefined" || !window.gtag) return;

	// A label-less conversion hit is silently discarded by Ads. Skip it instead
	// of shipping noise, and make the misconfiguration visible in dev.
	if (!conversionLabel) {
		if (process.env.NODE_ENV !== "production") {
			console.warn(
				"[gtag] Ads conversion skipped: missing conversion label. " +
					"Set the NEXT_PUBLIC_ADS_*_LABEL env var for this action.",
			);
		}
		return;
	}

	window.gtag("event", "conversion", {
		send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
		...params,
	});
};

/**
 * Track contact form submission as conversion.
 *
 * Async because enhanced conversions need the email/phone hashed before the
 * conversion fires — `gtag('set','user_data', …)` only applies to events sent
 * after it. Callers should await this before navigating away; it never throws
 * and degrades to a plain conversion if hashing is unavailable.
 *
 * @param {object} formData - The form data (used for email/phone matching)
 * @param {{ leadId?: string }} [options] - Firestore id of the created lead
 */
export const trackContactFormSubmission = async (
	formData = {},
	options = {},
) => {
	if (typeof window === "undefined" || !window.gtag) return;

	const leadId = typeof options.leadId === "string" ? options.leadId : "";

	// Enhanced conversions: hashed identity makes the Ads match rate much
	// higher on a form lead. Best-effort — a null result just skips it.
	const userData = await hashUserData({
		email: formData.email,
		phone: formData.phone,
	});
	if (userData) {
		window.gtag("set", "user_data", userData);
	}

	// Exactly one Ads conversion per lead. `transaction_id` is Ads' native
	// de-duplication key, so a replayed submit cannot count twice.
	if (PRIMARY_LEAD_ACTION === "contact_form") {
		trackConversion(ADS_CONVERSION_LABELS.contactForm, {
			value: 100, // Assign a value to leads
			currency: "INR",
			...(leadId ? { transaction_id: leadId } : {}),
		});
	}

	// GA4's lead event. `lead_id` is carried so a GA4 lead can be matched to the
	// Firestore record; there is deliberately no second `Lead` event here —
	// that was a Meta event name leaking into GA4 and doubling the count.
	window.gtag("event", "generate_lead", {
		event_category: "Contact",
		event_label: "Contact Form Submission",
		value: 100,
		currency: "INR",
		form_type: "contact",
		has_company: !!formData.company,
		has_phone: !!formData.phone,
		product_interest: formData.productInterest || "general",
		...(leadId ? { lead_id: leadId, transaction_id: leadId } : {}),
	});
};

/**
 * Track phone number clicks
 * @param {string} phoneNumber - The phone number clicked
 * @param {string} source - Where the click originated
 */
export const trackPhoneClick = (phoneNumber, source = "unknown") => {
	if (typeof window !== "undefined" && window.gtag) {
		// Track as conversion
		trackConversion(ADS_CONVERSION_LABELS.phoneCall, {
			value: 50,
			currency: "INR",
		});

		// Track as event
		window.gtag("event", "click_to_call", {
			event_category: "Contact",
			event_label: phoneNumber,
			phone_number: phoneNumber,
			link_location: source,
		});
	}
};

/**
 * Track email link clicks
 * @param {string} email - The email address clicked
 * @param {string} source - Where the click originated
 */
export const trackEmailClick = (email, source = "unknown") => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "click_to_email", {
			event_category: "Contact",
			event_label: email,
			email_address: email,
			link_location: source,
		});
	}
};

/**
 * Track WhatsApp button clicks
 * @param {string} source - Where the click originated
 */
export const trackWhatsAppClick = (source = "unknown") => {
	if (typeof window !== "undefined" && window.gtag) {
		// Track as conversion
		trackConversion(ADS_CONVERSION_LABELS.whatsapp, {
			value: 50,
			currency: "INR",
		});

		window.gtag("event", "whatsapp_click", {
			event_category: "Contact",
			event_label: source,
			contact_method: "whatsapp",
		});
	}
};

/**
 * Track CTA button clicks
 * @param {string} buttonName - Name of the button
 * @param {string} location - Page or section location
 */
export const trackCTAClick = (buttonName, location = "unknown") => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "cta_click", {
			event_category: "Engagement",
			event_label: buttonName,
			page_location: location,
		});
	}
};

/**
 * Track product interest/views
 * @param {string} productName - Name of the product
 * @param {string} category - Product category
 */
export const trackProductView = (productName, category = "gauge") => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "view_item", {
			event_category: "Products",
			event_label: productName,
			items: [
				{
					item_name: productName,
					item_category: category,
				},
			],
		});
	}
};

/**
 * Track quote request
 * @param {object} quoteData - Quote request data
 */
export const trackQuoteRequest = (quoteData = {}) => {
	if (typeof window !== "undefined" && window.gtag) {
		// Track as high-value conversion
		trackConversion(ADS_CONVERSION_LABELS.quoteRequest, {
			value: 200,
			currency: "INR",
		});

		window.gtag("event", "request_quote", {
			event_category: "Conversion",
			event_label: "Quote Request",
			product: quoteData.product || "general",
		});
	}
};

/**
 * Track scroll depth
 * @param {number} depth - Scroll depth percentage
 * @param {string} page - Page name
 */
export const trackScrollDepth = (depth, page) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "scroll_depth", {
			event_category: "Engagement",
			event_label: `${depth}%`,
			page_name: page,
			scroll_percentage: depth,
		});
	}
};

/**
 * Track time on page
 * @param {number} seconds - Time in seconds
 * @param {string} page - Page name
 */
export const trackTimeOnPage = (seconds, page) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "time_on_page", {
			event_category: "Engagement",
			event_label: page,
			time_seconds: seconds,
		});
	}
};

/**
 * Track thank you page view.
 *
 * This used to fire the Ads `thankYou` conversion unconditionally, which meant
 * a reload or a direct visit to /thank-you counted as a lead. It now fires the
 * Ads conversion only when it is the configured primary action *and* a fresh
 * lead id is present (i.e. the visitor actually submitted the form), and the id
 * is passed as `transaction_id` so Ads de-duplicates a replayed submit.
 *
 * @param {{ leadId?: string }} [options] - id consumed from lead-tracking
 */
export const trackThankYouPageView = (options = {}) => {
	if (typeof window === "undefined" || !window.gtag) return;

	const leadId = typeof options.leadId === "string" ? options.leadId : "";

	if (PRIMARY_LEAD_ACTION === "thank_you" && leadId) {
		trackConversion(ADS_CONVERSION_LABELS.thankYou, {
			value: 100,
			currency: "INR",
			transaction_id: leadId,
		});
	}

	// The GA4 event fires either way — it is a page-view fact, not a
	// conversion claim, and it is useful when someone opens /thank-you directly.
	window.gtag("event", "thank_you_page_view", {
		event_category: "Conversion",
		event_label: "Form Submission Complete",
		...(leadId ? { lead_id: leadId } : {}),
	});
};

/**
 * Set user properties for better audience targeting
 * @param {object} properties - User properties
 */
export const setUserProperties = (properties = {}) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("set", "user_properties", properties);
	}
};

/**
 * Track form field focus (for engagement tracking)
 * @param {string} fieldName - Name of the field
 */
export const trackFormFieldFocus = (fieldName) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "form_field_focus", {
			event_category: "Form Engagement",
			event_label: fieldName,
			field_name: fieldName,
		});
	}
};

/**
 * Track form start (when user begins filling the form)
 */
export const trackFormStart = () => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "form_start", {
			event_category: "Form Engagement",
			event_label: "Contact Form Started",
		});
	}
};
