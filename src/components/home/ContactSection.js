"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";
import SectionHeader from "./SectionHeader";

const ContactSection = () => {
	const router = useRouter();
	const { trackContactSubmission } = useGoogleAdsTracking();
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
				if (contentType?.includes("application/json")) {
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
						responseText,
					);
					throw new Error("Invalid JSON response from server");
				}
			} else {
				throw new Error(
					"Server returned HTML instead of JSON. There may be a server error.",
				);
			}

			// Handle API errors based on response status
			if (!response.ok) {
				console.error("API error response:", result);
				if (response.status === 400) {
					throw new Error(
						result.error || "Please fill out all required fields",
					);
				} else if (response.status === 403) {
					throw new Error(
						"Database permission error. Your form could not be submitted.",
					);
				} else {
					throw new Error(
						result.error || result.details || "Failed to submit form",
					);
				}
			}

			console.log("Submission successful, response:", result);

			// Success - redirect to thank you page
			setIsSubmitting(false);
			setSubmitSuccess(true);

			// Track Google Ads conversion
			trackContactSubmission(formData);

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
					"There was an error sending your message. Please try again later.",
			);

			setTimeout(() => {
				setSubmitError(false);
			}, 5000);
		}
	};

	return (
		<section id="contact" className="py-20 md:py-24 bg-secondary-light relative">
			<div
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
				aria-hidden
			/>
			<div className="container mx-auto px-4 max-w-5xl">
				<SectionHeader
					eyebrow="Contact"
					title="Get In Touch"
					description="Have questions or need a quote? Contact us today and our team will get back to you as soon as possible."
				/>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
					<motion.aside
						className="lg:col-span-2 space-y-4"
						initial={{ opacity: 0, x: -16 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						{[
							{
								icon: FaMapMarkerAlt,
								label: "Location",
								value: "Coimbatore, Tamil Nadu, India",
							},
							{
								icon: FaPhone,
								label: "Phone",
								value: "+91 9363122005",
								href: "tel:+919363122005",
							},
							{
								icon: FaEnvelope,
								label: "Email",
								value: "microfin2001@gmail.com",
								href: "mailto:microfin2001@gmail.com",
							},
						].map((item) => {
							const Icon = item.icon;
							const content = (
								<div className="flex gap-4 p-5 rounded-xl bg-white border border-gray-200/80">
									<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
										<Icon aria-hidden />
									</span>
									<div>
										<p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
											{item.label}
										</p>
										<p className="text-gray-900 font-medium text-sm">
											{item.value}
										</p>
									</div>
								</div>
							);
							if (item.href) {
								return (
									<a
										key={item.label}
										href={item.href}
										className="block hover:border-accent/30 transition-colors rounded-xl"
									>
										{content}
									</a>
								);
							}
							return <div key={item.label}>{content}</div>;
						})}
					</motion.aside>

					<motion.div
						className="lg:col-span-3"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200/80 shadow-sm">
							<h3 className="text-2xl font-bold mb-6 text-gray-900">
								Send Us a Message
							</h3>

							{submitSuccess && (
								<div className="bg-accent-100 border border-accent text-accent-700 px-4 py-3 rounded mb-6">
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
										className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
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
										className="w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
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
										className="w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
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
										className="w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
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
										className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
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
										className="w-full px-4 text-gray-900 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
										placeholder="Enter your message"
										required
									></textarea>
								</div>
								<button
									type="submit"
									className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-3.5 px-6 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.99] ${
										isSubmitting ? "opacity-70 cursor-not-allowed" : ""
									}`}
									disabled={isSubmitting}
								>
									{isSubmitting ? "Sending..." : "Send Message"}
								</button>
							</form>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
