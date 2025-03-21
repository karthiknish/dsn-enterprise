"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaTools, FaRuler, FaCertificate, FaWrench, FaArrowRight, FaCheck } from 'react-icons/fa';

const services = [
  {
    id: 'calibration',
    name: 'Calibration Services',
    description: 'NABL accredited calibration services for all types of gauges and measuring instruments.',
    icon: <FaRuler className="text-5xl text-primary mb-4" />,
    details: [
      'Comprehensive calibration for all types of gauges',
      'NABL Certificate available at extra cost',
      'Traceable to national standards',
      'Quick turnaround time',
      'Detailed calibration reports',
      'On-site calibration services available',
    ]
  },
  {
    id: 'custom-manufacturing',
    name: 'Custom Gauge Manufacturing',
    description: 'Custom designed and manufactured gauges for special applications and unique requirements.',
    icon: <FaTools className="text-5xl text-primary mb-4" />,
    details: [
      'Special gauges manufactured as per drawing',
      'Custom thread forms including ACME, Stub ACME, Buttress, BPV',
      'Precision manufacturing with tight tolerances',
      'Material options including OHNS (W) & Carbide',
      'SUB-ZERO Treated at -80°C for dimensional stability',
      'Hardness - 60 ± 2HRC for durability',
    ]
  },
  {
    id: 'certification',
    name: 'Certification & Testing',
    description: 'Comprehensive testing and certification services for quality assurance.',
    icon: <FaCertificate className="text-5xl text-primary mb-4" />,
    details: [
      'Certification according to international standards',
      'Compliance with IS 919, IS 3455, IS 6244, IS 6137, IS 3485, IS 8023',
      'Material testing and certification',
      'Dimensional inspection and reporting',
      'Thread profile analysis',
      'Hardness testing',
    ]
  },
  {
    id: 'repair',
    name: 'Repair & Maintenance',
    description: 'Professional repair and maintenance services for all types of gauges and measuring instruments.',
    icon: <FaWrench className="text-5xl text-primary mb-4" />,
    details: [
      'Repair of damaged or worn gauges',
      'Reconditioning of used gauges',
      'Preventive maintenance programs',
      'Performance evaluation',
      'Cleaning and lubrication services',
      'Replacement parts and accessories',
    ]
  },
];

const standards = [
  "IS 919 (Part 1, Part 2) 1993 ISO - System of Limits & fits",
  "IS 3455 Gauging Practice for Plain Work Pieces",
  "IS 6244-1980 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 40 to & Including 120mm)",
  "IS 6137-1983 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 1 to & Including 40mm)",
  "IS 3485 - Specification for Plain & Master Setting Ring Gauges (Size- Range From 1 to & Including 315mm)",
  "IS 8023 - Single Ended Progressive Type Plate Snap Gauges (Upto 160mm)"
];

const ServicesPage = () => {
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
              Our Services
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We offer a comprehensive range of services to meet all your measurement and calibration needs, ensuring the highest standards of quality and precision.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={`#${service.id}`} 
                  className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                >
                  Learn More
                  <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-secondary-light'}`}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{service.name}</h2>
                <p className="text-lg text-gray-700 mb-8">{service.description}</p>
                <ul className="space-y-4">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    href="/contact" 
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    Request Service
                  </Link>
                </div>
              </div>
              <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="bg-secondary-light rounded-lg h-80 flex items-center justify-center">
                  <div className="text-9xl text-primary">{service.icon}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Standards Section */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Quality Standards We Follow</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <ul className="space-y-3">
                {standards.map((standard, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-gray-700">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Our Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your specific requirements and how we can help you achieve the highest standards of precision and quality.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-secondary text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
