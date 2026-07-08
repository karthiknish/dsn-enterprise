"use client";

import { m } from "framer-motion";
import { FaRuler, FaIndustry, FaTruck, FaShieldAlt } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const values = [
	{
		icon: FaRuler,
		title: "Guaranteed Precision",
		body: "Every gauge is made to agreed tolerances, inspected, and documented. What we ship matches what your line accepts, no variance.",
	},
	{
		icon: FaIndustry,
		title: "Technical Depth",
		body: "Continuous investment in tooling, process control, and application know-how for demanding thread forms and custom profiles.",
	},
	{
		icon: FaTruck,
		title: "Reliable Delivery",
		body: "Clear lead times from enquiry to dispatch. Gauges that fit your quality plan and delivery schedule, not generic catalogue lead times.",
	},
	{
		icon: FaShieldAlt,
		title: "Complete Transparency",
		body: "We stand behind every measurement and certificate. If a gauge isn't fit for use, we flag it before it reaches your floor.",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function AboutStorySection() {
	return (
		<PageSection variant="white">
			<SectionHeader
				eyebrow="About Us"
				title="Our Story"
				description="Precision gauge manufacturing built on engineering depth, integrated production, and traceable quality, from a single Coimbatore works."
				align="left"
			/>

			<div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-start">
				{/* Left, Narrative */}
				<m.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						DSN Enterprises manufactures precision plain, thread, and API gauges
						for Indian industry. Every gauge is built to customer drawing,
						calibrated to traceable standards, and shipped with complete
						certification, no shortcuts.
					</p>

					{/* Pull-quote */}
					<div className="border-l-4 border-accent pl-5 py-3 mb-6 bg-accent/[0.04] rounded-r-lg">
						<p className="text-base font-medium text-gray-900 leading-relaxed">
							Integrated manufacturing means fewer hand-offs between production,
							inspection, and documentation, resulting in tighter tolerances and
							shorter lead times.
						</p>
					</div>

					<p className="text-lg text-gray-700 mb-6 leading-relaxed">
						From our Coimbatore works, we combine CNC machining, precision
						grinding, and controlled heat treatment with a NABL-aligned
						calibration laboratory. One team responsible from raw material to
						final certificate.
					</p>

					<p className="text-lg text-gray-700 leading-relaxed">
						We supply plants across Tamil Nadu, national OEM and job-shop
						networks, and export customers who demand the same rigour on every
						shipment.
					</p>
				</m.div>

				{/* Right, Value cards */}
				<m.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid grid-cols-1 sm:grid-cols-2 gap-5"
				>
					{values.map((value) => (
						<m.div
							key={value.title}
							variants={cardVariants}
							className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
						>
							<div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
								<value.icon className="text-accent text-lg" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								{value.title}
							</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								{value.body}
							</p>
						</m.div>
					))}
				</m.div>
			</div>
		</PageSection>
	);
}
