"use client";

import { m } from "framer-motion";
import Link from "next/link";
import {
	FaArrowRight,
	FaCertificate,
	FaCheck,
	FaRuler,
	FaTools,
} from "react-icons/fa";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

// ─── Motion Variants ───────────────────────────────────────────

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.18, delayChildren: 0.1 },
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

const fadeUp = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
	},
};

// ─── Data ───────────────────────────────────────────────────────

const services = [
	{
		id: "calibration",
		name: "Calibration Services",
		description:
			"NABL-accredited calibration for plain, thread, API, and special gauges, delivered with traceable certificates and express turnaround when production cannot wait.",
		icon: <FaRuler className="text-5xl text-primary mb-4" />,
		eyebrow: "Accredited Laboratory",
		details: [
			"Comprehensive calibration for plain, thread, API, and special gauges",
			"NABL certificate with full measurement traceability",
			"Express turnaround, typically 3–5 working days",
			"On-site calibration available across Tamil Nadu",
			"Detailed reports with measurement uncertainty",
			"Gauge repair and re-calibration in a single workflow",
		],
	},
	{
		id: "custom-manufacturing",
		name: "Custom Gauge Manufacturing",
		description:
			"Gauges built exactly to your engineering drawing, custom thread forms, progressive members, and material grades selected for your specific wear profile and tolerance requirements.",
		icon: <FaTools className="text-5xl text-primary mb-4" />,
		eyebrow: "Built to Spec",
		details: [
			"Custom gauges manufactured per your engineering drawing",
			"Special thread forms: ACME, Stub ACME, Buttress, BPV, and more",
			"Precision grinding with tight tolerance control",
			"Material options: OHNS (W) tool steel & carbide",
			"SUB-ZERO treated at -80°C for metallurgical stability",
			"Through-hardened 60 ± 2 HRC for long service life",
		],
	},
	{
		id: "certification",
		name: "Certification & Testing",
		description:
			"Full dimensional inspection, material verification, and compliance documentation aligned to IS, ISO, and API standards, audit-ready every time.",
		icon: <FaCertificate className="text-5xl text-primary mb-4" />,
		eyebrow: "Audit Ready",
		details: [
			"Certification per IS, ISO, and API standards",
			"Compliance with IS 919, IS 3455, IS 6244, IS 6137, IS 3485, IS 8023",
			"Material testing with chemical composition reports",
			"Dimensional inspection using calibrated instruments",
			"Thread profile analysis and pitch measurement",
			"Hardness testing and surface finish evaluation",
		],
	},
];

const standards = [
	"IS 919 (Part 1, Part 2) 1993 ISO - System of Limits & fits",
	"IS 3455 Gauging Practice for Plain Work Pieces",
	"IS 6244-1980 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 40 to & Including 120mm)",
	"IS 6137-1983 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 1 to & Including 40mm)",
	"IS 3485 - Specification for Plain & Master Setting Ring Gauges (Size- Range From 1 to & Including 315mm)",
	"IS 8023 - Single Ended Progressive Type Plate Snap Gauges (Upto 160mm)",
];

// ─── Gradient Divider ──────────────────────────────────────────

const GradientDivider = () => (
	<div
		className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
		aria-hidden
	/>
);

// ─── Page Component ────────────────────────────────────────────

const ServicesPage = () => {
	return (
		<div>
			<PageHero
				title="Our Services"
				description={pageHeroes.services}
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/services", label: "Services" },
				]}
			/>

			{/* ── Service Cards Grid ────────────────────────────── */}
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
							Precision Services for Critical Measurement
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed">
							From NABL-accredited calibration to custom gauge
							manufacturing and full certification support, every
							service is built to keep your quality programme
							audit-ready and your production line moving.
						</p>
					</m.div>

					{/* Cards */}
					<m.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
					>
						{services.map((service) => (
							<m.div
								key={service.id}
								variants={itemVariants}
								className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
							>
								{/* Icon */}
								<div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
									<div className="[&_svg]:w-7 [&_svg]:h-7 [&_svg]:text-accent">
										{service.icon}
									</div>
								</div>

								{/* Content */}
								<h3 className="text-xl font-semibold text-primary-dark mb-3 text-center">
									{service.name}
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6 text-center flex-1">
									{service.description}
								</p>

								{/* Link */}
								<div className="text-center pt-2 border-t border-gray-100">
									<Link
										href={`#${service.id}`}
										className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-dark transition-colors duration-200 gap-2 group-hover:gap-3"
									>
										<span>Explore Service</span>
										<FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
									</Link>
								</div>
							</m.div>
						))}
					</m.div>
				</div>
			</section>

			{/* ── Detailed Service Sections ────────────────────── */}
			{services.map((service, index) => (
				<section
					key={service.id}
					id={service.id}
					className={`py-20 md:py-28 relative ${
						index % 2 === 0 ? "bg-white" : "bg-surface-subtle"
					}`}
				>
					{index > 0 && <GradientDivider />}
					<div className="container mx-auto px-4">
						<m.div
							variants={fadeUp}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-60px" }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
						>
							{/* Text Content */}
							<div
								className={`order-2 ${
									index % 2 === 0 ? "lg:order-1" : "lg:order-2"
								}`}
							>
								<h2 className="text-3xl md:text-4xl font-semibold text-primary-dark tracking-tight mb-6">
									{service.name}
								</h2>
								<p className="text-lg text-gray-600 leading-relaxed mb-8">
									{service.description}
								</p>
								<ul className="space-y-4 mb-10">
									{service.details.map((detail) => (
										<li
											key={`${service.id}-${detail}`}
											className="flex items-start gap-3"
										>
											<FaCheck className="text-accent mt-1 flex-shrink-0 text-sm" />
											<span className="text-gray-700 leading-relaxed">
												{detail}
											</span>
										</li>
									))}
								</ul>
								<Link
									href="/contact"
									className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3.5 px-7 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary shadow-sm hover:shadow-md"
								>
									Request Service
									<FaArrowRight className="ml-2.5 text-sm" />
								</Link>
							</div>

							{/* Visual, decorative placeholder */}
							<div
								className={`order-1 ${
									index % 2 === 0 ? "lg:order-2" : "lg:order-1"
								}`}
							>
								<div className="bg-surface-muted rounded-2xl border border-gray-200/80 h-80 md:h-96 flex items-center justify-center relative overflow-hidden">
									{/* Decorative orbs */}
									<div
										className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-accent/5"
										aria-hidden
									/>
									<div
										className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-primary/5"
										aria-hidden
									/>
									<div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center relative z-10">
										<div className="[&_svg]:w-12 [&_svg]:h-12 [&_svg]:text-accent">
											{service.icon}
										</div>
									</div>
								</div>
							</div>
						</m.div>
					</div>
				</section>
			))}

			{/* ── Standards Section ────────────────────────────── */}
			<section className="py-20 md:py-28 bg-secondary-light relative">
				<GradientDivider />
				<div className="container mx-auto px-4">
					<m.div
						variants={fadeUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="max-w-4xl mx-auto"
					>
						{/* Section Header */}
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-semibold text-primary-dark tracking-tight mb-4">
								Standards We Calibrate &amp; Manufacture To
							</h2>
							<p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
								Every gauge we calibrate, manufacture, or
								certify complies with these Indian and
								international standards, ensuring full
								traceability and audit readiness.
							</p>
						</div>

						{/* Standards Card */}
						<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10">
							{/* Card Header */}
							<div className="flex items-center gap-2.5 mb-6 pb-6 border-b border-gray-100">
								<FaCertificate className="text-accent text-lg" />
								<span className="text-sm font-semibold text-gray-500 uppercase tracking-[0.12em]">
									Reference Standards
								</span>
							</div>

							{/* Standards List */}
							<ul className="space-y-3">
								{standards.map((standard) => (
									<li
										key={standard}
										className="flex items-start gap-3"
									>
										<FaCheck className="text-accent mt-1 flex-shrink-0 text-sm" />
										<span className="text-gray-700 leading-relaxed">
											{standard}
										</span>
									</li>
								))}
							</ul>
						</div>
					</m.div>
				</div>
			</section>

			<Cta10
				heading="Ready to Work With Us?"
				description="Send us your calibration list, manufacturing drawing, or certification requirement. We'll respond with scope, timeline, and pricing from our Coimbatore facility."
				buttons={{
					primary: { text: "Contact Us", url: "/contact" },
					secondary: { text: "View Services", url: "/services" },
				}}
			/>
		</div>
	);
};

export default ServicesPage;
