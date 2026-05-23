"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";

export default function ThankYouPage() {
	const { trackThankYouPageView, trackPhoneClick, trackEmailClick } =
		useGoogleAdsTracking();

	// Track conversion on page load
	useEffect(() => {
		trackThankYouPageView();
	}, [trackThankYouPageView]);

	return (
		<div>
			<PageHero
				eyebrow="Contact"
				title="Thank You!"
				description={pageHeroes.thankYou}
			/>

			{/* Thank You Content */}
			<section className="py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center">
						<m.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="flex justify-center mb-6"
						>
							<FaCheckCircle className="text-6xl text-accent" />
						</m.div>

						<m.h2
							className="text-2xl font-semibold mb-4 text-gray-900"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Your Message Has Been Sent Successfully
						</m.h2>

						<m.p
							className="text-lg text-gray-600 mb-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							Thank you for contacting DSN Enterprises. One of our team members
							will review your message and get back to you as soon as possible.
							We appreciate your interest in our products and services.
						</m.p>

						<m.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Link
								href="/"
								className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
							>
								<FaArrowLeft className="mr-2" /> Back to Home
							</Link>
						</m.div>
					</div>
				</div>
			</section>

			{/* Additional Information */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<m.div
								className="border border-gray-200/80 rounded-2xl p-6 bg-gray-50/50"
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								<h3 className="text-xl font-semibold mb-4 text-gray-900">
									What Happens Next?
								</h3>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										<span>Our team will review your inquiry</span>
									</li>
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										<span>You will receive a confirmation email</span>
									</li>
									<li className="flex items-start">
										<span className="text-primary mr-2">•</span>
										<span>We will contact you within 24-48 business hours</span>
									</li>
								</ul>
							</m.div>

							<m.div
								className="border border-gray-200/80 rounded-2xl p-6 bg-gray-50/50"
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								<h3 className="text-xl font-semibold mb-4 text-gray-900">
									Need Immediate Assistance?
								</h3>
								<p className="text-gray-600 mb-4">
									If your matter is urgent, please do not hesitate to contact us
									directly:
								</p>
								<p className="text-gray-800 font-medium">
									Phone:{" "}
									<a
										href="tel:+919363122005"
										className="underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
										onClick={() => trackPhoneClick("+919363122005")}
									>
										+91 9363122005
									</a>
									<br />
									Email:{" "}
									<a
										href="mailto:info@dsnenterprises.com"
										className="underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
										onClick={() => trackEmailClick("info@dsnenterprises.com")}
									>
										info@dsnenterprises.com
									</a>
								</p>
							</m.div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
