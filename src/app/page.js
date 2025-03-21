import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import CertificationsSection from "../components/home/CertificationsSection";
import ContactSection from "../components/home/ContactSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ServicesSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
}
