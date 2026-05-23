"use client";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function HeaderDesktopNav({
	linkClass,
	companyLinks,
	productLinks,
	companyDropdown,
	productDropdown,
	companyDropdownRef,
	productDropdownRef,
	onToggleCompany,
	onOpenCompany,
	onCloseCompany,
	onToggleProducts,
	onOpenProducts,
	onCloseProducts,
	onContactClick,
}) {
	return (
		<nav className="hidden lg:flex items-center gap-x-6">
			<Link
				href="/"
				className={`${linkClass} hover:text-primary font-medium transition-colors`}
			>
				Home
			</Link>

			<div className="relative" ref={companyDropdownRef}>
				<button
					type="button"
					className={`${linkClass} hover:text-primary font-medium transition-colors flex items-center gap-1`}
					onClick={onToggleCompany}
					onMouseEnter={onOpenCompany}
				>
					Company
					<FaChevronDown
						className={`text-xs transition-transform ${companyDropdown ? "rotate-180" : ""}`}
					/>
				</button>
				{companyDropdown && (
					<div
						role="menu"
						tabIndex={-1}
						className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50"
						onMouseLeave={onCloseCompany}
						onKeyDown={(e) => {
							if (e.key === "Escape") onCloseCompany();
						}}
					>
						{companyLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block px-4 py-2 text-gray-700 hover:bg-secondary-light hover:text-primary transition-colors"
								onClick={onCloseCompany}
							>
								{link.label}
							</Link>
						))}
					</div>
				)}
			</div>

			<div className="relative" ref={productDropdownRef}>
				<button
					type="button"
					className={`${linkClass} hover:text-primary font-medium transition-colors flex items-center gap-1`}
					onClick={onToggleProducts}
					onMouseEnter={onOpenProducts}
				>
					Products
					<FaChevronDown
						className={`text-xs transition-transform ${productDropdown ? "rotate-180" : ""}`}
					/>
				</button>
				{productDropdown && (
					<div
						role="menu"
						tabIndex={-1}
						className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
						onMouseLeave={onCloseProducts}
						onKeyDown={(e) => {
							if (e.key === "Escape") onCloseProducts();
						}}
					>
						{productLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block px-4 py-2 text-gray-700 hover:bg-secondary-light hover:text-primary transition-colors"
								onClick={onCloseProducts}
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
				href="/faq"
				className={`${linkClass} hover:text-primary font-medium transition-colors`}
			>
				FAQ
			</Link>
			<Link
				href="/contact"
				className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark font-medium transition-colors"
				onClick={onContactClick}
			>
				Contact
			</Link>
		</nav>
	);
}
