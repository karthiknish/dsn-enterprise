"use client";

import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    company: 'Precision Engineering Ltd.',
    quote: 'DSN Enterprises has been our trusted supplier for precision gauges for over 5 years. Their products are of exceptional quality and their technical support is outstanding.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anita Sharma',
    company: 'Global Manufacturing Solutions',
    quote: 'The calibration services provided by DSN Enterprises are top-notch. Their attention to detail and quick turnaround time have significantly improved our quality control processes.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Vikram Singh',
    company: 'Automotive Components Inc.',
    quote: 'We have been using custom gauges from DSN Enterprises for our specialized manufacturing needs. Their ability to understand our requirements and deliver precise solutions is commendable.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hear from our satisfied customers about their experience with DSN Enterprises.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-8 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600">{testimonial.company}</p>
              </div>
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
