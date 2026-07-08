"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import PageHero from "@/components/layout/PageHero";
import { faqCategories } from "@/content/faq";
import { pageHeroes } from "@/content/page-heroes";

function faqTabSlug(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function FAQItem({ faq, isOpen, onClick, itemId }) {
	const panelId = `${itemId}-panel`;
	const btnId = `${itemId}-button`;
	return (
		<div className="border-b border-gray-200 last:border-b-0">
			<button
				id={btnId}
				type="button"
				aria-expanded={!!isOpen}
				aria-controls={panelId}
				className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
				onClick={onClick}
			>
				<span className="font-medium text-gray-900 pr-4">{faq.question}</span>
				<FaChevronDown
					aria-hidden
					className={`text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>
			<AnimatePresence>
				{isOpen && (
					<m.div
						id={panelId}
						role="region"
						aria-labelledby={btnId}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden"
					>
						<div className="px-6 pb-4 text-gray-600 leading-relaxed">
							{faq.answer}
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default function FAQPage() {
	const [openItems, setOpenItems] = useState({});
	const [activeCategory, setActiveCategory] = useState("General");

	const toggleItem = (categoryIndex, faqIndex) => {
		const key = `${categoryIndex}-${faqIndex}`;
		setOpenItems((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const currentCategory = faqCategories.find(
		(cat) => cat.name === activeCategory,
	);

	return (
		<div>
			<PageHero
				eyebrow="Support"
				title="Frequently Asked Questions"
				description={pageHeroes.faq}
			breadcrumbs={[
				{ href: "/", label: "Home" },
				{ href: "/faq", label: "FAQ" },
			]}
			/>

			<section className="py-16 md:py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* Category Tabs */}
						<div
							className="flex flex-wrap justify-center gap-2 mb-12"
							role="tablist"
							aria-label="FAQ categories"
						>
							{faqCategories.map((category) => (
								<button
									key={category.name}
									type="button"
									role="tab"
									id={`faq-tab-${faqTabSlug(category.name)}`}
									aria-selected={activeCategory === category.name}
									aria-controls={`faq-panel-${faqTabSlug(category.name)}`}
									onClick={() => setActiveCategory(category.name)}
									className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
										activeCategory === category.name
											? "bg-primary text-white shadow-sm"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
									}`}
								>
									{category.name}
								</button>
							))}
						</div>

						{/* FAQ List */}
						<m.div
							key={activeCategory}
							id={`faq-panel-${faqTabSlug(activeCategory)}`}
							role="tabpanel"
							aria-labelledby={`faq-tab-${faqTabSlug(activeCategory)}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
						>
							{currentCategory?.faqs.map((faq, faqIndex) => {
								const categoryIndex = faqCategories.findIndex(
									(c) => c.name === activeCategory,
								);
								const key = `${categoryIndex}-${faqIndex}`;
								return (
									<FAQItem
										key={key}
										itemId={`faq-${categoryIndex}-${faqIndex}`}
										faq={faq}
										isOpen={openItems[key]}
										onClick={() => toggleItem(categoryIndex, faqIndex)}
									/>
								);
							})}
						</m.div>
					</div>
				</div>
			</section>

			{/* All FAQs Structured Data */}
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: faqCategories.flatMap((category) =>
						category.faqs.map((faq) => ({
							"@type": "Question",
							name: faq.question,
							acceptedAnswer: {
								"@type": "Answer",
								text: faq.answer,
							},
						})),
					),
				})}
			</script>

			{/* Still Have Questions */}
			<section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-semibold mb-6 text-gray-900">
						Still Have Questions?
					</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
						Send your drawing, gauge list, or calibration question,we will
						connect you with the right engineer and respond as quickly as we
						can.
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center bg-primary text-white hover:bg-primary-dark font-bold py-3 px-8 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						<FaPhoneAlt className="mr-2" />
						Contact Us
					</Link>
				</div>
			</section>
		</div>
	);
}
