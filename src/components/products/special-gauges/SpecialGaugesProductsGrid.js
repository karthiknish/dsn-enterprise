"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { products } from "@/content/special-gauges-data";

export default function SpecialGaugesProductsGrid() {
	return (
		<section id="products" className="scroll-mt-24 py-16 bg-secondary-light">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-semibold mb-4 text-gray-900">
						Our Special Gauge Products
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Explore our range of specialty gauges and custom manufacturing
						capabilities.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{products.map((product, index) => (
						<m.div
							key={product.id}
							className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
						>
							<div className="p-6">
								<h3 className="text-xl font-semibold mb-2 text-gray-900">
									{product.name}
								</h3>
								<p className="text-primary font-medium mb-3 text-sm">
									{product.specs}
								</p>
								<p className="text-gray-700 text-sm mb-4">{product.description}</p>

								<div className="mb-4">
									<h4 className="font-semibold text-gray-900 mb-2 text-sm">
										Key Features:
									</h4>
									<ul className="grid grid-cols-2 gap-1">
										{product.features.map((feature) => (
											<li key={feature} className="flex items-start text-xs">
												<FaCheck className="text-primary mt-0.5 mr-1 flex-shrink-0 text-xs" />
												<span className="text-gray-600">{feature}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="flex flex-wrap gap-1 mb-4">
									{product.applications.map((app) => (
										<span
											key={app}
											className="bg-secondary-light text-gray-700 px-2 py-1 rounded text-xs"
										>
											{app}
										</span>
									))}
								</div>

								<Link
									href={`/contact?product=${encodeURIComponent(product.name)}`}
									className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
								>
									Request Quote
									<FaArrowRight className="ml-2" />
								</Link>
							</div>
						</m.div>
					))}
				</div>
			</div>
		</section>
	);
}
