"use client";

import { m } from "framer-motion";
import { FaIndustry, FaUsers, FaGlobeAsia, FaAward } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
	{
		icon: FaIndustry,
		title: "Integrated Infrastructure",
		description:
			"CNC machining, grinding, and lapping under one roof, built for repeatable tolerances on plain and thread gauges, with NABL-aligned calibration in-house.",
		delay: 0,
	},
	{
		icon: FaUsers,
		title: "Metrology & Design Team",
		description:
			"Gauge designers and metrologists who review drawings, thread data, and feasibility before production starts. Your print is understood before steel is cut.",
		delay: 0.1,
	},
	{
		icon: FaGlobeAsia,
		title: "Pan-India & Export Coverage",
		description:
			"Strong Tamil Nadu coverage from Coimbatore, with pan-India supply and export programmes for OCTG, automotive, and precision engineering sectors.",
		delay: 0.2,
	},
	{
		icon: FaAward,
		title: "ISO, NABL & API Licensed",
		description:
			"ISO 9001:2015 quality management, NABL-accredited calibration, and API 5B / 7-2 licensing for licensed OCTG gauging where your programme requires it.",
		delay: 0.3,
	},
];

export default function AboutWhyChooseSection() {
	return (
		<PageSection variant="secondary" bordered>
			<SectionHeader
				eyebrow="Why DSN"
				title="Why Choose DSN Enterprises?"
				description="Manufacturing depth, accredited calibration, and engineers who speak your drawing language."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
				{reasons.map((reason) => (
					<m.div
						key={reason.title}
						className="group relative bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: reason.delay }}
					>
						{/* Gradient accent top border */}
						<div
							className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60 rounded-full"
							aria-hidden
						/>

						{/* Icon circle */}
						<div className="w-14 h-14 rounded-full bg-primary/[0.08] flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/[0.14] transition-colors duration-300">
							<reason.icon className="text-2xl text-primary" />
						</div>

						<h3 className="text-lg font-semibold text-gray-900 mb-3">
							{reason.title}
						</h3>
						<p className="text-sm text-gray-600 leading-relaxed">
							{reason.description}
						</p>
					</m.div>
				))}
			</div>
		</PageSection>
	);
}
