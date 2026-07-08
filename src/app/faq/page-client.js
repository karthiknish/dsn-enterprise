"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaMinus, FaPhoneAlt } from "react-icons/fa";
import PageHero from "@/components/layout/PageHero";
import { faqCategories } from "@/content/faq";
import { pageHeroes } from "@/content/page-heroes";
import { LinkButton } from "@/components/ui/button";

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
		<div>
			<button
				id={btnId}
				type="button"
				aria-expanded={!!isOpen}
				aria-controls={panelId}
				className={`group w-full py-5 px-6 flex items-center justify-between text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
					isOpen
						? "bg-primary/[0.03]"
						: "hover:bg-gray-50/80"
				}`}
				onClick={onClick}
			>
				<span
					className={`font-medium pr-4 transition-colors duration-200 ${
						isOpen ? "text-primary" : "text-gray-900"
					}`}
				>
					{faq.question}
				</span>
				<span
					aria-hidden
					className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 bg-white group-hover:border-primary/30"
				>
					{isOpen ? (
						<FaMinus className="text-primary text-xs" />
					) : (
						<FaPlus className="text-gray-400 text-xs transition-colors duration-200 group-hover:text-primary" />
					)}
				</span>
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
						transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
						className="overflow-hidden"
					>
						<div className="px-6 pb-5 text-gray-600 leading-relaxed">
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
						{/* Section Header */}
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
								Everything You Need to Know
							</h2>
							<p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
								Find answers about our precision gauges, calibration services, API compliance, and ordering process. If you do not see your question here, our team is ready to help.
							</p>
						</div>

						{/* Category Tabs */}
						<div
							className="flex flex-wrap justify-center gap-2 mb-10"
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
									className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
										activeCategory === category.name
											? "bg-primary text-white shadow-md"
											: "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
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
							className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden divide-y divide-gray-100"
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
			<section className="py-16 md:py-20 bg-secondary border-y border-secondary-dark/25 relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-semibold mb-5 text-primary-dark text-balance">
						Still Have Questions?
					</h2>
					<p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary/90 leading-relaxed">
						Send your drawing, gauge list, or calibration requirement, we will connect you with the right engineer and respond within one business day.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<LinkButton
							href="/contact"
							variant="onDark"
							className="font-bold focus-visible:ring-offset-secondary"
						>
							<FaPhoneAlt className="mr-2" />
							Contact Our Team
						</LinkButton>
						<LinkButton
							href="tel:+919363122005"
							variant="outline"
							className="font-bold border-primary/30 hover:border-primary/50 bg-white/70 hover:bg-white focus-visible:ring-offset-secondary"
						>
							<FaPhoneAlt className="mr-2" />
							+91 93631 22005
						</LinkButton>
					</div>
				</div>
			</section>
		</div>
	);
}
