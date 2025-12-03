'use client';

import { useCallback, useEffect, useRef } from 'react';
import * as gtag from '@/lib/gtag';

/**
 * Custom hook for Google Ads tracking
 * Provides easy-to-use tracking functions for components
 */
export const useGoogleAdsTracking = () => {
  const formStartTracked = useRef(false);
  const scrollMilestones = useRef(new Set());
  const startTime = useRef(Date.now());

  /**
   * Track contact form submission
   */
  const trackContactSubmission = useCallback((formData = {}) => {
    gtag.trackContactFormSubmission(formData);
  }, []);

  /**
   * Track phone number click
   */
  const trackPhoneClick = useCallback((phoneNumber) => {
    gtag.trackPhoneClick(phoneNumber);
  }, []);

  /**
   * Track email click
   */
  const trackEmailClick = useCallback((email) => {
    gtag.trackEmailClick(email);
  }, []);

  /**
   * Track WhatsApp click
   */
  const trackWhatsAppClick = useCallback((source = 'unknown') => {
    gtag.trackWhatsAppClick(source);
  }, []);

  /**
   * Track CTA button click
   */
  const trackCTAClick = useCallback((buttonName, location = 'unknown') => {
    gtag.trackCTAClick(buttonName, location);
  }, []);

  /**
   * Track product view
   */
  const trackProductView = useCallback((productName, category = 'gauge') => {
    gtag.trackProductView(productName, category);
  }, []);

  /**
   * Track quote request
   */
  const trackQuoteRequest = useCallback((quoteData = {}) => {
    gtag.trackQuoteRequest(quoteData);
  }, []);

  /**
   * Track form field focus
   */
  const trackFormFieldFocus = useCallback((fieldName) => {
    // Track form start on first field focus
    if (!formStartTracked.current) {
      gtag.trackFormStart();
      formStartTracked.current = true;
    }
    gtag.trackFormFieldFocus(fieldName);
  }, []);

  /**
   * Track thank you page view
   */
  const trackThankYouPageView = useCallback(() => {
    gtag.trackThankYouPageView();
  }, []);

  /**
   * Track scroll depth milestones (25%, 50%, 75%, 100%)
   */
  const trackScrollDepth = useCallback((pageName) => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          gtag.trackScrollDepth(milestone, pageName);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Track time on page (call on unmount)
   */
  const trackTimeOnPage = useCallback((pageName) => {
    const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
    gtag.trackTimeOnPage(timeSpent, pageName);
  }, []);

  /**
   * Set user properties for audience targeting
   */
  const setUserProperties = useCallback((properties) => {
    gtag.setUserProperties(properties);
  }, []);

  /**
   * Generic event tracking
   */
  const trackEvent = useCallback((action, params = {}) => {
    gtag.event(action, params);
  }, []);

  return {
    trackContactSubmission,
    trackPhoneClick,
    trackEmailClick,
    trackWhatsAppClick,
    trackCTAClick,
    trackProductView,
    trackQuoteRequest,
    trackFormFieldFocus,
    trackThankYouPageView,
    trackScrollDepth,
    trackTimeOnPage,
    setUserProperties,
    trackEvent,
  };
};

export default useGoogleAdsTracking;
