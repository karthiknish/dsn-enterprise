"use client";

import { m } from "framer-motion";
import { FaAward, FaGlobe, FaIndustry, FaUsers } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
	{
		icon: FaIndustry,
		title: "State-of-the-Art Infrastructure",
		description:
			"CNC machining, grinding, and lapping under one roof,built for repeatable tolerances on plain and thread gauges.",
		delay: 0,
	},
	{
		icon: FaUsers,
		title: "Expert Team",
		description:
			"Gauge designers and metrologists who review drawings, thread data, and feasibility before production starts.",
		delay: 0.1,
	},
	{
		icon: FaGlobe,
		title: "Global Reach",
		description:
			"Strong Tamil Nadu coverage from Coimbatore, with pan-India supply and export programmes for OCTG, automotive, and engineering sectors.",
		delay: 0.2,
	},
	{
		icon: FaAward,
		title: "Quality Certifications",
		description:
			"ISO 9001:2015, NABL calibration, and API 5B / 7-2 licensing where your programme requires licensed OCTG gauging.",
		delay: 0.3,
	},
];

export default function AboutWhyChooseSection() {
	return (
		<PageSection variant="secondary" bordered>
			<SectionHeader
				title="Why Choose DSN Enterprises?"
				description="Manufacturing depth, accredited calibration, and engineers who speak your drawing language."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{reasons.map((reason) => (
					<m.div
						key={reason.title}
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: reason.delay }}
					>
						<reason.icon className="text-5xl text-primary mb-4 mx-auto" />
						<h3 className="text-xl font-semibold mb-3 text-gray-900">
							{reason.title}
						</h3>
						<p className="text-gray-600">{reason.description}</p>
					</m.div>
				))}
			</div>
		</PageSection>
	);
}
