"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ContactSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    productInterest: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const fieldName = name || id; // Use name if available, otherwise use id
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);

    try {
      console.log("Submitting form with data:", formData);
      let response;
      try {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (fetchError) {
        console.error("Network error during fetch:", fetchError);
        throw new Error("Network error: Could not connect to the server");
      }

      // Check if response is not JSON
      let responseText;
      let isJson = false;
      const contentType = response.headers.get("content-type");

      try {
        responseText = await response.text();
        if (contentType && contentType.includes("application/json")) {
          isJson = true;
        } else {
          console.error("Non-JSON response received:", responseText);
          throw new Error("The server returned an invalid response format");
        }
      } catch (textError) {
        console.error("Error reading response:", textError);
        throw new Error("Could not read server response");
      }

      // Parse JSON if we have it
      let result;
      if (isJson) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Error parsing JSON:",
            parseError,
            "Raw text:",
            responseText
          );
          throw new Error("Invalid JSON response from server");
        }
      } else {
        throw new Error(
          "Server returned HTML instead of JSON. There may be a server error."
        );
      }

      // Handle API errors based on response status
      if (!response.ok) {
        console.error("API error response:", result);
        if (response.status === 400) {
          throw new Error(
            result.error || "Please fill out all required fields"
          );
        } else if (response.status === 403) {
          throw new Error(
            "Database permission error. Your form could not be submitted."
          );
        } else {
          throw new Error(
            result.error || result.details || "Failed to submit form"
          );
        }
      }

      console.log("Submission successful, response:", result);

      // Success - redirect to thank you page
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        productInterest: "",
      });

      // Redirect to thank you page
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setSubmitError(true);
      setErrorMessage(
        error.message ||
          "There was an error sending your message. Please try again later."
      );

      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Have questions or need a quote? Contact us today and our team will
            get back to you as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-secondary-light p-8  rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Send Us a Message
              </h3>

              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>
                    Thank you for your message! We will get back to you shortly.
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
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-primary  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your phone number"
                  />
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
                    className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your company name"
                  />
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
                    className="w-full px-4 py-2 text-primary border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a product</option>
                    <option value="Plain Plug Gauges">Plain Plug Gauges</option>
                    <option value="Plain Ring Gauges">Plain Ring Gauges</option>
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
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 text-primary py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-primary text-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt
                    className="mt-1 mr-4 text-secondary-light"
                    size={24}
                  />
                  <div>
                    <h4 className="font-bold mb-1">Our Location</h4>
                    <p className="text-secondary-light">
                      Coimbatore, Tamil Nadu, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone
                    className="mt-1 mr-4 text-secondary-light"
                    size={24}
                  />
                  <div>
                    <h4 className="font-bold mb-1">Phone Number</h4>
                    <p className="text-secondary-light">
                      <a href="tel:+919363122005">+91 9363122005</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaEnvelope
                    className="mt-1 mr-4 text-secondary-light"
                    size={24}
                  />
                  <div>
                    <h4 className="font-bold mb-1">Email Address</h4>
                    <p className="text-secondary-light">
                      <a href="mailto:microfin2001@gmail.com">
                        microfin2001@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="font-bold mb-4">Business Hours</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
