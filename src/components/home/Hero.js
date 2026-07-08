"use client";

import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";

const trustPoints = [
	"ISO Certified Manufacturing",
	"State-of-the-art Calibration Services",
	"Custom Gauge Solutions",
	"Global Delivery Network",
	"Expert Technical Support",
];

const Hero = () => {
	const { trackCTAClick } = useGoogleAdsTracking();
	const prefersReducedMotion = useReducedMotion();
	const [videoLoaded, setVideoLoaded] = useState(false);

	const handleVideoReady = useCallback(() => setVideoLoaded(true), []);

	return (
		<div className="relative text-white -mt-16 min-h-dvh flex items-center overflow-hidden">
			<video
				tabIndex={-1}
				className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${
					videoLoaded ? "opacity-100" : "opacity-0"
				}`}
				autoPlay={!prefersReducedMotion}
				muted
				loop
				playsInline
				preload="auto"
				aria-hidden
				onCanPlay={handleVideoReady}
				onLoadedData={handleVideoReady}
			>
				<source src="/hero-video.mp4" type="video/mp4" />
			</video>
			<div
				className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/75 to-black/50 pointer-events-none"
				aria-hidden
			/>
			<div
				className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:48px_48px]"
				aria-hidden
			/>

			<div className="container mx-auto px-4 z-10 py-16 md:py-20 relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					<m.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					>
						<p className="inline-flex items-center gap-2 text-sm font-medium text-secondary-light/90 mb-5 tracking-wide">
							<span
								className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
								aria-hidden
							/>
							Precision metrology
						</p>
						<h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold mb-6 text-white text-balance leading-[1.1] tracking-tight">
							Precision Gauges & Measuring Instruments
						</h1>
						<p className="text-lg sm:text-xl mb-8 text-white/90 max-w-lg leading-relaxed">
							DSN Enterprises is a leading manufacturer and supplier of
							high-precision gauges and measuring instruments for industrial
							applications.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="#products"
								className="bg-white text-primary font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:bg-secondary-light hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary/80"
								onClick={() => trackCTAClick("Explore Products", "Hero")}
							>
								Explore Products
							</Link>
							<Link
								href="/contact"
								className="bg-transparent border border-white/40 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:bg-white/10 hover:border-white/60 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary/80"
								onClick={() => trackCTAClick("Contact Us", "Hero")}
							>
								Contact Us
							</Link>
						</div>
					</m.div>

					<m.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: 0.15,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="hidden lg:block"
					>
						<div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-8 shadow-2xl">
							<h3 className="text-xl font-semibold mb-6 text-white">
								Industry-Leading Quality
							</h3>
							<ul className="space-y-3">
								{trustPoints.map((point, i) => (
									<m.li
										key={point}
										initial={{ opacity: 0, x: 12 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.35 + i * 0.06 }}
										className="flex items-center gap-3 text-white/95"
									>
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
											✓
										</span>
										<span className="font-medium text-sm">{point}</span>
									</m.li>
								))}
							</ul>
						</div>
					</m.div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
