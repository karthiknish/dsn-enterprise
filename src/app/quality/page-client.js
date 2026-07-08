"use client";

import { m } from "framer-motion";
import Image from "next/image";
import {
	FaAward,
	FaCertificate,
	FaCheck,
	FaClipboardCheck,
	FaCogs,
	FaFlask,
	FaMicroscope,
	FaThermometerHalf,
} from "react-icons/fa";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const qualitySteps = [
	{
		step: 1,
		title: "Material Selection",
		description:
			"Premium grade OHNS and Tungsten Carbide from certified suppliers, with complete material traceability documentation.",
		icon: FaFlask,
	},
	{
		step: 2,
		title: "Precision Manufacturing",
		description:
			"CNC machining centres operating at tight tolerances, executed by craftsmen with decades of gauge-making experience.",
		icon: FaCogs,
	},
	{
		step: 3,
		title: "Heat Treatment",
		description:
			"Controlled hardening process achieving 60±2 HRC with sub-zero treatment at -80°C for dimensional stability.",
		icon: FaThermometerHalf,
	},
	{
		step: 4,
		title: "Precision Grinding",
		description:
			"High-precision cylindrical and surface grinding to achieve specified dimensions and surface finish, verified on every gauge.",
		icon: FaCogs,
	},
	{
		step: 5,
		title: "Inspection & Calibration",
		description:
			"Comprehensive dimensional inspection on calibrated CMMs, optical comparators, and air-gauging equipment traceable to national standards.",
		icon: FaMicroscope,
	},
	{
		step: 6,
		title: "Final Verification",
		description:
			"100% final functional inspection with documented calibration certificates delivered with every order, nothing ships without a pass.",
		icon: FaClipboardCheck,
	},
];

const certifications = [
	{
		name: "ISO 9001:2015",
		description:
			"Quality Management System certification ensuring consistent quality processes from material receipt through final dispatch, audited annually.",
		image: "/images/certificates/isocert.jpg",
	},
	{
		name: "API 5B",
		description:
			"Licensed manufacturer for threading, gauging, and inspection of casing, tubing, and line pipe threads, verified through continuing API audits.",
		image: "/images/certificates/API-5B-0039-2023_page-0001.jpg",
	},
	{
		name: "API 7-2",
		description:
			"Licensed manufacturer for threading and gauging of rotary shouldered thread connections, critical for drill string integrity and safety.",
		image: "/images/certificates/api72.jpg",
	},
	{
		name: "NABL Accreditation",
		description:
			"National Accreditation Board for Testing and Calibration Laboratories certification, ensuring full traceability to national measurement standards.",
		image: "/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg",
	},
];

const standards = [
	{
		category: "Plain Gauges",
		standards: [
			"IS 919 (Part 1, Part 2) 1993 - ISO System of Limits & Fits",
			"IS 3455 - Gauging Practice for Plain Work Pieces",
			"IS 6244-1980 - Plain Plug Gauges (40mm to 120mm)",
			"IS 6137-1983 - Plain Plug Gauges (1mm to 40mm)",
			"IS 3485 - Plain & Master Setting Ring Gauges",
			"IS 8023 - Single Ended Progressive Type Plate Snap Gauges",
		],
	},
	{
		category: "Thread Gauges",
		standards: [
			"IS 6175 - ISO Metric Screw Threads",
			"IS 4218 - ISO Metric Thread Tolerances",
			"ANSI/ASME B1.2 - Unified Inch Screw Threads",
			"BS 84 - BSW/BSF Threads",
			"BS 21 / ISO 7-1 - Pipe Threads",
		],
	},
	{
		category: "API Gauges",
		standards: [
			"API Specification 5B - Threading, Gauging & Inspection",
			"API Specification 7-2 - Rotary Shouldered Connections",
			"API RP 7G - Drill Stem Design and Operating Limits",
		],
	},
];

const specifications = [
	{ spec: "Material", value: "OHNS (W) / Tungsten Carbide" },
	{ spec: "Hardness", value: "60 ± 2 HRC" },
	{ spec: "Sub-Zero Treatment", value: "-80°C for dimensional stability" },
	{ spec: "Surface Finish", value: "Mirror / Ground finish as specified" },
	{ spec: "Tolerance Class", value: "As per IS / ISO / API standards" },
	{
		spec: "Calibration",
		value: "Traceable to National/International Standards",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function QualityPage() {
	return (
		<div>
			<PageHero
				eyebrow="Quality"
				title="Quality Assurance"
				description={pageHeroes.quality}
			breadcrumbs={[
				{ href: "/", label: "Home" },
				{ href: "/quality", label: "Quality" },
			]}
			>
				<FaAward className="text-5xl opacity-90" aria-hidden />
			</PageHero>

			{/* ====== Quality Process, Bento Grid ====== */}
			<section className="py-20 md:py-28 bg-surface-subtle relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					{/* Section header */}
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
							Six-Step Quality Assurance
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
							Every gauge moves through a systematic, documented process, from material
							certification through to final functional acceptance.
						</p>
					</div>

					{/* Bento grid: varied column spans for visual rhythm */}
					<div className="max-w-6xl mx-auto">
						<m.div
							className="grid grid-cols-1 lg:grid-cols-3 gap-6"
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							{qualitySteps.map((step, index) => {
							const isFeatured = index === 0 || index === 3;
							const isGreen = index === 5;
								const Icon = step.icon;

								return (
									<m.div
										key={step.step}
										variants={itemVariants}
										className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
											isGreen
												? "lg:col-span-2 bg-primary border-primary/20 shadow-sm"
												: isFeatured
												? "lg:col-span-2 bg-white border-gray-200/80 shadow-sm"
												: "bg-white border-gray-200/80 shadow-sm"
										}`}
									>
										{/* Accent gradient bar, top edge */}
										{!isGreen && (
											<div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />
										)}

										<div className="p-6 md:p-8">
											{/* Step number badge */}
											<div
												className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
													isGreen
														? "bg-white/15 text-white"
														: isFeatured
														? "bg-primary text-white"
														: "bg-primary/10 text-primary"
												}`}
											>
												<span className="text-lg font-bold">
													{String(step.step).padStart(2, "0")}
												</span>
											</div>

											<Icon
												className={`text-3xl mb-4 ${
													isGreen ? "text-white" : "text-primary"
												}`}
												aria-hidden
											/>

											<h3
												className={`text-xl font-semibold mb-2 ${
													isGreen ? "text-white" : "text-gray-900"
												}`}
											>
												{step.title}
											</h3>

											<p
												className={`leading-relaxed ${
													isGreen ? "text-white" : "text-gray-600"
												}`}
											>
												{step.description}
											</p>
										</div>
									</m.div>
								);
							})}
						</m.div>
					</div>
				</div>
			</section>

			{/* ====== Certifications ====== */}
			<section className="py-20 md:py-28 bg-secondary-light relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					{/* Section header */}
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
							Industry-Recognized Credentials
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
							Our quality systems are certified, licensed, and accredited by the bodies that
							define the standards we manufacture to, verified through regular independent
							audits.
						</p>
					</div>

					<m.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{certifications.map((cert) => (
							<m.div
								key={cert.name}
								className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
								variants={itemVariants}
							>
								{/* Image with gradient overlay on hover */}
								<div className="relative h-52 bg-gray-100 overflow-hidden">
									<Image
										src={cert.image}
										alt={cert.name}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									{/* Hover overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
										<span className="text-white text-sm font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
											View Certificate
										</span>
									</div>
								</div>
								{/* Content */}
								<div className="p-5">
									<div className="flex items-center gap-2 mb-2">
										<FaCertificate className="text-primary flex-shrink-0" aria-hidden />
										<h3 className="font-semibold text-gray-900">{cert.name}</h3>
									</div>
									<p className="text-gray-600 text-sm leading-relaxed">
										{cert.description}
									</p>
								</div>
							</m.div>
						))}
					</m.div>
				</div>
			</section>

			{/* ====== Standards ====== */}
			<section className="py-20 md:py-28 bg-white relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					{/* Section header */}
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
							Standards We Manufacture To
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
							Every gauge is produced in full compliance with the applicable national and
							international standards, ensuring interchangeability, traceability, and audit
							readiness for our customers.
						</p>
					</div>

					<m.div
						className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{standards.map((group) => (
							<m.div
								key={group.category}
								className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
								variants={itemVariants}
							>
								{/* Colored accent bar */}
								<div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />
								<div className="p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										{group.category}
									</h3>
									<ul className="space-y-2.5">
										{group.standards.map((standard) => (
											<li key={standard} className="flex items-start gap-2.5">
												<FaCheck
													className="text-accent mt-0.5 flex-shrink-0 text-xs"
													aria-hidden
												/>
												<span className="text-sm text-gray-700 leading-relaxed">
													{standard}
												</span>
											</li>
										))}
									</ul>
								</div>
							</m.div>
						))}
					</m.div>
				</div>
			</section>

			{/* ====== Technical Specifications ====== */}
			<section className="py-20 md:py-28 bg-white relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						{/* Section header */}
						<div className="text-center mb-14">
							<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
								Technical Specifications
							</h2>
							<p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
								Our standard manufacturing parameters, contact our engineering team for
								custom requirements beyond these ranges.
							</p>
						</div>

						{/* Premium spec card with row layout */}
						<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm divide-y divide-gray-100 overflow-hidden">
							{specifications.map((item, index) => (
								<m.div
									key={item.spec}
									className="flex items-center justify-between gap-4 px-6 py-4 md:px-8 transition-colors hover:bg-accent/5"
									initial={{ opacity: 0, x: -12 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
								>
									<span className="font-semibold text-gray-900 text-sm md:text-base">
										{item.spec}
									</span>
									<span className="text-gray-600 text-sm md:text-base text-right max-w-[60%]">
										{item.value}
									</span>
								</m.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ====== Quality Commitment ====== */}
			<section className="py-20 md:py-28 bg-surface-subtle relative overflow-hidden">
				{/* Decorative background blur */}

				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] blur-3xl pointer-events-none"
					aria-hidden
				/>
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4 relative">
					<div className="max-w-5xl mx-auto text-center">
						{/* Section header */}
						<div className="mb-16">
							<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
								The Quality Commitment
							</h2>
							<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
								Three principles that define how we manufacture, inspect, and deliver every
								gauge that leaves our facility.
							</p>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
							{/* 100% */}
							<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
								<div className="text-6xl md:text-7xl font-bold text-primary mb-3 leading-none">
									100
									<span className="text-3xl md:text-4xl text-accent">%</span>
								</div>
								<div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-4 rounded-full" />
								<p className="font-semibold text-gray-900 mb-1">
									Inspection on Every Gauge
								</p>
								<p className="text-gray-500 text-sm leading-relaxed">
									Every dimension, every feature, 100% verified before shipment.
								</p>
							</div>

							{/* Zero */}
							<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative">

								<div
									className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 pointer-events-none"
									aria-hidden
								/>
								<div className="text-6xl md:text-7xl font-bold text-primary mb-3 leading-none">
									0
								</div>
								<div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-4 rounded-full" />
								<p className="font-semibold text-gray-900 mb-1">Defect Tolerance</p>
								<p className="text-gray-500 text-sm leading-relaxed">
									Not a target, a methodology embedded in every stage of production.
								</p>
							</div>

							{/* Infinity */}
							<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 md:p-10 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
								<div className="text-6xl md:text-7xl font-bold text-primary mb-3 leading-none">
									∞
								</div>
								<div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-4 rounded-full" />
								<p className="font-semibold text-gray-900 mb-1">
									End-to-End Traceability
								</p>
								<p className="text-gray-500 text-sm leading-relaxed">
									From material batch to final calibration certificate, every gauge has
									a complete, auditable history.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Cta10
				heading="Need Quality Gauges?"
				description="Experience the DSN Enterprises quality difference. Contact us for precision gauges backed by our rigorous quality assurance."
				buttons={{
					primary: { text: "Request Quote", url: "/contact" },
					secondary: { text: "View Products", url: "/products" },
				}}
			/>
		</div>
	);
}
