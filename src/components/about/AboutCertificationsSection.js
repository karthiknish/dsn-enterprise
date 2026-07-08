"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FaAward, FaCertificate, FaSearchPlus } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const featured = {
	image: "/images/certificates/API-5B-0039-2023_page-0001.jpg",
	alt: "API 5B Certificate, licensed thread gauge manufacturing",
	icon: FaAward,
	title: "API 5B Certificate",
	description:
		"Licensed manufacturing for API 5B thread gauging, used on casing, tubing, and line pipe connections across oil and gas supply chains.",
};

const certifications = [
	{
		image: "/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg",
		alt: "NABL Accreditation, traceable calibration laboratory",
		icon: FaCertificate,
		title: "NABL Accreditation",
		description:
			"NABL-accredited calibration laboratory delivering traceable results accepted in ISO audits and customer source inspections.",
	},
	{
		image: "/images/certificates/api72.jpg",
		alt: "API 7-2 Certificate, rotary shouldered connection gauges",
		icon: FaAward,
		title: "API 7-2 Certificate",
		description:
			"API 7-2 licensing for rotary shouldered connection gauges, used on drill string and heavy-duty threading programmes.",
	},
	{
		image: "/images/certificates/isocert.jpg",
		alt: "ISO 9001:2015, quality management certification",
		icon: FaCertificate,
		title: "ISO 9001:2015",
		description:
			"Quality management system covering design, manufacture, calibration, and customer feedback loops, audited and certified.",
	},
];

export default function AboutCertificationsSection() {
	return (
		<PageSection variant="secondary" bordered>
			<span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-white border border-gray-200/80 rounded-full px-3 py-1">
				Credentials
			</span>

			<SectionHeader
				title="Our Certifications"
				description="Accreditations that underpin your audits, customer approvals, and OCTG programmes."
				align="left"
			/>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
				{/* Featured certificate */}
				<m.div
					className="group lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 lg:grid lg:grid-cols-2"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-30px" }}
					transition={{ duration: 0.45 }}
				>
					<div className="relative h-64 lg:h-full w-full overflow-hidden">
						<Image
							src={featured.image}
							alt={featured.alt}
							fill
							sizes="(max-width: 1024px) 100vw, 33vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							aria-hidden
						/>
						<div
							className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							aria-hidden
						>
							<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-gray-900 text-sm font-medium shadow-lg backdrop-blur-sm">
								<FaSearchPlus className="text-xs" />
								View Certificate
							</span>
						</div>
					</div>

					<div className="p-8 md:p-10 flex flex-col justify-center">
						<div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
							<featured.icon className="text-lg" />
						</div>
						<h3 className="text-2xl font-semibold text-gray-900 mb-3">
							{featured.title}
						</h3>
						<p className="text-base text-gray-600 leading-relaxed">
							{featured.description}
						</p>
					</div>
				</m.div>

				{/* Supporting certificates, stacked bordered rows */}
				<div className="lg:col-span-2 flex flex-col gap-4">
					{certifications.map((cert, index) => (
						<m.div
							key={cert.title}
							className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-stretch"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45, delay: (index + 1) * 0.06 }}
						>
							<div className="relative w-28 sm:w-32 flex-shrink-0 overflow-hidden">
								<Image
									src={cert.image}
									alt={cert.alt}
									fill
									sizes="128px"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div className="p-5 flex-1 min-w-0">
								<div className="flex items-center gap-3 mb-2">
									<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
										<cert.icon className="text-sm" />
									</div>
									<h3 className="text-base font-semibold text-gray-900 leading-tight">
										{cert.title}
									</h3>
								</div>
								<p className="text-sm text-gray-600 leading-relaxed">
									{cert.description}
								</p>
							</div>
						</m.div>
					))}
				</div>
			</div>
		</PageSection>
	);
}
