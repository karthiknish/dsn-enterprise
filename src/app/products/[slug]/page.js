import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductCityPage, CITIES, PRODUCTS } from "@/lib/seo-pages.config";

// Generate static params for all product-city combinations
export async function generateStaticParams() {
  const routes = [];
  for (const product of PRODUCTS) {
    for (const city of CITIES) {
      routes.push({
        slug: `${product.slug}-${city.slug}`,
      });
    }
  }
  return routes;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Parse slug: "plain-plug-gauges-chennai" -> product: "plain-plug-gauges", city: "chennai"
  const parts = slug.split("-");
  const citySlugs = CITIES.map(c => c.slug);

  let citySlug = null;
  let productSlug = null;

  // Find city slug (check from end)
  for (let i = parts.length - 1; i >= 0; i--) {
    if (citySlugs.includes(parts[i])) {
      citySlug = parts[i];
      productSlug = parts.slice(0, i).join("-");
      break;
    }
  }

  if (!citySlug || !productSlug) {
    return {
      title: "Page Not Found | DSN Enterprises",
      robots: { index: false, follow: false },
    };
  }

  const pageData = getProductCityPage(productSlug, citySlug);

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
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `https://dsnenterprises.com/products/${slug}`,
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

export default async function ProductCityPage({ params }) {
  const { slug } = await params;

  // Parse slug to extract product and city
  const parts = slug.split("-");
  const citySlugs = CITIES.map(c => c.slug);

  let citySlug = null;
  let productSlug = null;

  for (let i = parts.length - 1; i >= 0; i--) {
    if (citySlugs.includes(parts[i])) {
      citySlug = parts[i];
      productSlug = parts.slice(0, i).join("-");
      break;
    }
  }

  const pageData = getProductCityPage(productSlug, citySlug);

  if (!pageData) {
    notFound();
  }

  const city = CITIES.find(c => c.slug === citySlug);
  const product = PRODUCTS.find(p => p.slug === productSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm mb-4">
              <Link href="/" className="text-secondary-light hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="text-secondary-light hover:text-white">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{pageData.productName}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {pageData.productName} in {pageData.cityName}
            </h1>
            <p className="text-xl text-gray-200">
              Premium quality {pageData.productName.toLowerCase()} supplied to industries in {pageData.cityName}, Tamil Nadu
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Product Overview */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                About {pageData.productName}
              </h2>
              <p className="text-gray-700 mb-6">
                DSN Enterprises is a leading manufacturer and supplier of {pageData.productName.toLowerCase()} serving customers across {pageData.cityName} and throughout Tamil Nadu. Our {product?.description || "precision measuring instruments"} are manufactured to exacting standards and come with ISO certification.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">ISO certified manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Prompt delivery to {pageData.cityName}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Competitive pricing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Calibration services available</span>
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
                      <span className="text-gray-700">Automotive components</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Engineering and manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Textile machinery</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Pump and valve manufacturers</span>
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
                Need {pageData.productName} in {pageData.cityName}?
              </h3>
              <p className="text-gray-700 mb-6">
                Contact us for quotes, technical specifications, and delivery information.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Request Quote
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg border-2 border-primary hover:bg-gray-50 transition-colors"
                >
                  View All Products
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
                  <h4 className="font-semibold text-gray-900 mb-1">ISO Certified</h4>
                  <p className="text-sm text-gray-600">Manufactured under ISO 9001:2015</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Material Certificate</h4>
                  <p className="text-sm text-gray-600">Raw material traceability certificates</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Calibration Included</h4>
                  <p className="text-sm text-gray-600">Calibration certificate with every gauge</p>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 3.586l-4 4v12.828l4-4V3.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586a1 1 0 00-1.414 0l-4 4V12a1 1 0 00.293.707l5.414 5.414a1 1 0 001.414 0l4-4V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                Technical Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 text-gray-600 font-medium w-1/3">Material Grade</td>
                      <td className="py-3 text-gray-900">High Grade Steel / Carbide</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Hardness</td>
                      <td className="py-3 text-gray-900">58-65 HRC (as per requirement)</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Surface Finish</td>
                      <td className="py-3 text-gray-900">0.2 μm Ra (mirror finish)</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Tolerance</td>
                      <td className="py-3 text-gray-900">As per IS / ISO / DIN standards</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Wear Resistance</td>
                      <td className="py-3 text-gray-900">Chrome plating / TiN coating available</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-600 font-medium">Packaging</td>
                      <td className="py-3 text-gray-900">Individual boxes with protective coating</td>
                    </tr>
                  </tbody>
                </table>
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
                  <h4 className="font-semibold text-gray-900 mb-2">What is your minimum order quantity?</h4>
                  <p className="text-gray-600 text-sm">We accept orders from as low as 1 piece for standard items. Custom gauges may have a minimum order based on complexity.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Do you ship to {pageData.cityName}?</h4>
                  <p className="text-gray-600 text-sm">Yes, we supply {pageData.productName} to {pageData.cityName} and all major cities across Tamil Nadu. We use reliable courier services for safe delivery.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Can you manufacture custom gauges?</h4>
                  <p className="text-gray-600 text-sm">Yes, we specialize in custom gauge manufacturing. Send us your technical drawings or specifications for a quote.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What payment options do you offer?</h4>
                  <p className="text-gray-600 text-sm">We accept bank transfer, UPI, cheque, and online payments. For bulk orders, we offer credit terms subject to approval.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Do you provide calibration certificates?</h4>
                  <p className="text-gray-600 text-sm">Yes, all our gauges come with calibration certificates. We can also provide NABL accredited certificates if required.</p>
                </div>
              </div>
            </div>

            {/* Manufacturing Process */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-8 mb-8 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Our Manufacturing Process
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                  <h4 className="font-semibold mb-1">Design</h4>
                  <p className="text-white/80 text-sm">CAD design as per customer specifications</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                  <h4 className="font-semibold mb-1">Manufacture</h4>
                  <p className="text-white/80 text-sm">CNC machining with precision tooling</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                  <h4 className="font-semibold mb-1">Heat Treatment</h4>
                  <p className="text-white/80 text-sm">Controlled hardening for durability</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">4</div>
                  <h4 className="font-semibold mb-1">Grinding & Inspection</h4>
                  <p className="text-white/80 text-sm">Precision grinding and quality inspection</p>
                </div>
              </div>
            </div>

            {/* Other Cities */}
            <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
              <h3 className="text-xl font-bold text-primary mb-4">
                Other Locations We Serve
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CITIES.filter(c => c.slug !== citySlug).map((otherCity) => (
                  <Link
                    key={otherCity.slug}
                    href={`/products/${productSlug}-${otherCity.slug}`}
                    className="text-accent hover:text-accent-dark"
                  >
                    {product.name} in {otherCity.name}
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
