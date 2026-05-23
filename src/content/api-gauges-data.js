import { FaIndustry, FaOilCan } from "react-icons/fa";

const products = [
	{
		id: "api-thread-plug-gauge",
		name: "API Thread Plug Gauge",
		specs: "API 5B & 7-2 Certified",
		description:
			"Certified API thread plug gauges for inspection of internal threads on casing, tubing, line pipe, and rotary shouldered connections used in oil and gas drilling operations.",
		features: [
			"API 5B certified for casing/tubing",
			"API 7-2 certified for rotary connections",
			"L1, L2, L3 configurations",
			"Working and reference gauges",
			"Full thread and truncated profiles",
		],
		applications: [
			"Casing inspection",
			"Tubing threads",
			"Line pipe connections",
			"Drilling equipment",
		],
		image: "/images/api-thread-gauge.png",
	},
	{
		id: "api-thread-ring-gauge",
		name: "API Thread Ring Gauge",
		specs: "API 5B & 7-2 Certified",
		description:
			"Certified API thread ring gauges for inspection of external threads on pins, couplings, and rotary shouldered connections in petroleum industry applications.",
		features: [
			"API specification compliant",
			"GO and NO-GO configurations",
			"L1, L2, L3 lengths",
			"Working and master gauges",
			"Traceable calibration",
		],
		applications: [
			"Pin thread inspection",
			"Coupling verification",
			"Rotary connections",
			"Field inspection",
		],
		image: "/images/thread-ring-gauge.png",
	},
	{
		id: "api-master-gauges",
		name: "API Master Gauges",
		specs: "Reference Standards - API 5B & 7-2",
		description:
			"High-precision master gauges used as reference standards for calibrating working API gauges. Essential for maintaining accuracy in quality control laboratories.",
		features: [
			"Reference grade precision",
			"Calibration certificates",
			"Traceable to API standards",
			"Full form and truncated",
			"Premium grade materials",
		],
		applications: [
			"Gauge calibration",
			"Laboratory reference",
			"Quality assurance",
			"Audit compliance",
		],
		image: "/images/api-master-gauge.png",
	},
	{
		id: "api-casing-gauges",
		name: "API Casing Thread Gauges",
		specs: 'Sizes: 4-1/2" to 20" - API 5B',
		description:
			"Complete range of API casing thread gauges for inspection of casing connections. Available in round thread (CSG), buttress (BCSG), and extreme line patterns.",
		features: [
			"Round thread (8 TPI)",
			"Buttress thread (5 TPI)",
			"Extreme line available",
			"All standard casing sizes",
			"API 5B specification",
		],
		applications: [
			"Casing manufacturing",
			"Thread inspection",
			"Field verification",
			"Mill inspection",
		],
		image: "/images/api-thread-gauge.png",
	},
	{
		id: "api-tubing-gauges",
		name: "API Tubing Thread Gauges",
		specs: 'Sizes: 1.050" to 4-1/2" - API 5B',
		description:
			"API tubing thread gauges for inspection of tubing connections used in oil well completion. Available in EUE (External Upset End) and NUE (Non-Upset End) configurations.",
		features: [
			"EUE (External Upset End)",
			"NUE (Non-Upset End)",
			"10 TPI thread form",
			"All standard tubing sizes",
			"Working and reference grades",
		],
		applications: [
			"Tubing manufacturing",
			"Well completion",
			"Production tubing",
			"Workover operations",
		],
		image: "/images/api-thread-gauge.png",
	},
	{
		id: "api-rotary-gauges",
		name: "API Rotary Shouldered Gauges",
		specs: "NC, IF, REG, FH - API 7-2",
		description:
			"API 7-2 certified gauges for rotary shouldered thread connections used on drill pipe, drill collars, and bottom hole assemblies in drilling operations.",
		features: [
			"NC numbered connections",
			"IF internal flush",
			"REG regular connections",
			"FH full hole",
			"API 7-2 specification",
		],
		applications: [
			"Drill pipe inspection",
			"Drill collar threads",
			"BHA connections",
			"Rig floor inspection",
		],
		image: "/images/api-master-gauge.png",
	},
];

const apiConnections = [
	{
		type: "API 5B Connections",
		items: [
			"Casing (CSG)",
			"Tubing (TBG)",
			"Line Pipe (LP)",
			"Buttress (BCSG)",
		],
		icon: FaOilCan,
	},
	{
		type: "API 7-2 Connections",
		items: ["NC10 to NC77", "IF", "REG", "FH", "SH", "XH"],
		icon: FaIndustry,
	},
];

const certifications = [
	{
		name: "API 5B License",
		number: "5B-0039",
		description:
			"Threading, gauging, and inspection of casing, tubing, and line pipe threads",
	},
	{
		name: "API 7-2 License",
		number: "7-2-0023",
		description:
			"Threading and gauging of rotary shouldered thread connections",
	},
];

const specifications = [
	{ label: "Material", value: "OHNS (W) / Tungsten Carbide" },
	{ label: "Hardness", value: "60 ± 2 HRC" },
	{ label: "Treatment", value: "Sub-Zero at -80°C" },
	{ label: "Thread Form", value: "As per API 5B / 7-2" },
	{ label: "Calibration", value: "Traceable to API Standards" },
	{ label: "Certificate", value: "API Certificate Included" },
];

export {
	products,
	apiConnections,
	certifications,
	specifications,
};
