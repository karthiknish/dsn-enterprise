/**
 * Custom hook for Meta (Facebook) Pixel event tracking
 */

export const useMetaTracking = () => {
  /**
   * Track custom Meta Pixel events
   * @param {string} eventName - The name of the event
   * @param {Object} parameters - Event parameters
   */
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
      console.log('Meta Pixel Event Tracked:', eventName, parameters);
    } else {
      console.warn('Meta Pixel not initialized or window not available');
    }
  };

  /**
   * Track standard Meta Pixel events
   * @param {string} eventName - Standard event name (e.g., 'Lead', 'ViewContent', 'Purchase')
   * @param {Object} parameters - Event parameters
   */
  const trackStandardEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters);
      console.log('Meta Pixel Standard Event Tracked:', eventName, parameters);
    } else {
      console.warn('Meta Pixel not initialized or window not available');
    }
  };

  /**
   * Track contact form submission
   * @param {Object} contactData - Contact form data
   */
  const trackContactSubmission = (contactData) => {
    const parameters = {
      content_name: 'Contact Form',
      content_category: 'Lead Generation',
      content_ids: ['contact_form'],
      content_type: 'form',
      value: 0, // You can assign a value if you want to track lead value
      currency: 'INR' // Or your preferred currency
    };

    // Track standard Lead event
    trackStandardEvent('Lead', {
      ...parameters,
      // Add more specific parameters for lead tracking
      first_name: contactData.name?.split(' ')[0] || '',
      last_name: contactData.name?.split(' ').slice(1).join(' ') || '',
      email: contactData.email || '',
      phone: contactData.phone || '',
      company: contactData.company || '',
      product_interest: contactData.productInterest || ''
    });

    // Also track custom event for more detailed tracking
    trackEvent('ContactFormSubmitted', {
      form_type: 'contact',
      has_company: !!contactData.company,
      has_phone: !!contactData.phone,
      product_category: contactData.productInterest || 'general',
      message_length: contactData.message?.length || 0
    });
  };

  /**
   * Track page view with custom parameters
   * @param {Object} parameters - Additional page parameters
   */
  const trackPageView = (parameters = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView', parameters);
      console.log('Meta Pixel PageView Tracked:', parameters);
    }
  };

  /**
   * Track form field interactions
   * @param {string} fieldName - Name of the field
   * @param {string} action - Action type ('focus', 'blur', 'change')
   */
  const trackFieldInteraction = (fieldName, action) => {
    trackEvent('FormFieldInteraction', {
      field_name: fieldName,
      action: action,
      form_type: 'contact'
    });
  };

  /**
   * Track form validation errors
   * @param {Object} errors - Validation errors object
   */
  const trackValidationErrors = (errors) => {
    trackEvent('FormValidationErrors', {
      form_type: 'contact',
      error_count: Object.keys(errors).length,
      error_fields: Object.keys(errors)
    });
  };

  /**
   * Track form abandonment (when user leaves form without submitting)
   * @param {Object} formData - Partial form data
   */
  const trackFormAbandonment = (formData) => {
    trackEvent('FormAbandonment', {
      form_type: 'contact',
      fields_filled: Object.values(formData).filter(value => value && value.trim() !== '').length,
      total_fields: Object.keys(formData).length,
      has_name: !!formData.name?.trim(),
      has_email: !!formData.email?.trim(),
      has_phone: !!formData.phone?.trim(),
      has_company: !!formData.company?.trim()
    });
  };

  return {
    trackEvent,
    trackStandardEvent,
    trackContactSubmission,
    trackPageView,
    trackFieldInteraction,
    trackValidationErrors,
    trackFormAbandonment
  };
};
