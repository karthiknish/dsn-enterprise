/** FAQ copy for /faq, keep answers factual and aligned with Coimbatore operations */

export const faqCategories = [
	{
		name: "General",
		faqs: [
			{
				question: "What types of gauges does DSN Enterprises manufacture?",
				answer:
					"We manufacture plain gauges (plug, ring, snap, and setting masters), thread gauges for standard and special forms, API gauges for oil and gas connections, and custom gauges built to your drawing. We also supply reference standards and support calibration through our NABL-aligned laboratory. Our gauges are used in production acceptance, incoming inspection, and quality laboratory environments across automotive, aerospace, oil and gas, and general engineering industries.",
			},
			{
				question: "Where is DSN Enterprises located?",
				answer:
					"Our manufacturing and calibration facility is in Coimbatore, Tamil Nadu. From here we supply plants across Tamil Nadu (Chennai, Madurai, Salem, Trichy, Erode, Tiruppur, Thoothukudi), Bangalore (Peenya, Bidadi, Jigani, Hosur corridor), Hyderabad (Jeedimetla, Adibatla, Medchal), pan-India, and export markets. Technical support is available by phone at +91 93631 22005, email at info@dsnenterprises.com, and scheduled plant visits for drawing reviews and first-article discussions.",
			},
			{
				question: "Do you supply gauges to Bangalore and Hyderabad?",
				answer:
					"Yes. Gauges are made in Coimbatore and dispatched by road: Bangalore in 1–2 working days via NH44 (Salem–Hosur), Hyderabad in 2–3 working days via NH44 (Bengaluru–Kurnool). We cover Peenya, Jigani, Bidadi, and the Hosur corridor in Karnataka, and Jeedimetla, Adibatla, Medchal, and Patancheru in Telangana. Calibration lots can be couriered overnight from Bangalore; Hyderabad plants usually consolidate a recall into one dispatch. Send the drawing and the industrial area with your enquiry so we can confirm transit and certificate requirements.",
			},
			{
				question: "What industries do you serve?",
				answer:
					"We work with oil and gas (OCTG threading, drilling connections), automotive and tier suppliers (engine, transmission, steering components), aerospace and defence subcontractors (tight-tolerance bores and threads), heavy engineering (fabrication, structural), power and process equipment (valves, pumps, fittings), textile machinery (spinning and weaving parts), marine fabrication, railways, and precision job shops that depend on reliable GO/NO-GO inspection.",
			},
			{
				question: "Do you have quality certifications?",
				answer:
					"Yes. We operate under ISO 9001:2015 quality management. Our calibration laboratory is NABL accredited to ISO/IEC 17025. We are an API 5B and API 7-2 licensed manufacturer for OCTG and rotary shouldered gauge programmes. All certificates are issued with traceable measurement data, and NABL-traceable certificates are available when your quality system or customer contract requires accredited documentation.",
			},
			{
				question:
					"What is the difference between GO and NO-GO gauges?",
				answer:
					"GO gauges check the maximum material condition — the largest acceptable external dimension or smallest acceptable internal dimension. If the GO gauge fits, the part is within the upper tolerance. NO-GO gauges check the minimum material condition — if the NO-GO gauge does not fit, the part is within the lower tolerance. Together they verify that a dimension falls within the specified tolerance band without requiring a measurement reading, which makes them ideal for fast shop-floor acceptance.",
			},
			{
				question: "Can you supply gauges to our drawing specifications?",
				answer:
					"Yes, custom gauge manufacturing from customer drawings is a core capability. Send your drawing with tolerance, material, thread specification, and any required standards (IS, ISO, DIN, API, ASTM). Our engineers review manufacturability, suggest practical tolerances if needed, and quote with a clear lead time before production. We can also reverse-engineer gauges from samples when drawings are unavailable.",
			},
		],
	},
	{
		name: "Standards",
		faqs: [
			{
				question: "What is the latest edition of IS 3455?",
				answer:
					"The current edition is still IS 3455:1971 (First Revision). BIS has not issued a later revision. It was reaffirmed in 2020, so 2020 is the reaffirmation year, not a new edition. There is no IS 3455:2020. IS 3455 (Part 1):1985 is a separate part covering indicating instruments rather than fixed limit gauges; both parts are current. The clause-level walkthrough is in the IS 3455 article on our blog.",
			},
			{
				question: "Where can I download the IS 3455 PDF?",
				answer:
					"We do not host, and cannot email, the IS 3455 or IS 919 PDF. Those files are BIS copyright. Buy IS 3455:1971 and IS 919 (Part 2):2014 from the BIS e-Sale portal. Free copies circulating as IS 3455 standard PDF are unofficial and often incomplete. If you would rather not work through the tables, send us the drawing and we will apply the gauge tolerances for your sizes.",
			},
			{
				question: "What is the difference between IS 3455 and IS 919?",
				answer:
					"IS 919 defines the limits and fits system — the tolerance grades and deviations that decide what size a hole or shaft may be. IS 3455 defines gauging practice — how you verify that workpiece with limit gauges, and what tolerance and wear allowance the gauge itself may carry. One sets the target; the other governs the instrument. IS 919 (Part 1):2014 is identical to ISO 286-1:2010; IS 3455 has no ISO equivalent.",
			},
			{
				question: "Is IS 3455 the same as ISO 3455?",
				answer:
					"No. ISO 3455:2021 is a hydrometry standard for calibrating current-meters in open tanks. It has nothing to do with plain gauges. The ISO document that pairs with IS 919 is ISO 286. Searches for ISO 3455 standards that land on our IS 3455 article are looking at the wrong family of documents.",
			},
			{
				question: "What does 6H mean on a metric thread callout?",
				answer:
					"6H is a tolerance class for an internal (tapped hole or nut) ISO metric thread: grade 6, position H, no allowance. It is inspected with a thread plug gauge. The matching external thread is usually 6g and needs a thread ring gauge. A callout such as M20×1.5-6H is incomplete without pitch and the internal/external letter; we will query a drawing that omits them rather than guess.",
			},
			{
				question: "Do you manufacture NPT and NPTF thread gauges?",
				answer:
					"Yes. NPT and NPTF pipe thread gauges are part of the taper-thread range, alongside BSPT. We supply plug and ring gauges for pipe threads used in oil, gas, hydraulic, and pneumatic fittings, with NABL-traceable certificates. Share the designation, L1/L3 requirement if any, and whether the gauge is for a fitting or a pipe.",
			},
		],
	},
	{
		name: "Products",
		faqs: [
			{
				question: "What is the typical lead time for standard gauges?",
				answer:
					"Standard plain and thread gauges are typically 2–3 weeks from confirmed order, depending on size, tolerance class, and quantity. Common sizes may be available faster. Express manufacturing is available when your line cannot wait — share your deadline when requesting a quote and we will confirm feasibility and any premium charges.",
			},
			{
				question: "Can you manufacture custom gauges as per our drawings?",
				answer:
					"Yes. Custom and special gauges are a core capability. Send your drawing with tolerance, material, and thread data. Our engineers review manufacturability, suggest practical tolerances if needed, and quote with a clear lead time before production starts. We manufacture ACME, buttress, trapezoidal, spline, taper, form, and limit gauges in addition to standard profiles.",
			},
			{
				question: "What materials are used for manufacturing gauges?",
				answer:
					"We use premium gauge steels including OHNS (oil-hardened non-shrinking steel, W-grade) for most working gauges, with carbide options for high-wear applications where extended gauge life is critical. Material is sourced with test certificates. Heat treatment includes controlled hardening and SUB-ZERO treatment at −80°C for dimensional stability, targeting 60 ± 2 HRC. This ensures consistent gauge performance over thousands of inspections.",
			},
			{
				question: "What thread forms can you manufacture?",
				answer:
					"Metric (ISO), Unified (UNC/UNF/UN), BSP/BSPT, BSW/BSF, NPT/NPTF, ACME, buttress, trapezoidal, spline, and proprietary profiles from drawing. API thread programmes follow API 5B and API 7-2 requirements where applicable. We can also manufacture special thread forms to customer specification when standard profiles do not match your application.",
			},
			{
				question: "Do you provide calibration certificates with gauges?",
				answer:
					"Yes. New gauges ship with calibration certificates showing measured dimensions and traceability. NABL-traceable certificates are available when your quality system or customer contract requires accredited documentation. Certificates include gauge identification, measured values, reference standards used, and pass/fail status.",
			},
			{
				question: "What size range can you manufacture?",
				answer:
					"Plain plug gauges from 1 mm to 250 mm. Thread plug and ring gauges from M3 to M200 equivalent, and similar ranges for UN, BSP, NPT, and API threads. Snap gauges and custom gauges are built to drawing with no fixed size limit — contact us with your specific range for confirmation.",
			},
		],
	},
	{
		name: "API Gauges",
		faqs: [
			{
				question: "What API specifications do your gauges comply with?",
				answer:
					"Our API gauge programmes align with API 5B (casing, tubing, and line pipe threads) and API 7-2 (rotary shouldered connections). Gauges are manufactured and verified to the tolerances your threading programme requires, with documentation suitable for field and workshop use. We supply L1, L2, and L3 gauges for round threads, buttress thread gauges, and NC/IF/REG/FH gauges for rotary shouldered connections.",
			},
			{
				question: "Do you manufacture API license gauges?",
				answer:
					"We are a licensed API manufacturer for relevant gauge types. Working and reference gauges are built to API dimensional requirements with calibration data and traceability. Share your connection type (e.g., API round thread, buttress, NC50, REG) and programme details so we can confirm the correct gauge set and pricing.",
			},
			{
				question:
					"What is the difference between working and reference API gauges?",
				answer:
					"Working gauges are used daily on the shop floor for production acceptance — they experience wear and require regular recalibration. Reference (master) gauges have tighter control, are used to verify working gauges and setup, and are stored carefully between uses. We supply both, with calibration suited to each role in your quality plan. Master gauges should be recalibrated on a longer cycle than working gauges.",
			},
			{
				question:
					"Do you supply API gauges for export to oil and gas projects?",
				answer:
					"Yes. We export API gauges to Middle East, Southeast Asia, and African oil and gas operations. Gauges are packed for field handling and salt-air environments where required. Shipping documentation and certificates are provided to support customs clearance and project QA audits.",
			},
		],
	},
	{
		name: "Calibration",
		faqs: [
			{
				question: "What calibration services do you offer?",
				answer:
					"We calibrate plain, thread, snap, and API gauges; setting masters; and selected dimensional tools. Services include standard and express turnaround, repair and refurbishment, and on-site verification by appointment for plants that cannot release gauges for long periods. Calibration is performed against traceable reference standards in our NABL-accredited laboratory.",
			},
			{
				question: "Is your calibration laboratory accredited?",
				answer:
					"Yes. Our laboratory is NABL accredited to ISO/IEC 17025, so results are traceable to national standards and accepted in ISO audits, customer source inspections, and regulated supply chains that require accredited calibration. NABL certificates include uncertainty measurements and are suitable for API, aerospace, and defence quality systems.",
			},
			{
				question: "What is the typical turnaround time for calibration?",
				answer:
					"Standard calibration is 3–5 working days from receipt at our Coimbatore lab. Express service (24–48 hours) is available for urgent line stops — call ahead to reserve an express slot. On-site calibration is scheduled based on location and scope, typically requiring 1–2 days on your premises.",
			},
			{
				question: "Do you calibrate gauges from other manufacturers?",
				answer:
					"Yes. We calibrate gauges from any manufacturer — Indian, European, Japanese, or American brands. If a gauge is worn beyond usable limits, we advise repair, reconditioning, or replacement rather than issuing a certificate that does not reflect fitness for use. We can also help set up a gauge recall programme to manage calibration cycles.",
			},
			{
				question: "How often should gauges be calibrated?",
				answer:
					"Frequency depends on usage, environment, and your quality plan. Many shops calibrate working gauges every 6–12 months; heavy-use or critical lines may need shorter intervals (3–6 months). Reference gauges are often on a 12–24 month cycle. We can help define a recall programme based on your gauge inventory, usage patterns, and quality system requirements.",
			},
			{
				question:
					"What information is included in a calibration certificate?",
				answer:
					"Certificates include gauge identification (serial number, type, size), measured values before and after calibration (as-found/as-left), reference standards used with their traceability, measurement uncertainty, environmental conditions during calibration, pass/fail status, and the NABL logo when accredited calibration is requested. This documentation supports ISO 9001, IATF 16949, and API quality audits.",
			},
		],
	},
	{
		name: "Ordering",
		faqs: [
			{
				question: "What is your minimum order quantity?",
				answer:
					"There is no fixed minimum. We handle single-gauge custom orders and volume production alike. For very small custom lots, combining items in one order can improve scheduling efficiency — we will advise when quoting. Prototype and first-article gauges are welcome for new product development.",
			},
			{
				question: "How can I request a quotation?",
				answer:
					"Use the contact form on this site, email info@dsnenterprises.com, or call +91 93631 22005. Include drawing or size, tolerance, thread specification, quantity, and certificate requirements. We usually respond within one business day with scope, lead time, and pricing.",
			},
			{
				question: "What payment terms do you offer?",
				answer:
					"Domestic orders are typically advance or part-advance before dispatch; regular accounts may qualify for agreed credit terms. Export orders are generally advance payment or confirmed letter of credit. Details are confirmed on your proforma invoice. GST registration and HSN codes are provided for Indian customers.",
			},
			{
				question: "Do you ship internationally?",
				answer:
					"Yes. We export to the Middle East, Europe, the Americas, and Southeast Asia with appropriate shipping documentation. Air freight is used for urgent lots; sea freight suits larger or heavier consignments. API gauge orders for oilfield operations are packed for field handling and corrosive environments where required.",
			},
			{
				question: "Can I visit your manufacturing facility?",
				answer:
					"Yes. Plant visits are welcome for drawing reviews, first-article discussions, and audit preparation. Contact us to schedule a visit to our Coimbatore works and calibration laboratory. We can also arrange video calls for remote review of drawings and gauge samples when travel is not practical.",
			},
		],
	},
];
