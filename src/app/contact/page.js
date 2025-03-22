"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ContactPage = () => {
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
    const { name, id, value } = e.target;
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

      console.log("Sending to /api/contact:", formData);

      // Use the API endpoint instead of direct Supabase access
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
        } else if (response.status === 401) {
          throw new Error(
            "Authentication error with Contentful. Please check your API credentials."
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
                      className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
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
                        className="w-full px-4 text-primary py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
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
                        className="w-full px-4 py-2 text-primary border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
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
                      className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                      className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                <a href="mailto:info@dsnenterprises.in">
                  info@dsnenterprises.in
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
