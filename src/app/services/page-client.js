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
import PageCta from "@/components/layout/PageCta";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const services = [
	{
		id: "calibration",
		name: "Calibration Services",
		description:
			"NABL-accredited calibration for plain, thread, API, and special gauges—with traceable certificates and express slots when the line cannot wait.",
		icon: <FaRuler className="text-5xl text-primary mb-4" />,
		details: [
			"Comprehensive calibration for all types of gauges",
			"NABL Certificate available at extra cost",
			"Traceable to national standards",
			"Quick turnaround time",
			"Detailed calibration reports",
			"On-site calibration services available",
		],
	},
	{
		id: "custom-manufacturing",
		name: "Custom Gauge Manufacturing",
		description:
			"Gauges built to your drawing,thread forms, progressive members, and materials chosen for your wear and tolerance needs.",
		icon: <FaTools className="text-5xl text-primary mb-4" />,
		details: [
			"Special gauges manufactured as per drawing",
			"Custom thread forms including ACME, Stub ACME, Buttress, BPV",
			"Precision manufacturing with tight tolerances",
			"Material options including OHNS (W) & Carbide",
			"SUB-ZERO Treated at -80°C for dimensional stability",
			"Hardness - 60 ± 2HRC for durability",
		],
	},
	{
		id: "certification",
		name: "Certification & Testing",
		description:
			"Dimensional inspection, material verification, and documentation aligned to IS, ISO, and API programmes.",
		icon: <FaCertificate className="text-5xl text-primary mb-4" />,
		details: [
			"Certification according to international standards",
			"Compliance with IS 919, IS 3455, IS 6244, IS 6137, IS 3485, IS 8023",
			"Material testing and certification",
			"Dimensional inspection and reporting",
			"Thread profile analysis",
			"Hardness testing",
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

const ServicesPage = () => {
	return (
		<div>
			<PageHero
				eyebrow="Services"
				title="Our Services"
				description={pageHeroes.services}
			/>

			<section className="py-16 md:py-20 bg-secondary-light relative">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 mb-16">
						{services.map((service, index) => (
							<m.div
								key={service.id}
								className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center hover:shadow-md transition-all duration-300 hover:border-accent/25 hover:-translate-y-0.5"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<div className="flex justify-center">{service.icon}</div>
								<h3 className="text-xl font-semibold mb-3 text-gray-900">
									{service.name}
								</h3>
								<p className="text-gray-600 mb-4">{service.description}</p>
								<Link
									href={`#${service.id}`}
									className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
								>
									Learn More
									<FaArrowRight className="ml-2" />
								</Link>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Detailed Service Sections */}
			{services.map((service, index) => (
				<section
					key={service.id}
					id={service.id}
					className={`py-16 ${
						index % 2 === 0 ? "bg-surface-subtle" : "bg-secondary-light"
					}`}
				>
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<div
								className={`order-2 ${
									index % 2 === 0 ? "lg:order-1" : "lg:order-2"
								}`}
							>
								<h2 className="text-3xl font-semibold mb-6 text-gray-900">
									{service.name}
								</h2>
								<p className="text-lg text-gray-700 mb-8">
									{service.description}
								</p>
								<ul className="space-y-4">
									{service.details.map((detail) => (
										<li
											key={`${service.id}-${detail}`}
											className="flex items-start"
										>
											<FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
											<span className="text-gray-700">{detail}</span>
										</li>
									))}
								</ul>
								<div className="mt-8">
									<Link
										href="/contact"
										className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
									>
										Request Service
									</Link>
								</div>
							</div>
							<div
								className={`order-1 ${
									index % 2 === 0 ? "lg:order-2" : "lg:order-1"
								}`}
							>
								<div className="bg-secondary-light rounded-lg h-80 flex items-center justify-center">
									<div className="text-9xl text-primary">{service.icon}</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			))}

			{/* Standards Section */}
			<section className="py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
							Quality Standards We Follow
						</h2>
						<div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm">
							<ul className="space-y-3">
								{standards.map((standard) => (
									<li key={standard} className="flex items-start">
										<span className="text-primary mr-2">•</span>
										<span className="text-gray-700">{standard}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<PageCta
				title="Ready to Experience Our Services?"
				description="Tell us what you need calibrated, manufactured, or certified—we will scope the job and confirm lead time from Coimbatore."
			/>
		</div>
	);
};

export default ServicesPage;
