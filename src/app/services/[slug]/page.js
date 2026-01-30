import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceCityPage, CITIES, SERVICES } from "@/lib/seo-pages.config";

// Generate static params for all service-city combinations
export async function generateStaticParams() {
  const routes = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      routes.push({
        slug: `${service.slug}-${city.slug}`,
      });
    }
  }
  return routes;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Parse slug: "gauge-calibration-chennai" -> service: "gauge-calibration", city: "chennai"
  const parts = slug.split("-");
  const citySlugs = CITIES.map(c => c.slug);

  let citySlug = null;
  let serviceSlug = null;

  // Find city slug (check from end)
  for (let i = parts.length - 1; i >= 0; i--) {
    if (citySlugs.includes(parts[i])) {
      citySlug = parts[i];
      serviceSlug = parts.slice(0, i).join("-");
      break;
    }
  }

  if (!citySlug || !serviceSlug) {
    return {
      title: "Page Not Found | DSN Enterprises",
      robots: { index: false, follow: false },
    };
  }

  const pageData = getServiceCityPage(serviceSlug, citySlug);

  if (!pageData) {
    return {
      title: "Page Not Found | DSN Enterprises",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords.join(", "),
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `/services/${slug}`,
      type: "website",
      images: ["/images/featured.png"],
    },
  };
}

export default async function ServiceCityPage({ params }) {
  const { slug } = await params;

  // Parse slug to extract service and city
  const parts = slug.split("-");
  const citySlugs = CITIES.map(c => c.slug);

  let citySlug = null;
  let serviceSlug = null;

  for (let i = parts.length - 1; i >= 0; i--) {
    if (citySlugs.includes(parts[i])) {
      citySlug = parts[i];
      serviceSlug = parts.slice(0, i).join("-");
      break;
    }
  }

  const pageData = getServiceCityPage(serviceSlug, citySlug);

  if (!pageData) {
    notFound();
  }

  const city = CITIES.find(c => c.slug === citySlug);
  const service = SERVICES.find(s => s.slug === serviceSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-secondary-light hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="text-secondary-light hover:text-white">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{pageData.serviceName}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {pageData.serviceName} in {pageData.cityName}
            </h1>
            <p className="text-xl text-gray-200">
              Professional {pageData.serviceName.toLowerCase()} services for industries in {pageData.cityName}, Tamil Nadu
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Service Overview */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                About {pageData.serviceName}
              </h2>
              <p className="text-gray-700 mb-6">
                DSN Enterprises provides professional {pageData.serviceName.toLowerCase()} in {pageData.cityName}, serving industries across Tamil Nadu. Our {service?.description || "expert services"} are delivered by trained technicians with state-of-the-art equipment.
              </p>

              {serviceSlug === "gauge-calibration" && (
                <div className="bg-accent/10 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Our Calibration Process</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Receive and inspect gauges at our facility</li>
                    <li>Clean and prepare measuring surfaces</li>
                    <li>Perform calibration using NIST traceable standards</li>
                    <li>Generate detailed calibration certificates</li>
                    <li>Return calibrated gauges with documentation</li>
                  </ol>
                </div>
              )}

              {serviceSlug === "custom-gauge-manufacturing" && (
                <div className="bg-accent/10 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Custom Gauge Development</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Review your technical requirements</li>
                    <li>Design gauge to your specifications</li>
                    <li>Manufacture prototype for approval</li>
                    <li>Produce final batch with quality inspection</li>
                    <li>Deliver with calibration certificate</li>
                  </ol>
                </div>
              )}

              {serviceSlug === "gauge-repair-and-reconditioning" && (
                <div className="bg-accent/10 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Our Repair Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Wear surface restoration</li>
                    <li>Thread recutting and regrinding</li>
                    <li>Handle replacement</li>
                    <li>Protective coating renewal</li>
                    <li>Calibration after repair</li>
                  </ul>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Service Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Quick turnaround time</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>NABL/ISO certified processes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Pickup and delivery available</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Detailed documentation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Industries Served in {pageData.cityName}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Automotive manufacturers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Engineering workshops</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Textile and spinning mills</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Quality control labs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Keywords Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Related Searches</h3>
              <div className="flex flex-wrap gap-2">
                {pageData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-secondary-light rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Need {pageData.serviceName} in {pageData.cityName}?
              </h3>
              <p className="text-gray-700 mb-6">
                Contact us to discuss your requirements and get a custom quote.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Get Quote
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg border-2 border-primary hover:bg-gray-50 transition-colors"
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Other Cities */}
            <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Service Locations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CITIES.filter(c => c.slug !== citySlug).map((otherCity) => (
                  <Link
                    key={otherCity.slug}
                    href={`/services/${serviceSlug}-${otherCity.slug}`}
                    className="text-accent hover:text-accent-dark"
                  >
                    {service.name} in {otherCity.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
