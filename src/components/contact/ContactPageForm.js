"use client";

import ContactFormActions from "./ContactFormActions";
import ContactFormFields from "./ContactFormFields";

export default function ContactPageForm({
	formData,
	fieldErrors,
	isSubmitting,
	lastSaved,
	onSubmit,
	onFieldChange,
	onFieldFocus,
	onFieldBlur,
	onClear,
}) {
	return (
		<form onSubmit={onSubmit}>
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
