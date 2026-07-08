"use client";

import { m } from "framer-motion";
import Link from "next/link";
import {
	FaCertificate,
	FaCheck,
	FaClipboardList,
	FaClock,
	FaPhoneAlt,
	FaTools,
	FaTruck,
} from "react-icons/fa";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const services = [
	{
		title: "Gauge Calibration",
		description:
			"Comprehensive calibration services for all types of gauges including plain, thread, API, and special gauges. NABL accredited calibration with traceable certificates.",
		features: [
			"Plain plug and ring gauge calibration",
			"Thread gauge calibration (all forms)",
			"API gauge calibration",
			"Setting master verification",
			"Snap gauge calibration",
		],
		turnaround: "3-5 working days",
	},
	{
		title: "Gauge Repair & Refurbishment",
		description:
			"Expert repair and refurbishment services to restore worn gauges to original specifications, extending their service life.",
		features: [
			"Gauge re-lapping and grinding",
			"Thread gauge re-cutting",
			"Handle replacement",
			"Re-hardening and treatment",
			"Complete overhaul services",
		],
		turnaround: "5-10 working days",
	},
	{
		title: "On-Site Calibration",
		description:
			"Mobile calibration services at your facility, minimizing downtime and ensuring your gauges are always in specification.",
		features: [
			"On-site gauge verification",
			"Equipment audit",
			"Calibration program setup",
			"Staff training",
			"Documentation and records",
		],
		turnaround: "By appointment",
	},
	{
		title: "Express Calibration",
		description:
			"Priority calibration service for urgent requirements. Fast turnaround without compromising on accuracy or documentation.",
		features: [
			"Same-day service available",
			"Priority handling",
			"Direct communication",
			"Rush certificates",
			"Courier delivery",
		],
		turnaround: "24-48 hours",
	},
];

const calibrationCapabilities = [
	{
		type: "Plain Gauges",
		range: "1mm to 300mm",
		accuracy: "±0.001mm",
		standards: "IS 3455, IS 6137, IS 6244",
	},
	{
		type: "Thread Plug Gauges",
		range: "M1 to M100",
		accuracy: "Class 6H/6G",
		standards: "IS 6175, IS 4218",
	},
	{
		type: "Thread Ring Gauges",
		range: "M3 to M100",
		accuracy: "Class 6H/6G",
		standards: "IS 6175, IS 4218",
	},
	{
		type: "API Gauges",
		range: "As per API spec",
		accuracy: "API 5B/7-2",
		standards: "API 5B, API 7-2",
	},
	{
		type: "Setting Masters",
		range: "1mm to 300mm",
		accuracy: "Grade 0",
		standards: "IS 3485",
	},
	{
		type: "Snap Gauges",
		range: "Up to 160mm",
		accuracy: "±0.002mm",
		standards: "IS 8023",
	},
];

const benefits = [
	{
		icon: FaCertificate,
		title: "NABL-Accredited Lab",
		desc: "Nationally recognized accreditation. Every certificate carries full traceability to national standards.",
		featured: true,
	},
	{
		icon: FaTools,
		title: "Skilled Metrologists",
		desc: "Years of hands-on experience with precision gauges across every major industry standard.",
	},
	{
		icon: FaClipboardList,
		title: "Complete Traceability",
		desc: "Detailed calibration certificates with full measurement data and uncertainty analysis.",
	},
	{
		icon: FaClock,
		title: "Rapid Turnaround",
		desc: "Standard 3–5 days. Express 24–48 hours available. On-site service by appointment.",
		wide: true,
	},
	{
		icon: FaTruck,
		title: "Door-to-Door Logistics",
		desc: "We handle pickup and delivery so you focus on production, not shipping.",
	},
	{
		icon: FaCheck,
		title: "Transparent Pricing",
		desc: "No hidden fees. Detailed quotes provided before any work begins.",
	},
];

const processSteps = [
	{
		step: 1,
		title: "Submit Request",
		description:
			"Send your gauges along with calibration requirements and specifications.",
	},
	{
		step: 2,
		title: "Inspection & Quote",
		description:
			"We inspect gauges and provide detailed quotation including any repairs needed.",
	},
	{
		step: 3,
		title: "Calibration",
		description:
			"Precision calibration performed by trained technicians using calibrated masters.",
	},
	{
		step: 4,
		title: "Documentation",
		description:
			"Comprehensive calibration certificate with all measurements and traceability.",
	},
	{
		step: 5,
		title: "Delivery",
		description:
			"Careful packaging and delivery of calibrated gauges with all documentation.",
	},
];

export default function CalibrationPage() {
	return (
		<div>
			<PageHero
				eyebrow="Calibration"
				title="Calibration Services"
				description={pageHeroes.calibration}
			breadcrumbs={[
				{ href: "/", label: "Home" },
				{ href: "/calibration", label: "Calibration" },
			]}
			>
				<span className="inline-flex items-center bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm">
					<FaCertificate className="mr-2" aria-hidden />
					NABL Accredited
				</span>
				<Link
					href="/contact?service=Calibration"
					className="inline-flex items-center bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-secondary-light transition-colors"
				>
					<FaPhoneAlt className="mr-2" aria-hidden />
					Request Calibration
				</Link>
			</PageHero>

			{/* Services Section */}
			<section id="services" className="py-20 md:py-28 bg-white">
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
								Services
							</span>
							<h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-tight">
								Comprehensive Calibration Services
							</h2>
							<p className="mt-4 text-lg text-gray-600 leading-relaxed">
								End-to-end precision calibration and repair backed by NABL
								accreditation and decades of metrology expertise.
							</p>
							<Link
								href="/contact?service=Calibration"
								className="mt-8 inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98]"
							>
								Request Calibration
							</Link>
						</m.div>

						{/* Stacked bordered feature-row list */}
						<div className="lg:col-span-3 rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
							{services.map((service, index) => (
								<m.div
									key={service.title}
									className={`group relative p-8 md:p-10 ${
										index !== services.length - 1
											? "border-b border-gray-200/80"
											: ""
									}`}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-30px" }}
									transition={{ duration: 0.45, delay: index * 0.06 }}
								>
									<div className="flex items-start justify-between mb-3 gap-4">
										<h3 className="text-xl md:text-2xl font-bold text-gray-900">
											{service.title}
										</h3>
										<div className="flex items-center gap-1.5 text-accent text-sm font-medium whitespace-nowrap bg-accent-50 px-3 py-1 rounded-full">
											<FaClock className="text-xs" aria-hidden />
											{service.turnaround}
										</div>
									</div>
									<p className="text-gray-600 mb-5 leading-relaxed">
										{service.description}
									</p>
									<ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
										{service.features.map((feature) => (
											<li key={feature} className="flex items-start text-sm">
												<span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center mr-3 mt-0.5">
													<FaCheck
														className="text-accent text-[10px]"
														aria-hidden
													/>
												</span>
												<span className="text-gray-700">{feature}</span>
											</li>
										))}
									</ul>
								</m.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Gradient accent divider */}
			<div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

			{/* Calibration Capabilities */}
			<section className="py-20 md:py-28 bg-surface-subtle">
				<div className="container mx-auto px-4">
					{/* Section header */}
					<div className="text-center mb-14">
						<m.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
						>
							Calibration Capabilities
						</m.h2>
						<m.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-lg text-gray-600 max-w-2xl mx-auto"
						>
							Our laboratory is equipped to calibrate a wide range of gauge
							types across multiple standards
						</m.p>
					</div>

					{/* Premium table with rounded container and header */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-gray-200/80 shadow-sm"
					>
						<table className="w-full">
							<thead>
								<tr className="bg-primary text-white">
									<th
										scope="col"
										className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
									>
										Gauge Type
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
									>
										Range
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
									>
										Accuracy
									</th>
									<th
										scope="col"
										className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
									>
										Standards
									</th>
								</tr>
							</thead>
							<tbody>
								{calibrationCapabilities.map((cap, index) => (
									<tr
										key={cap.type}
										className={`${
											index % 2 === 0 ? "bg-white" : "bg-surface-subtle"
										} transition-colors hover:bg-accent-50`}
									>
										<td className="px-6 py-4 font-semibold text-gray-900 border-t border-gray-100">
											{cap.type}
										</td>
										<td className="px-6 py-4 text-gray-700 border-t border-gray-100">
											{cap.range}
										</td>
										<td className="px-6 py-4 text-gray-700 border-t border-gray-100">
											{cap.accuracy}
										</td>
										<td className="px-6 py-4 text-gray-700 border-t border-gray-100 font-mono text-sm">
											{cap.standards}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</m.div>
				</div>
			</section>

			{/* Gradient accent divider */}
			<div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

			{/* Process */}
			<section className="py-20 md:py-28 bg-white">
				<div className="container mx-auto px-4">
					{/* Section header */}
					<div className="text-center mb-14">
						<m.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
						>
							Our Calibration Process
						</m.h2>
						<m.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-lg text-gray-600 max-w-2xl mx-auto"
						>
							A transparent five-step workflow from submission to delivery
						</m.p>
					</div>

					<div className="max-w-4xl mx-auto">
						<div className="relative">
							{/* Connecting line behind the dots */}
							<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/10 hidden md:block" />

							<div className="space-y-10">
								{processSteps.map((step, index) => (
									<m.div
										key={step.step}
										initial={{ opacity: 0, x: -30 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="flex items-start gap-6 group"
									>
										{/* Numbered step circle */}
										<div className="relative flex-shrink-0 z-10">
											<div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
												{step.step}
											</div>
										</div>

										{/* Step content card */}
										<div className="flex-1 bg-surface-subtle rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
											<h3 className="text-xl font-bold text-gray-900 mb-2">
												{step.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{step.description}
											</p>
										</div>
									</m.div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Gradient accent divider */}
			<div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

			{/* Benefits, asymmetric bento layout */}
			<section className="py-20 md:py-28 bg-surface-subtle">
				<div className="container mx-auto px-4">
					{/* Section header */}
					<div className="text-center mb-14">
						<m.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
						>
							Why Choose Our Calibration Services
						</m.h2>
						<m.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-lg text-gray-600 max-w-2xl mx-auto"
						>
							Trusted by leading manufacturers for precision, reliability, and
							service excellence
						</m.p>
					</div>

					{/* Bento grid: featured NABL tile + wide turnaround tile + standard tiles */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 max-w-6xl mx-auto">
						{benefits.map((item, index) => (
							<m.div
								key={item.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: index * 0.06 }}
								className={`bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden ${
									item.featured
										? "md:col-span-2 lg:col-span-2 lg:row-span-2 p-8 md:p-10 flex flex-col justify-between"
										: item.wide
											? "md:col-span-2 lg:col-span-2 p-8"
											: "p-8"
								}`}
							>
								{/* Decorative accent circle */}
								<div
									className={`absolute -top-4 -right-4 rounded-full bg-accent-50 opacity-60 ${
										item.featured ? "w-24 h-24" : "w-16 h-16"
									}`}
								/>
								<div className="relative z-10">
									<div
										className={`bg-primary/10 rounded-xl flex items-center justify-center mb-5 ${
											item.featured ? "w-14 h-14" : "w-12 h-12"
										}`}
									>
										<item.icon
											className={
												item.featured
													? "text-2xl text-primary"
													: "text-xl text-primary"
											}
											aria-hidden
										/>
									</div>
									<h3
										className={`font-bold text-gray-900 mb-2 ${
											item.featured ? "text-2xl md:text-3xl" : "text-lg"
										}`}
									>
										{item.title}
									</h3>
									<p
										className={`text-gray-600 leading-relaxed ${
											item.featured ? "text-base md:text-lg" : "text-sm"
										}`}
									>
										{item.desc}
									</p>
								</div>
								{item.featured && (
									<div className="relative z-10 mt-6 pt-6 border-t border-gray-200/80">
										<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-accent-50 rounded-full px-3 py-1">
											NABL Accredited
										</span>
									</div>
								)}
							</m.div>
						))}
					</div>
				</div>
			</section>

			<Cta10
				heading="Ready to Calibrate Your Gauges?"
				description="Contact us today for a calibration quote. We offer competitive pricing and quick turnaround times."
				buttons={{
					primary: { text: "Request Calibration", url: "/contact?service=Calibration" },
					secondary: { text: "View Services", url: "/services" },
				}}
			/>
		</div>
	);
}
