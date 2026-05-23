"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

const products = [
	{
		id: 1,
		name: "Plain Plug Gauges",
		description:
			"1mm to 250mm - OHNS (W) & Carbide, hardness 60 ± 2HRC, SUB-ZERO treated.",
		specs: "1mm to 250mm",
		image: "/images/plain-plug-gauge.png",
		link: "/products#plain-gauges",
	},
	{
		id: 2,
		name: "Plain Ring Gauges",
		description:
			"Precision ring gauges for accurate shaft measurement, available in various sizes.",
		specs: "6mm to 125mm",
		image: "/images/plain-ring-gauge.png",
		link: "/products#plain-gauges",
	},
	{
		id: 3,
		name: "Cylindrical Setting Masters",
		description:
			"Master setting gauges for calibration and reference, manufactured to high precision.",
		specs: "6mm to 250mm",
		image: "/images/cylinder-maters.png",
		link: "/products#plain-gauges",
	},
	{
		id: 4,
		name: "Snap Gauges",
		description:
			"Quick and accurate external dimension measurement, custom specifications available.",
		specs: "Various sizes",
		image: "/images/snap-gauge.png",
		link: "/products#special-gauges",
	},
	{
		id: 5,
		name: "Thread Plug Gauges",
		description:
			"Precision thread plug gauges for accurate measurement and inspection of internal threads.",
		specs: "Various thread sizes",
		image: "/images/thread-plug-gauge.png",
		link: "/products#thread-gauges",
	},
	{
		id: 6,
		name: "Thread Ring Gauges",
		description:
			"High-quality thread ring gauges for external thread verification and calibration.",
		specs: "Various thread sizes",
		image: "/images/thread-ring-gauge.png",
		link: "/products#thread-gauges",
	},
	{
		id: 7,
		name: "API Master Gauges",
		description: "Reference gauges for calibration and API applications.",
		specs: "API 5B & 7-2 certified",
		image: "/images/api-master-gauge.png",
		link: "/products#api-gauges",
	},
];

const FeaturedProducts = () => {
	return (
		<section id="products" className="py-20 md:py-24 bg-surface-muted relative">
			<div
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
				aria-hidden
			/>
			<div className="container mx-auto px-4">
				<SectionHeader
					eyebrow="Products"
					title="Our Featured Products"
					description="Our company supplies precision measuring instruments engineered for industrial applications. Distribution and after‑sales support are provided via our trusted partner, Unik Gauges, located in Pune."
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
					{products.map((product, index) => (
						<motion.article
							key={product.id}
							className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45, delay: index * 0.05 }}
						>
							<div className="relative h-44 bg-secondary-light/50 p-6 flex items-center justify-center overflow-hidden">
								<Image
									src={product.image}
									alt={product.name}
									width={200}
									height={160}
									className="object-contain max-h-full w-auto transition-transform duration-500 group-hover:scale-105"
								/>
								<span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-primary/70 bg-white/90 px-2 py-1 rounded-md">
									{product.specs}
								</span>
							</div>
							<div className="p-6">
								<h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
									{product.name}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed mb-4">
									{product.description}
								</p>
								<Link
									href={product.link}
									className="text-sm font-medium text-accent hover:text-accent-dark inline-flex items-center gap-1"
								>
									Learn more
									<span
										className="transition-transform group-hover:translate-x-0.5"
										aria-hidden
									>
										→
									</span>
								</Link>
							</div>
						</motion.article>
					))}
				</div>

				<div className="text-center mt-14">
					<Link
						href="#contact"
						className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98]"
					>
						Contact Now
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;
