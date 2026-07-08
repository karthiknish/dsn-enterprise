"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";
import {
	createInitialHeaderNavState,
	headerNavReducer,
} from "@/lib/header-nav-reducer";
import HeaderDesktopNav from "./HeaderDesktopNav";
import HeaderMobileNav from "./HeaderMobileNav";

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
	const pathname = usePathname();
	const isHome = pathname === "/";
	const [nav, dispatch] = useReducer(
		headerNavReducer,
		null,
		createInitialHeaderNavState,
	);
	const productDropdownRef = useRef(null);
	const companyDropdownRef = useRef(null);
	const { trackCTAClick } = useGoogleAdsTracking();

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (nav.isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [nav.isOpen]);

	// Keep scrolled state in sync with scroll position. isHome is derived
	// from usePathname() so the header background updates immediately on
	// client-side navigation, no need to wait for a scroll event.
	useEffect(() => {
		const handleScroll = () => {
			dispatch({
				type: "SCROLL_UPDATE",
				scrolled: window.scrollY > 10,
				isHome,
			});
		};

		const handleClickOutside = (event) => {
			if (
				productDropdownRef.current &&
				!productDropdownRef.current.contains(event.target)
			) {
				dispatch({ type: "SET_PRODUCT_DROPDOWN", open: false });
			}
			if (
				companyDropdownRef.current &&
				!companyDropdownRef.current.contains(event.target)
			) {
				dispatch({ type: "SET_COMPANY_DROPDOWN", open: false });
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		document.addEventListener("mousedown", handleClickOutside);
		// Sync scrolled state when the route changes (e.g. navigating to
		// the top of a new page where no scroll event fires yet).
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isHome]);

	const linkClass = nav.scrolled || !isHome ? "text-gray-900" : "text-white";

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				nav.scrolled || !isHome
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

				<HeaderDesktopNav
					linkClass={linkClass}
					companyLinks={companyLinks}
					productLinks={productLinks}
					companyDropdown={nav.companyDropdown}
					productDropdown={nav.productDropdown}
					companyDropdownRef={companyDropdownRef}
					productDropdownRef={productDropdownRef}
					pathname={pathname}
					onToggleCompany={() =>
						dispatch({
							type: "SET_COMPANY_DROPDOWN",
							open: !nav.companyDropdown,
						})
					}
					onOpenCompany={() =>
						dispatch({ type: "SET_COMPANY_DROPDOWN", open: true })
					}
					onCloseCompany={() =>
						dispatch({ type: "SET_COMPANY_DROPDOWN", open: false })
					}
					onToggleProducts={() =>
						dispatch({
							type: "SET_PRODUCT_DROPDOWN",
							open: !nav.productDropdown,
						})
					}
					onOpenProducts={() =>
						dispatch({ type: "SET_PRODUCT_DROPDOWN", open: true })
					}
					onCloseProducts={() =>
						dispatch({ type: "SET_PRODUCT_DROPDOWN", open: false })
					}
					onContactClick={() => trackCTAClick("Contact Button", "Header")}
				/>

				<button
					type="button"
					className="lg:hidden"
					onClick={() => dispatch({ type: "TOGGLE_MENU" })}
					aria-expanded={nav.isOpen}
					aria-label={nav.isOpen ? "Close menu" : "Open menu"}
				>
					{nav.isOpen ? (
						<FaTimes className="text-primary" size={24} />
					) : (
						<FaBars
							className={`${nav.scrolled || !isHome ? "text-gray-900" : "text-white"}`}
							size={24}
						/>
					)}
				</button>
			</div>

			<HeaderMobileNav
				isOpen={nav.isOpen}
				onClose={() => dispatch({ type: "CLOSE_MENU" })}
				companyLinks={companyLinks}
				productLinks={productLinks}
				mobileCompanyExpanded={nav.mobileCompanyExpanded}
				mobileProductExpanded={nav.mobileProductExpanded}
				pathname={pathname}
				onToggleCompany={() =>
					dispatch({
						type: "SET_MOBILE_COMPANY_EXPANDED",
						expanded: !nav.mobileCompanyExpanded,
					})
				}
				onToggleProducts={() =>
					dispatch({
						type: "SET_MOBILE_PRODUCT_EXPANDED",
						expanded: !nav.mobileProductExpanded,
					})
				}
			/>
		</header>
	);
};

export default Header;
