"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";

const Hero = () => {
  const { trackCTAClick } = useGoogleAdsTracking();

  return (
    <div className="relative text-white bg-white  min-h-screen flex items-center">
      {/* Video Background */}
      <video
        style={{ marginTop: "-70px" }}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Precision Gauges & Measuring Instruments
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-lg">
              DSN Enterprises is a leading manufacturer and supplier of
              high-precision gauges and measuring instruments for industrial
              applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
                onClick={() => trackCTAClick('Explore Products', 'Hero')}
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="bg-secondary hover:bg-secondary-dark text-primary font-medium py-3 px-6 rounded-md transition-colors"
                onClick={() => trackCTAClick('Contact Us', 'Hero')}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 p-8 bg-primary opacity-75"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center ">
                <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
                  Industry-Leading Quality
                </h3>
                <ul className="space-y-4 w-full max-w-md">
                  <li className="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20">
                    <span className="mr-3 text-secondary-light bg-white rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      ✓
                    </span>
                    <span className="font-medium">
                      ISO Certified Manufacturing
                    </span>
                  </li>
                  <li className="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20">
                    <span className="mr-3 text-secondary-light bg-white rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      ✓
                    </span>
                    <span className="font-medium">
                      State-of-the-art Calibration Services
                    </span>
                  </li>
                  <li className="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20">
                    <span className="mr-3 text-secondary-light bg-white rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      ✓
                    </span>
                    <span className="font-medium">Custom Gauge Solutions</span>
                  </li>
                  <li className="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20">
                    <span className="mr-3 text-secondary-light bg-white rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      ✓
                    </span>
                    <span className="font-medium">Global Delivery Network</span>
                  </li>
                  <li className="flex items-center bg-white/10 backdrop-blur-sm p-3 rounded-lg transition-all hover:bg-white/20">
                    <span className="mr-3 text-secondary-light bg-white rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                      ✓
                    </span>
                    <span className="font-medium">
                      Expert Technical Support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
