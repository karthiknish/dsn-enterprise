"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaCheck, FaPhone, FaCertificate, FaOilCan, FaIndustry } from "react-icons/fa";

const products = [
  {
    id: "api-thread-plug-gauge",
    name: "API Thread Plug Gauge",
    specs: "API 5B & 7-2 Certified",
    description: "Certified API thread plug gauges for inspection of internal threads on casing, tubing, line pipe, and rotary shouldered connections used in oil and gas drilling operations.",
    features: [
      "API 5B certified for casing/tubing",
      "API 7-2 certified for rotary connections",
      "L1, L2, L3 configurations",
      "Working and reference gauges",
      "Full thread and truncated profiles"
    ],
    applications: ["Casing inspection", "Tubing threads", "Line pipe connections", "Drilling equipment"],
    image: "/images/api-thread-gauge.png",
  },
  {
    id: "api-thread-ring-gauge",
    name: "API Thread Ring Gauge",
    specs: "API 5B & 7-2 Certified",
    description: "Certified API thread ring gauges for inspection of external threads on pins, couplings, and rotary shouldered connections in petroleum industry applications.",
    features: [
      "API specification compliant",
      "GO and NO-GO configurations",
      "L1, L2, L3 lengths",
      "Working and master gauges",
      "Traceable calibration"
    ],
    applications: ["Pin thread inspection", "Coupling verification", "Rotary connections", "Field inspection"],
    image: "/images/thread-ring-gauge.png",
  },
  {
    id: "api-master-gauges",
    name: "API Master Gauges",
    specs: "Reference Standards - API 5B & 7-2",
    description: "High-precision master gauges used as reference standards for calibrating working API gauges. Essential for maintaining accuracy in quality control laboratories.",
    features: [
      "Reference grade precision",
      "Calibration certificates",
      "Traceable to API standards",
      "Full form and truncated",
      "Premium grade materials"
    ],
    applications: ["Gauge calibration", "Laboratory reference", "Quality assurance", "Audit compliance"],
    image: "/images/api-master-gauge.png",
  },
  {
    id: "api-casing-gauges",
    name: "API Casing Thread Gauges",
    specs: "Sizes: 4-1/2\" to 20\" - API 5B",
    description: "Complete range of API casing thread gauges for inspection of casing connections. Available in round thread (CSG), buttress (BCSG), and extreme line patterns.",
    features: [
      "Round thread (8 TPI)",
      "Buttress thread (5 TPI)",
      "Extreme line available",
      "All standard casing sizes",
      "API 5B specification"
    ],
    applications: ["Casing manufacturing", "Thread inspection", "Field verification", "Mill inspection"],
    image: "/images/api-thread-gauge.png",
  },
  {
    id: "api-tubing-gauges",
    name: "API Tubing Thread Gauges",
    specs: "Sizes: 1.050\" to 4-1/2\" - API 5B",
    description: "API tubing thread gauges for inspection of tubing connections used in oil well completion. Available in EUE (External Upset End) and NUE (Non-Upset End) configurations.",
    features: [
      "EUE (External Upset End)",
      "NUE (Non-Upset End)",
      "10 TPI thread form",
      "All standard tubing sizes",
      "Working and reference grades"
    ],
    applications: ["Tubing manufacturing", "Well completion", "Production tubing", "Workover operations"],
    image: "/images/api-thread-gauge.png",
  },
  {
    id: "api-rotary-gauges",
    name: "API Rotary Shouldered Gauges",
    specs: "NC, IF, REG, FH - API 7-2",
    description: "API 7-2 certified gauges for rotary shouldered thread connections used on drill pipe, drill collars, and bottom hole assemblies in drilling operations.",
    features: [
      "NC numbered connections",
      "IF internal flush",
      "REG regular connections",
      "FH full hole",
      "API 7-2 specification"
    ],
    applications: ["Drill pipe inspection", "Drill collar threads", "BHA connections", "Rig floor inspection"],
    image: "/images/api-master-gauge.png",
  },
];

const apiConnections = [
  { 
    type: "API 5B Connections", 
    items: ["Casing (CSG)", "Tubing (TBG)", "Line Pipe (LP)", "Buttress (BCSG)"],
    icon: FaOilCan
  },
  { 
    type: "API 7-2 Connections", 
    items: ["NC10 to NC77", "IF", "REG", "FH", "SH", "XH"],
    icon: FaIndustry
  },
];

const certifications = [
  {
    name: "API 5B License",
    number: "5B-0039",
    description: "Threading, gauging, and inspection of casing, tubing, and line pipe threads"
  },
  {
    name: "API 7-2 License",
    number: "7-2-0023",
    description: "Threading and gauging of rotary shouldered thread connections"
  },
];

const specifications = [
  { label: "Material", value: "OHNS (W) / Tungsten Carbide" },
  { label: "Hardness", value: "60 ± 2 HRC" },
  { label: "Treatment", value: "Sub-Zero at -80°C" },
  { label: "Thread Form", value: "As per API 5B / 7-2" },
  { label: "Calibration", value: "Traceable to API Standards" },
  { label: "Certificate", value: "API Certificate Included" },
];

export default function APIGaugesPage() {
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
              <span>API Gauges</span>
            </nav>
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm">
                <FaCertificate className="mr-2" />
                API 5B Certified
              </span>
              <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm">
                <FaCertificate className="mr-2" />
                API 7-2 Certified
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              API Gauges
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              API 5B & 7-2 certified thread gauges for the oil and gas industry. 
              DSN Enterprises is a licensed manufacturer of API gauges for casing, 
              tubing, line pipe, and rotary shouldered connections.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/contact?product=API%20Gauges"
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

      {/* API Certifications Banner */}
      <section className="py-12 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FaCertificate className="text-4xl text-primary mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-primary font-medium">License #{cert.number}</p>
                    <p className="text-gray-600 text-sm mt-1">{cert.description}</p>
                  </div>
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
              What are API Gauges?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              API (American Petroleum Institute) gauges are specialized thread 
              gauges designed for the oil and gas industry. They are used to 
              inspect thread connections on casing, tubing, drill pipe, and 
              other oilfield equipment to ensure safe and reliable connections 
              under extreme downhole conditions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              DSN Enterprises is a licensed API manufacturer (API 5B-0039 and 
              API 7-2-0023), producing certified gauges for petroleum industry 
              applications. Our API gauges are manufactured to strict API 
              specifications and undergo rigorous quality control to ensure 
              compliance with industry standards.
            </p>
            
            {/* API Connection Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {apiConnections.map((conn, index) => (
                <div
                  key={index}
                  className="bg-secondary-light p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <conn.icon className="text-3xl text-primary mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{conn.type}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {conn.items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Our API Gauge Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete range of API certified gauges for oil and gas industry 
              thread inspection and quality control.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
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
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <FaCheck className="text-primary mt-1 mr-2 flex-shrink-0 text-xs" />
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

      {/* API Standards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              API Standards & Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-secondary-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  API Specification 5B
                </h3>
                <p className="text-gray-700 mb-4">
                  Covers threading, gauging, and thread inspection of casing, 
                  tubing, and line pipe threads. Includes requirements for:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Round threads (8 TPI for casing, 10 TPI for tubing)</li>
                  <li>• Buttress threads (5 TPI)</li>
                  <li>• Line pipe threads (NPT)</li>
                  <li>• Working and reference gauges</li>
                  <li>• L1, L2, L3 gauge lengths</li>
                </ul>
              </div>

              <div className="bg-secondary-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  API Specification 7-2
                </h3>
                <p className="text-gray-700 mb-4">
                  Covers threading and gauging of rotary shouldered thread 
                  connections used on drill pipe and BHA. Includes:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• NC (Numbered Connection) threads</li>
                  <li>• IF (Internal Flush) connections</li>
                  <li>• REG (Regular) connections</li>
                  <li>• FH (Full Hole) connections</li>
                  <li>• Standoff and pitch diameter gauges</li>
                </ul>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-secondary-light p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <table className="w-full">
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="py-3 text-gray-600">{spec.label}</td>
                        <td className="py-3 font-medium text-gray-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Industries Served:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <FaOilCan className="text-primary mr-2" />
                      Oil & Gas Exploration
                    </li>
                    <li className="flex items-center">
                      <FaIndustry className="text-primary mr-2" />
                      Drilling Operations
                    </li>
                    <li className="flex items-center">
                      <FaOilCan className="text-primary mr-2" />
                      OCTG Manufacturing
                    </li>
                    <li className="flex items-center">
                      <FaIndustry className="text-primary mr-2" />
                      Pipe & Tube Mills
                    </li>
                  </ul>
                </div>
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
                Metric, Unified, BSW, BSP thread gauges
              </p>
            </Link>
            <Link
              href="/products/special-gauges"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                Special Gauges
              </h3>
              <p className="text-gray-600 text-sm">
                Custom and specialty gauges for unique requirements
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need API Certified Gauges?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            As an API licensed manufacturer, we provide certified gauges for 
            the oil and gas industry. Contact us for specifications, pricing, 
            and delivery information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?product=API%20Gauges"
              className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/about"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-md transition-colors"
            >
              View Certifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
