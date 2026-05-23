"use client";

import { FaExclamationTriangle } from "react-icons/fa";

const inputClass = (hasError) =>
	`w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
		hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
	}`;

export default function ContactFormFields({
	formData,
	fieldErrors,
	onFieldChange,
	onFieldFocus,
	onFieldBlur,
}) {
	return (
		<>
			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 font-medium mb-2">
					Name *
				</label>
				<input
					type="text"
					id="name"
					name="name"
					aria-label="Name"
					value={formData.name}
					onChange={onFieldChange}
					onFocus={onFieldFocus}
					onBlur={onFieldBlur}
					className={inputClass(fieldErrors.name)}
					required
					aria-invalid={fieldErrors.name ? "true" : "false"}
					aria-describedby={fieldErrors.name ? "name-error" : undefined}
				/>
				{fieldErrors.name && (
					<p
						id="name-error"
						className="mt-1 text-sm text-red-600 flex items-center field-error"
					>
						<FaExclamationTriangle className="mr-1" />
						{fieldErrors.name}
					</p>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label htmlFor="email" className="block text-gray-700 font-medium mb-2">
						Email *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						aria-label="Email address"
						value={formData.email}
						onChange={onFieldChange}
						onFocus={onFieldFocus}
						onBlur={onFieldBlur}
						className={`w-full px-4 text-primary py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
							fieldErrors.email
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300"
						}`}
						required
						aria-invalid={fieldErrors.email ? "true" : "false"}
						aria-describedby={fieldErrors.email ? "email-error" : undefined}
					/>
					{fieldErrors.email && (
						<p
							id="email-error"
							className="mt-1 text-sm text-red-600 flex items-center field-error"
						>
							<FaExclamationTriangle className="mr-1" />
							{fieldErrors.email}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
						Phone
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						aria-label="Phone number"
						value={formData.phone}
						onChange={onFieldChange}
						onFocus={onFieldFocus}
						onBlur={onFieldBlur}
						className={inputClass(fieldErrors.phone)}
						aria-invalid={fieldErrors.phone ? "true" : "false"}
						aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
					/>
					{fieldErrors.phone && (
						<p
							id="phone-error"
							className="mt-1 text-sm text-red-600 flex items-center field-error"
						>
							<FaExclamationTriangle className="mr-1" />
							{fieldErrors.phone}
						</p>
					)}
				</div>
			</div>

			<div className="mb-4">
				<label htmlFor="company" className="block text-gray-700 font-medium mb-2">
					Company
				</label>
				<input
					type="text"
					id="company"
					name="company"
					aria-label="Company name"
					value={formData.company}
					onChange={onFieldChange}
					onFocus={onFieldFocus}
					onBlur={onFieldBlur}
					className={inputClass(fieldErrors.company)}
					aria-invalid={fieldErrors.company ? "true" : "false"}
					aria-describedby={fieldErrors.company ? "company-error" : undefined}
				/>
				{fieldErrors.company && (
					<p
						id="company-error"
						className="mt-1 text-sm text-red-600 flex items-center field-error"
					>
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
					aria-label="Product interest"
					value={formData.productInterest}
					onChange={onFieldChange}
					onFocus={onFieldFocus}
					onBlur={onFieldBlur}
					className="w-full px-4 py-2 border text-primary border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
				>
					<option value="">Select a product</option>
					<option value="Plain Plug Gauges">Plain Plug Gauges</option>
					<option value="Plain Ring Gauges">Plain Ring Gauges</option>
					<option value="Cylindrical Setting Masters">
						Cylindrical Setting Masters
					</option>
					<option value="Cylindrical Measuring Pin">Cylindrical Measuring Pin</option>
					<option value="Snap Gauges">Snap Gauges</option>
					<option value="Thread Plug Gauge">Thread Plug Gauge</option>
					<option value="Thread Ring Gauge">Thread Ring Gauge</option>
					<option value="Other">Other</option>
				</select>
			</div>

			<div className="mb-6">
				<label htmlFor="message" className="block text-gray-700 font-medium mb-2">
					Message *
				</label>
				<div className="relative">
					<textarea
						id="message"
						name="message"
						rows="5"
						aria-label="Message"
						value={formData.message}
						onChange={onFieldChange}
						onFocus={onFieldFocus}
						onBlur={onFieldBlur}
						className={`w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
							fieldErrors.message
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300"
						}`}
						required
						aria-invalid={fieldErrors.message ? "true" : "false"}
						aria-describedby={
							fieldErrors.message ? "message-error" : "message-help"
						}
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
						<p
							id="message-error"
							className="text-sm text-red-600 flex items-center field-error"
						>
							<FaExclamationTriangle className="mr-1" />
							{fieldErrors.message}
						</p>
					)}
				</div>
			</div>
		</>
	);
}
