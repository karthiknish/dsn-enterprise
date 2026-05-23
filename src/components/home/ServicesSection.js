"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
	FaArrowRight,
	FaCertificate,
	FaCheck,
	FaRuler,
	FaTools,
} from "react-icons/fa";
import SectionHeader from "./SectionHeader";

const services = [
	{
		id: 1,
		name: "Calibration Services",
		description:
			"NABL accredited calibration services for all types of gauges and measuring instruments.",
		icon: FaRuler,
		link: "/services#calibration",
		details: [
			"NABL Certificate available at extra cost",
			"Calibration for Plain Plug Gauges (1mm to 250mm)",
			"Calibration for Plain Ring Gauges (6mm to 125mm)",
			"Calibration for Cylindrical Setting Masters",
		],
	},
	{
		id: 2,
		name: "Custom Gauge Manufacturing",
		description:
			"Custom designed and manufactured gauges for special applications and unique requirements.",
		icon: FaTools,
		link: "/services#custom-manufacturing",
		details: [
			"Special Gauges as per Drawing",
			"Hardness - 60 ± 2HRC",
			"SUB-ZERO Treated - 80°C",
			"Popular Sizes in Ready Stock",
		],
	},
	{
		id: 3,
		name: "Certification & Testing",
		description:
			"Comprehensive testing and certification services for quality assurance.",
		icon: FaCertificate,
		link: "/services#certification",
		details: [
			"Quality Standard: IS 919 (Part 1, Part 2) 1993 ISO",
			"IS 3455 Gauging Practice for Plain Work Pieces",
			"IS 6244-1980 & IS 6137-1983 Specifications",
			"IS 3485 & IS 8023 Standards Compliance",
		],
	},
];

const ServicesSection = () => {
	return (
		<section className="py-20 md:py-24 bg-secondary-light/80 relative">
			<div
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"
				aria-hidden
			/>
			<div className="container mx-auto px-4">
				<SectionHeader
					eyebrow="Services"
					title="Our Services"
					description="We offer a comprehensive range of services to meet all your measurement and calibration needs."
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7">
					{services.map((service, index) => {
						const Icon = service.icon;
						return (
							<motion.div
								key={service.id}
								className="group bg-white rounded-2xl border border-gray-200/80 p-8 flex flex-col h-full transition-all duration-300 hover:border-accent/25 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: index * 0.08 }}
							>
								<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
									<Icon className="text-2xl" aria-hidden />
								</div>
								<h3 className="text-xl font-bold mb-3 text-gray-900">
									{service.name}
								</h3>
								<p className="text-gray-600 mb-5 leading-relaxed">
									{service.description}
								</p>

								<ul className="text-sm text-gray-600 space-y-2 mb-6 flex-1">
									{service.details.slice(0, 2).map((detail) => (
										<li key={detail} className="flex items-start gap-2">
											<FaCheck
												className="text-accent mt-0.5 flex-shrink-0 text-xs"
												aria-hidden
											/>
											<span>{detail}</span>
										</li>
									))}
								</ul>

								<Link
									href={service.link}
									className="mt-auto text-primary hover:text-accent font-medium inline-flex items-center gap-2 text-sm group/link"
								>
									Learn More
									<FaArrowRight
										className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5"
										aria-hidden
									/>
								</Link>
							</motion.div>
						);
					})}
				</div>

				<div className="text-center mt-14">
					<Link
						href="#contact"
						className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						Contact Now
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
