import { FaCheck } from "react-icons/fa";
import { specifications } from "@/content/special-gauges-data";

const capabilities = [
	{
		title: "CNC Turning & Milling",
		description: "High-precision multi-axis machining",
	},
	{
		title: "Wire EDM",
		description: "Complex profiles and tight tolerances",
	},
	{
		title: "Precision Grinding",
		description: "Cylindrical and surface grinding",
	},
	{
		title: "Lapping & Honing",
		description: "Mirror finish and precise sizing",
	},
];

export default function SpecialGaugesSpecsSection() {
	return (
		<section className="py-16 bg-surface-muted">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
						Technical Specifications
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-secondary-light p-8 rounded-lg">
							<h3 className="text-xl font-semibold mb-6 text-gray-900">
								General Specifications
							</h3>
							<table className="w-full">
								<tbody>
									{specifications.map((spec) => (
										<tr
											key={spec.label}
											className="border-b border-gray-200 last:border-0"
										>
											<td className="py-3 text-gray-600 text-sm">{spec.label}</td>
											<td className="py-3 font-medium text-gray-900 text-sm">
												{spec.value}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="bg-secondary-light p-8 rounded-lg">
							<h3 className="text-xl font-semibold mb-6 text-gray-900">
								Manufacturing Capabilities
							</h3>
							<ul className="space-y-3">
								{capabilities.map((cap) => (
									<li key={cap.title} className="flex items-start">
										<FaCheck className="text-primary mt-1 mr-3" />
										<div>
											<span className="font-medium text-gray-900">
												{cap.title}
											</span>
											<p className="text-gray-600 text-sm">{cap.description}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
