"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaChevronDown, FaQuestionCircle, FaPhoneAlt } from "react-icons/fa";

const faqCategories = [
  {
    name: "General",
    faqs: [
      {
        question: "What types of gauges does DSN Enterprises manufacture?",
        answer: "DSN Enterprises manufactures a comprehensive range of precision gauges including plain gauges (plug gauges, ring gauges), thread gauges (all standard and custom thread forms), API gauges for oil & gas industry, and special purpose gauges designed for specific applications. We also manufacture setting masters and reference standards."
      },
      {
        question: "Where is DSN Enterprises located?",
        answer: "DSN Enterprises is headquartered in Bangalore, Karnataka, India. Our manufacturing facility is equipped with state-of-the-art machinery and a calibration laboratory. We serve customers across India and export to international markets."
      },
      {
        question: "What industries do you serve?",
        answer: "We serve diverse industries including Oil & Gas, Automotive, Aerospace & Defense, Heavy Engineering, Power Generation, General Manufacturing, and Tool Room sectors. Our gauges meet the stringent quality requirements of all these industries."
      },
      {
        question: "Do you have quality certifications?",
        answer: "Yes, DSN Enterprises is an ISO 9001:2015 certified company. Our calibration laboratory is NABL accredited. We maintain strict quality control procedures and all our products come with traceable calibration certificates."
      },
    ]
  },
  {
    name: "Products",
    faqs: [
      {
        question: "What is the typical lead time for standard gauges?",
        answer: "Standard gauges typically have a lead time of 2-3 weeks depending on the quantity and specifications. Plain gauges in common sizes may be available from stock with faster delivery. For urgent requirements, we offer express manufacturing services."
      },
      {
        question: "Can you manufacture custom gauges as per our drawings?",
        answer: "Yes, we specialize in manufacturing custom gauges as per customer drawings and specifications. Our engineering team can also help design gauges for your specific application if you provide us with the component details and tolerance requirements."
      },
      {
        question: "What materials are used for manufacturing gauges?",
        answer: "We use high-quality gauge steel including EN31, EN24, and special alloy steels depending on the application. For wear resistance, we use carbide-tipped or solid carbide gauges. All materials are procured from certified suppliers with mill test certificates."
      },
      {
        question: "What thread forms can you manufacture?",
        answer: "We manufacture gauges for all standard thread forms including Metric (ISO), BSP, BSW, NPT, BSPT, NPTF, UNC, UNF, UN, ACME, Trapezoidal, and special thread forms. We can also manufacture gauges for custom or proprietary thread profiles."
      },
      {
        question: "Do you provide calibration certificates with gauges?",
        answer: "Yes, all our gauges are supplied with comprehensive calibration certificates showing actual measured dimensions with traceability to national standards. Our calibration laboratory is NABL accredited, ensuring the highest standards of measurement accuracy."
      },
    ]
  },
  {
    name: "API Gauges",
    faqs: [
      {
        question: "What API specifications do your gauges comply with?",
        answer: "Our API gauges comply with API 5B (for Line Pipe and Casing threads), API 7-2 (for Rotary Shouldered Connections), API 11B (for Sucker Rods), and other relevant API specifications. All gauges are manufactured to meet the stringent requirements of the oil and gas industry."
      },
      {
        question: "Do you manufacture API license gauges?",
        answer: "Yes, we manufacture gauges equivalent to API licensed gauges. Our gauges are manufactured to the same specifications and tolerances as API licensed products. Each gauge comes with detailed calibration data and traceability."
      },
      {
        question: "What is the difference between Working and Reference API gauges?",
        answer: "Working gauges are used on the shop floor for regular inspection of threaded connections. Reference gauges (also called Master gauges) have tighter tolerances and are used to calibrate and verify working gauges. We manufacture both types to API specifications."
      },
    ]
  },
  {
    name: "Calibration",
    faqs: [
      {
        question: "What calibration services do you offer?",
        answer: "We offer comprehensive calibration services for plain gauges, thread gauges, API gauges, setting masters, and other dimensional measuring instruments. Our services include calibration, repair, refurbishment, and on-site calibration at customer facilities."
      },
      {
        question: "Is your calibration laboratory accredited?",
        answer: "Yes, our calibration laboratory is NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited. This ensures that our calibration results are traceable to national/international standards and are recognized globally."
      },
      {
        question: "What is the typical turnaround time for calibration?",
        answer: "Standard calibration services have a turnaround time of 3-5 working days. We also offer express calibration services with 24-48 hour turnaround for urgent requirements. On-site calibration is available by appointment."
      },
      {
        question: "Do you calibrate gauges from other manufacturers?",
        answer: "Yes, we calibrate gauges from all manufacturers. Our laboratory is equipped to calibrate a wide range of dimensional gauges regardless of the manufacturer. We also provide repair and refurbishment services if needed."
      },
      {
        question: "How often should gauges be calibrated?",
        answer: "The calibration frequency depends on usage, environmental conditions, and quality requirements. Generally, working gauges should be calibrated annually or more frequently for heavy usage. Reference/Master gauges typically require calibration every 2-3 years. We can help you establish a calibration schedule based on your specific needs."
      },
    ]
  },
  {
    name: "Ordering",
    faqs: [
      {
        question: "What is your minimum order quantity?",
        answer: "There is no strict minimum order quantity. We cater to both small quantity requirements and bulk orders. However, for very small quantities of custom gauges, we recommend combining with other items to optimize manufacturing efficiency and costs."
      },
      {
        question: "How can I request a quotation?",
        answer: "You can request a quotation through our website contact form, by email, or by phone. Please provide gauge specifications (size, tolerance, thread details), quantity required, and any special requirements. We typically respond to quotation requests within 24-48 hours."
      },
      {
        question: "What payment terms do you offer?",
        answer: "For domestic orders, we typically work on advance payment or LC terms. For regular customers, we offer credit terms based on mutual agreement. Export orders are typically against advance payment or confirmed LC."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we export to customers worldwide. We have experience shipping to Middle East, Europe, USA, and Southeast Asian countries. We handle all export documentation and can ship via air or sea freight based on urgency and volume."
      },
      {
        question: "Can I visit your manufacturing facility?",
        answer: "Yes, we welcome customers to visit our manufacturing facility and calibration laboratory. This gives you an opportunity to see our manufacturing processes, quality systems, and discuss your requirements in detail. Please contact us to schedule a visit."
      },
    ]
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <FaChevronDown 
          className={`text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState("General");

  const toggleItem = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentCategory = faqCategories.find(cat => cat.name === activeCategory);

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
              <FaQuestionCircle className="text-5xl mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl opacity-90">
                Find answers to common questions about our products, services, 
                and ordering process.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {faqCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === category.name
                      ? 'bg-primary text-white'
                      : 'bg-secondary-light text-gray-700 hover:bg-secondary'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {currentCategory?.faqs.map((faq, faqIndex) => {
                const categoryIndex = faqCategories.findIndex(c => c.name === activeCategory);
                const key = `${categoryIndex}-${faqIndex}`;
                return (
                  <FAQItem
                    key={faqIndex}
                    faq={faq}
                    isOpen={openItems[key]}
                    onClick={() => toggleItem(categoryIndex, faqIndex)}
                  />
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* All FAQs Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(category =>
              category.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            )
          })
        }}
      />

      {/* Still Have Questions */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our team is here to help. 
            Contact us and we&apos;ll get back to you as soon as possible.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-primary text-white hover:bg-primary-dark font-bold py-3 px-8 rounded-md transition-colors"
          >
            <FaPhoneAlt className="mr-2" />
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
