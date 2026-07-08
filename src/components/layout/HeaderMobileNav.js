"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

function isActive(pathname, href) {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(href + "/");
}

function isSectionActive(pathname, links) {
	return links.some((link) => isActive(pathname, link.href));
}

export default function HeaderMobileNav({
	isOpen,
	onClose,
	companyLinks,
	productLinks,
	mobileCompanyExpanded,
	mobileProductExpanded,
	onToggleCompany,
	onToggleProducts,
	pathname = "",
}) {
	const navRef = useRef(null);
	const closeBtnRef = useRef(null);

	// Focus trap: move focus into menu on open, restore on close
	useEffect(() => {
		if (isOpen && closeBtnRef.current) {
			closeBtnRef.current.focus();
		}
	}, [isOpen]);

	// Trap Tab key within the menu
	useEffect(() => {
		if (!isOpen || !navRef.current) return;

		const handleKeyDown = (e) => {
			if (e.key !== "Tab") return;
			const focusable = navRef.current.querySelectorAll(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
			);
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		navRef.current.addEventListener("keydown", handleKeyDown);
		return () => {
			navRef.current?.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	const companyActive = isSectionActive(pathname, companyLinks);
	const productActive = isSectionActive(pathname, productLinks);

	return (
		<div
			ref={navRef}
			className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
			role="dialog"
			aria-modal="true"
			aria-label="Site navigation"
		>
			<div className="flex flex-col h-full p-8 pt-20">
				<button
					ref={closeBtnRef}
					type="button"
					className="absolute top-4 right-4 text-gray-900"
					onClick={onClose}
					aria-label="Close menu"
				>
					<FaTimes className="text-primary" size={24} />
				</button>
				<Link
					href="/"
					className={`py-3 text-lg font-medium border-b border-gray-200 active:bg-secondary-light transition-colors ${
						isActive(pathname, "/") ? "text-primary" : "text-primary"
					}`}
					onClick={onClose}
				>
					Home
				</Link>

				<div className="border-b border-gray-200">
					<button
						type="button"
						className={`py-3 text-lg font-medium w-full flex items-center justify-between active:bg-secondary-light transition-colors ${
							companyActive ? "text-primary" : "text-primary"
						}`}
						onClick={onToggleCompany}
						aria-expanded={mobileCompanyExpanded}
					>
						Company
						<FaChevronDown
							className={`text-sm transition-transform ${mobileCompanyExpanded ? "rotate-180" : ""}`}
						/>
					</button>
					{mobileCompanyExpanded && (
						<div className="pb-2 pl-4">
							{companyLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`block py-2 active:bg-secondary-light transition-colors ${
										isActive(pathname, link.href)
											? "text-primary font-medium"
											: "text-gray-600"
									}`}
									onClick={onClose}
								>
									{link.label}
								</Link>
							))}
						</div>
					)}
				</div>

				<div className="border-b border-gray-200">
					<button
						type="button"
						className={`py-3 text-lg font-medium w-full flex items-center justify-between active:bg-secondary-light transition-colors ${
							productActive ? "text-primary" : "text-primary"
						}`}
						onClick={onToggleProducts}
						aria-expanded={mobileProductExpanded}
					>
						Products
						<FaChevronDown
							className={`text-sm transition-transform ${mobileProductExpanded ? "rotate-180" : ""}`}
						/>
					</button>
					{mobileProductExpanded && (
						<div className="pb-2 pl-4">
							{productLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={`block py-2 active:bg-secondary-light transition-colors ${
										isActive(pathname, link.href)
											? "text-primary font-medium"
											: "text-gray-600"
									}`}
									onClick={onClose}
								>
									{link.label}
								</Link>
							))}
						</div>
					)}
				</div>

				<Link
					href="/services"
					className={`py-3 text-lg font-medium border-b border-gray-200 active:bg-secondary-light transition-colors ${
						isActive(pathname, "/services") ? "text-primary" : "text-primary"
					}`}
					onClick={onClose}
				>
					Services
				</Link>
				<Link
					href="/blog"
					className={`py-3 text-lg font-medium border-b border-gray-200 active:bg-secondary-light transition-colors ${
						isActive(pathname, "/blog") ? "text-primary" : "text-primary"
					}`}
					onClick={onClose}
				>
					Blog
				</Link>
				<Link
					href="/resources"
					className={`py-3 text-lg font-medium border-b border-gray-200 active:bg-secondary-light transition-colors ${
						isActive(pathname, "/resources") ? "text-primary" : "text-primary"
					}`}
					onClick={onClose}
				>
					Resources
				</Link>
				<Link
					href="/faq"
					className={`py-3 text-lg font-medium border-b border-gray-200 active:bg-secondary-light transition-colors ${
						isActive(pathname, "/faq") ? "text-primary" : "text-primary"
					}`}
					onClick={onClose}
				>
					FAQ
				</Link>
				<Link
					href="/contact"
					className={`py-3 text-lg font-medium active:bg-secondary-light transition-colors ${
						isActive(pathname, "/contact") ? "text-primary" : "text-primary"
					}`}
					onClick={onClose}
				>
					Contact
				</Link>
			</div>
		</div>
	);
}
