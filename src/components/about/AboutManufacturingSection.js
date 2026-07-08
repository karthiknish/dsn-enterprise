"use client";

import { m } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
	{
		number: "01",
		title: "Material Selection",
		description:
			"OHNS (W) and carbide are selected against wear, size, and tolerance class, mill certificates recorded for critical programmes.",
		bullets: [
			"Premium grade tool steels & carbide",
			"Rigorous incoming material testing",
			"Batch traceability from mill to gauge",
		],
		delay: 0,
	},
	{
		number: "02",
		title: "Precision Manufacturing",
		description:
			"CNC turning, grinding, and lapping hold size and form through every pass, critical for thread and plain gauge function.",
		bullets: [
			"Advanced CNC turning & milling",
			"Precision cylindrical grinding",
			"Lapping for surface finish & geometry",
		],
		delay: 0.1,
	},
	{
		number: "03",
		title: "Quality Control",
		description:
			"Final inspection, hardness check, and calibration against traceable masters, documented on the certificate you file with QA.",
		bullets: [
			"Sub-zero treatment at -80°C for stability",
			"Hardness testing to 60 ± 2 HRC",
			"NABL-aligned calibration with full traceability",
		],
		delay: 0.2,
	},
];

export default function AboutManufacturingSection() {
	return (
		<PageSection variant="muted" bordered>
			<SectionHeader
				eyebrow="Process"
				title="Our Manufacturing Process"
				description="Controlled steps from material to certificate, every gauge leaves our works ready for production use."
			/>

			<div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Dashed connector line (desktop) */}
				<div
					className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0 border-t-2 border-dashed border-accent/20 -z-0"
					aria-hidden
				/>

				{steps.map((step) => (
					<m.div
						key={step.title}
						className="relative z-10 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: step.delay }}
					>
						{/* Step number badge */}
						<div className="w-14 h-14 rounded-full bg-accent/[0.1] border border-accent/20 flex items-center justify-center mb-5">
							<span className="text-sm font-bold text-accent tracking-wider">
								{step.number}
							</span>
						</div>

						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							{step.title}
						</h3>
						<p className="text-sm text-gray-600 leading-relaxed mb-5">
							{step.description}
						</p>

						<ul className="space-y-2.5">
							{step.bullets.map((bullet) => (
								<li key={bullet} className="flex items-start gap-3">
									<span
										className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0"
										aria-hidden
									/>
									<span className="text-sm text-gray-700">{bullet}</span>
								</li>
							))}
						</ul>
					</m.div>
				))}
			</div>
		</PageSection>
	);
}
