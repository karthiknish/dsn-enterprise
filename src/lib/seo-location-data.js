/**
 * City-specific and product/service content for location landing pages.
 * Keeps each URL unique enough for local SEO without thin duplicate pages.
 */

export const CITY_PROFILES = {
	chennai: {
		industrialAreas: [
			"Ambattur Industrial Estate",
			"Sriperumbudur",
			"Guindy",
			"Thirumudivakkam",
		],
		keyIndustries: [
			"Automotive OEM and tier-1 suppliers",
			"Aerospace and defence subcontractors",
			"Pump, valve, and hydraulic manufacturers",
			"Heavy fabrication and engineering shops",
		],
		logistics:
			"We dispatch from Coimbatore to Chennai industrial clusters within 1–2 working days by road, with secure packaging for precision gauges.",
		localContext:
			"Chennai’s manufacturing belt depends on reliable thread and plain gauging for automotive and engineering supply chains. Plants in Ambattur and Sriperumbudur often need quick replenishment of working gauges and NABL-traceable calibration support.",
	},
	coimbatore: {
		industrialAreas: [
			"SIDCO Industrial Estate",
			"Kurichi",
			"Peelamedu",
			"Singanallur",
		],
		keyIndustries: [
			"Textile machinery and spinning equipment",
			"Pump and motor manufacturers",
			"General engineering and job shops",
			"Foundry and machining units",
		],
		logistics:
			"As our manufacturing base, Coimbatore customers benefit from same-day pickup options, factory visits, and the fastest turnaround on custom gauges.",
		localContext:
			"Coimbatore—the Manchester of South India—has dense clusters of engineering and textile machinery builders. Local manufacturers value direct access to gauge design review and on-site technical discussions.",
	},
	madurai: {
		industrialAreas: [
			"Kappalur Industrial Area",
			"SIDCO Madurai",
			"Gomathipuram",
		],
		keyIndustries: [
			"Textile spinning and processing",
			"Rubber and tyre component suppliers",
			"Food processing equipment makers",
			"Automotive ancillary units",
		],
		logistics:
			"Madurai is typically 4–6 hours from our Coimbatore works; scheduled weekly dispatches cover most gauge orders under 50 kg.",
		localContext:
			"Madurai’s industrial growth around Kappalur drives demand for plain and thread gauges used in spinning, rubber, and fabrication lines serving South Tamil Nadu.",
	},
	salem: {
		industrialAreas: [
			"Salem Steel Plant vicinity",
			"Mallur",
			"Suramangalam industrial pockets",
		],
		keyIndustries: [
			"Steel and alloy processing",
			"Magnesite and mining equipment",
			"Textile and weaving machinery",
			"Chemical and process equipment",
		],
		logistics:
			"Salem deliveries are routed via NH44 from Coimbatore, usually arriving within 2–3 working days.",
		localContext:
			"Salem’s steel and alloy ecosystem needs robust ring and plug gauges for bar, shaft, and bore inspection on high-throughput lines.",
	},
	tiruchirappalli: {
		industrialAreas: ["BHEL Township suppliers", "SIDCO Trichy", "Thuvakudi"],
		keyIndustries: [
			"Energy and boiler auxiliaries",
			"Cement and minerals equipment",
			"Fabrication and heavy machining",
			"Educational and R&D workshops",
		],
		logistics:
			"Trichy industrial customers receive shipments in 2–3 working days; urgent calibration lots can be couriered next-day.",
		localContext:
			"Trichy’s mix of heavy engineering and BHEL-linked suppliers requires traceable gauges for bore, thread, and setting master programmes.",
	},
	erode: {
		industrialAreas: ["Perundurai SIPCOT", "Erode town industrial wards"],
		keyIndustries: [
			"Turmeric and food processing machinery",
			"Textile wet processing equipment",
			"Dyeing and finishing machine builders",
			"General fabrication units",
		],
		logistics:
			"Erode is under 2 hours from Coimbatore—ideal for same-week gauge supply and pickup for calibration.",
		localContext:
			"Erode’s processing machinery sector uses plain plug and snap gauges heavily for shaft and housing checks on OEM equipment.",
	},
	tiruppur: {
		industrialAreas: [
			"Tiruppur Export Knitwear Complex",
			"Avinashi Road industrial belt",
		],
		keyIndustries: [
			"Knitwear and garment machinery",
			"Dyeing, printing, and finishing plants",
			"Compact spinning and textile OEMs",
			"Packaging and auxiliary equipment",
		],
		logistics:
			"Tiruppur orders often ship same-day or next-day from Coimbatore given proximity to the knitwear capital.",
		localContext:
			"India’s knitwear capital runs high-speed lines where thread plugs, ring gauges, and snap gauges protect needle, cam, and shaft tolerances.",
	},
	thoothukudi: {
		industrialAreas: [
			"SPIC industrial complex",
			"Port-based logistics and fabrication",
		],
		keyIndustries: [
			"Port and marine fabrication",
			"Chemical and salt-based industries",
			"Power and energy auxiliaries",
			"Oil and gas support services",
		],
		logistics:
			"Thoothukudi consignments move via road from Coimbatore (5–7 hours); API gauge orders for port services are packed for salt-air environments.",
		localContext:
			"The port city’s fabrication and energy sectors need API thread gauges and corrosion-aware storage guidance for field inspection teams.",
	},
};

export const PRODUCT_PROFILES = {
	"plain-plug-gauges": {
		hubPath: "/products/plain-gauges",
		hubLabel: "Plain Gauges",
		shortName: "plain plug gauges",
		applications: [
			"Bore and hole inspection on machined castings",
			"GO/NO-GO acceptance on production lines",
			"Incoming inspection of purchased components",
		],
		specs: [
			{ label: "Size range", value: "1 mm to 250 mm (as per drawing)" },
			{ label: "Configuration", value: "Separate or progressive GO / NO-GO" },
			{ label: "Material", value: "OHNS tool steel, carbide on request" },
			{ label: "Standards", value: "IS 919 / IS 3455 and customer drawings" },
			{ label: "Hardness", value: "58–65 HRC after heat treatment" },
			{
				label: "Certificate",
				value: "Calibration certificate; NABL on request",
			},
		],
	},
	"thread-ring-gauges": {
		hubPath: "/products/thread-gauges",
		hubLabel: "Thread Gauges",
		shortName: "thread ring gauges",
		applications: [
			"External thread inspection on shafts and studs",
			"Production line pass/fail at assembly stations",
			"Supplier qualification of threaded parts",
		],
		specs: [
			{ label: "Thread forms", value: "Metric, UN, BSP, NPT, and specials" },
			{ label: "Member type", value: "Solid or adjustable ring gauges" },
			{
				label: "Material",
				value: "High-grade tool steel, wear-resistant finish",
			},
			{ label: "Standards", value: "IS, ISO, DIN as specified on drawing" },
			{ label: "Pairing", value: "Can be supplied matched to plug gauges" },
			{ label: "Certificate", value: "Calibration with traceable standards" },
		],
	},
	"thread-plug-gauges": {
		hubPath: "/products/thread-gauges",
		hubLabel: "Thread Gauges",
		shortName: "thread plug gauges",
		applications: [
			"Internal thread inspection after tapping",
			"Nut and threaded bore acceptance",
			"In-process checks on CNC tapping cells",
		],
		specs: [
			{ label: "Thread forms", value: "Metric, UN, BSP, taper pipe threads" },
			{ label: "Style", value: "Taper or straight; GO/NO-GO sets" },
			{ label: "Material", value: "OHNS / carbide for high-volume lines" },
			{ label: "Specials", value: "ACME, buttress per drawing" },
			{ label: "Handling", value: "Supplied with protective cases" },
			{ label: "Certificate", value: "Works test and calibration docs" },
		],
	},
	"api-master-gauges": {
		hubPath: "/products/api-gauges",
		hubLabel: "API Gauges",
		shortName: "API master gauges",
		applications: [
			"OCTG and casing/tubing thread inspection",
			"Rotary shouldered connection checks",
			"Field and workshop reference for oil & gas contractors",
		],
		specs: [
			{ label: "Standards", value: "API 5B and API 7-2 applications" },
			{ label: "Types", value: "Working and master gauges per programme" },
			{ label: "Environment", value: "Packaging suited for field handling" },
			{ label: "Traceability", value: "Certificates aligned to customer QA" },
			{ label: "Support", value: "Pre-calibration condition checklists" },
			{ label: "Service", value: "Recalibration and repair coordination" },
		],
	},
	"snap-gauges": {
		hubPath: "/products/plain-gauges",
		hubLabel: "Plain Gauges",
		shortName: "snap gauges",
		applications: [
			"Rapid OD checks on shafts and pins",
			"High-volume production sorting",
			"Complement to micrometer sampling plans",
		],
		specs: [
			{ label: "Type", value: "Fixed and adjustable snap gauges" },
			{ label: "Range", value: "Built to drawing and tolerance band" },
			{ label: "Anvils", value: "Hardened, wear-resistant contacts" },
			{ label: "Identification", value: "Clear GO/NO-GO marking" },
			{ label: "Finish", value: "Precision ground measuring faces" },
			{ label: "Certificate", value: "Calibration available on dispatch" },
		],
	},
	"air-gauges": {
		hubPath: "/products/plain-gauges",
		hubLabel: "Plain Gauges",
		shortName: "air gauges",
		applications: [
			"Non-contact comparative bore measurement",
			"Automated inspection cells",
			"High-repeatability checks on thin-wall parts",
		],
		specs: [
			{ label: "Principle", value: "Pneumatic comparative measurement" },
			{ label: "Integration", value: "Suitable for fixture mounting" },
			{ label: "Resolution", value: "Sub-micron repeatability in setup" },
			{ label: "Setup", value: "Requires master setting components" },
			{ label: "Support", value: "Application guidance from DSN team" },
			{ label: "Service", value: "Calibration of air tooling on request" },
		],
	},
	"calibration-services": {
		hubPath: "/calibration",
		hubLabel: "Calibration",
		shortName: "gauge calibration services",
		applications: [
			"Recall programmes for working gauges",
			"Laboratory reference for masters",
			"Audit preparation for ISO and customer reviews",
		],
		specs: [
			{ label: "Scope", value: "Plain, thread, snap, and special gauges" },
			{ label: "Traceability", value: "NABL-aligned processes where required" },
			{ label: "Turnaround", value: "Standard 3–5 days; express available" },
			{ label: "Pickup", value: "Collection from major TN industrial cities" },
			{ label: "Documentation", value: "Detailed certificates with results" },
			{ label: "Advice", value: "Fit-for-use and replacement guidance" },
		],
	},
};

export const SERVICE_PROFILES = {
	"gauge-calibration": {
		hubPath: "/calibration",
		hubLabel: "Calibration Services",
		processSteps: [
			"Receipt, ID check, and condition report",
			"Cleaning and stabilisation of measuring faces",
			"Calibration against traceable reference standards",
			"Certificate issue with as-found/as-left data where needed",
			"Secure return packaging and dispatch",
		],
	},
	"custom-gauge-manufacturing": {
		hubPath: "/products/special-gauges",
		hubLabel: "Special Gauges",
		processSteps: [
			"Drawing review and tolerance feasibility check",
			"Material and heat-treatment selection",
			"CNC machining, grinding, and lapping",
			"First-article approval on customer parts",
			"Batch production with calibration certificates",
		],
	},
	"gauge-repair-and-reconditioning": {
		hubPath: "/services",
		hubLabel: "Services",
		processSteps: [
			"Damage assessment and repair feasibility",
			"Regrind of functional surfaces within limits",
			"Handle or hardware replacement if required",
			"Post-repair calibration and certificate",
			"Recommendation on remaining service life",
		],
	},
};

/** Map product SEO slug → primary marketing page */
export function getProductHub(productSlug) {
	return (
		PRODUCT_PROFILES[productSlug] || {
			hubPath: "/products",
			hubLabel: "Products",
		}
	);
}

export function getCityProfile(citySlug) {
	return (
		CITY_PROFILES[citySlug] || {
			industrialAreas: ["Industrial estates across Tamil Nadu"],
			keyIndustries: ["Manufacturing", "Engineering", "Quality control"],
			logistics: "We ship across Tamil Nadu from our Coimbatore facility.",
			localContext:
				"Industrial customers across Tamil Nadu rely on DSN Enterprises for precision gauges.",
		}
	);
}

export function buildProductFaqs(pageData, productSlug, citySlug) {
	const city = getCityProfile(citySlug);
	const product = PRODUCT_PROFILES[productSlug];
	const name = pageData.productName;
	const cityName = pageData.cityName;

	return [
		{
			question: `Do you supply ${name} to ${cityName}?`,
			answer: `Yes. We manufacture and supply ${name} to ${cityName} and surrounding industrial areas including ${city.industrialAreas.slice(0, 2).join(" and ")}. ${city.logistics}`,
		},
		{
			question: `What is the typical delivery time to ${cityName}?`,
			answer: city.logistics,
		},
		{
			question: `Can you manufacture custom ${product?.shortName || name.toLowerCase()}?`,
			answer: `Yes—we manufacture custom ${product?.shortName || name.toLowerCase()} to your drawing with GO/NO-GO or progressive members, special materials, and paired sets where required. Email the drawing for feasibility, lead time, and price from our Coimbatore works.`,
		},
		{
			question: "Are calibration certificates included?",
			answer:
				"New gauges include calibration certificates with measured dimensions. NABL-traceable certificates are issued when your quality system, API programme, or customer contract requires accredited documentation.",
		},
		{
			question: `Which industries in ${cityName} use your gauges?`,
			answer: `Common sectors include ${city.keyIndustries.slice(0, 3).join(", ")}, and other precision engineering units in the region.`,
		},
	];
}

export function buildServiceFaqs(pageData, serviceSlug, citySlug) {
	const city = getCityProfile(citySlug);
	const cityName = pageData.cityName;
	const serviceName = pageData.serviceName;

	const turnaround =
		serviceSlug === "gauge-calibration"
			? "Standard calibration is 3–5 working days from receipt at our Coimbatore lab; express slots are available for line-stop situations."
			: "Lead time depends on scope—contact us with drawings or a gauge list for a firm schedule.";

	return [
		{
			question: `Do you offer ${serviceName} in ${cityName}?`,
			answer: `Yes. We serve ${cityName} with ${serviceName.toLowerCase()} supported from our Coimbatore facility. ${city.logistics}`,
		},
		{
			question: "Is pickup and delivery available?",
			answer: `Pickup and return delivery can be arranged for ${cityName} and nearby industrial areas. Many customers consolidate gauge lots on a monthly recall cycle.`,
		},
		{
			question: "What turnaround time should we plan for?",
			answer: turnaround,
		},
		{
			question: "What documentation do you provide?",
			answer:
				"You receive detailed certificates with traceability information. Calibration jobs include measurement results suitable for ISO audits and customer source inspections.",
		},
		{
			question: `Which ${cityName} industries do you work with?`,
			answer: `We support ${city.keyIndustries.slice(0, 3).join(", ")}, and quality labs across the district.`,
		},
	];
}
