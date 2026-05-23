"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FaCertificate } from "react-icons/fa";
import SectionHeader from "./SectionHeader";

const certificates = [
	{
		id: 1,
		name: "ISO Certification",
		description:
			"ISO 9001:2015 certification for our quality management system.",
		image: "/images/certificates/iso-9001-2015-certficate-new.webp",
		icon: FaCertificate,
	},
	{
		id: 2,
		name: "ISO/IEC 17025:2017 Certificate",
		description:
			"ISO/IEC 17025:2017 accreditation for competence in testing and calibration laboratories.",
		image: "/images/certificates/certificate-cc-2602_page-0001.jpg",
		icon: FaCertificate,
	},
	{
		id: 3,
		name: "NABL Scope-CC-2602",
		description:
			"Scope of NABL accreditation for UNIK Gauges & Tools Calibration Laboratory (PDF).",
		image: "/images/certificates/scope-cc-2602.pdf",
		icon: FaCertificate,
		isPdf: true,
	},
];

const CertificationsSection = () => {
	return (
		<section className="py-20 md:py-24 bg-surface-subtle">
			<div className="container mx-auto px-4">
				<SectionHeader
					eyebrow="Quality"
					title="Our Certifications"
					description="We are proud to be recognized by leading industry organizations for our commitment to quality and excellence."
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
					{certificates.map((certificate, index) => {
						const Icon = certificate.icon;
						return (
							<m.article
								key={certificate.id}
								className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 hover:border-accent/20 hover:shadow-lg transition-all duration-300"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: index * 0.08 }}
							>
								<div className="relative h-52 w-full bg-white">
									{certificate.isPdf ? (
										<a
											href={certificate.image}
											target="_blank"
											rel="noopener noreferrer"
											className="flex flex-col items-center justify-center h-full gap-2 text-primary hover:text-accent transition-colors"
										>
											<Icon className="text-3xl" aria-hidden />
											<span className="text-sm font-semibold">
												Download PDF
											</span>
										</a>
									) : (
										<Image
											src={certificate.image}
											alt={certificate.name}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
									)}
								</div>
								<div className="p-6">
									<div className="flex items-start gap-3 mb-2">
										<span className="text-accent mt-0.5">
											<Icon className="text-lg" aria-hidden />
										</span>
										<h3 className="text-lg font-semibold text-gray-900 leading-snug">
											{certificate.name}
										</h3>
									</div>
									<p className="text-sm text-gray-600 leading-relaxed pl-8">
										{certificate.description}
									</p>
								</div>
							</m.article>
						);
					})}
				</div>

				<m.p
					className="mt-12 text-center text-gray-600 italic max-w-3xl mx-auto text-sm leading-relaxed"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Our certifications reflect our dedication to maintaining the highest
					standards in manufacturing, calibration, and quality control
					processes.
				</m.p>
			</div>
		</section>
	);
};

export default CertificationsSection;
