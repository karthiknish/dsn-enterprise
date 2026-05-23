import { FaCog, FaDrawPolygon, FaWrench } from "react-icons/fa";

export const products = [
	{
		id: "acme-thread-gauges",
		name: "ACME Thread Gauges",
		specs: "General Purpose, Stub, & Centralizing ACME",
		description:
			"Precision ACME thread gauges for power transmission applications. Used extensively in lead screws, jacks, and linear motion systems where high load capacity is required.",
		features: [
			"29° included angle",
			"General purpose ACME",
			"Stub ACME available",
			"Centralizing ACME",
			"Plug and ring configurations",
		],
		applications: [
			"Lead screws",
			"Machine tools",
			"Jacks & lifts",
			"Linear actuators",
		],
		image: "/images/featured.png",
	},
	{
		id: "buttress-thread-gauges",
		name: "Buttress Thread Gauges",
		specs: "7° & 45° Face Angles",
		description:
			"Specialized gauges for buttress thread inspection. Designed for applications requiring high axial load capacity in one direction, common in artillery and high-pressure vessels.",
		features: [
			"7° load flank angle",
			"45° clearance flank",
			"High load capacity design",
			"Plug and ring types",
			"Custom pitches available",
		],
		applications: [
			"High-pressure equipment",
			"Artillery shells",
			"Pipe couplings",
			"Heavy machinery",
		],
		image: "/images/featured.png",
	},
	{
		id: "trapezoidal-thread-gauges",
		name: "Trapezoidal Thread Gauges",
		specs: "ISO Metric Trapezoidal (Tr)",
		description:
			"Gauges for ISO metric trapezoidal threads used in power transmission applications. Similar to ACME but following ISO/metric standards for international compatibility.",
		features: [
			"30° included angle",
			"ISO metric standard",
			"Tr designation threads",
			"Various pitch options",
			"Plug and ring sets",
		],
		applications: [
			"Machine tools",
			"Presses",
			"Vices",
			"International machinery",
		],
		image: "/images/featured.png",
	},
	{
		id: "spline-gauges",
		name: "Spline Gauges",
		specs: "Involute, Straight-Sided & Serration",
		description:
			"Precision spline gauges for inspection of splined shafts and hubs. Critical for automotive, aerospace, and power transmission applications.",
		features: [
			"Involute spline profiles",
			"Straight-sided splines",
			"Serration gauges",
			"Composite and sector types",
			"GO and NO-GO members",
		],
		applications: [
			"Automotive drivetrains",
			"Aerospace components",
			"Gearboxes",
			"Power take-offs",
		],
		image: "/images/featured.png",
	},
	{
		id: "custom-gauges",
		name: "Custom Gauges as per Drawing",
		specs: "Manufactured to Customer Specifications",
		description:
			"We specialize in manufacturing custom gauges according to customer drawings and specifications. From simple modifications to complex specialty gauges, we deliver precision solutions.",
		features: [
			"Design consultation",
			"CAD/CAM manufacturing",
			"Prototype development",
			"Batch production",
			"Full documentation",
		],
		applications: [
			"Special applications",
			"Proprietary designs",
			"R&D projects",
			"Legacy equipment",
		],
		image: "/images/featured.png",
	},
	{
		id: "taper-gauges",
		name: "Taper Gauges",
		specs: "Morse, Metric & Jarno Tapers",
		description:
			"Precision taper gauges for inspection of tapered bores and shanks. Essential for machine tool spindles, toolholders, and precision equipment.",
		features: [
			"Morse taper (MT0-MT7)",
			"Metric taper",
			"Jarno taper",
			"Plug and ring types",
			"Self-holding tapers",
		],
		applications: [
			"Machine spindles",
			"Toolholders",
			"Lathe centers",
			"Precision fixtures",
		],
		image: "/images/featured.png",
	},
	{
		id: "form-gauges",
		name: "Form & Profile Gauges",
		specs: "Custom Profiles & Contours",
		description:
			"Specialized gauges for checking complex profiles, contours, and form features. Used for quality control of parts with non-standard geometries.",
		features: [
			"Custom profile shapes",
			"Radius gauges",
			"Contour templates",
			"Gap and flush gauges",
			"Precision wire EDM cut",
		],
		applications: [
			"Complex profiles",
			"Radius checking",
			"Gap inspection",
			"Contour verification",
		],
		image: "/images/featured.png",
	},
	{
		id: "limit-gauges",
		name: "Limit Gauges & Functional Gauges",
		specs: "Go/No-Go & Assembly Verification",
		description:
			"Functional gauges designed to verify assembly fit and function. Ensures parts will properly assemble and function in their intended application.",
		features: [
			"Assembly simulation",
			"Functional testing",
			"Multi-feature checking",
			"Position verification",
			"Custom configurations",
		],
		applications: [
			"Assembly verification",
			"Production QC",
			"Part acceptance",
			"Process control",
		],
		image: "/images/featured.png",
	},
];

export const specialCapabilities = [
	{
		icon: FaDrawPolygon,
		title: "Custom Design",
		description:
			"Our engineering team works with you to design gauges for unique applications and specifications.",
	},
	{
		icon: FaCog,
		title: "Precision Manufacturing",
		description:
			"State-of-the-art CNC and EDM equipment for complex geometries and tight tolerances.",
	},
	{
		icon: FaWrench,
		title: "Reverse Engineering",
		description:
			"We can reverse engineer existing parts or gauges to create replacements or improvements.",
	},
];

export const specifications = [
	{ label: "Material", value: "OHNS (W) / Tungsten Carbide / Tool Steel" },
	{ label: "Hardness", value: "58-62 HRC (material dependent)" },
	{ label: "Treatment", value: "Sub-Zero at -80°C" },
	{ label: "Accuracy", value: "As per customer specification" },
	{ label: "Surface Finish", value: "Ground / Lapped / EDM" },
	{ label: "Documentation", value: "Calibration Certificate Included" },
];

