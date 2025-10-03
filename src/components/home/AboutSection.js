"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              About DSN Enterprises
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              DSN Enterprises is a leading manufacturer and supplier of
              precision gauges and measuring instruments, established with a
              commitment to quality and innovation.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With state-of-the-art manufacturing facilities and a team of
              highly skilled engineers, we provide comprehensive solutions for
              dimensional measurement needs across various industries.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary-light p-4 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">20+</h3>
                <p className="text-gray-700">Years of Experience</p>
              </div>
              <div className="bg-secondary-light p-4 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">2000+</h3>
                <p className="text-gray-700">Satisfied Clients</p>
              </div>
              <div className="bg-secondary-light p-4 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">50+</h3>
                <p className="text-gray-700">Types of Gauges</p>
              </div>
              <div className="bg-secondary-light p-4 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-2">25+</h3>
                <p className="text-gray-700">Countries Served</p>
              </div>
            </div>
            <Link
              href="#contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Contact Now
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="relative w-3/4 h-full md:w-full">
              <div className="bg-secondary-light mx-auto rounded-lg h-96 w-full">
                <img
                  className="w-full h-full object-contain"
                  src="/images/bnr1.png"
                  alt="Cylinder Maters"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary rounded-lg p-6 shadow-xl max-w-xs">
                <h3 className="text-xl font-bold text-white mb-2">
                  ISO Certified
                </h3>
                <p className="text-secondary">
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
