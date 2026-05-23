"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	FaAward,
	FaCertificate,
	FaCheck,
	FaGlobe,
	FaIndustry,
	FaUsers,
} from "react-icons/fa";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageHeroes } from "@/content/page-heroes";

const AboutPage = () => {
	return (
		<div>
			<PageHero
				eyebrow="About"
				title="About DSN Enterprises"
				description={pageHeroes.about}
			/>

			<PageSection variant="white">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
						<p className="text-lg text-gray-700 mb-6">
							DSN Enterprises was founded to give Indian manufacturers a
							dependable source for plain, thread, and API gauges—built to
							drawing, delivered with certificates, and supported by engineers
							who understand shop-floor pressure.
						</p>
						<p className="text-lg text-gray-700 mb-6">
							From our Coimbatore works we combine CNC machining, precision
							grinding, and controlled heat treatment with a NABL-aligned
							calibration laboratory. That integration means fewer hand-offs
							between production, inspection, and documentation.
						</p>
						<p className="text-lg text-gray-700">
							Today we supply plants across Tamil Nadu, national OEM and
							job-shop networks, and export customers who need the same rigour
							on every shipment.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className="bg-gray-50 rounded-2xl border border-gray-200/80 p-8">
							<h3 className="text-2xl font-bold mb-6 text-gray-900">
								Our Core Values
							</h3>
							<ul className="space-y-4">
								<li className="flex items-start">
									<FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
									<div>
										<h4 className="font-bold text-gray-900">Quality</h4>
										<p className="text-gray-700">
											Every gauge is made to agreed tolerances, inspected, and
											documented—so acceptance on your line matches what we
											ship.
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
									<div>
										<h4 className="font-bold text-gray-900">Innovation</h4>
										<p className="text-gray-700">
											We invest in tooling, process control, and application
											know-how for demanding thread forms and custom profiles.
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
									<div>
										<h4 className="font-bold text-gray-900">
											Customer Satisfaction
										</h4>
										<p className="text-gray-700">
											We respond with clear lead times, technical clarity, and
											gauges that fit your quality plan—not generic catalogue
											lines.
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
									<div>
										<h4 className="font-bold text-gray-900">Integrity</h4>
										<p className="text-gray-700">
											We stand behind our measurements and certificates. If a
											gauge is not fit for use, we say so before it reaches your
											floor.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</PageSection>

			<PageSection variant="secondary" bordered>
				<SectionHeader
					title="Why Choose DSN Enterprises?"
					description="Manufacturing depth, accredited calibration, and engineers who speak your drawing language."
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<FaIndustry className="text-5xl text-primary mb-4 mx-auto" />
						<h3 className="text-xl font-bold mb-3 text-gray-900">
							State-of-the-Art Infrastructure
						</h3>
						<p className="text-gray-600">
							CNC machining, grinding, and lapping under one roof—built for
							repeatable tolerances on plain and thread gauges.
						</p>
					</motion.div>

					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<FaUsers className="text-5xl text-primary mb-4 mx-auto" />
						<h3 className="text-xl font-bold mb-3 text-gray-900">
							Expert Team
						</h3>
						<p className="text-gray-600">
							Gauge designers and metrologists who review drawings, thread data,
							and feasibility before production starts.
						</p>
					</motion.div>

					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<FaGlobe className="text-5xl text-primary mb-4 mx-auto" />
						<h3 className="text-xl font-bold mb-3 text-gray-900">
							Global Reach
						</h3>
						<p className="text-gray-600">
							Strong Tamil Nadu coverage from Coimbatore, with pan-India supply
							and export programmes for OCTG, automotive, and engineering
							sectors.
						</p>
					</motion.div>

					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<FaAward className="text-5xl text-primary mb-4 mx-auto" />
						<h3 className="text-xl font-bold mb-3 text-gray-900">
							Quality Certifications
						</h3>
						<p className="text-gray-600">
							ISO 9001:2015, NABL calibration, and API 5B / 7-2 licensing where
							your programme requires licensed OCTG gauging.
						</p>
					</motion.div>
				</div>
			</PageSection>

			<PageSection variant="white" bordered>
				<SectionHeader
					title="Our Manufacturing Process"
					description="Controlled steps from material to certificate—so every gauge leaves our works ready for production use."
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<motion.div
						className="bg-gray-50 rounded-2xl border border-gray-100 p-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h3 className="text-xl font-bold mb-4 text-gray-900">
							Material Selection
						</h3>
						<p className="text-gray-700 mb-4">
							OHNS (W) and carbide are selected against wear, size, and
							tolerance class—with mill certificates recorded for critical
							programmes.
						</p>
						<ul className="space-y-2">
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Premium grade materials</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Rigorous material testing</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Quality-focused sourcing</span>
							</li>
						</ul>
					</motion.div>

					<motion.div
						className="bg-gray-50 rounded-2xl border border-gray-100 p-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<h3 className="text-xl font-bold mb-4 text-gray-900">
							Precision Manufacturing
						</h3>
						<p className="text-gray-700 mb-4">
							CNC turning, grinding, and lapping hold size and form before heat
							treat—critical for thread and plain gauge function.
						</p>
						<ul className="space-y-2">
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Advanced CNC machines</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Skilled craftsmanship</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Precision grinding</span>
							</li>
						</ul>
					</motion.div>

					<motion.div
						className="bg-gray-50 rounded-2xl border border-gray-100 p-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h3 className="text-xl font-bold mb-4 text-gray-900">
							Quality Control
						</h3>
						<p className="text-gray-700 mb-4">
							Final inspection, hardness check, and calibration against
							traceable masters—documented on the certificate you file with QA.
						</p>
						<ul className="space-y-2">
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">Comprehensive inspection</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">
									SUB-ZERO treatment at -80°C
								</span>
							</li>
							<li className="flex items-start">
								<span className="text-primary mr-2">•</span>
								<span className="text-gray-700">
									Hardness testing (60 ± 2HRC)
								</span>
							</li>
						</ul>
					</motion.div>
				</div>
			</PageSection>

			<PageSection variant="secondary" bordered>
				<SectionHeader
					title="Our Certifications"
					description="Accreditations that underpin your audits, customer approvals, and OCTG programmes."
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<div className="relative h-64 w-full">
							<Image
								src="/images/certificates/API-5B-0039-2023_page-0001.jpg"
								alt="API 5B Certificate"
								fill
								unoptimized
								className="object-cover transition-transform hover:scale-105 duration-300"
							/>
						</div>
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-primary text-2xl mr-3">
									<FaAward />
								</span>
								<h3 className="text-xl font-bold text-gray-900">
									API 5B Certificate
								</h3>
							</div>
							<p className="text-gray-600">
								Licensed manufacturing for API 5B thread gauging used on casing,
								tubing, and line pipe connections in oil and gas supply chains.
							</p>
						</div>
					</motion.div>

					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className="relative h-64 w-full">
							<Image
								src="/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg"
								alt="NABL Accreditation"
								fill
								unoptimized
								className="object-cover transition-transform hover:scale-105 duration-300"
							/>
						</div>
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-primary text-2xl mr-3">
									<FaCertificate />
								</span>
								<h3 className="text-xl font-bold text-gray-900">
									NABL Accreditation
								</h3>
							</div>
							<p className="text-gray-600">
								NABL accreditation for our calibration laboratory—traceable
								results accepted in ISO audits and customer source inspections.
							</p>
						</div>
					</motion.div>

					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="relative h-64 w-full">
							<Image
								src="/images/certificates/api72.jpg"
								alt="API 7-2 Certificate"
								fill
								unoptimized
								className="object-cover transition-transform hover:scale-105 duration-300"
							/>
						</div>
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-primary text-2xl mr-3">
									<FaAward />
								</span>
								<h3 className="text-xl font-bold text-gray-900">
									API 7-2 Certificate
								</h3>
							</div>
							<p className="text-gray-600">
								API 7-2 licensing for rotary shouldered connection gauges used
								on drill string and heavy-duty threading programmes.
							</p>
						</div>
					</motion.div>

					<motion.div
						className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<div className="relative h-64 w-full">
							<Image
								src="/images/certificates/isocert.jpg"
								alt="ISO Certification"
								fill
								unoptimized
								className="object-cover transition-transform hover:scale-105 duration-300"
							/>
						</div>
						<div className="p-6">
							<div className="flex items-center mb-3">
								<span className="text-primary text-2xl mr-3">
									<FaCertificate />
								</span>
								<h3 className="text-xl font-bold text-gray-900">
									ISO Certification
								</h3>
							</div>
							<p className="text-gray-600">
								ISO 9001:2015 quality management covering design, manufacture,
								calibration, and customer feedback loops.
							</p>
						</div>
					</motion.div>
				</div>
			</PageSection>

			<section className="py-16 md:py-20 bg-primary text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Send your drawing or gauge list—we will confirm scope, lead time,
						and certificate requirements from Coimbatore.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="/contact"
							className="inline-block bg-transparent hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md border-2 border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
