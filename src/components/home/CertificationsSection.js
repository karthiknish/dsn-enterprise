"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaAward, FaCertificate } from 'react-icons/fa';

const certificates = [
  {
    id: 1,
    name: "API 5B Certificate",
    description:
      "API Specification 5B certification for threading, gauging, and inspection of casing, tubing, and line pipe threads.",
    image: "/images/certificates/API-5B-0039-2023_page-0001.jpg",
    icon: <FaAward />,
  },
  {
    id: 2,
    name: "NABL Accreditation",
    description:
      "National Accreditation Board for Testing and Calibration Laboratories (NABL) certification for our calibration services.",
    image: "/images/certificates/SMCS-NABL-SCOPE-23-25-1_page-0002.jpg",
    icon: <FaCertificate />,
  },
  {
    id: 3,
    name: "API 7-2 Certificate",
    description:
      "API Specification 7-2 certification for threading and gauging of rotary shouldered thread connections.",
    image: "/images/certificates/api72.jpg",
    icon: <FaAward />,
  },
  {
    id: 4,
    name: "ISO Certification",
    description:
      "ISO 9001:2015 certification for our quality management system.",
    image: "/images/certificates/isocert.jpg",
    icon: <FaCertificate />,
  },
];

const CertificationsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Certifications
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We are proud to be recognized by leading industry organizations for our commitment to quality and excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              className="bg-secondary-light rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={certificate.image}
                  alt={certificate.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-primary text-2xl mr-3">
                    {certificate.icon}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{certificate.name}</h3>
                </div>
                <p className="text-gray-600">{certificate.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.p 
            className="text-gray-700 italic max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our certifications reflect our dedication to maintaining the highest standards in manufacturing, calibration, and quality control processes.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
