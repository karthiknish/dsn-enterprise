"use client";

import Link from "next/link";
import { FaChevronDown, FaTimes } from "react-icons/fa";

export default function HeaderMobileNav({
	isOpen,
	onClose,
	companyLinks,
	productLinks,
	mobileCompanyExpanded,
	mobileProductExpanded,
	onToggleCompany,
	onToggleProducts,
}) {
	return (
		<div
			className={`lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div className="flex flex-col h-full p-8 pt-20">
				<button
					type="button"
					className="absolute top-4 right-4 text-gray-900"
					onClick={onClose}
					aria-label="Close menu"
				>
					<FaTimes className="text-primary" size={24} />
				</button>
				<Link
					href="/"
					className="py-3 text-lg text-primary font-medium border-b border-gray-200"
					onClick={onClose}
				>
					Home
				</Link>

				<div className="border-b border-gray-200">
					<button
						type="button"
						className="py-3 text-lg text-primary font-medium w-full flex items-center justify-between"
						onClick={onToggleCompany}
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
									className="block py-2 text-gray-600 hover:text-primary"
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
						className="py-3 text-lg text-primary font-medium w-full flex items-center justify-between"
						onClick={onToggleProducts}
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
									className="block py-2 text-gray-600 hover:text-primary"
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
					className="py-3 text-lg text-primary font-medium border-b border-gray-200"
					onClick={onClose}
				>
					Services
				</Link>
				<Link
					href="/blog"
					className="py-3 text-lg text-primary font-medium border-b border-gray-200"
					onClick={onClose}
				>
					Blog
				</Link>
				<Link
					href="/resources"
					className="py-3 text-lg text-primary font-medium border-b border-gray-200"
					onClick={onClose}
				>
					Resources
				</Link>
				<Link
					href="/faq"
					className="py-3 text-lg text-primary font-medium border-b border-gray-200"
					onClick={onClose}
				>
					FAQ
				</Link>
				<Link
					href="/contact"
					className="py-3 text-lg text-primary font-medium"
					onClick={onClose}
				>
					Contact
				</Link>
			</div>
		</div>
	);
}
