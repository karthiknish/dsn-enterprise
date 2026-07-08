export default function ContactPageBenefits() {
	return (
		<div className="bg-secondary-light p-8 rounded-lg">
			<h3 className="text-2xl font-semibold mb-6 text-gray-900">
				Why Choose DSN Enterprises?
			</h3>
			<ul className="space-y-4">
				<li className="flex items-start">
					<span className="text-primary mr-2">✓</span>
					<div>
						<h4 className="font-semibold text-gray-900">Quality Assurance</h4>
						<p className="text-gray-700">
							ISO 9001 systems, NABL calibration, and API programmes where your
							industry requires licensed gauging.
						</p>
					</div>
				</li>
				<li className="flex items-start">
					<span className="text-primary mr-2">✓</span>
					<div>
						<h4 className="font-semibold text-gray-900">Expert Consultation</h4>
						<p className="text-gray-700">
							Gauge engineers help you choose member type, material, and
							tolerance class before you order.
						</p>
					</div>
				</li>
				<li className="flex items-start">
					<span className="text-primary mr-2">✓</span>
					<div>
						<h4 className="font-semibold text-gray-900">Custom Solutions</h4>
						<p className="text-gray-700">
							Special and drawing-based gauges with feasibility review and
							first-article support when needed.
						</p>
					</div>
				</li>
				<li className="flex items-start">
					<span className="text-primary mr-2">✓</span>
					<div>
						<h4 className="font-semibold text-gray-900">Prompt Delivery</h4>
						<p className="text-gray-700">
							Scheduled dispatch across Tamil Nadu; express calibration and
							manufacturing when your line is down.
						</p>
					</div>
				</li>
				<li className="flex items-start">
					<span className="text-primary mr-2">✓</span>
					<div>
						<h4 className="font-semibold text-gray-900">After-Sales Support</h4>
						<p className="text-gray-700">
							Recall calibration, repair, and technical advice for the life of
							your gauge programme.
						</p>
					</div>
				</li>
			</ul>

			<div className="mt-8 p-6 bg-secondary rounded-lg">
				<h4 className="font-semibold text-gray-900 mb-2">Ready Stock Available</h4>
				<p className="text-gray-700">
					Selected standard sizes may be available for quick dispatch. Ask for
					current stock when your requirement is urgent.
				</p>
			</div>
		</div>
	);
}
