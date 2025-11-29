"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRuler, FaSearch, FaArrowRight, FaChevronRight } from 'react-icons/fa';

const categories = [
  {
    id: 'plain-gauges',
    name: 'Plain Gauges',
    description: 'High-precision plug gauges, ring gauges, and setting masters for dimensional measurement',
    href: '/products/plain-gauges',
    image: '/images/plain-plug-gauge.png',
    highlights: ['Plug Gauges 1-250mm', 'Ring Gauges 6-125mm', 'Setting Masters', 'Snap Gauges'],
  },
  {
    id: 'thread-gauges',
    name: 'Thread Gauges',
    description: 'Thread plug, ring, and setting gauges for all standard thread forms',
    href: '/products/thread-gauges',
    image: '/images/thread-plug-gauge.png',
    highlights: ['Metric & Unified', 'BSW, BSF, BSP', 'NPT & NPTF', 'Setting Plugs'],
  },
  {
    id: 'api-gauges',
    name: 'API Gauges',
    description: 'API 5B & 7-2 certified gauges for oil and gas industry applications',
    href: '/products/api-gauges',
    image: '/images/api-thread-gauge.png',
    highlights: ['API 5B Certified', 'API 7-2 Certified', 'Casing & Tubing', 'Rotary Connections'],
  },
  {
    id: 'special-gauges',
    name: 'Special Gauges',
    description: 'Custom gauges including ACME, buttress, spline, and gauges made to your drawings',
    href: '/products/special-gauges',
    image: '/images/featured.png',
    highlights: ['ACME Thread', 'Buttress Thread', 'Spline Gauges', 'Custom Designs'],
  },
];

const products = [
  {
    id: 'plain-gauges',
    name: 'Plain Gauges',
    description: 'High-precision plain gauges for dimensional measurement',
    items: [
      {
        id: 'plain-plug-gauge',
        name: 'Plain Plug Gauge',
        specs: '1mm to 250mm - OHNS (W) & Carbide',
        description: 'Precision plug gauges for accurate hole measurement.',
        image: '/images/plain-plug-gauge.png',
      },
      {
        id: 'plain-ring-gauge',
        name: 'Plain Ring Gauge',
        specs: '6mm to 125mm',
        description: 'Precision ring gauges for accurate shaft measurement.',
        image: '/images/plain-ring-gauge.png',
      },
      {
        id: 'cylindrical-setting-masters',
        name: 'Cylindrical Setting Masters',
        specs: '6mm to 250mm',
        description: 'Master setting gauges for calibration and reference.',
        image: '/images/cylinder-maters.png',
      },
      {
        id: 'cylindrical-measuring-pin',
        name: 'Cylindrical Measuring Pin',
        specs: '1mm to 20mm',
        description: 'Precision pins for accurate measurement.',
        image: '/images/cylinder-maters.png',
      },
      {
        id: 'snap-gauges',
        name: 'Snap Gauges',
        specs: 'Various sizes available',
        description: 'Quick and accurate external dimension measurement.',
        image: '/images/snap-gauge.png',
      },
      
    ]
  },
  {
    id: 'thread-gauges',
    name: 'Thread Gauges',
    description: 'High-precision thread gauges for accurate thread measurement',
    items: [
      {
        id: 'thread-plug-gauge',
        name: 'Thread Plug Gauge',
        specs: 'Various thread forms and sizes',
        description: 'For accurate internal thread inspection.',
        image: '/images/thread-plug-gauge.png',
      },
      {
        id: 'thread-ring-gauge',
        name: 'Thread Ring Gauge',
        specs: 'Various thread forms and sizes',
        description: 'For accurate external thread inspection.',
        image: '/images/thread-ring-gauge.png',
      },
      {
        id: 'thread-setting-plug',
        name: 'Thread Setting Plug',
        specs: 'Various thread forms and sizes',
        description: 'For calibrating thread ring gauges.',
        image: '/images/thread-setting-plug-gauge.png',
      },
      {
        id: 'taper-thread-gauges',
        name: 'Taper Thread Gauges',
        specs: 'Various thread forms and sizes',
        description: 'For inspecting tapered thread forms.',
        image: '/images/thread-ring-gauge.png',
      },
    ]
  },
  {
    id: 'api-gauges',
    name: 'API Gauges',
    description: 'API 5B & 7-2 certified gauges for oil and gas industry',
    items: [
      {
        id: 'api-thread-gauges',
        name: 'API Thread Gauges',
        specs: 'API 5B & 7-2 certified',
        description: 'For oil and gas industry thread inspection.',
        image: '/images/api-thread-gauge.png',
      },
      {
        id: 'api-master-gauges',
        name: 'API Master Gauges',
        specs: 'API 5B & 7-2 certified',
        description: 'Reference gauges for calibration.',
        image: '/images/api-master-gauge.png',
      },
    ]
  },
  {
    id: 'special-gauges',
    name: 'Special Gauges',
    description: 'Custom designed gauges for special applications',
    items: [
      {
        id: 'special-custom-gauges',
        name: 'Special Gauges as per Drawing',
        specs: 'Custom specifications',
        description: 'Manufactured according to customer drawings and specifications.',
        image: '/images/featured.png',
      },
      {
        id: 'acme-thread-gauges',
        name: 'ACME Thread Gauges',
        specs: 'Various sizes',
        description: 'For ACME thread inspection.',
        image: '/images/featured.png',
      },
      {
        id: 'buttress-thread-gauges',
        name: 'Buttress Thread Gauges',
        specs: 'Various sizes',
        description: 'For Buttress thread inspection.',
        image: '/images/featured.png',
      },
    ]
  },
];

const specifications = [
  "Hardness - 60 ± 2HRC",
  "SUB-ZERO Treated - 80°C",
  "NABL Certificate at Extra Cost",
  "Popular Sizes in Ready Stock"
];

const standards = [
  "IS 919 (Part 1, Part 2) 1993 ISO - System of Limits & fits",
  "IS 3455 Gauging Practice for Plain Work Pieces",
  "IS 6244-1980 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 40 to & Including 120mm)",
  "IS 6137-1983 - Specification for Gauging Members for Plain Plug Gauges Go & Nogo Members (Size - 1 to & Including 40mm)",
  "IS 3485 - Specification for Plain & Master Setting Ring Gauges (Size- Range From 1 to & Including 315mm)",
  "IS 8023 - Single Ended Progressive Type Plate Snap Gauges (Upto 160mm)"
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("plain-gauges");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = searchTerm
    ? products
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.items.length > 0)
    : products;

  return (
    <div className="pt-8">
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
              Our Products
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our comprehensive range of high-precision gauges and
              measuring instruments designed for various industrial
              applications.
            </motion.p>
            <motion.div
              className="relative max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
                <FaSearch />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Category Cards */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Product Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our gauge categories to find the right precision instruments for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all group h-full"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {category.highlights.map((item, i) => (
                        <li key={i} className="text-sm text-gray-500 flex items-center">
                          <FaChevronRight className="text-primary mr-2 text-xs" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      View Products
                      <FaArrowRight className="ml-2" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Quick Product Overview
            </h2>
          </div>
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {products.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {filteredProducts.map((category) => (
            <div
              key={category.id}
              className={`${
                activeCategory === category.id || searchTerm
                  ? "block"
                  : "hidden"
              }`}
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">
                  {category.name}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="h-48 bg-secondary-light overflow-hidden">
                        <img
                          className="w-full h-full object-contain"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-primary font-medium mb-3">
                          {item.specs}
                        </p>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex gap-3">
                          <Link
                            href={`/contact?product=${encodeURIComponent(
                              item.name
                            )}`}
                            className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                          >
                            Request Quote
                            <FaArrowRight className="ml-2" />
                          </Link>
                          <Link
                            href={`/products/${category.id}`}
                            className="text-gray-500 hover:text-primary font-medium inline-flex items-center"
                          >
                            View All
                            <FaChevronRight className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              Product Specifications
            </h2>

            <div className="bg-secondary-light p-8 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                General Specifications
              </h3>
              <ul className="space-y-3">
                {specifications.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Quality Standards Practiced
            </h3>
            <ul className="space-y-3 bg-secondary-light p-8 rounded-lg">
              {standards.map((standard, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">{standard}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We specialize in manufacturing custom gauges according to your
            specific requirements. Contact us today to discuss your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary hover:bg-secondary-light font-bold py-3 px-8 rounded-md transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

