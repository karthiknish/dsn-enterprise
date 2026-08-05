/**
 * Google Ads & Analytics Tracking Library
 * Optimized for conversion tracking and remarketing
 */

// Google Tag IDs
//
// GA4_MEASUREMENT_ID is the property the admin dashboard reads
// (GA_PROPERTY_ID=514574483, stream 13066196898). GOOGLE_TAG_ID resolves to
// Google Ads only and carries no GA4 destination, which is why GA4 has to be
// configured explicitly rather than relying on the container.
const GA4_MEASUREMENT_ID =
	process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-GR3VEG2ZX0";
const GOOGLE_TAG_ID = "GT-TQKJ52Q3";

// Google Ads conversion tracking.
//
// AW-17769294111 belongs to Ads CID 177-692-9411, NOT the DSN account
// (CID 326-732-8717 -> AW-3267328717). Conversions sent to the old ID were
// reported to a foreign account and never appeared in DSN Ads.
//
// Ads conversions ONLY count when send_to carries a conversion label
// ("AW-3267328717/<label>"). Labels come from the conversion actions created
// in the DSN Ads account and are injected via env so the code needs no redeploy
// when they change.
export const GOOGLE_ADS_ID =
	process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-3267328717";

export const ADS_CONVERSION_LABELS = {
	contactForm: process.env.NEXT_PUBLIC_ADS_CONTACT_FORM_LABEL || "",
	phoneCall: process.env.NEXT_PUBLIC_ADS_PHONE_CALL_LABEL || "",
	whatsapp: process.env.NEXT_PUBLIC_ADS_WHATSAPP_LABEL || "",
	quoteRequest: process.env.NEXT_PUBLIC_ADS_QUOTE_REQUEST_LABEL || "",
	thankYou: process.env.NEXT_PUBLIC_ADS_THANK_YOU_LABEL || "",
};

/**
 * Track page views
 * @param {string} url - The URL of the page
 */
const pageview = (url) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("config", GA4_MEASUREMENT_ID, {
			page_path: url,
		});
		window.gtag("config", GOOGLE_TAG_ID, {
			page_path: url,
		});
		window.gtag("config", GOOGLE_ADS_ID, {
			page_path: url,
		});
	}
};

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
 * Track contact form submission as conversion
 * @param {object} formData - The form data
 */
export const trackContactFormSubmission = (formData = {}) => {
	if (typeof window !== "undefined" && window.gtag) {
		// Track as Google Ads conversion
		trackConversion(ADS_CONVERSION_LABELS.contactForm, {
			value: 100, // Assign a value to leads
			currency: "INR",
		});

		// Track as custom event for analytics
		window.gtag("event", "generate_lead", {
			event_category: "Contact",
			event_label: "Contact Form Submission",
			value: 100,
			currency: "INR",
			form_type: "contact",
			has_company: !!formData.company,
			has_phone: !!formData.phone,
			product_interest: formData.productInterest || "general",
		});

		// Track lead event
		window.gtag("event", "Lead", {
			event_category: "Conversion",
			event_label: "Contact Form",
		});
	}
};

/**
 * Track phone number clicks
 * @param {string} phoneNumber - The phone number clicked
 */
export const trackPhoneClick = (phoneNumber) => {
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
		});
	}
};

/**
 * Track email link clicks
 * @param {string} email - The email address clicked
 */
export const trackEmailClick = (email) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", "click_to_email", {
			event_category: "Contact",
			event_label: email,
			email_address: email,
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
 * Track thank you page view (conversion confirmation)
 */
export const trackThankYouPageView = () => {
	if (typeof window !== "undefined" && window.gtag) {
		// This confirms the conversion
		trackConversion(ADS_CONVERSION_LABELS.thankYou, {
			value: 100,
			currency: "INR",
		});

		window.gtag("event", "thank_you_page_view", {
			event_category: "Conversion",
			event_label: "Form Submission Complete",
		});
	}
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
