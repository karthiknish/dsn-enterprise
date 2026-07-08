export const EMPTY_CONTACT_FORM = {
	name: "",
	email: "",
	phone: "",
	company: "",
	message: "",
	productInterest: "",
};

export function loadContactDraft() {
	if (typeof window === "undefined") {
		return { formData: EMPTY_CONTACT_FORM, lastSaved: null };
	}
	const savedData = localStorage.getItem("contactFormDraft:v1");
	if (!savedData) {
		return { formData: EMPTY_CONTACT_FORM, lastSaved: null };
	}
	try {
		const parsed = JSON.parse(savedData);
		if (
			parsed.timestamp &&
			Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000
		) {
			return {
				formData: parsed.data,
				lastSaved: new Date(parsed.timestamp),
			};
		}
	} catch (error) {
		console.error("Error loading saved form:", error);
	}
	return { formData: EMPTY_CONTACT_FORM, lastSaved: null };
}

export function validateContactField(name, value, fieldErrors) {
	const errors = { ...fieldErrors };

	switch (name) {
		case "name":
			if (!value || value.trim().length === 0) {
				errors.name = "Name is required";
			} else if (value.trim().length < 2) {
				errors.name = "Name must be at least 2 characters";
			} else if (value.trim().length > 100) {
				errors.name = "Name must be less than 100 characters";
			} else {
				delete errors.name;
			}
			break;

		case "email":
			if (!value || value.trim().length === 0) {
				errors.email = "Email is required";
			} else {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value.trim())) {
					errors.email = "Please enter a valid email address";
				} else {
					delete errors.email;
				}
			}
			break;

		case "phone":
			if (value) {
				const phoneRegex = /^[\d\s+()-]{6,20}$/;
				if (!phoneRegex.test(value.trim())) {
					errors.phone = "Please enter a valid phone number";
				} else {
					delete errors.phone;
				}
			} else {
				delete errors.phone;
			}
			break;

		case "message":
			if (!value || value.trim().length === 0) {
				errors.message = "Message is required";
			} else if (value.trim().length < 10) {
				errors.message = "Message must be at least 10 characters";
			} else if (value.trim().length > 2000) {
				errors.message = "Message must be less than 2000 characters";
			} else {
				delete errors.message;
			}
			break;

		case "company":
			if (value && value.trim().length > 200) {
				errors.company = "Company name must be less than 200 characters";
			} else {
				delete errors.company;
			}
			break;

		case "productInterest":
			if (value && value.trim().length > 100) {
				errors.productInterest =
					"Product interest must be less than 100 characters";
			} else {
				delete errors.productInterest;
			}
			break;
	}

	return errors;
}

// Validates every field in one pass and returns the full error set. Unlike
// calling validateContactField() in a loop, this doesn't depend on stale
// closures over previous state, so it can't silently stop early on the
// first invalid field.
export function validateAllContactFields(formData) {
	let errors = {};
	for (const field of Object.keys(formData)) {
		errors = validateContactField(field, formData[field], errors);
	}
	return errors;
}
