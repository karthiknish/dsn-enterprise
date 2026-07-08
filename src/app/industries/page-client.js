"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaOilCan } from "react-icons/fa";
import {
	UilArrowRight,
	UilAward,
	UilBuilding,
	UilCar,
	UilCheck,
	UilCircuit,
	UilClock,
	UilCog,
	UilPlane,
	UilShip,
	UilSubway,
	UilUsersAlt,
} from "@iconscout/react-unicons";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const industries = [
	{
		id: "oil-gas",
		name: "Oil & Gas",
		icon: FaOilCan,
		description:
			"API 5B and 7-2 gauges for casing, tubing, line pipe, and rotary shouldered connections, built for field and workshop inspection programmes.",
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
		icon: UilCar,
		description:
			"Thread and plain gauges for engine, transmission, and chassis lines, supporting tier suppliers who need repeatable GO/NO-GO acceptance.",
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
		icon: UilPlane,
		description:
			"Tight-tolerance thread and plain gauges for fasteners, landing gear, and avionics housings, documented for defence and aerospace QA.",
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
		icon: UilCog,
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
		icon: UilBuilding,
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
		icon: UilShip,
		description:
			"BSP, taper, and API gauging for propulsion, deck equipment, and offshore fabrication, with packaging suited to harsh environments.",
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
		icon: UilSubway,
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
		icon: UilCircuit,
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
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/industries", label: "Industries" },
				]}
			/>

			{/* Industry Cards */}
			<section className="py-16 md:py-20 bg-surface-subtle">
				<div className="container mx-auto px-4">
					{/* Section header */}
					<m.div
						className="text-center mb-12 md:mb-16"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="mt-6 text-3xl md:text-4xl font-semibold text-gray-900 text-balance">
							Precision Gauging for Every Industry
						</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
							From deep-sea rigs to microelectronics, our precision gauges meet
							the exacting standards of the world&apos;s most demanding industrial
							sectors.
						</p>
					</m.div>

					<div className="space-y-8 md:space-y-12">
						{industries.map((industry, index) => (
							<m.div
								key={industry.id}
								className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								{/* Top accent bar */}
								<div
									className="h-1.5 bg-gradient-to-r from-primary to-accent"
									aria-hidden
								/>

								<div className="grid grid-cols-1 lg:grid-cols-2">
									{/* Content Panel */}
									<div
										className={`p-8 lg:p-12 ${index % 2 === 1 ? "lg:order-2" : ""}`}
									>
										{/* Industry icon + name */}
										<div className="flex items-center gap-4 mb-6">
											<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
												<industry.icon className="w-5 h-5 text-primary" />
											</div>
											<h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
												{industry.name}
											</h2>
										</div>

										{/* Description */}
										<p className="text-gray-600 leading-relaxed mb-6">
											{industry.description}
										</p>

										{/* Key Applications */}
										<div className="mb-6">
											<h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
												Key Applications
											</h3>
											<ul className="space-y-2">
												{industry.applications.map((app) => (
													<li key={app} className="flex items-start gap-3">
														<UilCheck className="mt-0.5 text-accent flex-shrink-0 w-3.5 h-3.5" />
														<span className="text-gray-700">{app}</span>
													</li>
												))}
											</ul>
										</div>

										{/* Recommended Products */}
										<div>
											<h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">
												Recommended Products
											</h3>
											<div className="flex flex-wrap gap-2">
												{industry.products.map((product) => (
													<span
														key={product}
														className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200/60"
													>
														{product}
													</span>
												))}
											</div>
										</div>
									</div>

									{/* Image Panel */}
									<div
										className={`bg-gray-50 p-8 lg:p-12 flex flex-col items-center justify-center relative min-h-[320px] lg:min-h-full ${index % 2 === 1 ? "lg:order-1" : ""}`}
									>
										{/* Subtle pattern overlay */}
										<div
											className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#374941_1px,transparent_1px)] bg-[size:20px_20px]"
											aria-hidden
										/>

										{/* Decorative gradient orb */}
										<div
											className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl"
											aria-hidden
										/>

										{/* Large industry icon watermark, standing in for a stock illustration */}
										<industry.icon
											className="absolute -bottom-8 -left-8 w-40 h-40 text-primary/[0.07] pointer-events-none"
											aria-hidden
										/>

										{/* Product image */}
										<div className="relative w-full max-w-[220px] aspect-square mb-8 z-10">
											<Image
												src={industry.image}
												alt={`${industry.name} precision gauge`}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
												className="object-contain drop-shadow-sm"
											/>
										</div>

										{/* CTA */}
										<Link
											href={`/contact?industry=${encodeURIComponent(industry.name)}`}
											className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 z-10"
											aria-label={`Request quote for ${industry.name} industry`}
										>
											Request Industry Quote
											<UilArrowRight className="w-3.5 h-3.5" />
										</Link>
									</div>
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Why Industries Trust DSN */}
			<section className="py-16 md:py-20 bg-white relative overflow-hidden">
				{/* Subtle background pattern */}
				<div
					className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#374941_1px,transparent_1px)] bg-[size:24px_24px]"
					aria-hidden
				/>

				<div className="container mx-auto px-4 relative z-10">
					{/* Section header */}
					<m.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="mt-6 text-3xl md:text-4xl font-semibold text-gray-900 text-balance">
							Why Industries Trust DSN Enterprises
						</h2>
						<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
							Decades of precision engineering backed by certified quality and
							deeply rooted industry expertise.
						</p>
					</m.div>

					<m.div
						className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-30px" }}
						transition={{ duration: 0.45 }}
					>
						<div className="grid grid-cols-1 md:grid-cols-[1.3fr_auto_1fr_auto_1fr]">
							{/* Stat 1: 25+ Years — emphasized */}
							<m.div
								className="relative p-8 md:p-10 flex flex-col justify-center bg-secondary-light/60"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: 0 }}
							>
								<UilClock className="w-5 h-5 text-primary/70 mb-4" />
								<div className="flex items-baseline gap-2">
									<span className="text-6xl md:text-7xl font-semibold tracking-tight text-primary tabular-nums">
										25+
									</span>
								</div>
								<div className="mt-3 text-gray-700 font-medium">
									Years of Experience
								</div>
								<p className="text-sm text-gray-400 mt-1">Since 1998</p>
							</m.div>

							{/* Divider */}
							<div className="hidden md:block w-px bg-gray-200/80 self-stretch" />
							<div className="md:hidden h-px bg-gray-200/80" />

							{/* Stat 2: 500+ Clients */}
							<m.div
								className="p-8 md:p-10 flex flex-col justify-center"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: 0.06 }}
							>
								<UilUsersAlt className="w-5 h-5 text-primary/70 mb-4" />
								<span className="text-5xl font-semibold tracking-tight text-primary tabular-nums">
									500+
								</span>
								<div className="mt-3 text-gray-700 font-medium">
									Industrial Clients
								</div>
								<p className="text-sm text-gray-400 mt-1">Across 15+ countries</p>
							</m.div>

							{/* Divider */}
							<div className="hidden md:block w-px bg-gray-200/80 self-stretch" />
							<div className="md:hidden h-px bg-gray-200/80" />

							{/* Stat 3: API Certified */}
							<m.div
								className="p-8 md:p-10 flex flex-col justify-center"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: 0.12 }}
							>
								<UilAward className="w-5 h-5 text-primary/70 mb-4" />
								<span className="text-5xl font-semibold tracking-tight text-primary tabular-nums">
									API
								</span>
								<div className="mt-3 text-gray-700 font-medium">
									Certified Manufacturer
								</div>
								<p className="text-sm text-gray-400 mt-1">API 5B & 7-2 Licensed</p>
							</m.div>
						</div>
					</m.div>
				</div>
			</section>

			<Cta10
				reference="Ref. DSN-IND-01"
				heading="Don&apos;t See Your Industry?"
				description="We serve many more industries beyond those listed. Contact us to discuss your specific gauging requirements."
				buttons={{
					primary: { text: "Contact Us", url: "/contact" },
					secondary: { text: "View All Products", url: "/products" },
				}}
			/>
		</div>
	);
}
