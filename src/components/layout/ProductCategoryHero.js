"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import PageHero from "@/components/layout/PageHero";
import { useGoogleAdsTracking } from "@/hooks/useGoogleAdsTracking";

export default function ProductCategoryHero({
	title,
	description,
	quoteProduct,
	badgeSlot: BadgeSlot,
	image,
}) {
	const { trackProductView } = useGoogleAdsTracking();
	const productName = quoteProduct || title;

	// Every product hub page renders this hero, so the view_item fires here
	// rather than being repeated in four page components. `trackProductView` was
	// defined but never called, so product pages had no view events at all.
	useEffect(() => {
		if (productName) trackProductView(productName, "gauge");
	}, [productName, trackProductView]);

	return (
		<PageHero
			title={title}
			description={description}
			image={image}
			breadcrumbs={[
				{ href: "/", label: "Home" },
				{ href: "/products", label: "Products" },
				{ label: title },
			]}
		>
			{BadgeSlot ? <BadgeSlot /> : null}
			<Link
				href={`/contact?product=${encodeURIComponent(quoteProduct || title)}`}
				className="inline-flex items-center gap-2 bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-secondary-light transition-colors"
			>
				<FaPhone aria-hidden />
				Request Quote
			</Link>
			<Link
				href="#products"
				className="inline-flex items-center gap-2 border border-white/40 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
			>
				View Products
				<FaArrowRight className="w-4 h-4" aria-hidden />
			</Link>
		</PageHero>
	);
}
