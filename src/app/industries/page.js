"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaOilCan, 
  FaCar, 
  FaPlane, 
  FaCogs, 
  FaIndustry, 
  FaShip, 
  FaTrain, 
  FaMicrochip,
  FaArrowRight,
  FaCheck
} from "react-icons/fa";

const industries = [
  {
    id: "oil-gas",
    name: "Oil & Gas",
    icon: FaOilCan,
    description: "Precision gauges for the petroleum industry including API certified thread gauges for casing, tubing, drill pipe, and line pipe connections.",
    applications: [
      "Casing and tubing thread inspection",
      "Drill pipe connection verification",
      "Line pipe threading quality control",
      "Rotary shouldered connections",
      "OCTG manufacturing inspection"
    ],
    products: ["API 5B Gauges", "API 7-2 Gauges", "Buttress Thread Gauges", "NPT/NPTF Gauges"],
    image: "/images/api-thread-gauge.png",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: FaCar,
    description: "High-precision gauges for automotive manufacturing ensuring quality in engine components, transmission parts, and chassis assemblies.",
    applications: [
      "Engine component inspection",
      "Transmission shaft verification",
      "Wheel hub and bearing checks",
      "Fuel injection system QC",
      "Brake system component inspection"
    ],
    products: ["Thread Plug Gauges", "Thread Ring Gauges", "Spline Gauges", "Plain Gauges"],
    image: "/images/thread-plug-gauge.png",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "aerospace",
    name: "Aerospace & Defense",
    icon: FaPlane,
    description: "Ultra-precision gauges meeting stringent aerospace standards for aircraft components, defense equipment, and space applications.",
    applications: [
      "Aircraft fastener inspection",
      "Landing gear component verification",
      "Turbine blade measurement",
      "Avionics housing QC",
      "Defense equipment thread inspection"
    ],
    products: ["UNJ Thread Gauges", "MS/AN Thread Gauges", "Setting Masters", "Special Gauges"],
    image: "/images/plain-plug-gauge.png",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "general-engineering",
    name: "General Engineering",
    icon: FaCogs,
    description: "Comprehensive gauging solutions for machine shops, tool rooms, and general manufacturing facilities across industries.",
    applications: [
      "Machine tool manufacturing",
      "Precision component production",
      "Tool and die inspection",
      "Job shop quality control",
      "Prototype verification"
    ],
    products: ["Plain Plug Gauges", "Plain Ring Gauges", "Snap Gauges", "Cylindrical Pins"],
    image: "/images/plain-ring-gauge.png",
    color: "from-gray-500 to-gray-700"
  },
  {
    id: "heavy-machinery",
    name: "Heavy Machinery",
    icon: FaIndustry,
    description: "Robust gauging solutions for heavy equipment manufacturers including construction, mining, and agricultural machinery.",
    applications: [
      "Hydraulic cylinder inspection",
      "Heavy bolt thread verification",
      "Bearing housing measurement",
      "Track link inspection",
      "Large bore measurement"
    ],
    products: ["Large Diameter Gauges", "ACME Thread Gauges", "Buttress Gauges", "Custom Gauges"],
    image: "/images/featured.png",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "marine",
    name: "Marine & Shipbuilding",
    icon: FaShip,
    description: "Corrosion-resistant gauges for marine applications including shipbuilding, offshore platforms, and marine equipment.",
    applications: [
      "Propeller shaft inspection",
      "Marine engine components",
      "Offshore drilling equipment",
      "Ship hull fittings",
      "Naval vessel components"
    ],
    products: ["BSP Thread Gauges", "Taper Thread Gauges", "Marine Grade Gauges", "API Gauges"],
    image: "/images/thread-ring-gauge.png",
    color: "from-teal-500 to-blue-500"
  },
  {
    id: "railways",
    name: "Railways",
    icon: FaTrain,
    description: "Precision gauges for railway manufacturing and maintenance including wheel sets, axles, and coupling systems.",
    applications: [
      "Wheel profile inspection",
      "Axle bearing measurement",
      "Coupler thread verification",
      "Brake system components",
      "Track fastener inspection"
    ],
    products: ["Large Ring Gauges", "Taper Gauges", "Thread Gauges", "Profile Gauges"],
    image: "/images/cylinder-maters.png",
    color: "from-green-500 to-teal-500"
  },
  {
    id: "electronics",
    name: "Electronics & Precision",
    icon: FaMicrochip,
    description: "Micro-precision gauges for electronics manufacturing, semiconductor equipment, and precision instrument production.",
    applications: [
      "Connector thread inspection",
      "Micro-fastener verification",
      "Sensor housing measurement",
      "Fine pitch thread QC",
      "Precision instrument assembly"
    ],
    products: ["Fine Pitch Gauges", "Micro Thread Gauges", "Precision Pins", "Miniature Gauges"],
    image: "/images/plain-plug-gauge.png",
    color: "from-purple-500 to-pink-500"
  },
];

export default function IndustriesPage() {
  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Industries We Serve
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              DSN Enterprises provides precision gauging solutions across diverse 
              industrial sectors. Our expertise spans from oil & gas to aerospace, 
              automotive to electronics manufacturing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                className="bg-secondary-light rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`bg-gradient-to-br ${industry.color} p-8 lg:p-12 text-white ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center mb-6">
                      <industry.icon className="text-4xl mr-4" />
                      <h2 className="text-3xl font-bold">{industry.name}</h2>
                    </div>
                    <p className="text-lg mb-6 opacity-90">
                      {industry.description}
                    </p>
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Key Applications:</h3>
                      <ul className="space-y-2">
                        {industry.applications.map((app, i) => (
                          <li key={i} className="flex items-start">
                            <FaCheck className="mt-1 mr-2 flex-shrink-0" />
                            <span className="opacity-90">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-3">Recommended Products:</h3>
                      <div className="flex flex-wrap gap-2">
                        {industry.products.map((product, i) => (
                          <span
                            key={i}
                            className="bg-white/20 px-3 py-1 rounded-full text-sm"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex justify-center mb-8">
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className="max-h-48 object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Precision Solutions for {industry.name}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Get customized gauging solutions designed specifically 
                        for your industry requirements.
                      </p>
                      <Link
                        href={`/contact?industry=${encodeURIComponent(industry.name)}`}
                        className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Request Industry Quote
                        <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Why Industries Trust DSN Enterprises
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Industrial Clients</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-primary mb-2">API</div>
                <div className="text-gray-600">Certified Manufacturer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don&apos;t See Your Industry?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We serve many more industries beyond those listed. Contact us to 
            discuss your specific gauging requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-md transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
