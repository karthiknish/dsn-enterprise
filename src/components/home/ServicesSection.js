"use client";

import { UilArrowRight, UilCheck, UilRuler, UilShieldCheck, UilWrench } from "@iconscout/react-unicons";
import { m } from "framer-motion";
import Link from "next/link";

const services = [
	{
		id: 1,
		name: "Calibration Services",
		description:
			"NABL accredited calibration services for all types of gauges and measuring instruments.",
		icon: UilRuler,
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
		icon: UilWrench,
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
		icon: UilShieldCheck,
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
				<div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
					<m.div
						className="lg:col-span-2 lg:sticky lg:top-28"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.45 }}
					>
						<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-white border border-gray-200/80 rounded-full px-3 py-1">
							Services
						</span>
						<h2 className="mt-5 text-3xl md:text-4xl font-semibold text-gray-900 text-balance leading-tight">
							Our Services
						</h2>
						<p className="mt-4 text-lg text-gray-600 leading-relaxed">
							We offer a comprehensive range of services to meet all your
							measurement and calibration needs.
						</p>
						<Link
							href="#contact"
							className="mt-8 inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98]"
						>
							Contact Now
						</Link>
					</m.div>

					<div className="lg:col-span-3 rounded-2xl border border-gray-200/80 bg-white overflow-hidden">
						{services.map((service, index) => {
							const Icon = service.icon;
							return (
								<m.div
									key={service.id}
									className={`group relative p-8 md:p-10 ${
										index !== services.length - 1
											? "border-b border-gray-200/80"
											: ""
									}`}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-30px" }}
									transition={{ duration: 0.4, delay: index * 0.06 }}
								>
									<div className="flex items-start gap-5">
										<div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
											<Icon className="w-5 h-5" aria-hidden />
										</div>
										<div className="min-w-0">
											<h3 className="text-xl font-semibold text-gray-900">
												{service.name}
											</h3>
											<p className="mt-2 text-gray-600 leading-relaxed">
												{service.description}
											</p>
											<ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
												{service.details.slice(0, 2).map((detail) => (
													<li
														key={detail}
														className="flex items-start gap-2"
													>
														<UilCheck
															className="text-accent mt-0.5 flex-shrink-0 w-3.5 h-3.5"
															aria-hidden
														/>
														<span>{detail}</span>
													</li>
												))}
											</ul>
											<Link
												href={service.link}
												className="mt-5 text-primary hover:text-accent font-medium inline-flex items-center gap-2 text-sm group/link"
											>
												Learn More
												<UilArrowRight
													className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5"
													aria-hidden
												/>
											</Link>
										</div>
									</div>
								</m.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
