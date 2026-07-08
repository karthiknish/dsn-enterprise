"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaChevronRight, FaSearch } from "react-icons/fa";
import { CheckCircle2, Ruler, BadgeCheck, BookOpen } from "lucide-react";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const categories = [
	{
		id: "plain-gauges",
		name: "Plain Gauges",
		description:
			"Master your dimensional inspection with precision plug, ring, snap, and setting gauges, from 1 mm to 250 mm in hardened gauge steel or wear-resistant carbide",
		href: "/products/plain-gauges",
		image: "/images/plain-plug-gauge.png",
		highlights: [
			"Plug Gauges 1-250mm",
			"Ring Gauges 6-125mm",
			"Setting Masters",
			"Snap Gauges",
		],
	},
	{
		id: "thread-gauges",
		name: "Thread Gauges",
		description:
			"Full-spectrum thread inspection across Metric, Unified, BSP, NPT, and custom thread forms, every plug, ring, and setting gauge engineered to class tolerances",
		href: "/products/thread-gauges",
		image: "/images/thread-plug-gauge.png",
		highlights: [
			"Metric & Unified",
			"BSW, BSF, BSP",
			"NPT & NPTF",
			"Setting Plugs",
		],
	},
	{
		id: "api-gauges",
		name: "API Gauges",
		description:
			"API-licensed 5B and 7-2 gauges for critical OCTG, line pipe, and rotary shouldered connections, certified for oilfield compliance",
		href: "/products/api-gauges",
		image: "/images/api-thread-gauge.png",
		highlights: [
			"API 5B Certified",
			"API 7-2 Certified",
			"Casing & Tubing",
			"Rotary Connections",
		],
	},
	{
		id: "special-gauges",
		name: "Special Gauges",
		description:
			"Beyond standard threads, ACME, buttress, spline, and fully custom profiles machined exactly to your drawing",
		href: "/products/special-gauges",
		image: "/images/featured.png",
		highlights: [
			"ACME Thread",
			"Buttress Thread",
			"Spline Gauges",
			"Custom Designs",
		],
	},
];

const products = [
	{
		id: "plain-gauges",
		name: "Plain Gauges",
		description: "High-precision plain gauges for dimensional measurement",
		items: [
			{
				id: "plain-plug-gauge",
				name: "Plain Plug Gauge",
				specs: "1mm to 250mm - OHNS (W) & Carbide",
				description:
					"GO/NO-GO plain plug gauges for precise bore diameter verification, 1 mm to 250 mm range.",
				image: "/images/plain-plug-gauge.png",
			},
			{
				id: "plain-ring-gauge",
				name: "Plain Ring Gauge",
				specs: "6mm to 125mm",
				description:
					"External diameter master gauges for accepting or rejecting shaft OD, 6 mm to 125 mm.",
				image: "/images/plain-ring-gauge.png",
			},
			{
				id: "cylindrical-setting-masters",
				name: "Cylindrical Setting Masters",
				specs: "6mm to 250mm",
				description:
					"Primary reference masters for calibrating your measurement systems, traceable accuracy.",
				image: "/images/cylinder-maters.png",
			},
			{
				id: "cylindrical-measuring-pin",
				name: "Cylindrical Measuring Pin",
				specs: "1mm to 20mm",
				description:
					"Hardened and ground reference pins for comparative dimensional setup and inspection.",
				image: "/images/cylinder-maters.png",
			},
			{
				id: "snap-gauges",
				name: "Snap Gauges",
				specs: "Various sizes available",
				description:
					"Progressive snap gauges for high-speed OD sorting, single-ended design up to 160 mm.",
				image: "/images/snap-gauge.png",
			},
		],
	},
	{
		id: "thread-gauges",
		name: "Thread Gauges",
		description: "High-precision thread gauges for accurate thread measurement",
		items: [
			{
				id: "thread-plug-gauge",
				name: "Thread Plug Gauge",
				specs: "Various thread forms and sizes",
				description:
					"GO/NO-GO thread plug gauges for internal thread acceptance, all major thread forms.",
				image: "/images/thread-plug-gauge.png",
			},
			{
				id: "thread-ring-gauge",
				name: "Thread Ring Gauge",
				specs: "Various thread forms and sizes",
				description:
					"External thread verification rings, adjustable and solid designs for production inspection.",
				image: "/images/thread-ring-gauge.png",
			},
			{
				id: "thread-setting-plug",
				name: "Thread Setting Plug",
				specs: "Various thread forms and sizes",
				description:
					"Master setting plugs to calibrate thread ring gauges to working tolerance.",
				image: "/images/thread-setting-plug-gauge.png",
			},
			{
				id: "taper-thread-gauges",
				name: "Taper Thread Gauges",
				specs: "Various thread forms and sizes",
				description:
					"Tapered thread inspection for pipe connections, valves, and fittings, NPT, BSPT, and API.",
				image: "/images/thread-ring-gauge.png",
			},
		],
	},
	{
		id: "api-gauges",
		name: "API Gauges",
		description: "API 5B & 7-2 certified gauges for oil and gas industry",
		items: [
			{
				id: "api-thread-gauges",
				name: "API Thread Gauges",
				specs: "API 5B & 7-2 certified",
				description:
					"API 5B and 7-2 certified thread gauges for OCTG, casing, tubing, and rotary connections.",
				image: "/images/api-thread-gauge.png",
			},
			{
				id: "api-master-gauges",
				name: "API Master Gauges",
				specs: "API 5B & 7-2 certified",
				description:
					"API reference master gauges for calibrating working gauges in oilfield inspection.",
				image: "/images/api-master-gauge.png",
			},
		],
	},
	{
		id: "special-gauges",
		name: "Special Gauges",
		description: "Custom designed gauges for special applications",
		items: [
			{
				id: "special-custom-gauges",
				name: "Special Gauges as per Drawing",
				specs: "Custom specifications",
				description:
					"Custom gauge solutions machined to your exact drawing, thread, spline, or plain profiles.",
				image: "/images/featured.png",
			},
			{
				id: "acme-thread-gauges",
				name: "ACME Thread Gauges",
				specs: "Various sizes",
				description:
					"ACME and stub ACME thread gauges for lead screw and power transmission inspection.",
				image: "/images/featured.png",
			},
			{
				id: "buttress-thread-gauges",
				name: "Buttress Thread Gauges",
				specs: "Various sizes",
				description:
					"Buttress thread gauges for high-load connection inspection, API and custom profiles.",
				image: "/images/featured.png",
			},
		],
	},
];

const specifications = [
	"Hardness - 60 ± 2HRC",
	"SUB-ZERO Treated - 80°C",
	"NABL Certificate at Extra Cost",
	"Popular Sizes in Ready Stock",
];

const standards = [
	"IS 919 (Part 1, Part 2) 1993 ISO - System of Limits & fits",
	"IS 3455 Gauging Practice for Plain Work Pieces",
	"IS 6244-1980 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 40 to & Including 120mm)",
	"IS 6137-1983 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 1 to & Including 40mm)",
	"IS 3485 - Specification for Plain & Master Setting Ring Gauges (Size- Range From 1 to & Including 315mm)",
	"IS 8023 - Single Ended Progressive Type Plate Snap Gauges (Upto 160mm)",
];

const ProductsPage = () => {
	const [activeCategory, setActiveCategory] = useState("plain-gauges");
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProducts = searchTerm
		? products.flatMap((category) => {
				const term = searchTerm.toLowerCase();
				const items = category.items.filter(
					(item) =>
						item.name.toLowerCase().includes(term) ||
						item.description.toLowerCase().includes(term),
				);
				return items.length > 0 ? [{ ...category, items }] : [];
			})
		: products;

	return (
		<div>
			<PageHero
				eyebrow="Products"
				title="Our Products"
				description={pageHeroes.products}
			>
				<div className="relative max-w-xl w-full mx-auto">
					<input
						type="search"
						placeholder="Search products..."
						aria-label="Search products"
						className="w-full px-5 py-3 pr-12 rounded-full text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FaSearch
						className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
						aria-hidden
					/>
				</div>
			</PageHero>

			{/* Product Category Cards */}
			<section className="py-16 md:py-20 bg-secondary-light relative overflow-hidden">
				<div
					className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
					aria-hidden
				/>
				<div className="container mx-auto px-4">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
							Browse by Category
						</h2>
						<p className="text-lg text-text-body max-w-2xl mx-auto">
							Select a category to explore specifications, standards, and
							available configurations, or use the search above to find a
							specific product.
						</p>
					</m.div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Featured category - spans 2 cols, taller */}
						<m.div
							className="lg:col-span-2 lg:row-span-2"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45 }}
						>
							<Link
								href={categories[0].href}
								className="group flex flex-col md:flex-row h-full bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
							>
								<div className="relative h-64 md:h-auto md:w-1/2 bg-[linear-gradient(135deg,#f6f8f4_0%,#e8ede3_100%)] overflow-hidden shrink-0">
									<div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent z-10 pointer-events-none md:hidden" />
									<Image
										src={categories[0].image}
										alt={categories[0].name}
										fill
										sizes="(min-width: 1024px) 40vw, 100vw"
										className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
									/>
								</div>
								<div className="p-6 md:p-8 flex flex-col justify-center flex-1">
									<span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
										Most requested
									</span>
									<div className="flex items-start justify-between mb-2">
										<h3 className="text-2xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
											{categories[0].name}
										</h3>
										<span className="text-accent/60 group-hover:text-accent transition-colors duration-300 mt-1">
											<FaArrowRight className="text-sm" />
										</span>
									</div>
									<p className="text-text-body text-sm leading-relaxed mb-4 max-w-md">
										{categories[0].description}
									</p>
									<div className="flex flex-wrap gap-1.5 mb-4">
										{categories[0].highlights.map((item) => (
											<span
												key={`${categories[0].id}-${item}`}
												className="inline-block text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full"
											>
												{item}
											</span>
										))}
									</div>
									<span className="inline-flex items-center text-sm font-medium text-accent group-hover:translate-x-1 transition-transform duration-300">
										View Products
										<FaChevronRight className="ml-1 text-[10px]" />
									</span>
								</div>
							</Link>
						</m.div>

						{/* Remaining categories - compact tiles */}
						{categories.slice(1).map((category, index) => (
							<m.div
								key={category.id}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: (index + 1) * 0.06 }}
							>
								<Link
									href={category.href}
									className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full p-4"
								>
									<div className="relative h-20 w-20 shrink-0 rounded-xl bg-[linear-gradient(135deg,#f6f8f4_0%,#e8ede3_100%)] overflow-hidden">
										<Image
											src={category.image}
											alt={category.name}
											fill
											sizes="80px"
											className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-start justify-between gap-2 mb-1">
											<h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 truncate">
												{category.name}
											</h3>
											<span className="text-accent/60 group-hover:text-accent transition-colors duration-300 shrink-0 mt-0.5">
												<FaArrowRight className="text-xs" />
											</span>
										</div>
										<p className="text-text-body text-xs leading-relaxed line-clamp-2">
											{category.description}
										</p>
									</div>
								</Link>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Product Categories Tabs */}
			<section className="py-16 md:py-20 bg-surface-subtle">
				<div className="container mx-auto px-4">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-8"
					>
						<h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
							Quick Product Overview
						</h2>
						<p className="text-lg text-text-body max-w-2xl mx-auto">
							Browse our complete range of precision gauges, filter by category
							to find exactly what you need.
						</p>
					</m.div>

					<div className="flex flex-wrap justify-center mb-10 gap-2">
						{products.map((category) => (
							<button
								key={category.id}
								type="button"
								className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
									activeCategory === category.id && !searchTerm
										? "bg-primary text-white shadow-md shadow-primary/20"
										: "bg-white text-text-body hover:text-primary hover:bg-primary/5 border border-gray-200/60"
								}`}
								onClick={() => setActiveCategory(category.id)}
							>
								{category.name}
							</button>
						))}
					</div>

					{filteredProducts.length === 0 && searchTerm ? (
						<m.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-16 max-w-md mx-auto"
						>
							<div className="w-16 h-16 rounded-2xl bg-surface-muted flex items-center justify-center mx-auto mb-5">
								<FaSearch className="text-2xl text-text-muted" aria-hidden />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								No products found for &quot;{searchTerm}&quot;
							</h3>
							<p className="text-text-body mb-6">
								Try a different search term or browse all product categories
								below.
							</p>
							<button
								type="button"
								onClick={() => setSearchTerm("")}
								className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
							>
								Clear search
							</button>
						</m.div>
					) : (
						filteredProducts.map((category) => (
							<div
								key={category.id}
								className={
									activeCategory === category.id || searchTerm
										? "block"
										: "hidden"
								}
							>
								<div className="mb-12">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-1 h-6 bg-accent rounded-full" />
										<h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
											{category.name}
										</h2>
									</div>
									<p className="text-text-body ml-4 mb-8 max-w-3xl">
										{category.description}
									</p>

									<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
										{/* Lead item - larger spotlight tile */}
										<m.div
											className="lg:col-span-2 lg:row-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group flex flex-col md:flex-row"
											initial={{ opacity: 0, y: 24 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-30px" }}
											transition={{ duration: 0.45 }}
										>
											<div className="relative h-56 md:h-auto md:w-1/2 bg-secondary-light overflow-hidden shrink-0">
												<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 z-10 pointer-events-none md:hidden" />
												<Image
													className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
													src={category.items[0].image}
													alt={category.items[0].name}
													fill
													sizes="(min-width: 1024px) 40vw, 100vw"
												/>
											</div>
											<div className="p-6 md:p-8 flex flex-col justify-center flex-1">
												<span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-3 w-fit">
													{category.items[0].specs}
												</span>
												<h3 className="text-xl font-semibold mb-2 text-gray-900">
													{category.items[0].name}
												</h3>
												<p className="text-text-body text-sm leading-relaxed mb-5 max-w-md">
													{category.items[0].description}
												</p>
												<div className="flex gap-4 pt-3 border-t border-gray-100">
													<Link
														href={`/contact?product=${encodeURIComponent(
															category.items[0].name,
														)}`}
														className="text-accent hover:text-accent-dark font-medium text-sm inline-flex items-center gap-1.5 group/link"
													>
														Request Quote
														<FaArrowRight className="text-[10px] group-hover/link:translate-x-0.5 transition-transform" />
													</Link>
													<Link
														href={`/products/${category.id}`}
														className="text-text-muted hover:text-primary font-medium text-sm inline-flex items-center gap-1 group/link"
													>
														View All
														<FaChevronRight className="text-[10px] group-hover/link:translate-x-0.5 transition-transform" />
													</Link>
												</div>
											</div>
										</m.div>

										{/* Remaining items - compact tiles */}
										{category.items.slice(1).map((item, index) => (
											<m.div
												key={item.id}
												className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex"
												initial={{ opacity: 0, y: 24 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true, margin: "-30px" }}
												transition={{
													duration: 0.45,
													delay: (index + 1) * 0.06,
												}}
											>
												<div className="relative w-32 shrink-0 bg-secondary-light overflow-hidden">
													<Image
														className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
														src={item.image}
														alt={item.name}
														fill
														sizes="130px"
													/>
												</div>
												<div className="p-4 flex-1 min-w-0">
													<span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2">
														{item.specs}
													</span>
													<h3 className="text-base font-semibold mb-1.5 text-gray-900">
														{item.name}
													</h3>
													<p className="text-text-body text-xs leading-relaxed mb-3 line-clamp-2">
														{item.description}
													</p>
													<div className="flex gap-3">
														<Link
															href={`/contact?product=${encodeURIComponent(
																item.name,
															)}`}
															className="text-accent hover:text-accent-dark font-medium text-xs inline-flex items-center gap-1 group/link"
														>
															Request Quote
															<FaArrowRight className="text-[9px] group-hover/link:translate-x-0.5 transition-transform" />
														</Link>
														<Link
															href={`/products/${category.id}`}
															className="text-text-muted hover:text-primary font-medium text-xs inline-flex items-center gap-1 group/link"
														>
															View All
															<FaChevronRight className="text-[9px] group-hover/link:translate-x-0.5 transition-transform" />
														</Link>
													</div>
												</div>
											</m.div>
										))}
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</section>

			{/* Specifications */}
			<section className="py-16 md:py-20 bg-primary relative overflow-hidden">
				<div
					className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_40px]"
					aria-hidden
				/>
				<div
					className="absolute inset-0 bg-gradient-to-br from-primary-dark/40 via-transparent to-black/10 pointer-events-none"
					aria-hidden
				/>
				<div className="relative z-10">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12 px-4"
					>
						<h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
							Product Specifications
						</h2>
						<p className="text-lg text-white max-w-2xl mx-auto">
							Every gauge we manufacture meets rigorous internal standards for
							material, hardness, and dimensional accuracy.
						</p>
					</m.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
						<m.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden"
						>
							<div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
								<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10">
									<Ruler className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
								</div>
								<div>
									<h3 className="text-base font-semibold text-gray-900">
										General Specifications
									</h3>
									<p className="text-xs text-gray-500">
										Manufacturing standards
									</p>
								</div>
							</div>
							<div className="divide-y divide-gray-50">
								{specifications.map((spec) => {
									const parts = spec.split(" - ");
									return (
										<div key={spec} className="flex items-center gap-3 px-6 py-3.5">
											<CheckCircle2 className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
											<div>
												{parts.length > 1 ? (
													<>
														<span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{parts[0]}</span>
														<p className="text-sm text-gray-700">{parts.slice(1).join(" - ")}</p>
													</>
												) : (
													<span className="text-sm text-gray-700">{spec}</span>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</m.div>

						<m.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden"
						>
							<div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
								<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10">
									<BookOpen className="w-4.5 h-4.5 text-accent" strokeWidth={1.5} />
								</div>
								<div>
									<h3 className="text-base font-semibold text-gray-900">
										Quality Standards Practiced
									</h3>
									<p className="text-xs text-gray-500">
										Indian & international standards
									</p>
								</div>
							</div>
							<div className="divide-y divide-gray-50">
								{standards.map((standard) => (
									<div key={standard} className="flex items-start gap-3 px-6 py-3.5">
										<BadgeCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
										<span className="text-sm text-gray-700 leading-relaxed">{standard}</span>
									</div>
								))}
							</div>
						</m.div>
					</div>

					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-center mt-10 px-4"
					>
						<p className="text-white text-sm">
							All gauges manufactured at our Coimbatore facility with full
							traceability and material certification.
						</p>
					</m.div>
				</div>
			</section>

			<Cta10
				heading="Need a Custom Solution?"
				description="We specialize in manufacturing custom gauges according to your specific requirements. Contact us today to discuss your needs."
				buttons={{
					primary: { text: "Contact Us", url: "/contact" },
					secondary: { text: "Request Quote", url: "/contact?subject=custom-gauge" },
				}}
			/>
		</div>
	);
};

export default ProductsPage;
