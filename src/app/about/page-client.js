"use client";

import AboutCertificationsSection from "@/components/about/AboutCertificationsSection";
import AboutManufacturingSection from "@/components/about/AboutManufacturingSection";
import AboutStorySection from "@/components/about/AboutStorySection";
import AboutWhyChooseSection from "@/components/about/AboutWhyChooseSection";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const AboutPage = () => {
	return (
		<div>
			<PageHero
				eyebrow="About"
				title="About DSN Enterprises"
				description={pageHeroes.about}
			breadcrumbs={[
				{ href: "/", label: "Home" },
				{ href: "/about", label: "About" },
			]}
			/>

			<AboutStorySection />
			<AboutWhyChooseSection />
			<AboutManufacturingSection />
			<AboutCertificationsSection />

			<Cta10
				heading="Ready to Work With Us?"
				description="Send your drawing or gauge list, we will confirm scope, lead time, and certificate requirements from Coimbatore."
				buttons={{
					primary: { text: "Contact Us", url: "/contact" },
					secondary: { text: "View Products", url: "/products" },
				}}
			/>
		</div>
	);
};

export default AboutPage;
