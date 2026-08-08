/**
 * Image used by the programmatic product/service city landing pages.
 *
 * These pages are generated from `seo-pages.config`, so they have no
 * per-page authored artwork. Mapping the product/service slug to an
 * existing catalogue photo keeps every landing page visual without
 * adding new assets, and keeps alt text tied to the real subject.
 */

const FALLBACK = {
	src: "/images/featured.png",
	alt: "Precision gauges manufactured by DSN Enterprises, Coimbatore",
};

const PRODUCT_IMAGES = {
	"plain-plug-gauges": {
		src: "/images/plain-plug-gauge.png",
		alt: "Plain plug gauge manufactured by DSN Enterprises",
	},
	"thread-plug-gauges": {
		src: "/images/thread-plug-gauge.png",
		alt: "Thread plug gauge manufactured by DSN Enterprises",
	},
	"thread-ring-gauges": {
		src: "/images/thread-ring-gauge.png",
		alt: "Thread ring gauge manufactured by DSN Enterprises",
	},
	"api-master-gauges": {
		src: "/images/api-master-gauge.png",
		alt: "API master gauge manufactured by DSN Enterprises",
	},
	"snap-gauges": {
		src: "/images/snap-gauge.png",
		alt: "Adjustable snap gauge manufactured by DSN Enterprises",
	},
	"air-gauges": {
		src: "/images/cylinder-maters.png",
		alt: "Cylindrical setting masters used to set air gauging equipment",
	},
	"calibration-services": {
		src: "/images/cylinder-maters.png",
		alt: "Cylindrical setting masters used during gauge calibration",
	},
};

const SERVICE_IMAGES = {
	"gauge-calibration": {
		src: "/images/cylinder-maters.png",
		alt: "Cylindrical setting masters used in the DSN Enterprises calibration lab",
	},
	"custom-gauge-manufacturing": {
		src: "/images/thread-setting-plug-gauge.png",
		alt: "Thread setting plug gauge made to customer drawing",
	},
	"gauge-repair-and-reconditioning": {
		src: "/images/plain-ring-gauge.png",
		alt: "Plain ring gauge reconditioned by DSN Enterprises",
	},
};

export function getProductLandingImage(productSlug) {
	return PRODUCT_IMAGES[productSlug] || FALLBACK;
}

export function getServiceLandingImage(serviceSlug) {
	return SERVICE_IMAGES[serviceSlug] || FALLBACK;
}
