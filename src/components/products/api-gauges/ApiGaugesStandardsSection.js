"use client";

import { FaIndustry, FaOilCan } from "react-icons/fa";
import { specifications } from "@/content/api-gauges-data";

export default function ApiGaugesStandardsSection() {
	return (
		<section className="py-16 bg-surface-muted">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
						API Standards & Specifications
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<div className="bg-secondary-light p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-4 text-gray-900">
								API Specification 5B
							</h3>
							<p className="text-gray-700 mb-4">
								Covers threading, gauging, and thread inspection of casing,
								tubing, and line pipe threads. Includes requirements for:
							</p>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>• Round threads (8 TPI for casing, 10 TPI for tubing)</li>
								<li>• Buttress threads (5 TPI)</li>
								<li>• Line pipe threads (NPT)</li>
								<li>• Working and reference gauges</li>
								<li>• L1, L2, L3 gauge lengths</li>
							</ul>
						</div>

						<div className="bg-secondary-light p-6 rounded-lg">
							<h3 className="text-xl font-semibold mb-4 text-gray-900">
								API Specification 7-2
							</h3>
							<p className="text-gray-700 mb-4">
								Covers threading and gauging of rotary shouldered thread
								connections used on drill pipe and BHA. Includes:
							</p>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>• NC (Numbered Connection) threads</li>
								<li>• IF (Internal Flush) connections</li>
								<li>• REG (Regular) connections</li>
								<li>• FH (Full Hole) connections</li>
								<li>• Standoff and pitch diameter gauges</li>
							</ul>
						</div>
					</div>

					<div className="bg-secondary-light p-8 rounded-lg">
						<h3 className="text-xl font-semibold mb-6 text-gray-900">
							Technical Specifications
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<table className="w-full">
								<tbody>
									{specifications.map((spec) => (
										<tr
											key={spec.label}
											className="border-b border-gray-200 last:border-0"
										>
											<td className="py-3 text-gray-600">{spec.label}</td>
											<td className="py-3 font-medium text-gray-900">
												{spec.value}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div>
								<h4 className="font-semibold text-gray-900 mb-3">
									Industries Served:
								</h4>
								<ul className="space-y-2 text-gray-700">
									<li className="flex items-center">
										<FaOilCan className="text-primary mr-2" />
										Oil & Gas Exploration
									</li>
									<li className="flex items-center">
										<FaIndustry className="text-primary mr-2" />
										Drilling Operations
									</li>
									<li className="flex items-center">
										<FaOilCan className="text-primary mr-2" />
										OCTG Manufacturing
									</li>
									<li className="flex items-center">
										<FaIndustry className="text-primary mr-2" />
										Pipe & Tube Mills
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
