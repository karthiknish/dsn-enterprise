"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCheck, 
  FaCertificate, 
  FaFlask, 
  FaCogs, 
  FaClipboardCheck,
  FaThermometerHalf,
  FaMicroscope,
  FaAward
} from "react-icons/fa";

const qualitySteps = [
  {
    step: 1,
    title: "Material Selection",
    description: "Premium grade OHNS and Tungsten Carbide materials from certified suppliers with full traceability.",
    icon: FaFlask,
  },
  {
    step: 2,
    title: "Precision Manufacturing",
    description: "State-of-the-art CNC machining with tight tolerances and skilled craftsmanship.",
    icon: FaCogs,
  },
  {
    step: 3,
    title: "Heat Treatment",
    description: "Controlled hardening process achieving 60±2 HRC with sub-zero treatment at -80°C for dimensional stability.",
    icon: FaThermometerHalf,
  },
  {
    step: 4,
    title: "Precision Grinding",
    description: "High-precision cylindrical and surface grinding to achieve specified dimensions and surface finish.",
    icon: FaCogs,
  },
  {
    step: 5,
    title: "Inspection & Calibration",
    description: "Comprehensive dimensional inspection using calibrated instruments traceable to national standards.",
    icon: FaMicroscope,
  },
  {
    step: 6,
    title: "Final Verification",
    description: "100% final inspection and documentation with calibration certificates.",
    icon: FaClipboardCheck,
  },
];

const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management System certification ensuring consistent quality processes.",
    image: "/images/certificates/isocert.jpg",
  },
  {
    name: "API 5B",
    description: "Licensed manufacturer for threading, gauging, and inspection of casing, tubing, and line pipe threads.",
    image: "/images/certificates/API-5B-0039-2023_page-0001.jpg",
  },
  {
    name: "API 7-2",
    description: "Licensed manufacturer for threading and gauging of rotary shouldered thread connections.",
    image: "/images/certificates/api72.jpg",
  },
  {
    name: "NABL Accreditation",
    description: "National Accreditation Board for Testing and Calibration Laboratories certification.",
    image: "/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg",
  },
];

const standards = [
  {
    category: "Plain Gauges",
    standards: [
      "IS 919 (Part 1, Part 2) 1993 - ISO System of Limits & Fits",
      "IS 3455 - Gauging Practice for Plain Work Pieces",
      "IS 6244-1980 - Plain Plug Gauges (40mm to 120mm)",
      "IS 6137-1983 - Plain Plug Gauges (1mm to 40mm)",
      "IS 3485 - Plain & Master Setting Ring Gauges",
      "IS 8023 - Single Ended Progressive Type Plate Snap Gauges",
    ]
  },
  {
    category: "Thread Gauges",
    standards: [
      "IS 6175 - ISO Metric Screw Threads",
      "IS 4218 - ISO Metric Thread Tolerances",
      "ANSI/ASME B1.2 - Unified Inch Screw Threads",
      "BS 84 - BSW/BSF Threads",
      "BS 21 / ISO 7-1 - Pipe Threads",
    ]
  },
  {
    category: "API Gauges",
    standards: [
      "API Specification 5B - Threading, Gauging & Inspection",
      "API Specification 7-2 - Rotary Shouldered Connections",
      "API RP 7G - Drill Stem Design and Operating Limits",
    ]
  },
];

const specifications = [
  { spec: "Material", value: "OHNS (W) / Tungsten Carbide" },
  { spec: "Hardness", value: "60 ± 2 HRC" },
  { spec: "Sub-Zero Treatment", value: "-80°C for dimensional stability" },
  { spec: "Surface Finish", value: "Mirror / Ground finish as specified" },
  { spec: "Tolerance Class", value: "As per IS / ISO / API standards" },
  { spec: "Calibration", value: "Traceable to National/International Standards" },
];

export default function QualityPage() {
  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaAward className="text-6xl" />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quality Assurance
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              At DSN Enterprises, quality is not just a process—it&apos;s our commitment. 
              Every gauge we manufacture undergoes rigorous quality control to ensure 
              precision, accuracy, and reliability.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Our Quality Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach ensuring every gauge meets the highest standards
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {qualitySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative bg-secondary-light rounded-lg p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="pt-4">
                    <step.icon className="text-3xl text-primary mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Recognized by leading industry organizations for our commitment to quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <FaCertificate className="text-primary mr-2" />
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Standards We Follow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manufacturing to international and Indian standards ensures global compatibility
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {standards.map((group, index) => (
                <motion.div
                  key={group.category}
                  className="bg-secondary-light rounded-lg p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.standards.map((standard, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <FaCheck className="text-primary mt-1 mr-2 flex-shrink-0 text-xs" />
                        <span className="text-gray-700">{standard}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              Technical Specifications
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specifications.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.spec}</td>
                      <td className="px-6 py-4 text-gray-700">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Our Quality Commitment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-5xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Inspection on all products</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-primary mb-2">0</div>
                <div className="text-gray-600">Tolerance for defects</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold text-primary mb-2">∞</div>
                <div className="text-gray-600">Commitment to excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Quality Gauges?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the DSN Enterprises quality difference. Contact us for 
            precision gauges backed by our rigorous quality assurance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
            >
              Request Quote
            </Link>
            <Link
              href="/products"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-md transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
