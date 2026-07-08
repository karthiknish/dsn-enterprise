"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

/**
 * Renders the public-facing site chrome (skip link, header, main wrapper,
 * scroll-to-top, footer) only on non-admin routes. Admin routes use their own
 * layout (AdminLayout) with a sidebar and header, so the site header/footer
 * must not appear there — otherwise the fixed admin sidebar overlaps the
 * footer and admin pages end up with a double header.
 */
export default function SiteChrome({ children }) {
	const pathname = usePathname();
	const isAdmin = pathname?.startsWith("/admin");

	if (isAdmin) {
		return <>{children}</>;
	}

	return (
		<>
			<a
				href="#site-main"
				className="pointer-events-none fixed left-4 top-0 z-[100] -translate-y-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg opacity-0 transition focus:pointer-events-auto focus:translate-y-20 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
			>
				Skip to main content
			</a>
			<Header />
			<main id="site-main" className="pt-16">
				{children}
			</main>
			<ScrollToTop />
			<Footer />
		</>
	);
}
