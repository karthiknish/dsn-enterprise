"use client";

import { apiConnections } from "@/content/api-gauges-data";

export default function ApiGaugesIntroSection() {
	return (
		<section className="py-16 bg-surface-subtle">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-semibold mb-6 text-gray-900">
						What are API Gauges?
					</h2>
					<p className="text-lg text-gray-700 mb-6">
						API (American Petroleum Institute) gauges are specialized thread
						gauges designed for the oil and gas industry. They are used to
						inspect thread connections on casing, tubing, drill pipe, and other
						oilfield equipment to ensure safe and reliable connections under
						extreme downhole conditions.
					</p>
					<p className="text-lg text-gray-700 mb-6">
						DSN Enterprises is a licensed API manufacturer (API 5B-0039 and API
						7-2-0023), producing certified gauges for petroleum industry
						applications. Our API gauges are manufactured to strict API
						specifications and undergo rigorous quality control to ensure
						compliance with industry standards.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
						{apiConnections.map((conn) => (
							<div
								key={conn.type}
								className="bg-secondary-light p-6 rounded-lg"
							>
								<div className="flex items-center mb-4">
									<conn.icon className="text-3xl text-primary mr-3" />
									<h3 className="text-xl font-semibold text-gray-900">
										{conn.type}
									</h3>
								</div>
								<div className="flex flex-wrap gap-2">
									{conn.items.map((item) => (
										<span
											key={item}
											className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm"
										>
											{item}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
