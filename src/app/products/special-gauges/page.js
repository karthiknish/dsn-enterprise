"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCheck, FaPhone, FaCog, FaDrawPolygon, FaWrench } from "react-icons/fa";

const products = [
  {
    id: "acme-thread-gauges",
    name: "ACME Thread Gauges",
    specs: "General Purpose, Stub, & Centralizing ACME",
    description: "Precision ACME thread gauges for power transmission applications. Used extensively in lead screws, jacks, and linear motion systems where high load capacity is required.",
    features: [
      "29° included angle",
      "General purpose ACME",
      "Stub ACME available",
      "Centralizing ACME",
      "Plug and ring configurations"
    ],
    applications: ["Lead screws", "Machine tools", "Jacks & lifts", "Linear actuators"],
    image: "/images/featured.png",
  },
  {
    id: "buttress-thread-gauges",
    name: "Buttress Thread Gauges",
    specs: "7° & 45° Face Angles",
    description: "Specialized gauges for buttress thread inspection. Designed for applications requiring high axial load capacity in one direction, common in artillery and high-pressure vessels.",
    features: [
      "7° load flank angle",
      "45° clearance flank",
      "High load capacity design",
      "Plug and ring types",
      "Custom pitches available"
    ],
    applications: ["High-pressure equipment", "Artillery shells", "Pipe couplings", "Heavy machinery"],
    image: "/images/featured.png",
  },
  {
    id: "trapezoidal-thread-gauges",
    name: "Trapezoidal Thread Gauges",
    specs: "ISO Metric Trapezoidal (Tr)",
    description: "Gauges for ISO metric trapezoidal threads used in power transmission applications. Similar to ACME but following ISO/metric standards for international compatibility.",
    features: [
      "30° included angle",
      "ISO metric standard",
      "Tr designation threads",
      "Various pitch options",
      "Plug and ring sets"
    ],
    applications: ["Machine tools", "Presses", "Vices", "International machinery"],
    image: "/images/featured.png",
  },
  {
    id: "spline-gauges",
    name: "Spline Gauges",
    specs: "Involute, Straight-Sided & Serration",
    description: "Precision spline gauges for inspection of splined shafts and hubs. Critical for automotive, aerospace, and power transmission applications.",
    features: [
      "Involute spline profiles",
      "Straight-sided splines",
      "Serration gauges",
      "Composite and sector types",
      "GO and NO-GO members"
    ],
    applications: ["Automotive drivetrains", "Aerospace components", "Gearboxes", "Power take-offs"],
    image: "/images/featured.png",
  },
  {
    id: "custom-gauges",
    name: "Custom Gauges as per Drawing",
    specs: "Manufactured to Customer Specifications",
    description: "We specialize in manufacturing custom gauges according to customer drawings and specifications. From simple modifications to complex specialty gauges, we deliver precision solutions.",
    features: [
      "Design consultation",
      "CAD/CAM manufacturing",
      "Prototype development",
      "Batch production",
      "Full documentation"
    ],
    applications: ["Special applications", "Proprietary designs", "R&D projects", "Legacy equipment"],
    image: "/images/featured.png",
  },
  {
    id: "taper-gauges",
    name: "Taper Gauges",
    specs: "Morse, Metric & Jarno Tapers",
    description: "Precision taper gauges for inspection of tapered bores and shanks. Essential for machine tool spindles, toolholders, and precision equipment.",
    features: [
      "Morse taper (MT0-MT7)",
      "Metric taper",
      "Jarno taper",
      "Plug and ring types",
      "Self-holding tapers"
    ],
    applications: ["Machine spindles", "Toolholders", "Lathe centers", "Precision fixtures"],
    image: "/images/featured.png",
  },
  {
    id: "form-gauges",
    name: "Form & Profile Gauges",
    specs: "Custom Profiles & Contours",
    description: "Specialized gauges for checking complex profiles, contours, and form features. Used for quality control of parts with non-standard geometries.",
    features: [
      "Custom profile shapes",
      "Radius gauges",
      "Contour templates",
      "Gap and flush gauges",
      "Precision wire EDM cut"
    ],
    applications: ["Complex profiles", "Radius checking", "Gap inspection", "Contour verification"],
    image: "/images/featured.png",
  },
  {
    id: "limit-gauges",
    name: "Limit Gauges & Functional Gauges",
    specs: "Go/No-Go & Assembly Verification",
    description: "Functional gauges designed to verify assembly fit and function. Ensures parts will properly assemble and function in their intended application.",
    features: [
      "Assembly simulation",
      "Functional testing",
      "Multi-feature checking",
      "Position verification",
      "Custom configurations"
    ],
    applications: ["Assembly verification", "Production QC", "Part acceptance", "Process control"],
    image: "/images/featured.png",
  },
];

const specialCapabilities = [
  {
    icon: FaDrawPolygon,
    title: "Custom Design",
    description: "Our engineering team works with you to design gauges for unique applications and specifications."
  },
  {
    icon: FaCog,
    title: "Precision Manufacturing",
    description: "State-of-the-art CNC and EDM equipment for complex geometries and tight tolerances."
  },
  {
    icon: FaWrench,
    title: "Reverse Engineering",
    description: "We can reverse engineer existing parts or gauges to create replacements or improvements."
  },
];

const specifications = [
  { label: "Material", value: "OHNS (W) / Tungsten Carbide / Tool Steel" },
  { label: "Hardness", value: "58-62 HRC (material dependent)" },
  { label: "Treatment", value: "Sub-Zero at -80°C" },
  { label: "Accuracy", value: "As per customer specification" },
  { label: "Surface Finish", value: "Ground / Lapped / EDM" },
  { label: "Documentation", value: "Calibration Certificate Included" },
];

export default function SpecialGaugesPage() {
  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-sm mb-6 opacity-80">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:underline">Products</Link>
              <span className="mx-2">/</span>
              <span>Special Gauges</span>
            </nav>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Special Gauges
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Custom and specialty gauges for unique industrial applications. 
              From ACME and buttress threads to splines and custom profiles, 
              we manufacture precision gauges to your exact specifications.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/contact?product=Special%20Gauges"
                className="inline-flex items-center bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
              >
                <FaPhone className="mr-2" />
                Request Quote
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-md transition-colors"
              >
                View Products
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-12 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialCapabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <cap.icon className="text-4xl text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cap.title}</h3>
                  <p className="text-gray-600 text-sm">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Specialty & Custom Gauge Solutions
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Not all measurement challenges can be solved with standard gauges. 
              DSN Enterprises specializes in manufacturing specialty gauges for 
              unique thread forms, complex profiles, and custom applications. 
              Our engineering team works closely with customers to develop 
              precision gauging solutions for their specific requirements.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you need ACME thread gauges for power transmission, 
              buttress threads for high-load applications, spline gauges for 
              automotive drivetrains, or completely custom gauges manufactured 
              to your drawings, we have the expertise and equipment to deliver.
            </p>
            
            <div className="bg-secondary-light p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Our Custom Gauge Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                  <h4 className="font-bold text-gray-900 text-sm">Consultation</h4>
                  <p className="text-gray-600 text-xs">Review your requirements and specifications</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                  <h4 className="font-bold text-gray-900 text-sm">Design</h4>
                  <p className="text-gray-600 text-xs">Engineering design and approval</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                  <h4 className="font-bold text-gray-900 text-sm">Manufacturing</h4>
                  <p className="text-gray-600 text-xs">Precision manufacturing and QC</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                  <h4 className="font-bold text-gray-900 text-sm">Delivery</h4>
                  <p className="text-gray-600 text-xs">Calibration and documentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Our Special Gauge Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our range of specialty gauges and custom manufacturing capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-primary font-medium mb-3 text-sm">
                    {product.specs}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Key Features:</h4>
                    <ul className="grid grid-cols-2 gap-1">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-xs">
                          <FaCheck className="text-primary mt-0.5 mr-1 flex-shrink-0 text-xs" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.applications.map((app, i) => (
                      <span
                        key={i}
                        className="bg-secondary-light text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {app}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    Request Quote
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              Technical Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-secondary-light p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  General Specifications
                </h3>
                <table className="w-full">
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="py-3 text-gray-600 text-sm">{spec.label}</td>
                        <td className="py-3 font-medium text-gray-900 text-sm">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-secondary-light p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6 text-gray-900">
                  Manufacturing Capabilities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900">CNC Turning & Milling</span>
                      <p className="text-gray-600 text-sm">High-precision multi-axis machining</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900">Wire EDM</span>
                      <p className="text-gray-600 text-sm">Complex profiles and tight tolerances</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900">Precision Grinding</span>
                      <p className="text-gray-600 text-sm">Cylindrical and surface grinding</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-primary mt-1 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900">Lapping & Honing</span>
                      <p className="text-gray-600 text-sm">Mirror finish and precise sizing</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/products/plain-gauges"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                Plain Gauges
              </h3>
              <p className="text-gray-600 text-sm">
                Plug gauges, ring gauges, and setting masters
              </p>
            </Link>
            <Link
              href="/products/thread-gauges"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                Thread Gauges
              </h3>
              <p className="text-gray-600 text-sm">
                Standard thread gauges for all thread forms
              </p>
            </Link>
            <Link
              href="/products/api-gauges"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                API Gauges
              </h3>
              <p className="text-gray-600 text-sm">
                API 5B & 7-2 certified gauges
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Have a Custom Gauge Requirement?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Send us your drawings or specifications and our engineering team 
            will provide a detailed quote. We specialize in solving complex 
            measurement challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?product=Custom%20Gauge"
              className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-md transition-colors"
            >
              Contact Engineering
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
