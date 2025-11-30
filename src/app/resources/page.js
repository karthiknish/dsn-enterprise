"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaDownload, 
  FaFilePdf, 
  FaFileExcel,
  FaBook,
  FaClipboardList,
  FaCertificate,
  FaRuler,
  FaIndustry
} from "react-icons/fa";

const downloadCategories = [
  {
    title: "Product Catalogs",
    icon: FaBook,
    items: [
      {
        name: "Complete Product Catalog 2024",
        description: "Comprehensive catalog of all our gauge products",
        size: "8.5 MB",
        type: "PDF",
      },
      {
        name: "Plain Gauges Catalog",
        description: "Plug gauges, ring gauges, and setting masters",
        size: "3.2 MB",
        type: "PDF",
      },
      {
        name: "Thread Gauges Catalog",
        description: "All thread forms and specifications",
        size: "4.1 MB",
        type: "PDF",
      },
      {
        name: "API Gauges Catalog",
        description: "Oil & gas industry gauges and specifications",
        size: "2.8 MB",
        type: "PDF",
      },
    ]
  },
  {
    title: "Technical Resources",
    icon: FaRuler,
    items: [
      {
        name: "Gauge Tolerance Charts",
        description: "Standard tolerance charts for all gauge types",
        size: "1.2 MB",
        type: "PDF",
      },
      {
        name: "Thread Data Tables",
        description: "Comprehensive thread dimensions and tolerances",
        size: "2.5 MB",
        type: "Excel",
      },
      {
        name: "API Thread Specifications",
        description: "API 5B and API 7-2 thread data",
        size: "1.8 MB",
        type: "PDF",
      },
      {
        name: "Material Specifications",
        description: "Gauge materials and hardness requirements",
        size: "0.8 MB",
        type: "PDF",
      },
    ]
  },
  {
    title: "Quality & Compliance",
    icon: FaCertificate,
    items: [
      {
        name: "ISO 9001:2015 Certificate",
        description: "Quality Management System certification",
        size: "0.5 MB",
        type: "PDF",
      },
      {
        name: "NABL Accreditation Certificate",
        description: "Calibration laboratory accreditation",
        size: "0.4 MB",
        type: "PDF",
      },
      {
        name: "Quality Policy",
        description: "Our commitment to quality excellence",
        size: "0.2 MB",
        type: "PDF",
      },
      {
        name: "Calibration Procedure",
        description: "Standard calibration procedures overview",
        size: "0.6 MB",
        type: "PDF",
      },
    ]
  },
  {
    title: "Forms & Templates",
    icon: FaClipboardList,
    items: [
      {
        name: "Quotation Request Form",
        description: "Standard form for gauge quotation requests",
        size: "0.3 MB",
        type: "PDF",
      },
      {
        name: "Calibration Request Form",
        description: "Form for submitting calibration requests",
        size: "0.2 MB",
        type: "PDF",
      },
      {
        name: "Custom Gauge Specification Sheet",
        description: "Template for specifying custom gauge requirements",
        size: "0.4 MB",
        type: "Excel",
      },
      {
        name: "Gauge Inspection Checklist",
        description: "Checklist for incoming gauge inspection",
        size: "0.3 MB",
        type: "PDF",
      },
    ]
  },
];

const standardsInfo = [
  {
    standard: "IS Standards",
    items: [
      "IS 3455 - Plain Limit Gauges",
      "IS 6175 - Thread Gauges",
      "IS 4218 - ISO Metric Threads",
      "IS 3485 - Setting Masters",
      "IS 8023 - Snap Gauges",
    ]
  },
  {
    standard: "API Standards",
    items: [
      "API 5B - Threading, Gauging and Inspection",
      "API 7-2 - Rotary Shouldered Thread Connections",
      "API 11B - Sucker Rods and Accessories",
      "API RP 7G - Drill Stem Design",
    ]
  },
  {
    standard: "International Standards",
    items: [
      "ISO 1502 - Thread Gauges",
      "ISO 3161 - Series of Conical Tolerance Zones",
      "ASME B1 - Unified Inch Screw Threads",
      "DIN Standards for Thread Gauges",
    ]
  },
];

function FileIcon({ type }) {
  if (type === "Excel") {
    return <FaFileExcel className="text-green-600 text-2xl" />;
  }
  return <FaFilePdf className="text-red-600 text-2xl" />;
}

export default function ResourcesPage() {
  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaDownload className="text-5xl mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Resources & Downloads
              </h1>
              <p className="text-xl opacity-90">
                Access our product catalogs, technical resources, certificates, 
                and forms to help you with your gauge requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {downloadCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                className="mb-12 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="text-3xl text-primary" />
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-secondary-light rounded-lg p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
                    >
                      <FileIcon type={item.type} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{item.type} • {item.size}</span>
                          <Link
                            href="/contact?request=download"
                            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                          >
                            <FaDownload className="text-xs" />
                            Request
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Reference */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Standards Reference
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our gauges are manufactured to comply with national and international standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {standardsInfo.map((standard, index) => (
                <motion.div
                  key={standard.standard}
                  className="bg-white rounded-lg p-6 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-primary mb-4">{standard.standard}</h3>
                  <ul className="space-y-2">
                    {standard.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Industry Resources
              </h2>
              <p className="text-lg text-gray-600">
                Helpful links to industry organizations and standards bodies
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Bureau of Indian Standards", abbr: "BIS" },
                { name: "American Petroleum Institute", abbr: "API" },
                { name: "NABL India", abbr: "NABL" },
                { name: "ISO Standards", abbr: "ISO" },
              ].map((org, index) => (
                <div
                  key={index}
                  className="bg-secondary-light rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <FaIndustry className="text-3xl text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900">{org.abbr}</h3>
                  <p className="text-sm text-gray-600">{org.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Specific Documentation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            If you need specific technical documentation, certificates, or resources 
            not listed here, please contact us and we&apos;ll be happy to assist.
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
}
