"use client";

import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";
import {
	homeContactReducer,
	initialHomeContactState,
} from "@/lib/home-contact-reducer";
import HomeContactForm from "./HomeContactForm";
import SectionHeader from "./SectionHeader";

const ContactSection = () => {
	const { push } = useRouter();
	const { trackContactSubmission } = useGoogleAdsTracking();
	const [state, dispatch] = useReducer(
		homeContactReducer,
		initialHomeContactState,
	);

	const updateHomeContactField = (e) => {
		const { id, name, value } = e.target;
		const fieldName = name || id;
		dispatch({ type: "UPDATE_FIELD", field: fieldName, value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "SUBMIT_START" });

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(state.formData),
			});

			const contentType = response.headers.get("content-type");
			const responseText = await response.text();

			if (!contentType?.includes("application/json")) {
				throw new Error("The server returned an invalid response format");
			}

			const result = JSON.parse(responseText);

			if (!response.ok) {
				if (response.status === 400) {
					throw new Error(
						result.error || "Please fill out all required fields",
					);
				}
				if (response.status === 403) {
					throw new Error(
						"Database permission error. Your form could not be submitted.",
					);
				}
				throw new Error(
					result.error || result.details || "Failed to submit form",
				);
			}

			trackContactSubmission(state.formData);
			dispatch({ type: "SUBMIT_SUCCESS" });
			push("/thank-you");
		} catch (error) {
			dispatch({
				type: "SUBMIT_ERROR",
				errorMessage:
					error.message ||
					"There was an error sending your message. Please try again later.",
			});

			setTimeout(() => {
				dispatch({ type: "CLEAR_SUBMIT_ERROR" });
			}, 5000);
		}
	};

	return (
		<section
			id="contact"
			className="scroll-mt-24 py-20 md:py-24 bg-secondary-light relative"
		>
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

				<m.div
					className="mx-auto w-full max-w-2xl"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200/80 shadow-sm">
						<HomeContactForm
							formData={state.formData}
							isSubmitting={state.isSubmitting}
							submitSuccess={state.submitSuccess}
							submitError={state.submitError}
							errorMessage={state.errorMessage}
							onFieldChange={updateHomeContactField}
							onSubmit={handleSubmit}
						/>
					</div>
				</m.div>
			</div>
		</section>
	);
};

export default ContactSection;
