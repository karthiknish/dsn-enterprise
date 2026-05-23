"use client";

import { m } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";

export default function AboutStorySection() {
	return (
		<PageSection variant="white">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<m.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl font-semibold mb-6 text-gray-900">Our Story</h2>
					<p className="text-lg text-gray-700 mb-6">
						DSN Enterprises was founded to give Indian manufacturers a
						dependable source for plain, thread, and API gauges,built to drawing,
						delivered with certificates, and supported by engineers who understand
						shop-floor pressure.
					</p>
					<p className="text-lg text-gray-700 mb-6">
						From our Coimbatore works we combine CNC machining, precision grinding,
						and controlled heat treatment with a NABL-aligned calibration
						laboratory. That integration means fewer hand-offs between production,
						inspection, and documentation.
					</p>
					<p className="text-lg text-gray-700">
						Today we supply plants across Tamil Nadu, national OEM and job-shop
						networks, and export customers who need the same rigour on every
						shipment.
					</p>
				</m.div>

				<m.div
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<div className="bg-gray-50 rounded-2xl border border-gray-200/80 p-8">
						<h3 className="text-2xl font-semibold mb-6 text-gray-900">
							Our Core Values
						</h3>
						<ul className="space-y-4">
							{[
								{
									title: "Quality",
									body: "Every gauge is made to agreed tolerances, inspected, and documented,so acceptance on your line matches what we ship.",
								},
								{
									title: "Innovation",
									body: "We invest in tooling, process control, and application know-how for demanding thread forms and custom profiles.",
								},
								{
									title: "Customer Satisfaction",
									body: "We respond with clear lead times, technical clarity, and gauges that fit your quality plan,not generic catalogue lines.",
								},
								{
									title: "Integrity",
									body: "We stand behind our measurements and certificates. If a gauge is not fit for use, we say so before it reaches your floor.",
								},
							].map((value) => (
								<li key={value.title} className="flex items-start">
									<FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
									<div>
										<h4 className="font-semibold text-gray-900">{value.title}</h4>
										<p className="text-gray-700">{value.body}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</m.div>
			</div>
		</PageSection>
	);
}
