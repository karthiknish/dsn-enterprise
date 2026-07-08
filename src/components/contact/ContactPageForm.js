"use client";

import { UilExclamationTriangle } from "@iconscout/react-unicons";
import ContactFormActions from "./ContactFormActions";
import ContactFormFields from "./ContactFormFields";

export default function ContactPageForm({
	formData,
	fieldErrors,
	isSubmitting,
	submitError,
	errorMessage,
	lastSaved,
	onSubmit,
	onFieldChange,
	onFieldFocus,
	onFieldBlur,
	onClear,
}) {
	return (
		<form onSubmit={onSubmit} noValidate>
			{submitError && errorMessage && (
				<div
					role="alert"
					className="mb-6 flex items-start gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700"
				>
					<UilExclamationTriangle className="mt-0.5 shrink-0 w-5 h-5" aria-hidden />
					<p>{errorMessage}</p>
				</div>
			)}
			<ContactFormFields
				formData={formData}
				fieldErrors={fieldErrors}
				onFieldChange={onFieldChange}
				onFieldFocus={onFieldFocus}
				onFieldBlur={onFieldBlur}
			/>
			<ContactFormActions
				isSubmitting={isSubmitting}
				lastSaved={lastSaved}
				onClear={onClear}
			/>
		</form>
	);
}
