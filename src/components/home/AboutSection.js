"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
	{ value: "20+", label: "Years of Experience" },
	{ value: "200+", label: "Satisfied Clients" },
	{ value: "10+", label: "Types of Gauges" },
	{ value: "50+", label: "Cities covered in South India" },
];

const AboutSection = () => {
	return (
		<section className="py-20 md:py-24 bg-white relative overflow-hidden">
			<div
				className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(circle_at_80%_20%,var(--color-secondary-light)_0%,transparent_50%)]"
				aria-hidden
			/>
			<div className="container mx-auto px-4 relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.55 }}
						className="order-2 lg:order-1"
					>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
							About us
						</p>
						<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-balance leading-tight">
							About DSN Enterprises
						</h2>
						<p className="text-lg text-gray-600 mb-5 leading-relaxed">
							DSN Enterprises is a leading manufacturer and supplier of
							precision gauges and measuring instruments, established with a
							commitment to quality and innovation.
						</p>
						<p className="text-lg text-gray-600 mb-8 leading-relaxed">
							With state-of-the-art manufacturing facilities and a team of
							highly skilled engineers, we provide comprehensive solutions for
							dimensional measurement needs across various industries.
						</p>
						<div className="grid grid-cols-2 gap-4 mb-8">
							{stats.map((stat, i) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.06 }}
									className="bg-gray-50 border border-gray-100 rounded-xl p-5 border-l-4 border-l-accent"
								>
									<p className="text-2xl md:text-3xl font-bold text-primary mb-1">
										{stat.value}
									</p>
									<p className="text-sm text-gray-600">{stat.label}</p>
								</motion.div>
							))}
						</div>
						<Link
							href="#contact"
							className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98]"
						>
							Contact Now
						</Link>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.55 }}
						className="order-1 lg:order-2"
					>
						<div className="relative max-w-lg mx-auto lg:max-w-none">
							<div className="rounded-2xl overflow-hidden bg-secondary-light/60 border border-gray-100 aspect-[4/3] relative">
								<Image
									src="/images/bnr1.png"
									alt="Cylinder Maters"
									fill
									className="object-contain p-6"
									sizes="(max-width: 1024px) 100vw, 50vw"
								/>
							</div>
							<div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-primary rounded-xl p-6 shadow-xl max-w-[280px] border border-primary-dark/20">
								<h3 className="text-lg font-bold text-white mb-2">
									ISO Certified
								</h3>
								<p className="text-secondary-light text-sm leading-relaxed">
									Our manufacturing processes and quality management systems are
									ISO certified, ensuring the highest standards of quality and
									reliability.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
