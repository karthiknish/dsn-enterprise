/**
 * City-specific and product/service content for location landing pages.
 *
 * Each city carries enough genuinely local detail — geography, transit,
 * named industrial estates, the gauging problem that actually dominates
 * there, and a concrete shop-floor proof point — that a landing page can
 * clear Google's "is this page worth indexing" bar instead of reading as a
 * find-and-replace template. See docs/SEO-STRATEGY.md for the rationale.
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
		distanceKm: 500,
		transit: "1–2 working days",
		corridor: "NH544 via Salem, then NH48",
		sector: "automotive and aerospace",
		transitPhrase: "Delivered in 1–2 working days",
		nearbyTowns: [
			"Sriperumbudur",
			"Oragadam",
			"Maraimalai Nagar",
			"Gummidipoondi",
			"Irungattukottai",
		],
		toleranceFocus:
			"PPAP and tier-1 source inspection, where a customer auditor will ask to see the gauge certificate alongside the part",
		localProof:
			"Oragadam and Sriperumbudur tier-1 plants typically run gauge recall on a 6-month cycle tied to OEM audit dates, so replacement members are ordered in matched pairs rather than singly.",
		buyingPattern:
			"Chennai buyers usually issue a scheduled purchase order against an approved vendor list, and need the calibration certificate number quoted on the invoice for incoming QA to clear it.",
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
			"Coimbatore, the Manchester of South India, has dense clusters of engineering and textile machinery builders. Local manufacturers value direct access to gauge design review and on-site technical discussions.",
		distanceKm: 0,
		transit: "same day",
		corridor: "local delivery within the city and Sulur–Annur belt",
		sector: "pump and textile machinery",
		transitPhrase: "Same-day collection",
		nearbyTowns: [
			"Sulur",
			"Karumathampatti",
			"Annur",
			"Kinathukadavu",
			"Pollachi",
		],
		toleranceFocus:
			"first-article approval on new pump and textile machinery designs, where the drawing is still moving and the gauge has to be specified before the tolerance is frozen",
		localProof:
			"Because our works is in Coimbatore, local customers routinely bring the actual part to the shop for a fit trial before we cut the gauge — which catches drawing ambiguities that would otherwise show up after delivery.",
		buyingPattern:
			"Coimbatore job shops often order against a single drawing with a one- or two-piece quantity, so we quote on drawing review rather than catalogue size.",
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
		distanceKm: 210,
		transit: "1–2 working days",
		corridor: "NH44 via Dindigul",
		sector: "rubber and spinning",
		transitPhrase: "Delivered in 1–2 working days",
		nearbyTowns: [
			"Kappalur",
			"Thirumangalam",
			"Dindigul",
			"Virudhunagar",
			"Sivakasi",
		],
		toleranceFocus:
			"rubber and moulding tooling, where the bore is checked cold but runs hot, so gauge selection has to account for the working temperature",
		localProof:
			"Madurai rubber component suppliers often need a second NO-GO member held at a slightly different limit to sort parts by shrinkage batch rather than scrap them outright.",
		buyingPattern:
			"Orders from the Kappalur belt tend to consolidate several sizes into one dispatch to save on freight, so we hold the lot and ship complete unless a line is stopped.",
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
		distanceKm: 160,
		transit: "1–2 working days",
		corridor: "NH544 via Avinashi and Perundurai",
		sector: "steel and alloy",
		transitPhrase: "Delivered in 1–2 working days",
		nearbyTowns: ["Mallur", "Omalur", "Sankagiri", "Mettur", "Namakkal"],
		toleranceFocus:
			"abrasive wear, because bar and billet handling drags scale across the measuring faces and eats GO members faster than in clean machining",
		localProof:
			"Salem steel and alloy customers usually shorten the recall interval on GO members rather than NO-GO, since the GO face does the sliding and wears out of limit first.",
		buyingPattern:
			"Carbide-faced or hard-chrome-plated members are worth the premium here; several Mallur customers moved to carbide after replacing tool-steel plugs twice a year.",
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
		distanceKm: 200,
		transit: "2 working days",
		corridor: "NH81 via Karur",
		sector: "boiler and heavy fabrication",
		transitPhrase: "Delivered in 2 working days",
		nearbyTowns: ["Thuvakudi", "Manapparai", "Lalgudi", "Perambalur", "Karur"],
		toleranceFocus:
			"large-diameter and long-engagement threads on boiler and pressure-part fabrication, where a standard-length plug will not reach the full thread depth",
		localProof:
			"BHEL-linked suppliers in Thuvakudi frequently need extended-reach plug members and documented setting masters, because the inspection point sits deep inside a welded assembly.",
		buyingPattern:
			"Trichy tenders often specify NABL-traceable certification explicitly in the purchase order, so we issue accredited documentation by default for this cluster.",
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
			"Erode is under 2 hours from Coimbatore, ideal for same-week gauge supply and pickup for calibration.",
		localContext:
			"Erode’s processing machinery sector uses plain plug and snap gauges heavily for shaft and housing checks on OEM equipment.",
		distanceKm: 100,
		transit: "next working day",
		corridor: "NH544 via Perundurai",
		sector: "processing and dyeing machinery",
		transitPhrase: "Next-day delivery",
		nearbyTowns: [
			"Perundurai",
			"Chithode",
			"Bhavani",
			"Gobichettipalayam",
			"Sathyamangalam",
		],
		toleranceFocus:
			"corrosion from dye-house and wet-processing atmospheres, which pits gauge faces long before mechanical wear becomes the limiting factor",
		localProof:
			"Erode wet-processing customers get more life from gauges stored in sealed, oiled cases away from the dye floor than from upgrading the gauge material itself.",
		buyingPattern:
			"Proximity means Erode customers often send gauges for calibration and collect them in the same week, so we schedule this cluster on a rolling pickup rather than a fixed lot.",
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
		distanceKm: 50,
		transit: "same day or next day",
		corridor: "NH544 via Avinashi",
		sector: "knitwear machinery",
		transitPhrase: "Same-day or next-day delivery",
		nearbyTowns: ["Avinashi", "Palladam", "Uthukuli", "Kangeyam", "Dharapuram"],
		toleranceFocus:
			"high-cycle wear on small-diameter shafts and cam followers, where a few microns of drift shows up as dropped stitches long before anything measures obviously out of limit",
		localProof:
			"Tiruppur knitting machine rebuilders check needle-bar and cam shaft diameters with snap gauges between shifts, so the gauge itself needs a tighter recall interval than the parts it checks.",
		buyingPattern:
			"Same-day road access from Coimbatore means Tiruppur customers can order in the morning and fit the gauge the same evening, which suits breakdown-driven buying.",
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
		distanceKm: 400,
		transit: "2–3 working days",
		corridor: "NH38 via Madurai and Kovilpatti",
		sector: "port, marine, and energy",
		transitPhrase: "Delivered in 2–3 working days",
		nearbyTowns: [
			"Kovilpatti",
			"Tirunelveli",
			"Sattur",
			"Ettayapuram",
			"Tiruchendur",
		],
		toleranceFocus:
			"salt-air corrosion on API connections inspected in the open, where a gauge left uncovered for one shift can pick up surface rust that changes the fit",
		localProof:
			"Thoothukudi field crews inspecting casing and tubing connections get more value from VCI packaging and a disciplined wipe-down routine than from a shorter calibration interval.",
		buyingPattern:
			"Port-side contractors here buy against API programme requirements, so the certificate has to name the applicable API spec and revision, not just the measured size.",
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
			distanceKm: null,
			transit: "2–3 working days",
			corridor: "road freight from Coimbatore",
			sector: "precision engineering",
			transitPhrase: "Delivered in 2–3 working days",
			nearbyTowns: [],
			toleranceFocus: "routine GO/NO-GO acceptance on production parts",
			localProof:
				"Gauges are packed and documented the same way for every destination in Tamil Nadu.",
			buyingPattern:
				"Send the drawing with quantity and certificate requirements for a firm quotation.",
		}
	);
}

/**
 * The specific gauging problem a given product solves in a given city.
 * Only combinations we can say something concrete about are listed; the
 * rest fall back to a composed sentence built from the city profile.
 * This is what stops sibling pages from being 95% identical.
 */
export const CITY_PRODUCT_NOTES = {
	"thread-plug-gauges": {
		chennai:
			"Automotive tier-1 plants around Oragadam tap thousands of M6–M12 holes per shift. The failure that matters is not a bad tap — it is a worn GO plug that starts passing threads it should reject, which only surfaces at the OEM. Matched GO/NO-GO pairs on a fixed recall interval prevent that.",
		coimbatore:
			"Pump and textile machinery builders here often tap into castings where the hole is not perfectly perpendicular. A taper-lead plug member enters cleanly and tells you about the thread rather than the setup, which is why we usually recommend it over a straight member for foundry work.",
		tiruchirappalli:
			"Boiler and pressure-part assemblies put the tapped hole deep inside a welded structure. Standard plug lengths bottom out before reaching full engagement, so extended-reach members are the norm for BHEL-linked suppliers in Thuvakudi.",
		tiruppur:
			"Knitting machine rebuilds involve small threads in aluminium housings that strip easily. A NO-GO member that is forced in will damage the thread it is meant to judge, so operator training matters here as much as gauge specification.",
	},
	"plain-plug-gauges": {
		chennai:
			"Bore acceptance on machined castings is the volume application in the Ambattur and Sriperumbudur belt. Progressive GO/NO-GO members speed up the check, but separate members are easier to recertify when only one end wears.",
		coimbatore:
			"Pump housings and motor end shields dominate local plain gauging. Because we are in the city, customers regularly bring a sample casting for a fit trial before we finalise the gauge size — useful when the drawing tolerance and the real process capability disagree.",
		salem:
			"Bar and billet handling drags scale into the bore, so the GO member wears measurably faster than the NO-GO. Carbide-faced members pay for themselves on high-throughput lines around Mallur.",
		erode:
			"Wet-processing and dyeing equipment means gauges live in a humid, chemically active atmosphere. Corrosion pits the measuring face before mechanical wear matters, so storage discipline drives gauge life more than material choice.",
		madurai:
			"Rubber and moulding tooling is checked cold but runs hot. Specifying the gauge against the working condition rather than the ambient drawing dimension avoids parts that pass inspection and fail in service.",
	},
	"thread-ring-gauges": {
		chennai:
			"External threads on studs and shafts feeding automotive assembly need ring gauges matched to the plug members used upstream. Supplying them as a set keeps the acceptance envelope consistent across the supply chain.",
		salem:
			"Threaded bar stock in the steel cluster arrives with scale and inconsistent lead. Adjustable ring gauges let inspection re-set to the reference standard rather than scrapping the gauge when it drifts.",
		tiruchirappalli:
			"Large-diameter threads on pressure parts often exceed standard ring sizes. These are drawing-based builds with a setting plug supplied alongside so the ring can be verified locally.",
	},
	"api-master-gauges": {
		thoothukudi:
			"Casing and tubing connections are inspected dockside in salt air. API 5B gauges here need VCI packaging and a documented wipe-down routine — surface rust on a working gauge changes the fit long before the calibration interval expires.",
		tiruchirappalli:
			"Rotary shouldered connections on energy-sector fabrication call for API 7-2 working gauges with traceability that survives a client audit, since these programmes are usually contractually specified.",
		chennai:
			"Oil and gas subcontractors in the Chennai belt typically need working gauges verified against a master on a fixed schedule, with certificates that reference the API spec revision by name.",
	},
	"snap-gauges": {
		tiruppur:
			"Needle bars and cam shafts on knitting machines are checked between shifts. A snap gauge gives a pass/fail in seconds without taking the shaft out of the machine, which is the only reason the check actually gets done.",
		erode:
			"Shaft diameters on processing machinery are checked at assembly rather than in a metrology room. Fixed snap gauges survive that environment better than adjustable ones, which drift when handled roughly.",
		salem:
			"High-throughput bar sorting needs hardened anvils. Standard tool-steel contacts flatten quickly against scaled stock, so we specify wear-resistant faces for this cluster by default.",
		madurai:
			"Rubber-covered rollers and moulded shafts are checked with snap gauges because a plug or ring would deform the surface being measured.",
	},
	"air-gauges": {
		coimbatore:
			"Thin-wall pump components distort under contact measurement. Pneumatic comparative gauging reads the bore without touching it, which is why local pump manufacturers use air tooling for final inspection even when a plug gauge would be cheaper.",
		chennai:
			"Automated inspection cells on automotive lines need a measurement that outputs a value rather than a pass/fail. Air gauging integrates into fixtures and feeds SPC directly.",
	},
	"calibration-services": {
		coimbatore:
			"Local customers drop gauges at the works and collect them, often within the same week. Being able to discuss an as-found result face to face usually resolves a borderline gauge faster than a certificate exchange would.",
		chennai:
			"Tier-1 recall programmes are tied to OEM audit dates, so the calibration schedule is fixed months ahead. We hold those slots rather than working first-come for this cluster.",
		erode:
			"Proximity supports a rolling pickup: gauges go out on one trip and come back on the next, which suits shops that cannot spare a gauge for a week.",
		tiruchirappalli:
			"Tenders in the Trichy cluster commonly require NABL-traceable certification by name, so accredited documentation is issued by default rather than on request.",
	},
};

/**
 * City-specific angle for each service. Without this, two service pages for
 * the same city differ only by the service name and process-step list, which
 * measured at ~75% similarity and reads as templated.
 */
export const CITY_SERVICE_NOTES = {
	"gauge-calibration": {
		coimbatore:
			"Local customers usually drop gauges at the works and collect them the same week. The practical advantage is being able to talk through a borderline as-found result in person — a gauge that is marginally out of limit is often still fit for the specific job it does, and that call is faster made face to face than over email.",
		chennai:
			"Tier-1 recall programmes here are pinned to OEM audit dates rather than to convenience, so calibration slots have to be booked months ahead. We reserve capacity against those dates for the Chennai cluster instead of working purely first-come, because a missed recall shows up as an audit non-conformance rather than just a late gauge.",
		tiruppur:
			"Knitting machine gauges are handled every shift, so drift is driven by handling frequency rather than elapsed months. Tiruppur customers usually benefit from a shorter interval on the gauges that live on the shop floor and a standard interval on the reference masters kept in the office.",
		erode:
			"The dye-house atmosphere is the deciding factor here. Gauges come back with surface pitting more often than with mechanical wear, so the as-found report focuses on face condition as much as on size, and we flag items where corrosion rather than usage is driving the drift.",
		salem:
			"Scale and abrasive dust mean the GO member typically drifts before the NO-GO. Reporting the two members separately lets Salem customers replace only the worn half instead of scrapping a matched set, which is usually the cheaper outcome on high-throughput lines.",
		tiruchirappalli:
			"Tenders in this cluster commonly name NABL traceability explicitly, so accredited documentation is issued by default rather than on request. Setting masters used on boiler and pressure-part work are calibrated alongside the working gauges so the whole chain is evidenced in one certificate set.",
		madurai:
			"Rubber and moulding work means gauges are often specified against a working temperature rather than the ambient drawing dimension. We record the reference condition on the certificate so the result is interpretable later.",
		thoothukudi:
			"API gauges returning from dockside inspection arrive with salt-air exposure. Cleaning and stabilisation matter more here than anywhere else in the state, and the certificate notes surface condition on receipt so field crews can see whether storage or usage caused the change.",
	},
	"custom-gauge-manufacturing": {
		coimbatore:
			"Being in the same city means we can review the drawing with the part in hand. Local pump and textile machinery builders regularly bring a sample casting before we cut, which catches the cases where the drawing tolerance and the actual process capability disagree — far cheaper to resolve before manufacture than after.",
		chennai:
			"Custom work for the Chennai automotive belt usually has to satisfy a customer-specified inspection standard, not just the drawing. We confirm which standard governs before quoting, because it changes the gauge tolerance class and therefore the price and lead time.",
		tiruchirappalli:
			"Boiler and pressure-part work drives most custom requests here: extended-reach members, oversized rings, and setting masters for threads that sit deep inside welded assemblies. These are drawing-based builds where reach and access matter as much as the thread form itself.",
	},
	"gauge-repair-and-reconditioning": {
		coimbatore:
			"Local turnaround makes repair viable on gauges that would otherwise be replaced. We assess whether a regrind can bring the member back inside limits before quoting, since a gauge that has already been reground once may not have enough material left for a second pass.",
		tiruppur:
			"High handling frequency on knitting machine gauges means damage is usually mechanical — dropped members, dinged faces — rather than gradual wear. Those are often economically repairable, which matters when the same gauge is checked between every shift.",
		salem:
			"Abrasive wear in the steel cluster takes material off evenly rather than locally, so reconditioning here is about deciding whether enough stock remains to regrind to a valid limit. We report remaining service life alongside the repair so replacement can be planned rather than forced.",
	},
};

export function getCityServiceNote(serviceSlug, citySlug) {
	const byService = CITY_SERVICE_NOTES[serviceSlug];
	if (byService?.[citySlug]) return byService[citySlug];

	const city = getCityProfile(citySlug);
	return `For this cluster the deciding factor is ${city.toleranceFocus}. ${city.localProof}`;
}

export function getCityProductNote(productSlug, citySlug) {
	const byProduct = CITY_PRODUCT_NOTES[productSlug];
	if (byProduct?.[citySlug]) return byProduct[citySlug];

	// Composed fallback — still city-specific, never a generic sentence.
	const city = getCityProfile(citySlug);
	const profile = PRODUCT_PROFILES[productSlug];
	const name = profile?.shortName || "these gauges";
	return `In this cluster the dominant concern with ${name} is ${city.toleranceFocus}. ${city.localProof}`;
}

export function buildProductFaqs(pageData, productSlug, citySlug) {
	const city = getCityProfile(citySlug);
	const product = PRODUCT_PROFILES[productSlug];
	const name = pageData.productName;
	const cityName = pageData.cityName;

	const shortName = product?.shortName || name.toLowerCase();
	const towns = city.nearbyTowns?.length
		? ` We also cover ${city.nearbyTowns.slice(0, 4).join(", ")}.`
		: "";
	const distance =
		city.distanceKm === 0
			? "Our works is in Coimbatore itself, so collection and delivery are same-day."
			: city.distanceKm
				? `${cityName} is about ${city.distanceKm} km from our Coimbatore works via ${city.corridor}, so transit is normally ${city.transit}.`
				: city.logistics;

	return [
		{
			question: `Do you supply ${name} to ${cityName}?`,
			answer: `Yes. We manufacture ${shortName} at our Coimbatore works and supply them across ${cityName}, including ${city.industrialAreas.slice(0, 2).join(" and ")}.${towns} ${distance}`,
		},
		{
			question: `How long does delivery to ${cityName} take?`,
			answer: `${distance} ${city.buyingPattern || city.logistics}`,
		},
		{
			question: `What usually goes wrong with ${shortName} in ${cityName}?`,
			answer: getCityProductNote(productSlug, citySlug),
		},
		{
			question: `Can you manufacture custom ${shortName} to our drawing?`,
			answer: `Yes. We build ${shortName} to drawing with GO/NO-GO or progressive members, alternative materials, and matched sets where the application needs them. Given that ${cityName} work centres on ${city.toleranceFocus}, send the drawing together with the process and inspection conditions so we can confirm the gauge actually suits how the part is made.`,
		},
		{
			question: "Are calibration certificates included?",
			answer:
				"New gauges ship with a calibration certificate showing measured dimensions against the specified limits. NABL-traceable certificates are issued when your quality system, API programme, or customer contract requires accredited documentation — tell us at order stage so the right route is used from the start.",
		},
		{
			question: `Which ${cityName} industries do you supply?`,
			answer: `Mainly ${city.keyIndustries.slice(0, 3).join(", ")}, plus general precision engineering units in the district. ${city.localProof}`,
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
			: "Lead time depends on scope, contact us with drawings or a gauge list for a firm schedule.";

	const towns = city.nearbyTowns?.length
		? ` Collection also covers ${city.nearbyTowns.slice(0, 4).join(", ")}.`
		: "";
	const distance =
		city.distanceKm === 0
			? "Our lab is in Coimbatore, so gauges can be dropped off and collected the same week."
			: city.distanceKm
				? `${cityName} is about ${city.distanceKm} km from the lab via ${city.corridor}, with ${city.transit} transit each way.`
				: city.logistics;

	return [
		{
			question: `Do you offer ${serviceName} in ${cityName}?`,
			answer: `Yes. ${cityName} is served from our Coimbatore facility. ${distance}${towns}`,
		},
		{
			question: `Is pickup and return available in ${cityName}?`,
			answer: `Yes. ${city.buyingPattern || `Pickup and return can be arranged for ${cityName} and nearby industrial areas.`} Consolidating a gauge lot into one movement keeps freight cost per gauge low, which is why most customers align recall dates rather than sending items individually.`,
		},
		{
			question: "What turnaround should we plan for?",
			answer: `${turnaround} Add ${city.transit} each way for transit from ${cityName}.`,
		},
		{
			question: `What should ${cityName} customers watch for between calibrations?`,
			answer: `${city.localProof} The practical point is that ${city.toleranceFocus} drives how often a gauge really needs checking — more than the calendar interval alone.`,
		},
		{
			question: "What documentation do you provide?",
			answer:
				"Certificates carry traceability information and measurement results suitable for ISO audits and customer source inspections. As-found and as-left data is recorded where the programme requires evidence of drift between intervals.",
		},
		{
			question: `Which ${cityName} industries do you work with?`,
			answer: `Mainly ${city.keyIndustries.slice(0, 3).join(", ")}, plus quality labs and inspection departments across the district.`,
		},
	];
}
