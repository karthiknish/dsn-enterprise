import Link from "next/link";
import { generateProductCityPages, generateServiceCityPages, CITIES, PRODUCTS, SERVICES } from "@/lib/seo-pages.config";

export const metadata = {
  title: "SEO Pages Index | DSN Enterprises",
  description: "Index of all SEO landing pages for products and services across Tamil Nadu cities",
};

export default function SEOPagesIndex() {
  const productPages = generateProductCityPages();
  const servicePages = generateServiceCityPages();

  // Group by city for better organization
  const productPagesByCity = CITIES.map(city => ({
    city,
    pages: productPages.filter(p => p.city === city.slug),
  }));

  const servicePagesByCity = CITIES.map(city => ({
    city,
    pages: servicePages.filter(p => p.city === city.slug),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-bold text-primary mb-4">SEO Pages Index</h1>
            <p className="text-gray-600 mb-6">
              This page lists all dynamically generated SEO landing pages targeting industrial cities in Tamil Nadu.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{CITIES.length}</div>
                <div className="text-sm text-gray-600">Cities Targeted</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary">{productPages.length}</div>
                <div className="text-sm text-gray-600">Product-City Pages</div>
              </div>
              <div className="bg-accent/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-accent">{servicePages.length}</div>
                <div className="text-sm text-gray-600">Service-City Pages</div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <strong>Total Pages:</strong> {productPages.length + servicePages.length} SEO landing pages
            </div>
          </div>

          {/* Product Pages by City */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Product Pages by City</h2>
            <div className="space-y-6">
              {productPagesByCity.map(({ city, pages }) => (
                <div key={city.slug} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <Link href={`/products?city=${city.slug}`} className="hover:text-primary">
                      {city.name}
                    </Link>
                    <span className="text-sm font-normal text-gray-500 ml-2">({pages.length} pages)</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {pages.map(page => (
                      <Link
                        key={`${page.product}-${page.city}`}
                        href={`/products/${page.product}-${page.city}`}
                        className="text-sm text-accent hover:text-accent-dark truncate"
                      >
                        {page.productName}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Pages by City */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Service Pages by City</h2>
            <div className="space-y-6">
              {servicePagesByCity.map(({ city, pages }) => (
                <div key={city.slug} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <Link href={`/services?city=${city.slug}`} className="hover:text-primary">
                      {city.name}
                    </Link>
                    <span className="text-sm font-normal text-gray-500 ml-2">({pages.length} pages)</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {pages.map(page => (
                      <Link
                        key={`${page.service}-${page.city}`}
                        href={`/services/${page.service}-${page.city}`}
                        className="text-sm text-accent hover:text-accent-dark truncate"
                      >
                        {page.serviceName}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Cities */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Targeted Cities in Tamil Nadu</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CITIES.map(city => (
                <div key={city.slug} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{city.name}</h3>
                  <p className="text-sm text-gray-500">{city.description}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    {productPages.filter(p => p.city === city.slug).length} products ×{" "}
                    {servicePages.filter(p => p.city === city.slug).length} services
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-secondary-light rounded-xl p-8">
            <h2 className="text-xl font-bold text-primary mb-4">Quick Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Products</h3>
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.map(product => (
                    <span key={product.slug} className="text-sm bg-white px-2 py-1 rounded">
                      {product.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(service => (
                    <span key={service.slug} className="text-sm bg-white px-2 py-1 rounded">
                      {service.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
