/**
 * Google Ads & Analytics Tracking Library
 * Optimized for conversion tracking and remarketing
 */

// Google Tag IDs
export const GA_TRACKING_ID = 'GT-TQKJ52Q3';
export const GOOGLE_ADS_ID = 'AW-17769294111';

/**
 * Track page views
 * @param {string} url - The URL of the page
 */
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
    window.gtag('config', GOOGLE_ADS_ID, {
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};

/**
 * Track Google Ads conversion
 * @param {string} conversionLabel - The conversion label from Google Ads
 * @param {object} params - Additional parameters
 */
export const trackConversion = (conversionLabel, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      ...params,
    });
  }
};

/**
 * Track contact form submission as conversion
 * @param {object} formData - The form data
 */
export const trackContactFormSubmission = (formData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track as Google Ads conversion
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      value: 100, // Assign a value to leads
      currency: 'INR',
    });

    // Track as custom event for analytics
    window.gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: 'Contact Form Submission',
      value: 100,
      currency: 'INR',
      form_type: 'contact',
      has_company: !!formData.company,
      has_phone: !!formData.phone,
      product_interest: formData.productInterest || 'general',
    });

    // Track lead event
    window.gtag('event', 'Lead', {
      event_category: 'Conversion',
      event_label: 'Contact Form',
    });
  }
};

/**
 * Track phone number clicks
 * @param {string} phoneNumber - The phone number clicked
 */
export const trackPhoneClick = (phoneNumber) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track as conversion
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      value: 50,
      currency: 'INR',
    });

    // Track as event
    window.gtag('event', 'click_to_call', {
      event_category: 'Contact',
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click_to_email', {
      event_category: 'Contact',
      event_label: email,
      email_address: email,
    });
  }
};

/**
 * Track WhatsApp button clicks
 * @param {string} source - Where the click originated
 */
export const trackWhatsAppClick = (source = 'unknown') => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track as conversion
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      value: 50,
      currency: 'INR',
    });

    window.gtag('event', 'whatsapp_click', {
      event_category: 'Contact',
      event_label: source,
      contact_method: 'whatsapp',
    });
  }
};

/**
 * Track CTA button clicks
 * @param {string} buttonName - Name of the button
 * @param {string} location - Page or section location
 */
export const trackCTAClick = (buttonName, location = 'unknown') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'Engagement',
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
export const trackProductView = (productName, category = 'gauge') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      event_category: 'Products',
      event_label: productName,
      items: [{
        item_name: productName,
        item_category: category,
      }],
    });
  }
};

/**
 * Track quote request
 * @param {object} quoteData - Quote request data
 */
export const trackQuoteRequest = (quoteData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track as high-value conversion
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      value: 200,
      currency: 'INR',
    });

    window.gtag('event', 'request_quote', {
      event_category: 'Conversion',
      event_label: 'Quote Request',
      product: quoteData.product || 'general',
    });
  }
};

/**
 * Track scroll depth
 * @param {number} depth - Scroll depth percentage
 * @param {string} page - Page name
 */
export const trackScrollDepth = (depth, page) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'Engagement',
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_page', {
      event_category: 'Engagement',
      event_label: page,
      time_seconds: seconds,
    });
  }
};

/**
 * Track thank you page view (conversion confirmation)
 */
export const trackThankYouPageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // This confirms the conversion
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      value: 100,
      currency: 'INR',
    });

    window.gtag('event', 'thank_you_page_view', {
      event_category: 'Conversion',
      event_label: 'Form Submission Complete',
    });
  }
};

/**
 * Set user properties for better audience targeting
 * @param {object} properties - User properties
 */
export const setUserProperties = (properties = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

/**
 * Track form field focus (for engagement tracking)
 * @param {string} fieldName - Name of the field
 */
export const trackFormFieldFocus = (fieldName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_field_focus', {
      event_category: 'Form Engagement',
      event_label: fieldName,
      field_name: fieldName,
    });
  }
};

/**
 * Track form start (when user begins filling the form)
 */
export const trackFormStart = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_start', {
      event_category: 'Form Engagement',
      event_label: 'Contact Form Started',
    });
  }
};
