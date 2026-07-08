"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { UilArrowRight, UilCheck } from "@iconscout/react-unicons";
import { products } from "@/content/api-gauges-data";

export default function ApiGaugesProductsGrid() {
	return (
		<section id="products" className="scroll-mt-24 py-16 bg-secondary-light">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-semibold mb-4 text-gray-900">
						Our API Gauge Products
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Complete range of API certified gauges for oil and gas industry
						thread inspection and quality control.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{products.map((product, index) => (
						<m.div
							key={product.id}
							className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<div className="relative h-48 bg-gray-100 flex items-center justify-center p-6">
								<Image
									src={product.image}
									alt={product.name}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
									className="object-contain p-6"
								/>
							</div>
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
									<ul className="space-y-1">
										{product.features.slice(0, 3).map((feature) => (
											<li key={feature} className="flex items-start text-sm">
												<UilCheck className="w-3.5 h-3.5 text-primary mt-1 mr-2 flex-shrink-0" />
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
									<UilArrowRight className="ml-2 w-4 h-4" />
								</Link>
							</div>
						</m.div>
					))}
				</div>
			</div>
		</section>
	);
}
