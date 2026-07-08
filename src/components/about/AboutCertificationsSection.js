"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FaAward, FaCertificate } from "react-icons/fa";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const certifications = [
	{
		image: "/images/certificates/API-5B-0039-2023_page-0001.jpg",
		alt: "API 5B Certificate",
		icon: FaAward,
		title: "API 5B Certificate",
		description:
			"Licensed manufacturing for API 5B thread gauging used on casing, tubing, and line pipe connections in oil and gas supply chains.",
		delay: 0,
	},
	{
		image: "/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg",
		alt: "NABL Accreditation",
		icon: FaCertificate,
		title: "NABL Accreditation",
		description:
			"NABL accreditation for our calibration laboratory,traceable results accepted in ISO audits and customer source inspections.",
		delay: 0.1,
	},
	{
		image: "/images/certificates/api72.jpg",
		alt: "API 7-2 Certificate",
		icon: FaAward,
		title: "API 7-2 Certificate",
		description:
			"API 7-2 licensing for rotary shouldered connection gauges used on drill string and heavy-duty threading programmes.",
		delay: 0.2,
	},
	{
		image: "/images/certificates/isocert.jpg",
		alt: "ISO Certification",
		icon: FaCertificate,
		title: "ISO Certification",
		description:
			"ISO 9001:2015 quality management covering design, manufacture, calibration, and customer feedback loops.",
		delay: 0.3,
	},
];

export default function AboutCertificationsSection() {
	return (
		<PageSection variant="secondary" bordered>
			<SectionHeader
				title="Our Certifications"
				description="Accreditations that underpin your audits, customer approvals, and OCTG programmes."
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{certifications.map((cert) => (
					<m.div
						key={cert.title}
						className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: cert.delay }}
					>
						<div className="relative h-64 w-full">
							<Image
								src={cert.image}
								alt={cert.alt}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
								className="object-cover transition-transform hover:scale-105 duration-300"
							/>
						</div>
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-primary text-2xl mr-3">
									<cert.icon />
								</span>
								<h3 className="text-xl font-semibold text-gray-900">
									{cert.title}
								</h3>
							</div>
							<p className="text-gray-600">{cert.description}</p>
						</div>
					</m.div>
				))}
			</div>
		</PageSection>
	);
}
