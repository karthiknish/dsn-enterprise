"use client";

import { m } from "framer-motion";
import Link from "next/link";
import {
	FaBook,
	FaCertificate,
	FaClipboardList,
	FaDownload,
	FaFileExcel,
	FaFilePdf,
	FaIndustry,
	FaRuler,
	FaArrowRight,
} from "react-icons/fa";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const downloadCategories = [
	{
		title: "Product Catalogs",
		icon: FaBook,
		items: [
			{
				name: "Complete Product Catalog 2024",
				description: "Comprehensive catalog of all our gauge products",
				size: "8.5 MB",
				type: "PDF",
			},
			{
				name: "Plain Gauges Catalog",
				description: "Plug gauges, ring gauges, and setting masters",
				size: "3.2 MB",
				type: "PDF",
			},
			{
				name: "Thread Gauges Catalog",
				description: "All thread forms and specifications",
				size: "4.1 MB",
				type: "PDF",
			},
			{
				name: "API Gauges Catalog",
				description: "Oil & gas industry gauges and specifications",
				size: "2.8 MB",
				type: "PDF",
			},
		],
	},
	{
		title: "Technical Resources",
		icon: FaRuler,
		items: [
			{
				name: "Gauge Tolerance Charts",
				description: "Standard tolerance charts for all gauge types",
				size: "1.2 MB",
				type: "PDF",
			},
			{
				name: "Thread Data Tables",
				description: "Comprehensive thread dimensions and tolerances",
				size: "2.5 MB",
				type: "Excel",
			},
			{
				name: "API Thread Specifications",
				description: "API 5B and API 7-2 thread data",
				size: "1.8 MB",
				type: "PDF",
			},
			{
				name: "Material Specifications",
				description: "Gauge materials and hardness requirements",
				size: "0.8 MB",
				type: "PDF",
			},
		],
	},
	{
		title: "Quality & Compliance",
		icon: FaCertificate,
		items: [
			{
				name: "ISO 9001:2015 Certificate",
				description: "Quality Management System certification",
				size: "0.5 MB",
				type: "PDF",
			},
			{
				name: "NABL Accreditation Certificate",
				description: "Calibration laboratory accreditation",
				size: "0.4 MB",
				type: "PDF",
			},
			{
				name: "Quality Policy",
				description: "Our commitment to quality excellence",
				size: "0.2 MB",
				type: "PDF",
			},
			{
				name: "Calibration Procedure",
				description: "Standard calibration procedures overview",
				size: "0.6 MB",
				type: "PDF",
			},
		],
	},
	{
		title: "Forms & Templates",
		icon: FaClipboardList,
		items: [
			{
				name: "Quotation Request Form",
				description: "Standard form for gauge quotation requests",
				size: "0.3 MB",
				type: "PDF",
			},
			{
				name: "Calibration Request Form",
				description: "Form for submitting calibration requests",
				size: "0.2 MB",
				type: "PDF",
			},
			{
				name: "Custom Gauge Specification Sheet",
				description: "Template for specifying custom gauge requirements",
				size: "0.4 MB",
				type: "Excel",
			},
			{
				name: "Gauge Inspection Checklist",
				description: "Checklist for incoming gauge inspection",
				size: "0.3 MB",
				type: "PDF",
			},
		],
	},
];

const standardsInfo = [
	{
		standard: "IS Standards",
		items: [
			"IS 3455 - Plain Limit Gauges",
			"IS 6175 - Thread Gauges",
			"IS 4218 - ISO Metric Threads",
			"IS 3485 - Setting Masters",
			"IS 8023 - Snap Gauges",
		],
	},
	{
		standard: "API Standards",
		items: [
			"API 5B - Threading, Gauging and Inspection",
			"API 7-2 - Rotary Shouldered Thread Connections",
			"API 11B - Sucker Rods and Accessories",
			"API RP 7G - Drill Stem Design",
		],
	},
	{
		standard: "International Standards",
		items: [
			"ISO 1502 - Thread Gauges",
			"ISO 3161 - Series of Conical Tolerance Zones",
			"ASME B1 - Unified Inch Screw Threads",
			"DIN Standards for Thread Gauges",
		],
	},
];

function FileIcon({ type }) {
	if (type === "Excel") {
		return (
			<div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
				<FaFileExcel className="text-green-600 text-lg" />
			</div>
		);
	}
	return (
		<div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
			<FaFilePdf className="text-red-600 text-lg" />
		</div>
	);
}

const sectionVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
	}),
};

const cardVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
	}),
};

export default function ResourcesPage() {
	return (
		<div>
			<PageHero
				eyebrow="Resources"
				title="Resources & Downloads"
				description={pageHeroes.resources}
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/resources", label: "Resources" },
				]}
			>
				<FaDownload className="text-4xl opacity-90" aria-hidden />
			</PageHero>

			{/* Download Catalogues & Technical Resources */}
			<section className="py-20 md:py-28 bg-white relative">
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						{/* Section Header */}
						<m.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-80px" }}
							variants={sectionVariants}
							custom={0}
							className="text-center mb-16"
						>
							<h2 className="text-3xl md:text-4xl font-semibold text-primary-dark mb-4 text-balance">
								Product Catalogues &amp; Technical Documentation
							</h2>
							<p className="text-lg text-text-body max-w-3xl mx-auto leading-relaxed">
								Access our complete library of product catalogues, tolerance charts, quality certificates, and
								standard forms. Every resource is engineered to help you specify, order, and inspect precision
								gauges with confidence.
							</p>
							<div className="mt-6 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent max-w-xs mx-auto" aria-hidden />
						</m.div>

						{downloadCategories.map((category, catIndex) => (
							<m.div
								key={category.title}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-60px" }}
								variants={sectionVariants}
								custom={catIndex + 1}
								className="mb-14 last:mb-0"
							>
								{/* Category Header */}
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
										<category.icon className="text-xl text-primary" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-primary-dark">
											{category.title}
										</h3>
										<p className="text-sm text-text-muted">
											{category.items.length} document{category.items.length !== 1 ? "s" : ""} available
										</p>
									</div>
								</div>

								{/* Download Items Grid */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{category.items.map((item, itemIndex) => (
										<m.div
											key={item.name}
											initial="hidden"
											whileInView="visible"
											viewport={{ once: true, margin: "-40px" }}
											variants={cardVariants}
											custom={itemIndex}
										>
											<div
												className="group relative bg-white rounded-2xl border border-gray-200/80 p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
											>
												<FileIcon type={item.type} />
												<div className="flex-1 min-w-0">
													<h4 className="font-semibold text-primary-dark mb-1 truncate">
														{item.name}
													</h4>
													<p className="text-sm text-text-body leading-relaxed mb-3 line-clamp-2">
														{item.description}
													</p>
													<div className="flex items-center justify-between gap-2">
														<div className="flex items-center gap-2 flex-wrap">
															<span
																className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium leading-relaxed ${
																	item.type === "Excel"
																		? "bg-green-50 text-green-700"
																		: "bg-red-50 text-red-700"
																}`}
															>
																{item.type === "Excel" ? (
																	<FaFileExcel className="text-[10px]" />
																) : (
																	<FaFilePdf className="text-[10px]" />
																)}
																{item.type}
															</span>
															<span className="text-xs text-text-muted">{item.size}</span>
														</div>
														<Link
															href="/contact?request=download"
															className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors flex-shrink-0 group/link"
														>
															<span>Request</span>
															<FaArrowRight className="text-[10px] group-hover/link:translate-x-0.5 transition-transform" />
														</Link>
													</div>
												</div>
											</div>
										</m.div>
									))}
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Standards Reference */}
			<section className="py-20 md:py-28 bg-secondary-light relative">
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" aria-hidden />
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
						{/* Intro column */}
						<m.div
							className="lg:col-span-2 lg:sticky lg:top-28"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.45 }}
						>
							<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-white border border-gray-200/80 rounded-full px-3 py-1">
								Standards
							</span>
							<h2 className="mt-5 text-3xl md:text-4xl font-semibold text-primary-dark text-balance leading-tight">
								Standards Reference
							</h2>
							<p className="mt-4 text-lg text-text-body leading-relaxed">
								Every gauge we manufacture is designed, inspected, and certified against
								national and international standards. Browse the key specifications that
								govern our production processes.
							</p>
						</m.div>

						{/* Stacked checklist rows */}
						<div className="lg:col-span-3 rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
							{standardsInfo.map((standard, index) => (
								<m.div
									key={standard.standard}
									className={`group relative p-8 md:p-10 ${
										index !== standardsInfo.length - 1
											? "border-b border-gray-200/80"
											: ""
									}`}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-30px" }}
									transition={{ duration: 0.45, delay: index * 0.06 }}
								>
									<div className="flex items-start gap-5">
										<div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
											<FaBook className="text-lg" aria-hidden />
										</div>
										<div className="min-w-0 flex-1">
											<h3 className="text-xl font-semibold text-primary-dark">
												{standard.standard}
											</h3>
											<ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-text-body">
												{standard.items.map((item) => (
													<li key={item} className="flex items-start gap-2.5">
														<span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
														<span className="leading-relaxed">{item}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</m.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Industry Resources */}
			<section className="py-20 md:py-28 bg-white relative">
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" aria-hidden />
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
						{/* Intro column */}
						<m.div
							className="lg:col-span-2 lg:sticky lg:top-28"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ duration: 0.45 }}
						>
							<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-secondary-light border border-gray-200/80 rounded-full px-3 py-1">
								Compliance
							</span>
							<h2 className="mt-5 text-3xl md:text-4xl font-semibold text-primary-dark text-balance leading-tight">
								Industry Organisations &amp; Standards Bodies
							</h2>
							<p className="mt-4 text-lg text-text-body leading-relaxed">
								We work within the frameworks defined by the world&rsquo;s most respected
								standards organisations, ensuring every gauge meets or exceeds regulatory
								requirements.
							</p>
						</m.div>

						{/* Org badge list */}
						<div className="lg:col-span-3 rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
							{[
								{
									name: "Bureau of Indian Standards",
									abbr: "BIS",
									description: "National standards body for India",
								},
								{
									name: "American Petroleum Institute",
									abbr: "API",
									description: "Global petroleum industry standards",
								},
								{
									name: "NABL India",
									abbr: "NABL",
									description: "National accreditation for testing labs",
								},
								{
									name: "International Organization for Standardization",
									abbr: "ISO",
									description: "Worldwide standards federation",
								},
							].map((org, index, arr) => (
								<m.div
									key={org.abbr}
									className={`group flex items-center gap-5 p-6 md:p-7 ${
										index !== arr.length - 1
											? "border-b border-gray-200/80"
											: ""
									}`}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-30px" }}
									transition={{ duration: 0.45, delay: index * 0.06 }}
								>
									<div className="w-14 h-14 shrink-0 rounded-2xl bg-accent-50 flex items-center justify-center group-hover:bg-accent-100 transition-colors duration-300">
										<FaIndustry className="text-xl text-accent" aria-hidden />
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-baseline gap-2 flex-wrap">
											<h3 className="text-lg font-bold text-primary-dark">
												{org.abbr}
											</h3>
											<span className="text-sm text-text-body">{org.name}</span>
										</div>
										<p className="mt-1 text-sm text-text-muted leading-relaxed">
											{org.description}
										</p>
									</div>
								</m.div>
							))}
						</div>
					</div>
				</div>
			</section>

			<Cta10
				heading="Can&rsquo;t Find What You Need?"
				description="If you require specific technical documentation, certificates, or standards that aren&rsquo;t listed here, our team is ready to source them for you. Contact us with your requirements and we&rsquo;ll respond within 24 hours."
				buttons={{
					primary: { text: "Contact Us", url: "/contact" },
					secondary: { text: "View Resources", url: "/resources" },
				}}
			/>
		</div>
	);
}
