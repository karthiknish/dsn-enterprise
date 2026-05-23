"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	FaArrowRight,
	FaCar,
	FaCheck,
	FaCogs,
	FaIndustry,
	FaMicrochip,
	FaOilCan,
	FaPlane,
	FaShip,
	FaTrain,
} from "react-icons/fa";
import PageCta from "@/components/layout/PageCta";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const industries = [
	{
		id: "oil-gas",
		name: "Oil & Gas",
		icon: FaOilCan,
		description:
			"API 5B and 7-2 gauges for casing, tubing, line pipe, and rotary shouldered connections—built for field and workshop inspection programmes.",
		applications: [
			"Casing and tubing thread inspection",
			"Drill pipe connection verification",
			"Line pipe threading quality control",
			"Rotary shouldered connections",
			"OCTG manufacturing inspection",
		],
		products: [
			"API 5B Gauges",
			"API 7-2 Gauges",
			"Buttress Thread Gauges",
			"NPT/NPTF Gauges",
		],
		image: "/images/api-thread-gauge.png",
		color: "bg-primary",
	},
	{
		id: "automotive",
		name: "Automotive",
		icon: FaCar,
		description:
			"Thread and plain gauges for engine, transmission, and chassis lines—supporting tier suppliers who need repeatable GO/NO-GO acceptance.",
		applications: [
			"Engine component inspection",
			"Transmission shaft verification",
			"Wheel hub and bearing checks",
			"Fuel injection system QC",
			"Brake system component inspection",
		],
		products: [
			"Thread Plug Gauges",
			"Thread Ring Gauges",
			"Spline Gauges",
			"Plain Gauges",
		],
		image: "/images/thread-plug-gauge.png",
		color: "bg-primary",
	},
	{
		id: "aerospace",
		name: "Aerospace & Defense",
		icon: FaPlane,
		description:
			"Tight-tolerance thread and plain gauges for fasteners, landing gear, and avionics housings—documented for defence and aerospace QA.",
		applications: [
			"Aircraft fastener inspection",
			"Landing gear component verification",
			"Turbine blade measurement",
			"Avionics housing QC",
			"Defense equipment thread inspection",
		],
		products: [
			"UNJ Thread Gauges",
			"MS/AN Thread Gauges",
			"Setting Masters",
			"Special Gauges",
		],
		image: "/images/plain-plug-gauge.png",
		color: "bg-primary",
	},
	{
		id: "general-engineering",
		name: "General Engineering",
		icon: FaCogs,
		description:
			"Everyday plug, ring, snap, and thread gauges for job shops and OEM tool rooms that need reliable inspection without delays.",
		applications: [
			"Machine tool manufacturing",
			"Precision component production",
			"Tool and die inspection",
			"Job shop quality control",
			"Prototype verification",
		],
		products: [
			"Plain Plug Gauges",
			"Plain Ring Gauges",
			"Snap Gauges",
			"Cylindrical Pins",
		],
		image: "/images/plain-ring-gauge.png",
		color: "bg-primary",
	},
	{
		id: "heavy-machinery",
		name: "Heavy Machinery",
		icon: FaIndustry,
		description:
			"Large-diameter and heavy-thread gauges for hydraulics, bearings, and structural fasteners on construction and mining equipment.",
		applications: [
			"Hydraulic cylinder inspection",
			"Heavy bolt thread verification",
			"Bearing housing measurement",
			"Track link inspection",
			"Large bore measurement",
		],
		products: [
			"Large Diameter Gauges",
			"ACME Thread Gauges",
			"Buttress Gauges",
			"Custom Gauges",
		],
		image: "/images/featured.png",
		color: "bg-primary",
	},
	{
		id: "marine",
		name: "Marine & Shipbuilding",
		icon: FaShip,
		description:
			"BSP, taper, and API gauging for propulsion, deck equipment, and offshore fabrication—with packaging suited to harsh environments.",
		applications: [
			"Propeller shaft inspection",
			"Marine engine components",
			"Offshore drilling equipment",
			"Ship hull fittings",
			"Naval vessel components",
		],
		products: [
			"BSP Thread Gauges",
			"Taper Thread Gauges",
			"Marine Grade Gauges",
			"API Gauges",
		],
		image: "/images/thread-ring-gauge.png",
		color: "bg-primary",
	},
	{
		id: "railways",
		name: "Railways",
		icon: FaTrain,
		description:
			"Gauges for axles, couplers, and brake components on rolling stock programmes that cannot compromise thread or bore integrity.",
		applications: [
			"Wheel profile inspection",
			"Axle bearing measurement",
			"Coupler thread verification",
			"Brake system components",
			"Track fastener inspection",
		],
		products: [
			"Large Ring Gauges",
			"Taper Gauges",
			"Thread Gauges",
			"Profile Gauges",
		],
		image: "/images/cylinder-maters.png",
		color: "bg-primary",
	},
	{
		id: "electronics",
		name: "Electronics & Precision",
		icon: FaMicrochip,
		description:
			"Fine-pitch and miniature thread and pin gauges for connectors, sensors, and precision assemblies.",
		applications: [
			"Connector thread inspection",
			"Micro-fastener verification",
			"Sensor housing measurement",
			"Fine pitch thread QC",
			"Precision instrument assembly",
		],
		products: [
			"Fine Pitch Gauges",
			"Micro Thread Gauges",
			"Precision Pins",
			"Miniature Gauges",
		],
		image: "/images/plain-plug-gauge.png",
		color: "bg-primary",
	},
];

export default function IndustriesPage() {
	return (
		<div>
			<PageHero
				eyebrow="Industries"
				title="Industries We Serve"
				description={pageHeroes.industries}
			/>

			<section className="py-16 md:py-20 bg-surface-subtle">
				<div className="container mx-auto px-4">
					<div className="space-y-16">
						{industries.map((industry, index) => (
							<m.div
								key={industry.id}
								className="bg-secondary-light rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<div
									className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
								>
									<div
										className={`${industry.color} p-8 lg:p-12 text-white ${index % 2 === 1 ? "lg:order-2" : ""}`}
									>
										<div className="flex items-center mb-6">
											<industry.icon className="text-4xl mr-4" />
											<h2 className="text-3xl font-semibold">{industry.name}</h2>
										</div>
										<p className="text-lg mb-6 opacity-90">
											{industry.description}
										</p>
										<div className="mb-6">
											<h3 className="font-semibold mb-3">Key Applications:</h3>
											<ul className="space-y-2">
												{industry.applications.map((app) => (
													<li key={app} className="flex items-start">
														<FaCheck className="mt-1 mr-2 flex-shrink-0" />
														<span className="opacity-90">{app}</span>
													</li>
												))}
											</ul>
										</div>
										<div>
											<h3 className="font-semibold mb-3">Recommended Products:</h3>
											<div className="flex flex-wrap gap-2">
												{industry.products.map((product) => (
													<span
														key={product}
														className="bg-white/20 px-3 py-1 rounded-full text-sm"
													>
														{product}
													</span>
												))}
											</div>
										</div>
									</div>
									<div
										className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}
									>
										<div className="relative flex justify-center mb-8 h-48 w-full max-w-xs mx-auto">
											<Image
												src={industry.image}
												alt={industry.name}
												fill
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
												unoptimized
												className="object-contain"
											/>
										</div>
										<div className="text-center">
											<h3 className="text-xl font-semibold text-gray-900 mb-4">
												Precision Solutions for {industry.name}
											</h3>
											<p className="text-gray-600 mb-6">
												Get customized gauging solutions designed specifically
												for your industry requirements.
											</p>
											<Link
												href={`/contact?industry=${encodeURIComponent(industry.name)}`}
												className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
											>
												Request Industry Quote
												<FaArrowRight className="ml-2" />
											</Link>
										</div>
									</div>
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-semibold mb-8 text-gray-900">
							Why Industries Trust DSN Enterprises
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-white p-6 rounded-lg shadow-md">
								<div className="text-4xl font-bold text-primary mb-2">25+</div>
								<div className="text-gray-600">Years of Experience</div>
							</div>
							<div className="bg-white p-6 rounded-lg shadow-md">
								<div className="text-4xl font-bold text-primary mb-2">500+</div>
								<div className="text-gray-600">Industrial Clients</div>
							</div>
							<div className="bg-white p-6 rounded-lg shadow-md">
								<div className="text-4xl font-bold text-primary mb-2">API</div>
								<div className="text-gray-600">Certified Manufacturer</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<PageCta
				title="Don't See Your Industry?"
				description="We serve many more industries beyond those listed. Contact us to discuss your specific gauging requirements."
				secondaryHref="/products"
				secondaryLabel="View All Products"
			/>
		</div>
	);
}
