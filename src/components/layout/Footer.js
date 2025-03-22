"use client";

import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">DSN Enterprises</h3>
            <p className="mb-4">
              Leading manufacturer and supplier of precision gauges and
              measuring instruments in India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>

              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-secondary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Thread Gauges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Plain Gauges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  API Gauges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Special Gauges
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Custom Gauges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-secondary" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-secondary" />
                <span>
                  <a href="tel:+919363122005">+91 9363122005</a>
                </span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-secondary" />
                <span>
                  <a href="mailto:info@dsnenterprises.in">
                    info@dsnenterprises.in
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} DSN Enterprises. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
