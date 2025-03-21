"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaTools,
  FaRuler,
  FaCertificate,
  FaWrench,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    name: "Calibration Services",
    description:
      "NABL accredited calibration services for all types of gauges and measuring instruments.",
    icon: <FaRuler className="text-4xl text-primary" />,
    link: "/services#calibration",
    details: [
      "NABL Certificate available at extra cost",
      "Calibration for Plain Plug Gauges (1mm to 250mm)",
      "Calibration for Plain Ring Gauges (6mm to 125mm)",
      "Calibration for Cylindrical Setting Masters",
    ],
  },
  {
    id: 2,
    name: "Custom Gauge Manufacturing",
    description:
      "Custom designed and manufactured gauges for special applications and unique requirements.",
    icon: <FaTools className="text-4xl text-primary" />,
    link: "/services#custom-manufacturing",
    details: [
      "Special Gauges as per Drawing",
      "Hardness - 60 ± 2HRC",
      "SUB-ZERO Treated - 80°C",
      "Popular Sizes in Ready Stock",
    ],
  },
  {
    id: 3,
    name: "Certification & Testing",
    description:
      "Comprehensive testing and certification services for quality assurance.",
    icon: <FaCertificate className="text-4xl text-primary" />,
    link: "/services#certification",
    details: [
      "Quality Standard: IS 919 (Part 1, Part 2) 1993 ISO",
      "IS 3455 Gauging Practice for Plain Work Pieces",
      "IS 6244-1980 & IS 6137-1983 Specifications",
      "IS 3485 & IS 8023 Standards Compliance",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-secondary-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We offer a comprehensive range of services to meet all your
            measurement and calibration needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="mb-4">
                <ul className="text-sm text-gray-600">
                  {service.details.slice(0, 2).map((detail, i) => (
                    <li key={i} className="flex items-start mb-1">
                      <FaCheck
                        className="text-primary mt-1 mr-2 flex-shrink-0"
                        style={{ fontSize: "10px" }}
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={service.link}
                className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
              >
                Learn More
                <FaArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Contact Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
