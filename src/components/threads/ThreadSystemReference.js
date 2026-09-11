import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import ThreadTable from "@/components/threads/ThreadTable";
import {
	activeThreadSystems,
	generateMetricSizePages,
	getThreadSystem,
} from "@/lib/thread-pages.config";
import {
	BSP_SERIES,
	metricCoarseRows,
	metricFineRows,
	NPT_SERIES,
	UNC_SERIES,
	UNF_SERIES,
	unifiedRows,
} from "@/lib/thread-specs";

const METRIC_COARSE_COLUMNS = [
	{ key: "designation", label: "Size" },
	{ key: "pitch", label: "Pitch", sub: "mm", align: "right" },
	{ key: "pitchDiameter", label: "Pitch Ø", sub: "mm", align: "right" },
	{ key: "externalMinor", label: "Minor Ø ext.", sub: "mm", align: "right" },
	{ key: "internalMinor", label: "Minor Ø int.", sub: "mm", align: "right" },
	{ key: "tapDrill", label: "Tap drill", sub: "mm", align: "right" },
	{ key: "acrossFlats", label: "A/F", sub: "mm", align: "right" },
];

const METRIC_FINE_COLUMNS = [
	{ key: "designation", label: "Designation" },
	{ key: "pitch", label: "Pitch", sub: "mm", align: "right" },
	{ key: "pitchDiameter", label: "Pitch Ø", sub: "mm", align: "right" },
	{ key: "externalMinor", label: "Minor Ø ext.", sub: "mm", align: "right" },
	{ key: "internalMinor", label: "Minor Ø int.", sub: "mm", align: "right" },
	{ key: "tapDrill", label: "Tap drill", sub: "mm", align: "right" },
];

const NPT_COLUMNS = [
	{ key: "size", label: "Pipe size", sub: "in" },
	{ key: "tpi", label: "TPI", align: "right" },
	{ key: "pitchMm", label: "Pitch", sub: "mm", align: "right" },
	{ key: "dMm", label: "Pipe OD", sub: "mm", align: "right" },
	{ key: "e1", label: "Pitch Ø at L1", sub: "in", align: "right" },
	{ key: "e2", label: "Pitch Ø at L2", sub: "in", align: "right" },
	{ key: "l1", label: "L1", sub: "in", align: "right" },
	{ key: "l2", label: "L2", sub: "in", align: "right" },
];

const UNIFIED_COLUMNS = [
	{ key: "designation", label: "Size" },
	{ key: "tpi", label: "TPI", align: "right" },
	{ key: "pitchMm", label: "Pitch", sub: "mm", align: "right" },
	{ key: "major", label: "Major Ø", sub: "in", align: "right" },
	{ key: "pitchDiameter", label: "Pitch Ø", sub: "in", align: "right" },
	{ key: "pitchDiameterMm", label: "Pitch Ø", sub: "mm", align: "right" },
	{ key: "externalMinor", label: "Minor Ø ext.", sub: "in", align: "right" },
	{ key: "internalMinor", label: "Minor Ø int.", sub: "in", align: "right" },
];

/**
 * Shared by the UNC and UNF pages so the two cannot drift apart.
 *
 * The explicit "basic, not a limit" sentence is load-bearing: fastener
 * catalogues quote ASME B1.1 permitted limits, and for 1/2-13 UNC the 3A minor
 * limit (0.4084 in) sits above this basic figure (0.4056 in). Without the
 * qualifier that looks like an error rather than two different quantities.
 */
const UNIFIED_NOTE =
	"Inch dimensions are basic-profile values computed the same way as ISO metric and given to four decimal places; the millimetre columns are conversions, not separately specified values. Tolerance-class limits (1A/2A/3A external, 1B/2B/3B internal) are tabulated in ASME B1.1 and are not reproduced here — a fastener catalogue's minor diameter is a permitted limit, not this basic figure.";

const BSP_COLUMNS = [
	{ key: "size", label: "Size", sub: "G / R" },
	{ key: "tpi", label: "TPI", align: "right" },
	{ key: "pitchMm", label: "Pitch", sub: "mm", align: "right" },
	{ key: "major", label: "Major Ø", sub: "mm", align: "right" },
	{ key: "minor", label: "Minor Ø", sub: "mm", align: "right" },
	{ key: "gaugeLengthMm", label: "Gauge length", sub: "mm", align: "right" },
	{ key: "tapDrillMm", label: "Tap drill", sub: "mm", align: "right" },
];

/** Per-system table body: columns, rows and the footnote that qualifies them. */
function tableFor(system) {
	switch (system.slug) {
		case "metric":
			return { columns: METRIC_COARSE_COLUMNS, rows: metricCoarseRows() };
		case "npt":
			return {
				columns: NPT_COLUMNS,
				rows: NPT_SERIES,
				note: 'L1 is hand-tight engagement and L2 is wrench-tight. E1 and E2 are the pitch diameters at those two planes — a taper thread gauge is set to them, not to a single diameter. The pipe OD is not the nominal size: 1/2" NPT measures 21.336 mm across the pipe.',
			};
		case "unc":
			return {
				columns: UNIFIED_COLUMNS,
				rows: unifiedRows(UNC_SERIES),
				note: UNIFIED_NOTE,
			};
		case "unf":
			return {
				columns: UNIFIED_COLUMNS,
				rows: unifiedRows(UNF_SERIES),
				note: UNIFIED_NOTE,
			};
		case "bsp":
			return {
				columns: BSP_COLUMNS,
				rows: BSP_SERIES,
				note: 'BSP uses the 55° Whitworth form, so these diameters are not derivable from the 60° constants used for metric and Unified. The nominal size is a historic bore reference, not a diameter — 1/2" BSP has a 20.955 mm major diameter. Gauge length is the datum a BSPT gauge is set to.',
			};
		default:
			return { columns: METRIC_COARSE_COLUMNS, rows: [] };
	}
}

/**
 * A thread system reference page: one standard's full dimension table.
 *
 * Each page states a different set of numbers from a different standard, which
 * is the property the city pages never had.
 */
export default function ThreadSystemReference({ page }) {
	// `page.system` is the slug; the full record carries the copy and standard.
	const slug = page.system;
	const system = getThreadSystem(slug);
	if (!system) return null;

	const sizePathBySize = Object.fromEntries(
		generateMetricSizePages().map((p) => [p.size, p.path]),
	);
	const table = tableFor(system);
	const siblingSystems = activeThreadSystems().filter((s) => s.slug !== slug);

	const breadcrumbs = [
		{ href: "/", label: "Home" },
		{ href: "/threads", label: "Thread Reference" },
		{ href: `/threads/${slug}`, label: system.name },
	];

	const sizeSlugs = Object.keys(sizePathBySize).map(Number);

	return (
		<>
			<PageHero
				breadcrumbs={breadcrumbs}
				title={system.title}
				description={system.blurb}
				centered={false}
			/>

			<div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
				<div className="prose max-w-none mb-10">
					<p className="text-lg text-gray-700 leading-relaxed">
						{system.intro}
					</p>
				</div>

				<section aria-labelledby="table-heading" className="mb-12">
					<h2
						id="table-heading"
						className="text-2xl font-semibold text-primary mb-2"
					>
						{system.name} thread dimensions
					</h2>
					<p className="text-gray-600 mb-4">
						Basic dimensions to {system.standard}
						{system.indianStandard
							? `, adopted in India as ${system.indianStandard}`
							: ""}
						. Thread angle {system.angle}.
					</p>
					<ThreadTable
						columns={table.columns}
						rows={table.rows}
						caption={`${system.name} thread dimensions to ${system.standard}`}
						note={table.note}
						rowHref={
							sizeSlugs.length > 0
								? (row) => {
										const designation = String(row.designation || "");
										const match = /^M(\d+(?:\.\d+)?)$/.exec(designation);
										if (!match) return undefined;
										return sizePathBySize[Number(match[1])];
									}
								: undefined
						}
					/>
				</section>

				{slug === "metric" && sizeSlugs.length > 0 && (
					<section aria-labelledby="sizes-heading" className="mb-12">
						<h2
							id="sizes-heading"
							className="text-2xl font-semibold text-primary mb-4"
						>
							Thread dimensions by size
						</h2>
						<p className="text-gray-600 mb-5">
							Detailed pages for the metric sizes specified most often on Indian
							drawings, each with the coarse and fine series and the tap drill
							for that size.
						</p>
						<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
							{sizeSlugs.map((size) => (
								<li key={size}>
									<Link
										href={sizePathBySize[size]}
										className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-center font-semibold text-primary shadow-sm transition-all hover:border-secondary hover:shadow-md"
									>
										M{size}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}

				{slug === "metric" && (
					<section aria-labelledby="fine-heading" className="mb-12">
						<h2
							id="fine-heading"
							className="text-2xl font-semibold text-primary mb-2"
						>
							Metric fine pitch series
						</h2>
						<p className="text-gray-600 mb-4">
							Fine pitches below the coarse series. Both columns of minor
							diameters are given because an external thread and an internal
							thread of the same designation do not share one.
						</p>
						<ThreadTable
							columns={METRIC_FINE_COLUMNS}
							rows={metricFineRows()}
							caption="ISO metric fine pitch dimensions"
							note="Fine pitch is specified where wall thickness, vibration or adjustment matters; it is a different thread from coarse at the same nominal diameter and needs its own gauge."
						/>
					</section>
				)}

				<section aria-labelledby="gauging-heading" className="mb-12">
					<h2
						id="gauging-heading"
						className="text-2xl font-semibold text-primary mb-4"
					>
						Gauging {system.name} threads
					</h2>
					<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
						<p className="text-gray-700 leading-relaxed mb-4">
							Internal threads are checked with a thread plug gauge — a matched
							GO / NO-GO pair — and external threads with a thread ring gauge or
							a calibrated snap gauge. Setting plugs keep the rings in
							calibration between recertifications.
						</p>
						<p className="text-gray-700 leading-relaxed mb-5">
							DSN manufactures {system.name} plug gauges, ring gauges and
							setting plugs at the Coimbatore works, cut and lapped as matched
							pairs and issued with traceable calibration certificates. Send a
							drawing or a thread designation and we will quote to it.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="/products/thread-gauges"
								className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
							>
								Thread gauges we manufacture
							</Link>
							<Link
								href="/contact"
								className="inline-flex items-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
							>
								Request a quote
							</Link>
						</div>
					</div>
				</section>

				{siblingSystems.length > 0 && (
					<section aria-labelledby="systems-heading">
						<h2
							id="systems-heading"
							className="text-2xl font-semibold text-primary mb-4"
						>
							Other thread systems
						</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{siblingSystems.map((other) => (
								<Link
									key={other.slug}
									href={`/threads/${other.slug}`}
									className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-secondary hover:shadow-md"
								>
									<h3 className="font-semibold text-primary mb-1">
										{other.title}
									</h3>
									<p className="text-sm text-gray-600 leading-relaxed">
										{other.blurb}
									</p>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</>
	);
}
