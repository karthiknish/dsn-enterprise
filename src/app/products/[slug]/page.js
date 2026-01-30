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
      url: `/products/${slug}`,
      type: "website",
      images: ["/images/featured.png"],
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
                      <span>ISO certified manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Prompt delivery to {pageData.cityName}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Competitive pricing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Calibration services available</span>
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
                      <span>Automotive components</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Engineering and manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Textile machinery</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Pump and valve manufacturers</span>
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
