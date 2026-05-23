"use client";

import { m } from "framer-motion";
import { specialCapabilities } from "@/content/special-gauges-data";

export default function SpecialGaugesCapabilitiesSection() {
	return (
		<section className="py-12 bg-secondary-light">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{specialCapabilities.map((cap, capIndex) => (
							<m.div
								key={cap.title}
								className="bg-white p-6 rounded-lg shadow-md text-center"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: capIndex * 0.1 }}
							>
								<cap.icon className="text-4xl text-primary mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{cap.title}
								</h3>
								<p className="text-gray-600 text-sm">{cap.description}</p>
							</m.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
