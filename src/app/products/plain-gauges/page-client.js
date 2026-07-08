"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { Cta10 } from "@/components/cta10";
import ProductCategoryHero from "@/components/layout/ProductCategoryHero";
import { pageHeroes } from "@/content/page-heroes";

const products = [
	{
		id: "plain-plug-gauge",
		name: "Plain Plug Gauge",
		specs: "1mm to 250mm - OHNS (W) & Carbide",
		description:
			"Precision plug gauges designed for accurate internal diameter measurement of holes and bores. Available in GO and NO-GO configurations for quick pass/fail inspection.",
		features: [
			"High-precision cylindrical design",
			"GO and NO-GO configuration",
			"Available in OHNS and Carbide materials",
			"Sub-zero treated for dimensional stability",
			"Hardness: 60 ± 2 HRC",
		],
		applications: [
			"Automotive components",
			"Aerospace parts",
			"Machine tool industry",
			"General engineering",
		],
		image: "/images/plain-plug-gauge.png",
	},
	{
		id: "plain-ring-gauge",
		name: "Plain Ring Gauge",
		specs: "6mm to 125mm",
		description:
			"Precision ring gauges for accurate external diameter measurement of shafts and pins. Essential tools for quality control in manufacturing processes.",
		features: [
			"Precision ground internal diameter",
			"GO and NO-GO configuration",
			"Wear-resistant surface finish",
			"Sub-zero treated at -80°C",
			"NABL calibration available",
		],
		applications: [
			"Shaft inspection",
			"Pin diameter verification",
			"Manufacturing QC",
			"Precision engineering",
		],
		image: "/images/plain-ring-gauge.png",
	},
	{
		id: "cylindrical-setting-masters",
		name: "Cylindrical Setting Masters",
		specs: "6mm to 250mm",
		description:
			"High-precision master setting gauges used for calibrating measuring instruments and comparators. Essential reference standards for quality laboratories.",
		features: [
			"Ultra-high precision manufacturing",
			"Calibrated to traceable standards",
			"Mirror finish surface",
			"Supplied with calibration certificate",
			"Temperature stable materials",
		],
		applications: [
			"Instrument calibration",
			"Comparator setting",
			"Reference standards",
			"Quality laboratories",
		],
		image: "/images/cylinder-maters.png",
	},
	{
		id: "cylindrical-measuring-pin",
		name: "Cylindrical Measuring Pin",
		specs: "1mm to 20mm",
		description:
			"Precision measuring pins for accurate dimensional measurement and inspection. Ideal for thread measurement, groove inspection, and precision layout work.",
		features: [
			"High cylindricity accuracy",
			"Precision ground finish",
			"Available in sets",
			"Carbide option for extended life",
			"Individual calibration available",
		],
		applications: [
			"Thread measurement",
			"Groove inspection",
			"Layout work",
			"Coordinate measurement",
		],
		image: "/images/cylinder-maters.png",
	},
	{
		id: "snap-gauges",
		name: "Snap Gauges",
		specs: "Various sizes available",
		description:
			"Quick-action gauges for rapid external dimension measurement. Designed for high-volume production inspection with easy pass/fail determination.",
		features: [
			"Rapid measurement capability",
			"Adjustable and fixed types",
			"Ergonomic handle design",
			"Wear-resistant anvils",
			"Easy GO/NO-GO identification",
		],
		applications: [
			"Production line inspection",
			"High-volume QC",
			"External diameter checking",
			"Shaft measurement",
		],
		image: "/images/snap-gauge.png",
	},
];

const specifications = [
	{ label: "Material", value: "OHNS (W) / Tungsten Carbide" },
	{ label: "Hardness", value: "60 ± 2 HRC" },
	{ label: "Treatment", value: "Sub-Zero at -80°C" },
	{ label: "Surface Finish", value: "Mirror / Ground Finish" },
	{ label: "Tolerance Class", value: "As per IS / ISO Standards" },
	{ label: "Certification", value: "NABL Certificate Available" },
];

const standards = [
	"IS 919 (Part 1, Part 2) 1993 - ISO System of Limits & Fits",
	"IS 3455 - Gauging Practice for Plain Work Pieces",
	"IS 6244-1980 - Plain Plug Gauges (40mm to 120mm)",
	"IS 6137-1983 - Plain Plug Gauges (1mm to 40mm)",
	"IS 3485 - Plain & Master Setting Ring Gauges (1mm to 315mm)",
	"IS 8023 - Single Ended Progressive Type Plate Snap Gauges",
];

export default function PlainGaugesPage() {
	return (
		<div>
			<ProductCategoryHero
				title="Plain Gauges"
				quoteProduct="Plain Gauges"
				description={pageHeroes.productCategoryHeroes.plainGauges}
			/>

			<section className="py-16 md:py-20 bg-surface-subtle">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-semibold mb-6 text-gray-900">
							What are Plain Gauges?
						</h2>
						<p className="text-lg text-gray-700 mb-6">
							Plain gauges are precision measuring instruments used to verify
							the dimensional accuracy of cylindrical features such as holes,
							shafts, and bores. They are essential tools in manufacturing
							quality control, providing quick and reliable pass/fail inspection
							without the need for complex measuring equipment.
						</p>
						<p className="text-lg text-gray-700 mb-6">
							At DSN Enterprises, we manufacture a comprehensive range of plain
							gauges including plug gauges, ring gauges, setting masters, and
							snap gauges. All our gauges are manufactured using premium grade
							materials and undergo rigorous quality checks to ensure accuracy
							and longevity.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
							<div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-accent">
								<div className="text-3xl font-bold text-primary mb-2">
									1-250mm
								</div>
								<div className="text-gray-600">Size Range</div>
							</div>
							<div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-accent">
								<div className="text-3xl font-bold text-primary mb-2">
									60 HRC
								</div>
								<div className="text-gray-600">Hardness</div>
							</div>
							<div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-accent">
								<div className="text-3xl font-bold text-primary mb-2">
									-80°C
								</div>
								<div className="text-gray-600">Sub-Zero Treated</div>
							</div>
							<div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100 border-l-4 border-l-accent">
								<div className="text-3xl font-bold text-primary mb-2">NABL</div>
								<div className="text-gray-600">Certified</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<section id="products" className="scroll-mt-24 py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-semibold mb-4 text-gray-900">
							Our Plain Gauge Products
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Explore our complete range of high-precision plain gauges designed
							for various industrial applications.
						</p>
					</div>

					<div className="space-y-12">
						{products.map((product, index) => (
							<m.div
								key={product.id}
								className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
									<div className="relative h-64 lg:h-auto min-h-[16rem] bg-gray-100 flex items-center justify-center p-8">
										<Image
											src={product.image}
											alt={product.name}
											fill
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
											className="object-contain p-8"
										/>
									</div>
									<div className="p-8">
										<h3 className="text-2xl font-semibold mb-2 text-gray-900">
											{product.name}
										</h3>
										<p className="text-primary font-medium mb-4">
											{product.specs}
										</p>
										<p className="text-gray-700 mb-6">{product.description}</p>

										<div className="mb-6">
											<h4 className="font-semibold text-gray-900 mb-3">
												Key Features:
											</h4>
											<ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
												{product.features.map((feature) => (
													<li
														key={feature}
														className="flex items-start text-sm"
													>
														<FaCheck className="text-primary mt-1 mr-2 flex-shrink-0" />
														<span className="text-gray-600">{feature}</span>
													</li>
												))}
											</ul>
										</div>

										<div className="mb-6">
											<h4 className="font-semibold text-gray-900 mb-3">
												Applications:
											</h4>
											<div className="flex flex-wrap gap-2">
												{product.applications.map((app) => (
													<span
														key={app}
														className="bg-secondary-light text-gray-700 px-3 py-1 rounded-full text-sm"
													>
														{app}
													</span>
												))}
											</div>
										</div>

										<Link
											href={`/contact?product=${encodeURIComponent(product.name)}`}
											className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
										>
											Request Quote
											<FaArrowRight className="ml-2" />
										</Link>
									</div>
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Specifications */}
			<section className="py-16 bg-surface-muted">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
							Technical Specifications
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							<div className="bg-secondary-light p-8 rounded-lg">
								<h3 className="text-xl font-semibold mb-6 text-gray-900">
									General Specifications
								</h3>
								<table className="w-full">
									<tbody>
										{specifications.map((spec) => (
											<tr
												key={spec.label}
												className="border-b border-gray-200 last:border-0"
											>
												<td className="py-3 text-gray-600">{spec.label}</td>
												<td className="py-3 font-medium text-gray-900">
													{spec.value}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="bg-secondary-light p-8 rounded-lg">
								<h3 className="text-xl font-semibold mb-6 text-gray-900">
									Quality Standards
								</h3>
								<ul className="space-y-3">
									{standards.map((standard) => (
										<li key={standard} className="flex items-start text-sm">
											<span className="text-primary mr-2">•</span>
											<span className="text-gray-700">{standard}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Categories */}
			<section className="py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
						Explore Other Categories
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<Link
							href="/products/thread-gauges"
							className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
						>
							<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
								Thread Gauges
							</h3>
							<p className="text-gray-600 text-sm">
								Precision thread inspection tools for internal and external
								threads
							</p>
						</Link>
						<Link
							href="/products/api-gauges"
							className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
						>
							<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
								API Gauges
							</h3>
							<p className="text-gray-600 text-sm">
								API certified gauges for oil & gas industry applications
							</p>
						</Link>
						<Link
							href="/products/special-gauges"
							className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
						>
							<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
								Special Gauges
							</h3>
							<p className="text-gray-600 text-sm">
								Custom gauges manufactured to your specifications
							</p>
						</Link>
					</div>
				</div>
			</section>

			<Cta10
				reference="Ref. DSN-PLG-01"
				heading="Need Plain Gauges?"
				description="Contact our team for custom sizes, bulk orders, or technical assistance. We offer competitive pricing and fast delivery."
				buttons={{
					primary: { text: "Get a Quote", url: "/contact?product=Plain%20Gauges" },
					secondary: { text: "View Products", url: "/products/plain-gauges" },
				}}
			/>
		</div>
	);
}
