"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
	EMPTY_CONTACT_FORM,
	loadContactDraft,
	validateContactField,
} from "@/lib/contact-form-state";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";
import { useMetaTracking } from "@/hooks/useMetaTracking";

export function useContactPageForm() {
	const { push } = useRouter();
	const {
		trackContactSubmission,
		trackPageView,
		trackFieldInteraction,
		trackValidationErrors,
		trackFormAbandonment,
	} = useMetaTracking();

	const {
		trackContactSubmission: trackGoogleAdsSubmission,
		trackFormFieldFocus,
		trackScrollDepth,
		trackTimeOnPage,
	} = useGoogleAdsTracking();

	const [formData, setFormData] = useState(
		() => loadContactDraft().formData,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [submitError, setSubmitError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});
	const isFormDirtyRef = useRef(false);
	const draftSaveTimeoutRef = useRef(null);
	const [lastSaved, setLastSaved] = useState(
		() => loadContactDraft().lastSaved,
	);

	const scheduleDraftSave = (data) => {
		if (draftSaveTimeoutRef.current) {
			clearTimeout(draftSaveTimeoutRef.current);
		}
		draftSaveTimeoutRef.current = setTimeout(() => {
			localStorage.setItem(
				"contactFormDraft:v1",
				JSON.stringify({ data, timestamp: Date.now() }),
			);
			setLastSaved(new Date());
		}, 1000);
	};

	useEffect(() => {
		trackPageView({
			page_title: "Contact Us",
			page_location: window.location.href,
			page_category: "Lead Generation",
		});

		const cleanup = trackScrollDepth("Contact Page");

		return () => {
			if (cleanup) cleanup();
			trackTimeOnPage("Contact Page");
		};
	}, [trackPageView, trackScrollDepth, trackTimeOnPage]);

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (
				isFormDirtyRef.current &&
				Object.values(formData).some((value) => value && value.trim() !== "")
			) {
				trackFormAbandonment(formData);
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [formData, trackFormAbandonment]);

	const clearSavedForm = () => {
		localStorage.removeItem("contactFormDraft:v1");
		setLastSaved(null);
	};

	const validateField = (name, value) => {
		const errors = validateContactField(name, value, fieldErrors);
		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const updateContactFormField = (e) => {
		const { name, id, value } = e.target;
		const fieldName = name || id;

		isFormDirtyRef.current = true;

		setFormData((prev) => {
			const next = { ...prev, [fieldName]: value };
			scheduleDraftSave(next);
			return next;
		});

		trackFieldInteraction(fieldName, "change");

		if (fieldErrors[fieldName]) {
			validateField(fieldName, value);
		}
	};

	const trackContactFieldFocus = (e) => {
		const { name, id } = e.target;
		const fieldName = name || id;
		trackFieldInteraction(fieldName, "focus");
		trackFormFieldFocus(fieldName);
	};

	const validateContactFieldOnBlur = (e) => {
		const { name, id, value } = e.target;
		const fieldName = name || id;
		validateField(fieldName, value);
		trackFieldInteraction(fieldName, "blur");
	};

	const clearForm = () => {
		if (Object.values(formData).some((value) => value && value.trim() !== "")) {
			trackFormAbandonment(formData);
		}

		setFormData({ ...EMPTY_CONTACT_FORM });
		setFieldErrors({});
		isFormDirtyRef.current = false;
		clearSavedForm();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValid = Object.keys(formData).every((field) =>
			validateField(field, formData[field]),
		);

		if (!isValid) {
			trackValidationErrors(fieldErrors);
			setSubmitError(true);
			setErrorMessage("Please fix the errors in the form before submitting.");
			const firstErrorField = document.querySelector(".field-error");
			if (firstErrorField) {
				firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
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
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				if (response.status === 400 && result.validationErrors) {
					setFieldErrors(result.validationErrors);
					throw new Error("Please correct the errors in the form.");
				}
				if (response.status === 429) {
					throw new Error(
						"Too many requests. Please wait a moment and try again.",
					);
				}
				throw new Error(
					result.error || "Failed to submit form. Please try again.",
				);
			}

			setIsSubmitting(false);
			setSubmitSuccess(true);
			trackContactSubmission(formData);
			trackGoogleAdsSubmission(formData);
			clearForm();
			push("/thank-you");
		} catch (error) {
			setIsSubmitting(false);
			setSubmitError(true);
			setErrorMessage(
				error.message ||
					"There was an error sending your message. Please try again later.",
			);
		}
	};

	return {
		formData,
		fieldErrors,
		isSubmitting,
		submitSuccess,
		submitError,
		errorMessage,
		lastSaved,
		handleSubmit,
		updateContactFormField,
		trackContactFieldFocus,
		validateContactFieldOnBlur,
		clearForm,
	};
}
