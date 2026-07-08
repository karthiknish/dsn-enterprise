"use client";

import { UilMinus, UilPlus } from "@iconscout/react-unicons";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { Cta10 } from "@/components/cta10";
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
						<UilMinus className="text-primary w-3.5 h-3.5" />
					) : (
						<UilPlus className="text-gray-400 w-3.5 h-3.5 transition-colors duration-200 group-hover:text-primary" />
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

			<Cta10
				reference="Ref. DSN-FAQ-01"
				heading="Still Have Questions?"
				description="Send your drawing, gauge list, or calibration requirement, we will connect you with the right engineer and respond within one business day."
				buttons={{
					primary: { text: "Contact Our Team", url: "/contact" },
					secondary: { text: "+91 93631 22005", url: "tel:+919363122005" },
				}}
			/>
		</div>
	);
}
