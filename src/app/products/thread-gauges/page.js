"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCheck, FaPhone } from "react-icons/fa";

const products = [
  {
    id: "thread-plug-gauge",
    name: "Thread Plug Gauge",
    specs: "Metric, UNC, UNF, BSW, BSF, BSP & more",
    description: "Precision thread plug gauges for accurate internal thread inspection. Available in GO and NO-GO configurations for quick verification of female threads in manufactured parts.",
    features: [
      "GO and NO-GO members",
      "All standard thread forms",
      "High-precision thread profile",
      "Sub-zero treated for stability",
      "Hardness: 60 ± 2 HRC"
    ],
    applications: ["Internal thread inspection", "Quality control", "Manufacturing verification", "Assembly line QC"],
    image: "/images/thread-plug-gauge.png",
  },
  {
    id: "thread-ring-gauge",
    name: "Thread Ring Gauge",
    specs: "Metric, UNC, UNF, BSW, BSF, BSP & more",
    description: "Precision thread ring gauges for external thread inspection. Essential tools for verifying male threads on bolts, studs, and threaded components.",
    features: [
      "GO and NO-GO configuration",
      "Adjustable ring gauges available",
      "Precision thread form",
      "Wear-resistant construction",
      "NABL calibration available"
    ],
    applications: ["External thread inspection", "Bolt verification", "Stud inspection", "Fastener QC"],
    image: "/images/thread-ring-gauge.png",
  },
  {
    id: "thread-setting-plug",
    name: "Thread Setting Plug Gauge",
    specs: "All standard thread forms",
    description: "Master gauges used for setting and calibrating thread ring gauges. Essential reference standards for maintaining accuracy of working gauges.",
    features: [
      "Truncated thread profile",
      "Full form thread profile",
      "Calibrated to master standards",
      "Supplied with certificate",
      "Premium grade materials"
    ],
    applications: ["Ring gauge calibration", "Reference standard", "Quality laboratory", "Gauge verification"],
    image: "/images/thread-setting-plug-gauge.png",
  },
  {
    id: "taper-thread-gauges",
    name: "Taper Thread Gauges",
    specs: "NPT, NPTF, BSPT & API threads",
    description: "Specialized gauges for inspecting tapered pipe threads. Critical for ensuring proper sealing in pipe connections for oil, gas, and fluid handling systems.",
    features: [
      "NPT/NPTF thread forms",
      "BSPT thread forms",
      "Plug and ring configurations",
      "L1 gauge included",
      "API thread options"
    ],
    applications: ["Pipe thread inspection", "Oil & gas fittings", "Hydraulic connections", "Pneumatic fittings"],
    image: "/images/thread-ring-gauge.png",
  },
  {
    id: "metric-thread-gauges",
    name: "Metric Thread Gauges",
    specs: "M1 to M100, Fine & Coarse Pitch",
    description: "Complete range of metric thread gauges for both coarse and fine pitch threads. Manufactured to ISO standards for global compatibility.",
    features: [
      "ISO metric thread profile",
      "Coarse pitch (standard)",
      "Fine pitch options",
      "Class 6g/6H tolerances",
      "Complete size range"
    ],
    applications: ["Metric fastener inspection", "Automotive industry", "Machine building", "General engineering"],
    image: "/images/thread-plug-gauge.png",
  },
  {
    id: "unified-thread-gauges",
    name: "Unified Thread Gauges (UNC/UNF)",
    specs: "UNC, UNF, UNEF - All sizes",
    description: "American standard unified thread gauges for inspection of UNC (coarse), UNF (fine), and UNEF (extra fine) threads widely used in aerospace and automotive industries.",
    features: [
      "UNC coarse pitch",
      "UNF fine pitch",
      "UNEF extra fine pitch",
      "Class 2A/2B, 3A/3B",
      "MIL-SPEC compliant"
    ],
    applications: ["Aerospace components", "Defense equipment", "American standard parts", "Export manufacturing"],
    image: "/images/thread-ring-gauge.png",
  },
];

const threadForms = [
  { name: "Metric (ISO)", description: "M1 to M100, coarse and fine pitch" },
  { name: "Unified (UNC/UNF)", description: "American standard threads" },
  { name: "British Standard (BSW/BSF)", description: "Whitworth and fine threads" },
  { name: "British Pipe (BSP/BSPT)", description: "Parallel and taper pipe threads" },
  { name: "American Pipe (NPT/NPTF)", description: "National pipe taper threads" },
  { name: "Trapezoidal (Tr)", description: "Power transmission threads" },
];

const specifications = [
  { label: "Material", value: "OHNS (W) / Tungsten Carbide" },
  { label: "Hardness", value: "60 ± 2 HRC" },
  { label: "Treatment", value: "Sub-Zero at -80°C" },
  { label: "Thread Accuracy", value: "As per IS/ISO/ANSI Standards" },
  { label: "Surface Finish", value: "Ground/Lapped Finish" },
  { label: "Certification", value: "NABL Certificate Available" },
];

export default function ThreadGaugesPage() {
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
              <span>Thread Gauges</span>
            </nav>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Thread Gauges
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              High-precision thread gauges for accurate thread inspection. 
              We manufacture plug gauges, ring gauges, and setting plugs for 
              all standard thread forms including Metric, Unified, BSW, BSP, and NPT.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/contact?product=Thread%20Gauges"
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

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              What are Thread Gauges?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Thread gauges are precision measuring instruments used to verify 
              the accuracy of screw threads. They ensure that threaded components 
              meet specified tolerances and will properly mate with their intended 
              counterparts. Thread gauges are essential in manufacturing for 
              quality control of bolts, nuts, screws, and threaded holes.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              DSN Enterprises manufactures a comprehensive range of thread gauges 
              including plug gauges for internal threads, ring gauges for external 
              threads, and setting plugs for gauge calibration. Our gauges are 
              manufactured to international standards and are available for all 
              major thread forms used worldwide.
            </p>
            
            {/* Thread Forms Grid */}
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                Thread Forms We Cover
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {threadForms.map((form, index) => (
                  <div
                    key={index}
                    className="bg-secondary-light p-4 rounded-lg"
                  >
                    <h4 className="font-bold text-gray-900">{form.name}</h4>
                    <p className="text-gray-600 text-sm">{form.description}</p>
                  </div>
                ))}
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
              Our Thread Gauge Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of thread gauges for all standard thread forms 
              and custom specifications.
            </p>
          </div>

          <div className="space-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`h-64 lg:h-auto bg-gray-100 flex items-center justify-center p-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className={`p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {product.specs}
                    </p>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <FaCheck className="text-primary mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3">Applications:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app, i) => (
                          <span
                            key={i}
                            className="bg-secondary-light text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/contact?product=${encodeURIComponent(product.name)}`}
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                    >
                      Request Quote
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thread Gauge Types Explanation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              Understanding Thread Gauge Types
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-secondary-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Thread Plug Gauges
                </h3>
                <p className="text-gray-700 mb-4">
                  Used to inspect internal threads (tapped holes). The GO member 
                  should enter freely, while the NO-GO member should not enter 
                  more than 2-3 turns.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• GO member checks minimum material</li>
                  <li>• NO-GO checks maximum material</li>
                  <li>• Available for all thread forms</li>
                </ul>
              </div>

              <div className="bg-secondary-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Thread Ring Gauges
                </h3>
                <p className="text-gray-700 mb-4">
                  Used to inspect external threads (bolts, studs). The GO ring 
                  should pass over the thread, while the NO-GO ring should not 
                  pass beyond 2-3 turns.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• GO ring checks major diameter</li>
                  <li>• NO-GO checks pitch diameter</li>
                  <li>• Adjustable types available</li>
                </ul>
              </div>

              <div className="bg-secondary-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Setting Plug Gauges
                </h3>
                <p className="text-gray-700 mb-4">
                  Master gauges used to set and verify thread ring gauges. 
                  Essential for maintaining calibration accuracy of working gauges.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Truncated for GO setting</li>
                  <li>• Full form for NO-GO setting</li>
                  <li>• Calibration certificates</li>
                </ul>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-secondary-light p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <h4 className="font-bold text-gray-900 mb-3">Standards Followed:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• IS 6175 - ISO Metric Screw Threads</li>
                    <li>• IS 4218 - ISO Metric Thread Tolerances</li>
                    <li>• ANSI/ASME B1.2 - Unified Threads</li>
                    <li>• BS 84 - BSW/BSF Threads</li>
                    <li>• BS 21 / ISO 7-1 - Pipe Threads</li>
                    <li>• API 5B / 7-2 - Oil Field Threads</li>
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
                Plug gauges, ring gauges, and setting masters for dimensional inspection
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
                API 5B & 7-2 certified gauges for oil & gas industry
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
                ACME, Buttress, and custom thread gauges
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Thread Gauges?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We manufacture thread gauges for all standard and special thread forms. 
            Contact us for custom specifications, bulk orders, or technical support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?product=Thread%20Gauges"
              className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
            >
              Get a Quote
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
