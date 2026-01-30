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
      url: `https://dsnenterprises.com/services/${slug}`,
      type: "website",
      siteName: "DSN Enterprises",
      locale: "en_IN",
      images: ["/images/featured.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
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
                      <span className="text-gray-700">Quick turnaround time</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">NABL/ISO certified processes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Pickup and delivery available</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Detailed documentation</span>
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
                      <span className="text-gray-700">Automotive manufacturers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Engineering workshops</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Textile and spinning mills</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Quality control labs</span>
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

            {/* Quality Assurance */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Quality Assurance
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">NABL Accredited</h4>
                  <p className="text-sm text-gray-600">Calibration as per ISO/IEC 17025 standards</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">ISO Certified</h4>
                  <p className="text-sm text-gray-600">Quality management system ISO 9001:2015</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Traceable Standards</h4>
                  <p className="text-sm text-gray-600">NIST traceable calibration certificates</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What is your turnaround time?</h4>
                  <p className="text-gray-600 text-sm">Standard calibration takes 3-5 working days. Express service is available within 24-48 hours at additional cost.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Do you offer pickup and delivery?</h4>
                  <p className="text-gray-600 text-sm">Yes, we provide pickup and delivery services across {pageData.cityName} and surrounding areas. Contact us for scheduling.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What certifications do you provide?</h4>
                  <p className="text-gray-600 text-sm">We provide NABL accredited certificates with ISO/IEC 17025 compliance. All measurements are traceable to national standards.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Do you offer on-site calibration?</h4>
                  <p className="text-gray-600 text-sm">Yes, for large or fixed gauges, we offer on-site calibration services. Our team visits your facility with portable equipment.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                  <p className="text-gray-600 text-sm">We accept bank transfers, UPI, cheque, and online payments. Credit terms are available for established corporate customers.</p>
                </div>
              </div>
            </div>

            {/* Why Choose DSN Enterprises */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-8 mb-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Why Choose DSN Enterprises?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">30+ Years of Experience</h4>
                    <p className="text-white/80 text-sm">Serving industries across Tamil Nadu since 1990</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">5000+ Satisfied Customers</h4>
                    <p className="text-white/80 text-sm">Trusted by leading manufacturers across India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Advanced Equipment</h4>
                    <p className="text-white/80 text-sm">State-of-the-art measuring instruments from reputed brands</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Dedicated Support</h4>
                    <p className="text-white/80 text-sm">Expert technical guidance and after-sales service</p>
                  </div>
                </div>
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
