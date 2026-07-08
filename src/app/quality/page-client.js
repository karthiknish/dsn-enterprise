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
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

const [certFeatured, ...certRest] = certifications;

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

const commitmentStats = [
	{
		value: "100",
		suffix: "%",
		label: "Inspection on Every Gauge",
		description: "Every dimension, every feature, 100% verified before shipment.",
	},
	{
		value: "0",
		suffix: null,
		label: "Defect Tolerance",
		description:
			"Not a target, a methodology embedded in every stage of production.",
	},
	{
		value: "∞",
		suffix: null,
		label: "End-to-End Traceability",
		description:
			"From material batch to final calibration certificate, every gauge has a complete, auditable history.",
	},
];

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

			{/* ====== Quality Process, Numbered Timeline ====== */}
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

					{/* Connected vertical timeline */}
					<div className="max-w-4xl mx-auto relative">
						{/* Connecting rail */}
						<div
							className="absolute left-[27px] md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent/40 to-primary/10"
							aria-hidden
						/>

						<div className="space-y-4">
							{qualitySteps.map((step, index) => {
								const isLast = index === qualitySteps.length - 1;
								const Icon = step.icon;

								return (
									<m.div
										key={step.step}
										className="group relative flex gap-5 md:gap-8"
										initial={{ opacity: 0, y: 24 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-30px" }}
										transition={{ duration: 0.45, delay: index * 0.06 }}
									>
										{/* Large step number, sits on the rail */}
										<div className="relative shrink-0 flex flex-col items-center">
											<div
												className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-semibold text-xl md:text-2xl tabular-nums transition-all duration-300 group-hover:-translate-y-0.5 ${
													isLast
														? "bg-primary text-white shadow-md shadow-primary/20"
														: "bg-white border border-gray-200/80 text-primary shadow-sm"
												}`}
											>
												{String(step.step).padStart(2, "0")}
											</div>
										</div>

										{/* Content card */}
										<div
											className={`flex-1 min-w-0 rounded-2xl border overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 ${
												isLast
													? "bg-primary border-primary/20"
													: "bg-white border-gray-200/80"
											}`}
										>
											<div className="p-6 md:p-7 flex items-start gap-4">
												<div
													className={`hidden sm:flex w-11 h-11 shrink-0 rounded-xl items-center justify-center ${
														isLast
															? "bg-white/15 text-white"
															: "bg-primary/10 text-primary"
													}`}
												>
													<Icon className="text-xl" aria-hidden />
												</div>
												<div className="min-w-0">
													<h3
														className={`text-xl font-semibold mb-2 ${
															isLast ? "text-white" : "text-gray-900"
														}`}
													>
														{step.title}
													</h3>
													<p
														className={`leading-relaxed ${
															isLast ? "text-white/90" : "text-gray-600"
														}`}
													>
														{step.description}
													</p>
												</div>
											</div>
										</div>
									</m.div>
								);
							})}
						</div>
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

					<div className="grid md:grid-cols-2 gap-6 md:gap-7">
						{/* Featured certificate, larger, spans both rows */}
						<m.article
							className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-accent/20 hover:shadow-lg transition-all duration-300 md:row-span-3"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45 }}
						>
							<div className="relative h-64 md:h-80 w-full bg-gray-100 overflow-hidden">
								<Image
									src={certFeatured.image}
									alt={certFeatured.name}
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								{/* Hover overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<span className="text-white text-sm font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
										View Certificate
									</span>
								</div>
							</div>
							<div className="p-6 md:p-8">
								<div className="flex items-start gap-3 mb-2">
									<FaCertificate className="text-accent mt-0.5 shrink-0" aria-hidden />
									<h3 className="text-xl font-semibold text-gray-900 leading-snug">
										{certFeatured.name}
									</h3>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed pl-7">
									{certFeatured.description}
								</p>
							</div>
						</m.article>

						{/* Remaining certificates, compact rows */}
						{certRest.map((cert, index) => (
							<m.article
								key={cert.name}
								className="group flex gap-5 items-start bg-white rounded-2xl border border-gray-200/80 hover:border-accent/20 hover:shadow-lg transition-all duration-300 p-6"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: (index + 1) * 0.08 }}
							>
								<div className="relative shrink-0 h-24 w-20 rounded-lg overflow-hidden bg-gray-100">
									<Image
										src={cert.image}
										alt={cert.name}
										fill
										className="object-cover"
										sizes="80px"
									/>
								</div>
								<div className="min-w-0">
									<div className="flex items-start gap-2 mb-1.5">
										<FaCertificate
											className="text-accent mt-0.5 shrink-0"
											aria-hidden
										/>
										<h3 className="text-base font-semibold text-gray-900 leading-snug">
											{cert.name}
										</h3>
									</div>
									<p className="text-sm text-gray-600 leading-relaxed">
										{cert.description}
									</p>
								</div>
							</m.article>
						))}
					</div>
				</div>
			</section>

			{/* ====== Standards ====== */}
			<section className="py-20 md:py-28 bg-white relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					<div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
						{/* Intro column */}
						<m.div
							className="lg:col-span-2 lg:sticky lg:top-28"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45 }}
						>
							<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-surface-subtle border border-gray-200/80 rounded-full px-3 py-1">
								Compliance
							</span>
							<h2 className="mt-5 text-3xl md:text-4xl font-semibold text-gray-900 text-balance leading-tight">
								Standards We Manufacture To
							</h2>
							<p className="mt-4 text-lg text-gray-600 leading-relaxed">
								Every gauge is produced in full compliance with the applicable
								national and international standards, ensuring
								interchangeability, traceability, and audit readiness for our
								customers.
							</p>
						</m.div>

						{/* Accordion list */}
						<div className="lg:col-span-3 rounded-2xl border border-gray-200/80 bg-white divide-y divide-gray-200/80 overflow-hidden">
							{standards.map((group, index) => (
								<m.div
									key={group.category}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-30px" }}
									transition={{ duration: 0.4, delay: index * 0.06 }}
								>
									<Collapsible defaultOpen={index === 0}>
										<CollapsibleTrigger className="group flex w-full items-center justify-between gap-4 p-6 md:p-7 text-left hover:bg-surface-subtle/60 transition-colors">
											<div className="flex items-center gap-4 min-w-0">
												<span className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold tabular-nums">
													{String(index + 1).padStart(2, "0")}
												</span>
												<h3 className="text-lg font-semibold text-gray-900">
													{group.category}
												</h3>
											</div>
											<svg
												className="w-4 h-4 shrink-0 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												aria-hidden
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</CollapsibleTrigger>
										<CollapsibleContent className="overflow-hidden">
											<ul className="px-6 md:px-7 pb-6 md:pb-7 pl-[4.75rem] space-y-2.5">
												{group.standards.map((standard) => (
													<li
														key={standard}
														className="flex items-start gap-2.5"
													>
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
										</CollapsibleContent>
									</Collapsible>
								</m.div>
							))}
						</div>
					</div>
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

						{/* Continuous stat panel */}
						<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
							<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/80">
								{commitmentStats.map((stat, index) => (
									<m.div
										key={stat.label}
										className="p-8 md:p-10 text-center transition-colors duration-300 hover:bg-surface-subtle/50"
										initial={{ opacity: 0, y: 24 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-30px" }}
										transition={{ duration: 0.45, delay: index * 0.06 }}
									>
										<div className="text-5xl md:text-6xl font-semibold tracking-tight text-primary mb-3 leading-none tabular-nums">
											{stat.value}
											{stat.suffix && (
												<span className="text-3xl md:text-4xl text-accent">
													{stat.suffix}
												</span>
											)}
										</div>
										<div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-4 rounded-full" />
										<p className="font-semibold text-gray-900 mb-1">
											{stat.label}
										</p>
										<p className="text-gray-500 text-sm leading-relaxed">
											{stat.description}
										</p>
									</m.div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<Cta10
				reference="Ref. DSN-QUA-01"
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
