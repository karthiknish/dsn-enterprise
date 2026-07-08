"use client";

import { m } from "framer-motion";
import ContactPageBenefits from "@/components/contact/ContactPageBenefits";
import ContactPageForm from "@/components/contact/ContactPageForm";
import ContactPageInfoCards from "@/components/contact/ContactPageInfoCards";
import { useContactPageForm } from "@/hooks/useContactPageForm";

// ─── Motion Variants ───────────────────────────────────────────

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

// ─── Gradient Divider ──────────────────────────────────────────

const GradientDivider = () => (
	<div
		className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
		aria-hidden
	/>
);

// ─── Page Component ────────────────────────────────────────────

export default function ContactPage({ prefillProduct = "" }) {
	const form = useContactPageForm({ prefillProduct });

	return (
		<div>
			{/* ── Contact Form Section ───────────────────────────── */}
			<section className="py-20 md:py-28 bg-surface-subtle relative">
				<GradientDivider />
				<div className="container mx-auto px-4">
					{/* Section Header */}
					<m.div
						variants={fadeUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
				className="text-center max-w-3xl mx-auto mb-14 md:mb-16"
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-dark tracking-tight mb-5">
							Let&rsquo;s Talk Precision
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed">
							Send us your gauge list, drawing, or calibration
							requirement. Our engineers review every enquiry and
							respond with scope, lead time, and pricing&mdash;usually
							within one business day.
						</p>
					</m.div>

					{/* Two-Column Layout */}
					<m.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
					>
						{/* Left Column, Info */}
						<m.div variants={itemVariants} className="space-y-8">
							{/* Benefits Card */}
							<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10">
								<ContactPageBenefits />
							</div>

							{/* Info Cards */}
							<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10">
								<ContactPageInfoCards />
							</div>
						</m.div>

						{/* Right Column, Form */}
						<m.div variants={itemVariants}>
							<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10 lg:p-12">
								<ContactPageForm {...form} />
							</div>
						</m.div>
					</m.div>
				</div>
			</section>
		</div>
	);
}
