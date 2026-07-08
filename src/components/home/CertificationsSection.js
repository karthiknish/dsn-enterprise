"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { FaCertificate, FaDownload } from "react-icons/fa";
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

const [featured, ...rest] = certificates;

const CertificationsSection = () => {
	return (
		<section className="py-20 md:py-24 bg-surface-subtle">
			<div className="container mx-auto px-4">
				<SectionHeader
					eyebrow="Quality"
					title="Our Certifications"
					description="We are proud to be recognized by leading industry organizations for our commitment to quality and excellence."
				/>

				<div className="grid md:grid-cols-2 gap-6 md:gap-7">
					<m.article
						className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 hover:border-accent/20 hover:shadow-lg transition-all duration-300 md:row-span-2"
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-30px" }}
						transition={{ duration: 0.45 }}
					>
						<div className="relative h-64 md:h-80 w-full bg-white">
							<Image
								src={featured.image}
								alt={featured.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
						<div className="p-6 md:p-8">
							<div className="flex items-start gap-3 mb-2">
								<span className="text-accent mt-0.5">
									<FaCertificate className="text-lg" aria-hidden />
								</span>
								<h3 className="text-xl font-semibold text-gray-900 leading-snug">
									{featured.name}
								</h3>
							</div>
							<p className="text-sm text-gray-600 leading-relaxed pl-8">
								{featured.description}
							</p>
						</div>
					</m.article>

					{rest.map((certificate, index) => {
						const Icon = certificate.icon;
						return (
							<m.article
								key={certificate.id}
								className="group flex gap-5 items-start bg-white rounded-2xl border border-gray-200/80 hover:border-accent/20 hover:shadow-lg transition-all duration-300 p-6"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-30px" }}
								transition={{ duration: 0.45, delay: (index + 1) * 0.08 }}
							>
								{certificate.isPdf ? (
									<a
										href={certificate.image}
										target="_blank"
										rel="noopener noreferrer"
										className="relative shrink-0 h-24 w-20 rounded-lg bg-secondary-light/40 flex flex-col items-center justify-center gap-1.5 text-primary hover:text-accent transition-colors"
									>
										<FaDownload className="text-xl" aria-hidden />
										<span className="text-[10px] font-semibold uppercase tracking-wide">
											PDF
										</span>
									</a>
								) : (
									<div className="relative shrink-0 h-24 w-20 rounded-lg overflow-hidden bg-secondary-light/40">
										<Image
											src={certificate.image}
											alt={certificate.name}
											fill
											className="object-cover"
											sizes="80px"
										/>
									</div>
								)}
								<div className="min-w-0">
									<div className="flex items-start gap-2 mb-1.5">
										<Icon
											className="text-accent mt-0.5 shrink-0"
											aria-hidden
										/>
										<h3 className="text-base font-semibold text-gray-900 leading-snug">
											{certificate.name}
										</h3>
									</div>
									<p className="text-sm text-gray-600 leading-relaxed">
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
