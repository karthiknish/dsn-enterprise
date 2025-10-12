"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMetaTracking } from "@/hooks/useMetaTracking";

const ContactPage = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const {
    trackContactSubmission,
    trackPageView,
    trackFieldInteraction,
    trackValidationErrors,
    trackFormAbandonment
  } = useMetaTracking();
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    productInterest: "",
  });

  // Form state management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  

  // Track page view on mount
  useEffect(() => {
    trackPageView({
      page_title: 'Contact Us',
      page_location: window.location.href,
      page_category: 'Lead Generation'
    });
  }, [trackPageView]);

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) { // 24 hours
          setFormData(parsed.data);
          setLastSaved(new Date(parsed.timestamp));
        }
      } catch (error) {
        console.error('Error loading saved form:', error);
      }
    }
  }, []);

  // Auto-save on form changes
  useEffect(() => {
    if (isFormDirty) {
      const timeoutId = setTimeout(() => {
        setIsAutoSaving(true);
        const saveData = {
          data: formData,
          timestamp: Date.now()
        };
        localStorage.setItem('contactFormDraft', JSON.stringify(saveData));
        setLastSaved(new Date());
        setIsAutoSaving(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [formData, isFormDirty]);

  // Track form abandonment on page unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty && Object.values(formData).some(value => value && value.trim() !== '')) {
        trackFormAbandonment(formData);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isFormDirty, formData, trackFormAbandonment]);

  // Clear saved form data on successful submission
  const clearSavedForm = () => {
    localStorage.removeItem('contactFormDraft');
    setLastSaved(null);
  };

  // Enhanced form validation
  const validateField = (name, value) => {
    const errors = { ...fieldErrors };
    
    switch (name) {
      case 'name':
        if (!value || value.trim().length === 0) {
          errors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          errors.name = 'Name must be less than 100 characters';
        } else {
          delete errors.name;
        }
        break;
        
      case 'email':
        if (!value || value.trim().length === 0) {
          errors.email = 'Email is required';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            errors.email = 'Please enter a valid email address';
          } else {
            delete errors.email;
          }
        }
        break;
        
      case 'phone':
        if (value) {
          const phoneRegex = /^[\d\s\+\-\(\)]{6,20}$/;
          if (!phoneRegex.test(value.trim())) {
            errors.phone = 'Please enter a valid phone number';
          } else {
            delete errors.phone;
          }
        } else {
          delete errors.phone;
        }
        break;
        
      case 'message':
        if (!value || value.trim().length === 0) {
          errors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          errors.message = 'Message must be at least 10 characters';
        } else if (value.trim().length > 2000) {
          errors.message = 'Message must be less than 2000 characters';
        } else {
          delete errors.message;
        }
        break;
        
      case 'company':
        if (value && value.trim().length > 200) {
          errors.company = 'Company name must be less than 200 characters';
        } else {
          delete errors.company;
        }
        break;
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, id, value } = e.target;
    const fieldName = name || id;
    
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    
    setIsFormDirty(true);
    
    // Track field interaction
    trackFieldInteraction(fieldName, 'change');
    
    // Real-time validation
    if (fieldErrors[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleFocus = (e) => {
    const { name, id } = e.target;
    const fieldName = name || id;
    trackFieldInteraction(fieldName, 'focus');
  };

  const handleBlur = (e) => {
    const { name, id, value } = e.target;
    const fieldName = name || id;
    validateField(fieldName, value);
    trackFieldInteraction(fieldName, 'blur');
  };

  // Clear form data
  const clearForm = () => {
    // Track form clear event
    if (Object.values(formData).some(value => value && value.trim() !== '')) {
      trackFormAbandonment(formData);
    }
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      productInterest: "",
    });
    setFieldErrors({});
    setIsFormDirty(false);
    clearSavedForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = Object.keys(formData).every(field => 
      validateField(field, formData[field])
    );
    
    if (!isValid) {
      // Track validation errors
      trackValidationErrors(fieldErrors);
      
      setSubmitError(true);
      setErrorMessage("Please fix the errors in the form before submitting.");
      // Scroll to first error
      const firstErrorField = document.querySelector('.field-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle API errors based on response status
      if (!response.ok) {
        console.error("API error response:", result);
        
        if (response.status === 400 && result.validationErrors) {
          // Handle field-specific validation errors
          setFieldErrors(result.validationErrors);
          throw new Error("Please correct the errors in the form.");
        } else if (response.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        } else {
          throw new Error(result.error || "Failed to submit form. Please try again.");
        }
      }

      console.log("Submission successful, response:", result);

      // Success
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Track successful contact submission
      trackContactSubmission(contactData);
      
      // Clear form and saved data
      clearForm();
      
      // Redirect to thank you page
      router.push("/thank-you");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setSubmitError(true);
      setErrorMessage(error.message || "There was an error sending your message. Please try again later.");
    }
  };

  

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have questions about our products or services? Get in touch with
              our team and we will be happy to assist you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </p>

                {submitSuccess && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    <p>
                      Thank you for your message! We will get back to you
                      shortly.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                        fieldErrors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      required
                      aria-invalid={fieldErrors.name ? 'true' : 'false'}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600 flex items-center field-error">
                        <FaExclamationTriangle className="mr-1" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`w-full px-4 text-primary py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                          fieldErrors.email 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                        aria-invalid={fieldErrors.email ? 'true' : 'false'}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center field-error">
                          <FaExclamationTriangle className="mr-1" />
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                          fieldErrors.phone 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        aria-invalid={fieldErrors.phone ? 'true' : 'false'}
                        aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                      />
                      {fieldErrors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center field-error">
                          <FaExclamationTriangle className="mr-1" />
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="company"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                        fieldErrors.company 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      aria-invalid={fieldErrors.company ? 'true' : 'false'}
                      aria-describedby={fieldErrors.company ? 'company-error' : undefined}
                    />
                    {fieldErrors.company && (
                      <p id="company-error" className="mt-1 text-sm text-red-600 flex items-center field-error">
                        <FaExclamationTriangle className="mr-1" />
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="productInterest"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Product Interest
                    </label>
                    <select
                      id="productInterest"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    >
                      <option value="">Select a product</option>
                      <option value="Plain Plug Gauges">
                        Plain Plug Gauges
                      </option>
                      <option value="Plain Ring Gauges">
                        Plain Ring Gauges
                      </option>
                      <option value="Cylindrical Setting Masters">
                        Cylindrical Setting Masters
                      </option>
                      <option value="Cylindrical Measuring Pin">
                        Cylindrical Measuring Pin
                      </option>
                      <option value="Snap Gauges">Snap Gauges</option>
                      <option value="Thread Plug Gauge">Thread Plug Gauge</option>
                      <option value="Thread Ring Gauge">Thread Ring Gauge</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
                          fieldErrors.message 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        required
                        aria-invalid={fieldErrors.message ? 'true' : 'false'}
                        aria-describedby={fieldErrors.message ? 'message-error' : 'message-help'}
                        maxLength={2000}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                        {formData.message.length}/2000
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p id="message-help" className="text-xs text-gray-500">
                        Please provide at least 10 characters
                      </p>
                      {fieldErrors.message && (
                        <p id="message-error" className="text-sm text-red-600 flex items-center field-error">
                          <FaExclamationTriangle className="mr-1" />
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className={`flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-all transform hover:scale-105 ${
                        isSubmitting 
                          ? "opacity-70 cursor-not-allowed" 
                          : ""
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={clearForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      disabled={isSubmitting}
                    >
                      Clear
                    </button>
                  </div>
                  
                  {/* Auto-save indicator */}
                  {(isAutoSaving || lastSaved) && (
                    <div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
                      {isAutoSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaCheck className="mr-1" />
                          Draft saved {lastSaved && `at ${lastSaved.toLocaleTimeString()}`}
                        </>
                      )}
                    </div>
                  )}
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-secondary-light p-8 rounded-lg h-full">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    Why Choose DSN Enterprises?
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Quality Assurance
                        </h4>
                        <p className="text-gray-700">
                          All our products adhere to international standards and
                          specifications.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Expert Consultation
                        </h4>
                        <p className="text-gray-700">
                          Our team of experts provides guidance on selecting the
                          right gauges for your needs.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Custom Solutions
                        </h4>
                        <p className="text-gray-700">
                          We offer custom-designed gauges tailored to your
                          specific requirements.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Prompt Delivery
                        </h4>
                        <p className="text-gray-700">
                          We ensure timely delivery of all our products and
                          services.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          After-Sales Support
                        </h4>
                        <p className="text-gray-700">
                          We provide comprehensive after-sales support and
                          maintenance services.
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 bg-secondary rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Ready Stock Available
                    </h4>
                    <p className="text-gray-700">
                      We maintain a ready stock of popular gauge sizes for
                      immediate delivery. Contact us for availability.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Our Location
              </h3>
              <p className="text-gray-600">
                Coimbatore,
                <br /> Tamil Nadu,
                <br />
                India
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <FaPhone className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:+919363122005">+91 9363122005</a>
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <FaEnvelope className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:microfin2001@gmail.com">
                  microfin2001@gmail.com
                </a>
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <FaClock className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Business Hours
              </h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 9:00 AM - 1:00 PM
                <br />
                Sunday: Closed
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
