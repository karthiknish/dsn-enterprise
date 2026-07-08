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

					{/* Bento Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
						{/* Featured tile: Calibration Services, spans full height of the two stacked tiles */}
						<m.div
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45, delay: 0 }}
							className="group relative bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-8 md:p-12 flex flex-col md:row-span-2 overflow-hidden"
						>
							{/* Decorative accent orb */}
							<div
								className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/5"
								aria-hidden
							/>

							<span className="relative inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10 rounded-full px-3 py-1 mb-6">
								{services[0].eyebrow}
							</span>

							<div className="relative w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
								<div className="[&_svg]:w-8 [&_svg]:h-8 [&_svg]:mb-0 [&_svg]:text-primary">
									{services[0].icon}
								</div>
							</div>

							<h3 className="relative text-2xl md:text-3xl font-semibold text-primary-dark mb-4">
								{services[0].name}
							</h3>
							<p className="relative text-gray-600 leading-relaxed mb-8 flex-1">
								{services[0].description}
							</p>

							<div className="relative pt-6 border-t border-gray-100">
								<Link
									href={`#${services[0].id}`}
									className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-dark transition-colors duration-200 gap-2 group-hover:gap-3"
								>
									<span>Explore Service</span>
									<FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5" />
								</Link>
							</div>
						</m.div>

						{/* Two smaller stacked tiles */}
						{services.slice(1).map((service, index) => (
							<m.div
								key={service.id}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: (index + 1) * 0.06 }}
								className="group bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-8 flex flex-col md:flex-row md:items-start gap-6"
							>
								<div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
									<div className="[&_svg]:w-5 [&_svg]:h-5 [&_svg]:mb-0 [&_svg]:text-primary">
										{service.icon}
									</div>
								</div>

								<div className="min-w-0 flex-1">
									<span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
										{service.eyebrow}
									</span>
									<h3 className="text-xl font-semibold text-primary-dark mb-2">
										{service.name}
									</h3>
									<p className="text-gray-600 leading-relaxed mb-4">
										{service.description}
									</p>
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
					</div>
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
