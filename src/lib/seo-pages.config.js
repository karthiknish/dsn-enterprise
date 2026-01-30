// SEO Pages Configuration for City-Based Landing Pages
// Generates pages targeting industrial cities in Tamil Nadu

export const CITIES = [
  { name: "Chennai", slug: "chennai", description: "industrial hub of Tamil Nadu" },
  { name: "Coimbatore", slug: "coimbatore", description: "Manchester of South India" },
  { name: "Madurai", slug: "madurai", description: "cultural capital and industrial center" },
  { name: "Salem", slug: "salem", description: "major industrial city in western Tamil Nadu" },
  { name: "Tiruchirappalli", slug: "tiruchirappalli", description: "industrial center in central Tamil Nadu" },
  { name: "Erode", slug: "erode", description: "turmeric city and trading hub" },
  { name: "Tiruppur", slug: "tiruppur", description: "knitwear capital of India" },
  { name: "Thoothukudi", slug: "thoothukudi", description: "port city and industrial center" },
];

export const PRODUCTS = [
  {
    slug: "plain-plug-gauges",
    name: "Plain Plug Gauges",
    description: "precision measuring instruments for hole inspection",
    keywords: ["plug gauge", "limit gauge", "bore gauge", "cylindrical plug gauge"]
  },
  {
    slug: "thread-ring-gauges",
    name: "Thread Ring Gauges",
    description: "thread inspection tools for external threaded components",
    keywords: ["ring gauge", "thread ring", "external thread gauge", "thread limit gauge"]
  },
  {
    slug: "api-master-gauges",
    name: "API Master Gauges",
    description: "API certified master gauges for oil and gas industry",
    keywords: ["API gauge", "master gauge", "oil country tubular goods", "OCTG gauges"]
  },
  {
    slug: "snap-gauges",
    name: "Snap Gauges",
    description: "quick measurement tools for external dimensions",
    keywords: ["snap gauge", "external snap gauge", "gap gauge", "limit snap gauge"]
  },
  {
    slug: "thread-plug-gauges",
    name: "Thread Plug Gauges",
    description: "thread inspection tools for internal threaded components",
    keywords: ["thread plug", "internal thread gauge", "taper pipe thread", "NPT gauge"]
  },
  {
    slug: "air-gauges",
    name: "Air Gauges",
    description: "precision pneumatic measuring instruments",
    keywords: ["air gauge", "pneumatic gauge", "air plug", "comparator"]
  },
  {
    slug: "calibration-services",
    name: "Gauge Calibration Services",
    description: "ISO certified calibration services for all types of gauges",
    keywords: ["calibration", "gauge calibration", "ISO certification", "measurement standards"]
  },
];

export const SERVICES = [
  {
    slug: "gauge-calibration",
    name: "Gauge Calibration",
    description: "precision calibration services with ISO certification",
    keywords: ["calibration", "ISO 17025", "gauge calibration", "measurement calibration"]
  },
  {
    slug: "custom-gauge-manufacturing",
    name: "Custom Gauge Manufacturing",
    description: "bespoke gauge manufacturing to customer specifications",
    keywords: ["custom gauges", "special gauges", "bespoke gauges", "custom measurement tools"]
  },
  {
    slug: "gauge-repair-and-reconditioning",
    name: "Gauge Repair & Reconditioning",
    description: "expert repair and restoration services for worn gauges",
    keywords: ["gauge repair", "gauge reconditioning", "gauge restoration", "gauge servicing"]
  },
];

// Generate all combinations for static page generation
export function generateProductCityPages() {
  const pages = [];
  for (const product of PRODUCTS) {
    for (const city of CITIES) {
      pages.push({
        product: product.slug,
        city: city.slug,
        productName: product.name,
        cityName: city.name,
        title: `${product.name} in ${city.name} | Precision Gauges Supplier`,
        description: `Supplier of ${product.name} in ${city.name}, ${city.description}. DSN Enterprises provides ${product.description} with ISO certification and calibration support.`,
        keywords: [...product.keywords, city.name, `${city.name} ${product.name}`],
      });
    }
  }
  return pages;
}

export function generateServiceCityPages() {
  const pages = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      pages.push({
        service: service.slug,
        city: city.slug,
        serviceName: service.name,
        cityName: city.name,
        title: `${service.name} in ${city.name} | Industrial Gauge Services`,
        description: `Professional ${service.name} in ${city.name}, ${city.description}. DSN Enterprises offers ${service.description} for industrial quality control.`,
        keywords: [...service.keywords, city.name, `${city.name} ${service.name}`],
      });
    }
  }
  return pages;
}

// Get page data by slug combination
export function getProductCityPage(productSlug, citySlug) {
  return generateProductCityPages().find(
    p => p.product === productSlug && p.city === citySlug
  );
}

export function getServiceCityPage(serviceSlug, citySlug) {
  return generateServiceCityPages().find(
    p => p.service === serviceSlug && p.city === citySlug
  );
}

// All generated page routes
export const ALL_PRODUCT_CITY_ROUTES = generateProductCityPages().map(p => ({
  slug: `${p.product}-${p.city}`,
  product: p.product,
  city: p.city,
}));

export const ALL_SERVICE_CITY_ROUTES = generateServiceCityPages().map(p => ({
  slug: `${p.service}-${p.city}`,
  service: p.service,
  city: p.city,
}));
