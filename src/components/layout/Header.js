"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";

const productLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products/plain-gauges", label: "Plain Gauges" },
  { href: "/products/thread-gauges", label: "Thread Gauges" },
  { href: "/products/api-gauges", label: "API Gauges" },
  { href: "/products/special-gauges", label: "Special Gauges" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/industries", label: "Industries We Serve" },
  { href: "/quality", label: "Quality Assurance" },
  { href: "/calibration", label: "Calibration Services" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [setHome, setSetHome] = useState(true);
  const [productDropdown, setProductDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [mobileProductExpanded, setMobileProductExpanded] = useState(false);
  const [mobileCompanyExpanded, setMobileCompanyExpanded] = useState(false);
  const productDropdownRef = useRef(null);
  const companyDropdownRef = useRef(null);
  const { trackCTAClick } = useGoogleAdsTracking();

  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname === "/") {
        setSetHome(true);
      } else {
        setSetHome(false);
      }

      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setProductDropdown(false);
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setCompanyDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = scrolled || !setHome ? "text-gray-800" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || !setHome ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="DSN Enterprises"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link
            href="/"
            className={`${linkClass} hover:text-primary font-medium transition-colors`}
          >
            Home
          </Link>
          
          {/* Company Dropdown */}
          <div className="relative" ref={companyDropdownRef}>
            <button
              className={`${linkClass} hover:text-primary font-medium transition-colors flex items-center gap-1`}
              onClick={() => setCompanyDropdown(!companyDropdown)}
              onMouseEnter={() => setCompanyDropdown(true)}
            >
              Company
              <FaChevronDown className={`text-xs transition-transform ${companyDropdown ? 'rotate-180' : ''}`} />
            </button>
            {companyDropdown && (
              <div 
                className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50"
                onMouseLeave={() => setCompanyDropdown(false)}
              >
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-secondary-light hover:text-primary transition-colors"
                    onClick={() => setCompanyDropdown(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Products Dropdown */}
          <div className="relative" ref={productDropdownRef}>
            <button
              className={`${linkClass} hover:text-primary font-medium transition-colors flex items-center gap-1`}
              onClick={() => setProductDropdown(!productDropdown)}
              onMouseEnter={() => setProductDropdown(true)}
            >
              Products
              <FaChevronDown className={`text-xs transition-transform ${productDropdown ? 'rotate-180' : ''}`} />
            </button>
            {productDropdown && (
              <div 
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                onMouseLeave={() => setProductDropdown(false)}
              >
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-secondary-light hover:text-primary transition-colors"
                    onClick={() => setProductDropdown(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/services"
            className={`${linkClass} hover:text-primary font-medium transition-colors`}
          >
            Services
          </Link>
          <Link
            href="/blog"
            className={`${linkClass} hover:text-primary font-medium transition-colors`}
          >
            Blog
          </Link>
          <Link
            href="/resources"
            className={`${linkClass} hover:text-primary font-medium transition-colors`}
          >
            Resources
          </Link>
          <Link
            href="/contact"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark font-medium transition-colors"
            onClick={() => trackCTAClick('Contact Button', 'Header')}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-800" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-primary" size={24} />
          ) : (
            <FaBars
              className={`${scrolled ? "text-gray-800" : "text-white"}`}
              size={24}
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          <button
            className="absolute top-4 right-4 text-gray-800"
            onClick={toggleMenu}
          >
            <FaTimes className="text-primary" size={24} />
          </button>
          <Link
            href="/"
            className="py-3 text-lg text-primary font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          
          {/* Mobile Company Dropdown */}
          <div className="border-b border-gray-200">
            <button
              className="py-3 text-lg text-primary font-medium w-full flex items-center justify-between"
              onClick={() => setMobileCompanyExpanded(!mobileCompanyExpanded)}
            >
              Company
              <FaChevronDown className={`text-sm transition-transform ${mobileCompanyExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileCompanyExpanded && (
              <div className="pb-2 pl-4">
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-gray-600 hover:text-primary"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Products Dropdown */}
          <div className="border-b border-gray-200">
            <button
              className="py-3 text-lg text-primary font-medium w-full flex items-center justify-between"
              onClick={() => setMobileProductExpanded(!mobileProductExpanded)}
            >
              Products
              <FaChevronDown className={`text-sm transition-transform ${mobileProductExpanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductExpanded && (
              <div className="pb-2 pl-4">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-gray-600 hover:text-primary"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/services"
            className="py-3 text-lg text-primary font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="py-3 text-lg text-primary font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Blog
          </Link>
          <Link
            href="/resources"
            className="py-3 text-lg text-primary font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Resources
          </Link>
          <Link
            href="/faq"
            className="py-3 text-lg text-primary font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="py-3 text-lg text-primary font-medium"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
