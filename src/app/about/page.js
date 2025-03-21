"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaIndustry, FaUsers, FaGlobe, FaAward, FaCheck, FaCertificate } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About DSN Enterprises
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A leading manufacturer and supplier of precision gauges and
              measuring instruments, committed to quality and innovation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                DSN Enterprises was established with a vision to provide
                high-quality precision gauges and measuring instruments to
                industries across India and beyond. With decades of experience
                in the field, we have grown to become a trusted name in the
                industry.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our state-of-the-art manufacturing facility is equipped with
                advanced machinery and staffed by skilled engineers and
                technicians who are dedicated to delivering products of the
                highest quality and precision.
              </p>
              <p className="text-lg text-gray-700">
                We take pride in our commitment to quality, innovation, and
                customer satisfaction, which has enabled us to build
                long-lasting relationships with our clients across various
                industries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-secondary-light p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Our Core Values
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900">Quality</h4>
                      <p className="text-gray-700">
                        We are committed to delivering products and services of
                        the highest quality, adhering to international standards
                        and specifications.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900">Innovation</h4>
                      <p className="text-gray-700">
                        We continuously strive to innovate and improve our
                        products, processes, and services to meet the evolving
                        needs of our customers.
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
                        We prioritize customer satisfaction and work closely
                        with our clients to understand their requirements and
                        provide tailored solutions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900">Integrity</h4>
                      <p className="text-gray-700">
                        We conduct our business with the highest level of
                        integrity, transparency, and ethical standards.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Why Choose DSN Enterprises?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a combination of expertise, quality, and service that
              sets us apart in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
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
                Our modern manufacturing facility is equipped with advanced
                machinery and technology to ensure precision and quality.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
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
                Our team of skilled engineers and technicians brings years of
                experience and expertise to every project.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
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
                We serve clients across India and have expanded our reach to
                international markets, delivering quality products worldwide.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center"
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
                Our products and processes comply with international standards
                and are backed by relevant certifications.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We follow a rigorous manufacturing process to ensure the highest
              quality and precision in all our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-secondary-light rounded-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Material Selection
              </h3>
              <p className="text-gray-700 mb-4">
                We carefully select high-quality materials such as OHNS (W) &
                Carbide for our gauges to ensure durability and precision.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Premium grade materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">
                    Rigorous material testing
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">
                    Quality-focused sourcing
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-secondary-light rounded-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Precision Manufacturing
              </h3>
              <p className="text-gray-700 mb-4">
                Our state-of-the-art machinery and skilled technicians ensure
                precise manufacturing with tight tolerances.
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
              className="bg-secondary-light rounded-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Quality Control
              </h3>
              <p className="text-gray-700 mb-4">
                Every product undergoes rigorous quality checks and testing to
                ensure it meets our high standards and specifications.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">
                    Comprehensive inspection
                  </span>
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
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Our Certifications
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are proud to be recognized by leading industry organizations
              for our commitment to quality and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-64 w-full">
                <img
                  src="/images/certificates/API-5B-0039-2023_page-0001.jpg"
                  alt="API 5B Certificate"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                  API Specification 5B certification for threading, gauging, and
                  inspection of casing, tubing, and line pipe threads.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative h-64 w-full">
                <img
                  src="/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg"
                  alt="NABL Accreditation"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                  National Accreditation Board for Testing and Calibration
                  Laboratories (NABL) certification for our calibration
                  services.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-64 w-full">
                <img
                  src="/images/certificates/api72.jpg"
                  alt="API 7-2 Certificate"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                  API Specification 7-2 certification for threading and gauging
                  of rotary shouldered thread connections.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-64 w-full">
                <img
                  src="/images/certificates/isocert.jpg"
                  alt="ISO Certification"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
                  ISO 9001:2015 certification for our quality management system.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and how we can help
            you achieve precision and quality in your measurements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-transparent hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md border-2 border-white transition-colors"
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
