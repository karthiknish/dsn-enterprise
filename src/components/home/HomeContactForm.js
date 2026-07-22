"use client";

import { UilExclamationTriangle } from "@iconscout/react-unicons";

const fieldErrorClass = (hasError) =>
	hasError ? "border-red-500 focus:ring-red-500/40 focus:border-red-500" : "";

export default function HomeContactForm({
	formData,
	fieldErrors = {},
	isSubmitting,
	submitSuccess,
	submitError,
	errorMessage,
	onFieldChange,
	onFieldBlur,
	onSubmit,
}) {
	return (
		<>
			<h2 className="text-2xl font-semibold mb-6 text-gray-900">
				Send Us a Message
			</h2>

			{submitSuccess && (
				<div
					role="alert"
					className="bg-success-100 border border-success text-success-700 px-4 py-3 rounded mb-6"
				>
					<p>Thank you for your message! We will get back to you shortly.</p>
				</div>
			)}

			{submitError && (
				<div
					role="alert"
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
				>
					<p>{errorMessage}</p>
				</div>
			)}

			<form onSubmit={onSubmit} aria-busy={isSubmitting} noValidate>
				<div className="mb-4">
					<label
						id="name-label"
						htmlFor="name"
						className="block text-gray-700 font-medium mb-2"
					>
						Your Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						aria-labelledby="name-label"
						autoComplete="name"
						value={formData.name}
						onChange={onFieldChange}
						onBlur={onFieldBlur}
						className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${fieldErrorClass(fieldErrors.name)}`}
						placeholder="Enter your name"
						required
						aria-invalid={fieldErrors.name ? "true" : "false"}
						aria-describedby={fieldErrors.name ? "name-error" : undefined}
					/>
					{fieldErrors.name && (
						<p
							id="name-error"
							className="mt-1 text-sm text-red-600 flex items-center field-error"
						>
							<UilExclamationTriangle className="mr-1 w-3.5 h-3.5" aria-hidden />
							{fieldErrors.name}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label
						id="email-label"
						htmlFor="email"
						className="block text-gray-700 font-medium mb-2"
					>
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						aria-labelledby="email-label"
						autoComplete="email"
						value={formData.email}
						onChange={onFieldChange}
						onBlur={onFieldBlur}
						className={`w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${fieldErrorClass(fieldErrors.email)}`}
						placeholder="Enter your email"
						required
						aria-invalid={fieldErrors.email ? "true" : "false"}
						aria-describedby={fieldErrors.email ? "email-error" : undefined}
					/>
					{fieldErrors.email && (
						<p
							id="email-error"
							className="mt-1 text-sm text-red-600 flex items-center field-error"
						>
							<UilExclamationTriangle className="mr-1 w-3.5 h-3.5" aria-hidden />
							{fieldErrors.email}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label
						id="phone-label"
						htmlFor="phone"
						className="block text-gray-700 font-medium mb-2"
					>
						Phone Number
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						aria-labelledby="phone-label"
						autoComplete="tel"
						value={formData.phone}
						onChange={onFieldChange}
						onBlur={onFieldBlur}
						className={`w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${fieldErrorClass(fieldErrors.phone)}`}
						placeholder="Enter your phone number"
						aria-invalid={fieldErrors.phone ? "true" : "false"}
						aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
					/>
					{fieldErrors.phone && (
						<p
							id="phone-error"
							className="mt-1 text-sm text-red-600 flex items-center field-error"
						>
							<UilExclamationTriangle className="mr-1 w-3.5 h-3.5" aria-hidden />
							{fieldErrors.phone}
						</p>
					)}
				</div>
				<div className="mb-4">
					<label
						id="company-label"
						htmlFor="company"
						className="block text-gray-700 font-medium mb-2"
					>
						Company
					</label>
					<input
						type="text"
						id="company"
						name="company"
						aria-labelledby="company-label"
						autoComplete="organization"
						value={formData.company}
						onChange={onFieldChange}
						className="w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
						placeholder="Enter your company name"
					/>
				</div>
				<div className="mb-4">
					<label
						id="productInterest-label"
						htmlFor="productInterest"
						className="block text-gray-700 font-medium mb-2"
					>
						Product Interest
					</label>
					<select
						id="productInterest"
						name="productInterest"
						aria-labelledby="productInterest-label"
						autoComplete="off"
						value={formData.productInterest}
						onChange={onFieldChange}
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
						id="message-label"
						htmlFor="message"
						className="block text-gray-700 font-medium mb-2"
					>
						Your Message *
					</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						aria-labelledby="message-label"
						value={formData.message}
						onChange={onFieldChange}
						onBlur={onFieldBlur}
						className={`w-full px-4 text-gray-900 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent ${fieldErrorClass(fieldErrors.message)}`}
						placeholder="Enter your message"
						required
						maxLength={2000}
						aria-invalid={fieldErrors.message ? "true" : "false"}
						aria-describedby={
							fieldErrors.message ? "message-error" : "message-help"
						}
					></textarea>
					<div className="flex justify-between items-center mt-1">
						<p id="message-help" className="text-xs text-gray-500">
							Please provide at least 10 characters
						</p>
						<span className="text-xs text-gray-500">
							{formData.message.length}/2000
						</span>
					</div>
					{fieldErrors.message && (
						<p
							id="message-error"
							className="mt-1 text-sm text-red-600 flex items-center field-error"
						>
							<UilExclamationTriangle className="mr-1 w-3.5 h-3.5" aria-hidden />
							{fieldErrors.message}
						</p>
					)}
				</div>
				<button
					type="submit"
					aria-busy={isSubmitting}
					className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-3.5 px-6 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.99] ${
						isSubmitting ? "opacity-70 cursor-not-allowed" : ""
					}`}
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</button>
			</form>
		</>
	);
}
