"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FaAward, FaCertificate, FaSearchPlus } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const certifications = [
	{
		image: "/images/certificates/API-5B-0039-2023_page-0001.jpg",
		alt: "API 5B Certificate, licensed thread gauge manufacturing",
		icon: FaAward,
		title: "API 5B Certificate",
		description:
			"Licensed manufacturing for API 5B thread gauging, used on casing, tubing, and line pipe connections across oil and gas supply chains.",
		delay: 0,
	},
	{
		image: "/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg",
		alt: "NABL Accreditation, traceable calibration laboratory",
		icon: FaCertificate,
		title: "NABL Accreditation",
		description:
			"NABL-accredited calibration laboratory delivering traceable results accepted in ISO audits and customer source inspections.",
		delay: 0.1,
	},
	{
		image: "/images/certificates/api72.jpg",
		alt: "API 7-2 Certificate, rotary shouldered connection gauges",
		icon: FaAward,
		title: "API 7-2 Certificate",
		description:
			"API 7-2 licensing for rotary shouldered connection gauges, used on drill string and heavy-duty threading programmes.",
		delay: 0.2,
	},
	{
		image: "/images/certificates/isocert.jpg",
		alt: "ISO 9001:2015, quality management certification",
		icon: FaCertificate,
		title: "ISO 9001:2015",
		description:
			"Quality management system covering design, manufacture, calibration, and customer feedback loops, audited and certified.",
		delay: 0.3,
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

export default function AboutCertificationsSection() {
	return (
		<PageSection variant="secondary" bordered>
			<SectionHeader
				eyebrow="Credentials"
				title="Our Certifications"
				description="Accreditations that underpin your audits, customer approvals, and OCTG programmes."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
				{certifications.map((cert) => (
					<m.div
						key={cert.title}
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: cert.delay }}
						className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
					>
						{/* Image with hover overlay */}
						<div className="relative h-64 w-full overflow-hidden">
							<Image
								src={cert.image}
								alt={cert.alt}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							{/* Gradient overlay */}
							<div
								className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								aria-hidden
							/>
							{/* View Certificate label on hover */}
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

						{/* Content */}
						<div className="p-6 lg:p-7">
							<div className="flex items-start gap-4 mb-3">
								<div className="w-10 h-10 rounded-lg bg-primary/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
									<cert.icon className="text-primary text-lg" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 leading-tight pt-1">
									{cert.title}
								</h3>
							</div>
							<p className="text-sm text-gray-600 leading-relaxed ml-14">
								{cert.description}
							</p>
						</div>
					</m.div>
				))}
			</div>
		</PageSection>
	);
}
