"use client";

import { m } from "framer-motion";
import { FaCertificate } from "react-icons/fa";
import { certifications } from "@/content/api-gauges-data";

export default function ApiGaugesCertificationsSection() {
	return (
		<section className="py-12 bg-secondary-light">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{certifications.map((cert, certIndex) => (
							<m.div
								key={cert.name}
								className="bg-white p-6 rounded-lg shadow-md flex items-start"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: certIndex * 0.1 }}
							>
								<FaCertificate className="text-4xl text-primary mr-4 flex-shrink-0" />
								<div>
									<h3 className="text-xl font-semibold text-gray-900">
										{cert.name}
									</h3>
									<p className="text-primary font-medium">
										License #{cert.number}
									</p>
									<p className="text-gray-600 text-sm mt-1">
										{cert.description}
									</p>
								</div>
							</m.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
