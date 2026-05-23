"use client";

import AboutCertificationsSection from "@/components/about/AboutCertificationsSection";
import AboutManufacturingSection from "@/components/about/AboutManufacturingSection";
import AboutStorySection from "@/components/about/AboutStorySection";
import AboutWhyChooseSection from "@/components/about/AboutWhyChooseSection";
import PageCta from "@/components/layout/PageCta";
import PageHero from "@/components/layout/PageHero";
import { pageHeroes } from "@/content/page-heroes";

const AboutPage = () => {
	return (
		<div>
			<PageHero
				eyebrow="About"
				title="About DSN Enterprises"
				description={pageHeroes.about}
			/>

			<AboutStorySection />
			<AboutWhyChooseSection />
			<AboutManufacturingSection />
			<AboutCertificationsSection />

			<PageCta
				title="Ready to Work With Us?"
				description="Send your drawing or gauge list—we will confirm scope, lead time, and certificate requirements from Coimbatore."
			/>
		</div>
	);
};

export default AboutPage;
