"use client";

import { m } from "framer-motion";
import { FaIndustry } from "react-icons/fa";
import { UilUsersAlt, UilGlobe, UilAward } from "@iconscout/react-unicons";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const featured = {
	icon: FaIndustry,
	title: "Integrated Infrastructure",
	description:
		"CNC machining, grinding, and lapping under one roof, built for repeatable tolerances on plain and thread gauges, with NABL-aligned calibration in-house.",
};

const reasons = [
	{
		icon: UilUsersAlt,
		title: "Metrology & Design Team",
		description:
			"Gauge designers and metrologists who review drawings, thread data, and feasibility before production starts. Your print is understood before steel is cut.",
	},
	{
		icon: UilGlobe,
		title: "Pan-India & Export Coverage",
		description:
			"Strong Tamil Nadu coverage from Coimbatore, with pan-India supply and export programmes for OCTG, automotive, and precision engineering sectors.",
	},
	{
		icon: UilAward,
		title: "ISO, NABL & API Licensed",
		description:
			"ISO 9001:2015 quality management, NABL-accredited calibration, and API 5B / 7-2 licensing for licensed OCTG gauging where your programme requires it.",
	},
];

export default function AboutWhyChooseSection() {
	return (
		<PageSection variant="secondary" bordered>
			<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-white border border-gray-200/80 rounded-full px-3 py-1">
				Why DSN
			</span>

			<SectionHeader
				title="Why Choose DSN Enterprises?"
				description="Manufacturing depth, accredited calibration, and engineers who speak your drawing language."
				align="left"
			/>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
				{/* Featured block */}
				<m.div
					className="relative lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-8 md:p-10 lg:p-12 flex flex-col justify-between overflow-hidden"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-30px" }}
					transition={{ duration: 0.45 }}
				>
					{/* Background icon art */}
					<featured.icon
						className="absolute -right-6 -bottom-8 text-[11rem] text-primary/[0.06] pointer-events-none"
						aria-hidden
					/>

					<div className="relative">
						<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
							<featured.icon className="w-6 h-6" />
						</div>
						<h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
							{featured.title}
						</h3>
						<p className="text-base text-gray-600 leading-relaxed max-w-lg">
							{featured.description}
						</p>
					</div>
				</m.div>

				{/* Tighter stacked list */}
				<div className="lg:col-span-2 flex flex-col gap-4">
					{reasons.map((reason, index) => (
						<m.div
							key={reason.title}
							className="group bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-6 flex items-start gap-4"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45, delay: (index + 1) * 0.06 }}
						>
							<div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
								<reason.icon className="w-5 h-5" />
							</div>
							<div>
								<h3 className="text-base font-semibold text-gray-900 mb-1.5">
									{reason.title}
								</h3>
								<p className="text-sm text-gray-600 leading-relaxed">
									{reason.description}
								</p>
							</div>
						</m.div>
					))}
				</div>
			</div>
		</PageSection>
	);
}
