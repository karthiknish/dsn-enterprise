"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { FaCertificate, FaChalkboardTeacher } from "react-icons/fa";
import { UilArrowRight, UilClipboardNotes, UilCog } from "@iconscout/react-unicons";

const offerings = [
	{
		title: "Drawing and tolerance review",
		description:
			"Review of component drawings, thread notes, and gauge schemes before you freeze tooling, limits, PD, and wear allowances aligned to how you inspect on the shop floor.",
		icon: UilClipboardNotes,
	},
	{
		title: "Gauge selection and stack-up",
		description:
			"Help choosing plain, thread, or special gauges and interpreting ISO / IS gauging practice so go / no-go decisions match your process capability.",
		icon: UilCog,
	},
	{
		title: "Calibration and uncertainty advisory",
		description:
			"Guidance on calibration intervals, NABL traceability, and what to expect on certificates when you ship masters or working gauges between sites.",
		icon: FaCertificate,
	},
	{
		title: "Training and shop-floor practice",
		description:
			"Short sessions for inspectors and planners on handling, storage, and interpretation of results, tailored to your standards checklist.",
		icon: FaChalkboardTeacher,
	},
];

export default function ConsultancySection() {
	return (
		<section
			className="py-20 md:py-24 bg-accent-50 border-y border-accent-100 relative"
			aria-labelledby="consultancy-heading"
		>
			<div className="container mx-auto px-4 max-w-6xl">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
					<m.div
						className="lg:col-span-5"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.5 }}
					>
						<h2
							id="consultancy-heading"
							className="text-3xl md:text-4xl font-semibold mb-5 text-gray-900 text-balance leading-tight"
						>
							Engineering support around your gauges
						</h2>
						<p className="text-lg text-gray-700 leading-relaxed max-w-prose mb-8">
							Beyond manufacturing and calibration, our engineers work with your
							drawings and inspection plans so you order the right gauges the
							first time and keep them fit for use in production.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 sm:items-center">
							<Link
								href="/contact"
								className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
							>
								Discuss a brief
								<UilArrowRight className="w-4 h-4" aria-hidden />
							</Link>
							<Link
								href="/services"
								className="inline-flex justify-center text-primary hover:text-primary-dark font-medium py-3 px-2 rounded-md underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
							>
								View all services
							</Link>
						</div>
					</m.div>

					<ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 list-none p-0 m-0">
						{offerings.map((item, index) => {
							const Icon = item.icon;
							return (
								<m.li
									key={item.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{ duration: 0.45, delay: index * 0.06 }}
									className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-accent/25 hover:shadow-md transition-all duration-300 flex flex-col h-full hover:-translate-y-0.5"
								>
									<div
										className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary"
										aria-hidden
									>
										<Icon className="w-6 h-6" aria-hidden />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
										{item.title}
									</h3>
									<p className="text-sm text-gray-600 leading-relaxed grow">
										{item.description}
									</p>
								</m.li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
