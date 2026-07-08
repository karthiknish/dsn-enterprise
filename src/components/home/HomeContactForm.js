"use client";

export default function HomeContactForm({
	formData,
	isSubmitting,
	submitSuccess,
	submitError,
	errorMessage,
	onFieldChange,
	onSubmit,
}) {
	return (
		<>
			<h3 className="text-2xl font-semibold mb-6 text-gray-900">
				Send Us a Message
			</h3>

			{submitSuccess && (
				<div
					role="alert"
					className="bg-accent-100 border border-accent text-accent-700 px-4 py-3 rounded mb-6"
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

			<form onSubmit={onSubmit} aria-busy={isSubmitting}>
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
						className="w-full px-4 py-2.5 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
						placeholder="Enter your name"
						required
					/>
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
						className="w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
						placeholder="Enter your email"
						required
					/>
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
						className="w-full px-4 py-2.5 border text-gray-900 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
						placeholder="Enter your phone number"
					/>
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
						className="w-full px-4 text-gray-900 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
						placeholder="Enter your message"
						required
					></textarea>
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
