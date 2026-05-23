"use client";

import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import PageHero from "@/components/layout/PageHero";

export default function ProductCategoryHero({
	title,
	description,
	quoteProduct,
	badgeSlot: BadgeSlot,
}) {
	return (
		<PageHero
			eyebrow="Products"
			title={title}
			description={description}
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
