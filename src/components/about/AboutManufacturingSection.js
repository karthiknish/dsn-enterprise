"use client";

import { m } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
	{
		title: "Material Selection",
		description:
			"OHNS (W) and carbide are selected against wear, size, and tolerance class,with mill certificates recorded for critical programmes.",
		bullets: [
			"Premium grade materials",
			"Rigorous material testing",
			"Quality-focused sourcing",
		],
		delay: 0,
	},
	{
		title: "Precision Manufacturing",
		description:
			"CNC turning, grinding, and lapping hold size and form before heat treat,critical for thread and plain gauge function.",
		bullets: [
			"Advanced CNC machines",
			"Skilled craftsmanship",
			"Precision grinding",
		],
		delay: 0.1,
	},
	{
		title: "Quality Control",
		description:
			"Final inspection, hardness check, and calibration against traceable masters,documented on the certificate you file with QA.",
		bullets: [
			"Comprehensive inspection",
			"SUB-ZERO treatment at -80°C",
			"Hardness testing (60 ± 2HRC)",
		],
		delay: 0.2,
	},
];

export default function AboutManufacturingSection() {
	return (
		<PageSection variant="muted" bordered>
			<SectionHeader
				title="Our Manufacturing Process"
				description="Controlled steps from material to certificate—so every gauge leaves our works ready for production use."
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{steps.map((step) => (
					<m.div
						key={step.title}
						className="bg-gray-50 rounded-2xl border border-gray-100 p-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: step.delay }}
					>
						<h3 className="text-xl font-semibold mb-4 text-gray-900">
							{step.title}
						</h3>
						<p className="text-gray-700 mb-4">{step.description}</p>
						<ul className="space-y-2">
							{step.bullets.map((bullet) => (
								<li key={bullet} className="flex items-start">
									<span className="text-primary mr-2">•</span>
									<span className="text-gray-700">{bullet}</span>
								</li>
							))}
						</ul>
					</m.div>
				))}
			</div>
		</PageSection>
	);
}
