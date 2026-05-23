const processSteps = [
	{ step: "1", title: "Consultation", detail: "Review your requirements and specifications" },
	{ step: "2", title: "Design", detail: "Engineering design and approval" },
	{ step: "3", title: "Manufacturing", detail: "Precision manufacturing and QC" },
	{ step: "4", title: "Delivery", detail: "Calibration and documentation" },
];

export default function SpecialGaugesIntroSection() {
	return (
		<section className="py-16 bg-surface-subtle">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-semibold mb-6 text-gray-900">
						Specialty & Custom Gauge Solutions
					</h2>
					<p className="text-lg text-gray-700 mb-6">
						Not all measurement challenges can be solved with standard gauges. DSN
						Enterprises specializes in manufacturing specialty gauges for unique
						thread forms, complex profiles, and custom applications. Our
						engineering team works closely with customers to develop precision
						gauging solutions for their specific requirements.
					</p>
					<p className="text-lg text-gray-700 mb-6">
						Whether you need ACME thread gauges for power transmission, buttress
						threads for high-load applications, spline gauges for automotive
						drivetrains, or completely custom gauges manufactured to your
						drawings, we have the expertise and equipment to deliver.
					</p>

					<div className="bg-secondary-light p-6 rounded-lg mt-8">
						<h3 className="text-xl font-semibold mb-4 text-gray-900">
							Our Custom Gauge Process
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							{processSteps.map((item) => (
								<div key={item.step} className="text-center">
									<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
										{item.step}
									</div>
									<h4 className="font-semibold text-gray-900 text-sm">
										{item.title}
									</h4>
									<p className="text-gray-600 text-xs">{item.detail}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
