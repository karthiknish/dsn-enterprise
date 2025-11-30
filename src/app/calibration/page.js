"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCheck, 
  FaCertificate, 
  FaTools, 
  FaClipboardList,
  FaClock,
  FaTruck,
  FaPhoneAlt
} from "react-icons/fa";

const services = [
  {
    title: "Gauge Calibration",
    description: "Comprehensive calibration services for all types of gauges including plain, thread, API, and special gauges. NABL accredited calibration with traceable certificates.",
    features: [
      "Plain plug and ring gauge calibration",
      "Thread gauge calibration (all forms)",
      "API gauge calibration",
      "Setting master verification",
      "Snap gauge calibration"
    ],
    turnaround: "3-5 working days",
  },
  {
    title: "Gauge Repair & Refurbishment",
    description: "Expert repair and refurbishment services to restore worn gauges to original specifications, extending their service life.",
    features: [
      "Gauge re-lapping and grinding",
      "Thread gauge re-cutting",
      "Handle replacement",
      "Re-hardening and treatment",
      "Complete overhaul services"
    ],
    turnaround: "5-10 working days",
  },
  {
    title: "On-Site Calibration",
    description: "Mobile calibration services at your facility, minimizing downtime and ensuring your gauges are always in specification.",
    features: [
      "On-site gauge verification",
      "Equipment audit",
      "Calibration program setup",
      "Staff training",
      "Documentation and records"
    ],
    turnaround: "By appointment",
  },
  {
    title: "Express Calibration",
    description: "Priority calibration service for urgent requirements. Fast turnaround without compromising on accuracy or documentation.",
    features: [
      "Same-day service available",
      "Priority handling",
      "Direct communication",
      "Rush certificates",
      "Courier delivery"
    ],
    turnaround: "24-48 hours",
  },
];

const calibrationCapabilities = [
  {
    type: "Plain Gauges",
    range: "1mm to 300mm",
    accuracy: "±0.001mm",
    standards: "IS 3455, IS 6137, IS 6244"
  },
  {
    type: "Thread Plug Gauges",
    range: "M1 to M100",
    accuracy: "Class 6H/6G",
    standards: "IS 6175, IS 4218"
  },
  {
    type: "Thread Ring Gauges",
    range: "M3 to M100",
    accuracy: "Class 6H/6G",
    standards: "IS 6175, IS 4218"
  },
  {
    type: "API Gauges",
    range: "As per API spec",
    accuracy: "API 5B/7-2",
    standards: "API 5B, API 7-2"
  },
  {
    type: "Setting Masters",
    range: "1mm to 300mm",
    accuracy: "Grade 0",
    standards: "IS 3485"
  },
  {
    type: "Snap Gauges",
    range: "Up to 160mm",
    accuracy: "±0.002mm",
    standards: "IS 8023"
  },
];

const processSteps = [
  {
    step: 1,
    title: "Submit Request",
    description: "Send your gauges along with calibration requirements and specifications."
  },
  {
    step: 2,
    title: "Inspection & Quote",
    description: "We inspect gauges and provide detailed quotation including any repairs needed."
  },
  {
    step: 3,
    title: "Calibration",
    description: "Precision calibration performed by trained technicians using calibrated masters."
  },
  {
    step: 4,
    title: "Documentation",
    description: "Comprehensive calibration certificate with all measurements and traceability."
  },
  {
    step: 5,
    title: "Delivery",
    description: "Careful packaging and delivery of calibrated gauges with all documentation."
  },
];

export default function CalibrationPage() {
  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm">
                <FaCertificate className="mr-2" />
                NABL Accredited
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Calibration Services
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              NABL accredited calibration laboratory providing traceable calibration 
              services for all types of precision gauges. Ensure your measuring 
              instruments maintain accuracy and compliance.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/contact?service=Calibration"
                className="inline-flex items-center bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
              >
                <FaPhoneAlt className="mr-2" />
                Request Calibration
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Our Calibration Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive calibration and repair services for precision gauges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-secondary-light rounded-lg p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  <div className="flex items-center text-primary text-sm">
                    <FaClock className="mr-1" />
                    {service.turnaround}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <FaCheck className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calibration Capabilities */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Calibration Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our laboratory is equipped to calibrate a wide range of gauges
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Gauge Type</th>
                  <th className="px-6 py-4 text-left">Range</th>
                  <th className="px-6 py-4 text-left">Accuracy</th>
                  <th className="px-6 py-4 text-left">Standards</th>
                </tr>
              </thead>
              <tbody>
                {calibrationCapabilities.map((cap, index) => (
                  <tr key={cap.type} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{cap.type}</td>
                    <td className="px-6 py-4 text-gray-700">{cap.range}</td>
                    <td className="px-6 py-4 text-gray-700">{cap.accuracy}</td>
                    <td className="px-6 py-4 text-gray-700">{cap.standards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Calibration Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple and transparent process from submission to delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary hidden md:block"></div>
              
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="flex items-start gap-6"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
                      {step.step}
                    </div>
                    <div className="flex-1 bg-secondary-light rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              Why Choose Our Calibration Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaCertificate className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">NABL Accredited</h3>
                <p className="text-gray-600 text-sm">Nationally recognized calibration laboratory</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaTools className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Expert Technicians</h3>
                <p className="text-gray-600 text-sm">Trained and experienced calibration staff</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaClipboardList className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Full Documentation</h3>
                <p className="text-gray-600 text-sm">Comprehensive certificates with traceability</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaClock className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Quick Turnaround</h3>
                <p className="text-gray-600 text-sm">Fast service with express options</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaTruck className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Pickup & Delivery</h3>
                <p className="text-gray-600 text-sm">Convenient logistics support</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <FaCheck className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-gray-600 text-sm">Quality service at reasonable rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Calibrate Your Gauges?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a calibration quote. We offer competitive pricing 
            and quick turnaround times.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=Calibration"
              className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
            >
              Request Calibration
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-md transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
