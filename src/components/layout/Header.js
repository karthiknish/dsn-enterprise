"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || window.location.pathname !== "/"
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
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
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className={`${
              scrolled || window.location.pathname !== "/"
                ? "text-gray-800"
                : "text-white"
            } hover:text-primary font-medium transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${
              scrolled || window.location.pathname !== "/"
                ? "text-gray-800"
                : "text-white"
            } hover:text-primary font-medium transition-colors`}
          >
            About Us
          </Link>
          <Link
            href="/products"
            className={`${
              scrolled || window.location.pathname !== "/"
                ? "text-gray-800"
                : "text-white"
            } hover:text-primary font-medium transition-colors`}
          >
            Products
          </Link>
          <Link
            href="/services"
            className={`${
              scrolled || window.location.pathname !== "/"
                ? "text-gray-800"
                : "text-white"
            } hover:text-primary font-medium transition-colors`}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className={`${
              scrolled || window.location.pathname !== "/"
                ? "text-gray-800"
                : "text-white"
            } hover:text-primary font-medium transition-colors`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          <button
            className="absolute top-4 right-4 text-gray-800"
            onClick={toggleMenu}
          >
            <FaTimes size={24} />
          </button>
          <Link
            href="/"
            className="py-3 text-lg font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="py-3 text-lg font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            href="/products"
            className="py-3 text-lg font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/services"
            className="py-3 text-lg font-medium border-b border-gray-200"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="py-3 text-lg font-medium"
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
