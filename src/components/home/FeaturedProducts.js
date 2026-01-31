"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Plain Plug Gauges",
    description:
      "1mm to 250mm - OHNS (W) & Carbide, hardness 60 ± 2HRC, SUB-ZERO treated.",
    specs: "1mm to 250mm",
    image: "/images/plain-plug-gauge.png",
    link: "/products#plain-gauges",
  },
  {
    id: 2,
    name: "Plain Ring Gauges",
    description:
      "Precision ring gauges for accurate shaft measurement, available in various sizes.",
    specs: "6mm to 125mm",
    image: "/images/plain-ring-gauge.png",
    link: "/products#plain-gauges",
  },
  {
    id: 3,
    name: "Cylindrical Setting Masters",
    description:
      "Master setting gauges for calibration and reference, manufactured to high precision.",
    specs: "6mm to 250mm",
    image: "/images/cylinder-maters.png",
    link: "/products#plain-gauges",
  },
  {
    id: 4,
    name: "Snap Gauges",
    description:
      "Quick and accurate external dimension measurement, custom specifications available.",
    specs: "Various sizes",
    image: "/images/snap-gauge.png",
    link: "/products#special-gauges",
  },
  {
    id: 5,
    name: "Thread Plug Gauges",
    description:
      "Precision thread plug gauges for accurate measurement and inspection of internal threads.",
    specs: "Various thread sizes",
    image: "/images/thread-plug-gauge.png",
    link: "/products#thread-gauges",
  },
  {
    id: 6,
    name: "Thread Ring Gauges",
    description:
      "High-quality thread ring gauges for external thread verification and calibration.",
    specs: "Various thread sizes",
    image: "/images/thread-ring-gauge.png",
    link: "/products#thread-gauges",
  },
  {
    id: 7,
    name: "API Master Gauges",
    description: "Reference gauges for calibration and API applications.",
    specs: "API 5B & 7-2 certified",
    image: "/images/api-master-gauge.png",
    link: "/products#api-gauges",
  },
];

const FeaturedProducts = () => {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Featured Products
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our company supplies precision measuring instruments engineered for
            industrial applications. Distribution and after‑sales support are
            provided via our trusted partner, Unik Gauges, located in Pune.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 bg-secondary-light overflow-hidden">
                <img
                  className="w-full h-full object-contain"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-primary font-medium mb-2">{product.specs}</p>
                <p className="text-gray-700 mb-4">{product.description}</p>
              </div>
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

export default FeaturedProducts;
