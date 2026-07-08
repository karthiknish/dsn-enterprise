"use client";

import Link from "next/link";
import { UilAngleDown } from "@iconscout/react-unicons";

function isActive(pathname, href) {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(href + "/");
}

function isSectionActive(pathname, links) {
	return links.some((link) => isActive(pathname, link.href));
}

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
	pathname = "",
}) {
	const companyActive = isSectionActive(pathname, companyLinks);
	const productActive = isSectionActive(pathname, productLinks);

	return (
		<nav className="hidden lg:flex items-center gap-x-6">
			<Link
				href="/"
				className={`${linkClass} hover:text-primary font-medium transition-colors ${
					isActive(pathname, "/") ? "text-primary" : ""
				}`}
			>
				Home
			</Link>

			<div className="relative" ref={companyDropdownRef}>
				<button
					type="button"
					className={`${linkClass} hover:text-primary font-medium transition-colors flex items-center gap-1 ${
						companyActive ? "text-primary" : ""
					}`}
					onClick={onToggleCompany}
					onMouseEnter={onOpenCompany}
					onFocus={onOpenCompany}
					aria-haspopup="menu"
					aria-expanded={companyDropdown}
				>
					Company
					<UilAngleDown
						className={`w-3 h-3 transition-transform duration-200 ${companyDropdown ? "rotate-180" : ""}`}
					/>
				</button>
				{companyDropdown && (
					<div
						role="menu"
						tabIndex={-1}
						className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50 animate-fadeIn"
						onMouseLeave={onCloseCompany}
						onKeyDown={(e) => {
							if (e.key === "Escape") onCloseCompany();
						}}
					>
						{companyLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`block px-4 py-2 transition-colors ${
									isActive(pathname, link.href)
										? "bg-secondary-light text-primary font-medium"
										: "text-gray-700 hover:bg-secondary-light hover:text-primary"
								}`}
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
					className={`${linkClass} hover:text-primary font-medium transition-colors flex items-center gap-1 ${
						productActive ? "text-primary" : ""
					}`}
					onClick={onToggleProducts}
					onMouseEnter={onOpenProducts}
					onFocus={onOpenProducts}
					aria-haspopup="menu"
					aria-expanded={productDropdown}
				>
					Products
					<UilAngleDown
						className={`w-3 h-3 transition-transform duration-200 ${productDropdown ? "rotate-180" : ""}`}
					/>
				</button>
				{productDropdown && (
					<div
						role="menu"
						tabIndex={-1}
						className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fadeIn"
						onMouseLeave={onCloseProducts}
						onKeyDown={(e) => {
							if (e.key === "Escape") onCloseProducts();
						}}
					>
						{productLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`block px-4 py-2 transition-colors ${
									isActive(pathname, link.href)
										? "bg-secondary-light text-primary font-medium"
										: "text-gray-700 hover:bg-secondary-light hover:text-primary"
								}`}
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
				className={`${linkClass} hover:text-primary font-medium transition-colors ${
					isActive(pathname, "/services") ? "text-primary" : ""
				}`}
			>
				Services
			</Link>
			<Link
				href="/blog"
				className={`${linkClass} hover:text-primary font-medium transition-colors ${
					isActive(pathname, "/blog") ? "text-primary" : ""
				}`}
			>
				Blog
			</Link>
			<Link
				href="/resources"
				className={`${linkClass} hover:text-primary font-medium transition-colors ${
					isActive(pathname, "/resources") ? "text-primary" : ""
				}`}
			>
				Resources
			</Link>
			<Link
				href="/faq"
				className={`${linkClass} hover:text-primary font-medium transition-colors ${
					isActive(pathname, "/faq") ? "text-primary" : ""
				}`}
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
