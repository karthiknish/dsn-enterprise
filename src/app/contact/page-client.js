"use client";

import { m } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import ContactPageBenefits from "@/components/contact/ContactPageBenefits";
import ContactPageForm from "@/components/contact/ContactPageForm";
import ContactPageInfoCards from "@/components/contact/ContactPageInfoCards";
import { pageHeroes } from "@/content/page-heroes";
import { useContactPageForm } from "@/hooks/useContactPageForm";

export default function ContactPage({ prefillProduct = "" }) {
	const form = useContactPageForm({ prefillProduct });

	return (
		<div>
			<PageHero
				title={pageHeroes.contact.title}
				description={pageHeroes.contact.description}
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/contact", label: "Contact" },
				]}
			/>

			<section className="py-16 md:py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<m.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<ContactPageBenefits />
							<ContactPageInfoCards />
						</m.div>

						<m.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<ContactPageForm {...form} />
						</m.div>
					</div>
				</div>
			</section>
		</div>
	);
}
