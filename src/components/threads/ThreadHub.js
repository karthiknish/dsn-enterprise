import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import ThreadTable from "@/components/threads/ThreadTable";
import {
	activeThreadSystems,
	generateMetricSizePages,
} from "@/lib/thread-pages.config";
import {
	INCH_IN_MM,
	metricCoarseRows,
	metricSizeSpec,
	NPT_SERIES,
	UNC_SERIES,
	unifiedRows,
} from "@/lib/thread-specs";

/**
 * Coarse-series rows per system, for the "pitch at a glance" cards. Keyed by
 * designation because that is what a drawing carries.
 */
function buildPitchGroups() {
	const byDesignation = (rows, key) =>
		new Map(rows.map((row) => [row[key], row]));

	return [
		{ group: "Metric", rows: byDesignation(metricCoarseRows(), "designation") },
		{
			group: "Unified (UNC)",
			rows: byDesignation(unifiedRows(UNC_SERIES), "designation"),
		},
		{ group: "Pipe (NPT)", rows: byDesignation(NPT_SERIES, "size") },
	];
}

const COMPARISON_COLUMNS = [
	{ key: "system", label: "System" },
	{ key: "designation", label: "Designation" },
	{ key: "major", label: "Major Ø", sub: "mm", align: "right" },
	{ key: "pitch", label: "Pitch", sub: "mm", align: "right" },
	{ key: "pitchDiameter", label: "Pitch Ø", sub: "mm", align: "right" },
];

/**
 * The three threads that most often get confused for one another.
 *
 * Derived from the same modules that build the system and size tables, so the
 * hub cannot state a figure the reference tables do not. The metric and
 * Unified figures are basic-profile pitch diameters; the NPT figure is the
 * pitch diameter only at the hand-tight gauge plane, which is why the note
 * below says so — a taper thread has no single pitch diameter.
 */
function buildConfusionRows() {
	const m12 = metricSizeSpec(12);
	const unc = unifiedRows(UNC_SERIES).find(
		(row) => row.designation === '1/2"-13',
	);
	const npt = NPT_SERIES.find((row) => row.size === "1/2");

	return [
		{
			system: "Metric (M12)",
			designation: `M12 x ${m12.coarse.pitch}`,
			major: m12.coarse.major.toFixed(3),
			pitch: m12.coarse.pitch.toFixed(2),
			pitchDiameter: m12.coarse.pitchDiameter.toFixed(3),
		},
		{
			system: 'Unified (1/2" UNC)',
			designation: "1/2-13 UNC",
			major: (unc.major * INCH_IN_MM).toFixed(3),
			pitch: unc.pitchMm.toFixed(3),
			pitchDiameter: unc.pitchDiameterMm.toFixed(3),
		},
		{
			system: 'Pipe (1/2" NPT)',
			designation: "1/2 NPT",
			major: npt.dMm.toFixed(3),
			pitch: npt.pitchMm.toFixed(3),
			pitchDiameter: (npt.e1 * INCH_IN_MM).toFixed(3),
		},
	];
}

export default function ThreadHub() {
	const systems = activeThreadSystems();
	const sizes = generateMetricSizePages();
	const groups = buildPitchGroups();

	return (
		<>
			<PageHero
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/threads", label: "Thread Reference" },
				]}
				title="Thread Reference: Dimensions, Pitch and Gauging"
				description="Dimension tables for ISO metric, NPT, Unified and BSP threads — pitch diameters, minor diameters and tap drills, with the gauging practice behind each. Maintained by DSN Enterprises, Coimbatore."
				centered={false}
			/>

			<div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
				<div className="prose max-w-none mb-12">
					<p className="text-lg text-gray-700 leading-relaxed">
						A thread is fully defined by three numbers: the nominal diameter,
						the pitch, and the basic profile it is cut on. Everything else —
						pitch diameter, minor diameter, tap drill, gauge limits — follows
						from those. These tables give the basic dimensions for each system
						so you can read a callout off a drawing and know what it means on
						the shop floor.
					</p>
					<p className="text-gray-700 leading-relaxed">
						Basic dimensions are geometry, and every table here is derived the
						same way from the profile constants of the relevant standard. Where
						a value is a published preferred number rather than a computed one,
						the note under the table says so — a reference that quietly rounds
						is worse than no reference at all.
					</p>
				</div>

				<section aria-labelledby="systems-heading" className="mb-14">
					<h2
						id="systems-heading"
						className="text-2xl font-semibold text-primary mb-5"
					>
						Thread systems
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{systems.map((system) => (
							<Link
								key={system.slug}
								href={`/threads/${system.slug}`}
								className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-secondary hover:shadow-md"
							>
								<h3 className="font-semibold text-primary mb-1">
									{system.title}
								</h3>
								<p className="text-sm text-gray-600 leading-relaxed flex-1">
									{system.blurb}
								</p>
								<span className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
									{system.standard}
								</span>
							</Link>
						))}
					</div>
				</section>

				<section aria-labelledby="confusion-heading" className="mb-14">
					<h2
						id="confusion-heading"
						className="text-2xl font-semibold text-primary mb-2"
					>
						Three threads that are not interchangeable
					</h2>
					<p className="text-gray-600 mb-4">
						M12, 1/2&quot; UNC and 1/2&quot; NPT are all roughly 12-13 mm across
						the crest, and all three are 60° threads, so they are frequently
						assumed to be the same thing. They are not: the pitches differ, and
						a gauge for one will not pass a component cut for another.
					</p>
					<ThreadTable
						columns={COMPARISON_COLUMNS}
						rows={buildConfusionRows()}
						caption="Comparison of M12, 1/2 inch UNC and 1/2 inch NPT threads"
						note={`Pitch Ø is the basic-profile pitch diameter for the metric and Unified rows. For NPT it is the pitch diameter at the hand-tight gauge plane only — the 1:16 taper means a pipe thread has no single pitch diameter. Note also that 1/2" pipe is not 12.7 mm: the nominal pipe size is a historic bore reference, and the thread is cut on a 21.336 mm outside diameter.`}
					/>
				</section>

				<section aria-labelledby="quick-heading" className="mb-14">
					<h2
						id="quick-heading"
						className="text-2xl font-semibold text-primary mb-2"
					>
						Pitch at a glance
					</h2>
					<p className="text-gray-600 mb-5">
						The coarse pitch for each system, which is the value assumed when a
						drawing gives a designation with no pitch or thread series.
					</p>
					<div className="grid md:grid-cols-3 gap-6">
						{groups.map(({ group, rows }) => (
							<div
								key={group}
								className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
							>
								<h3 className="font-semibold text-primary mb-3">{group}</h3>
								<ul className="space-y-2 text-sm">
									{Array.from(rows.values())
										.slice(0, 8)
										.map((row) => {
											const label = row.designation ?? row.size ?? "—";
											// UNC/NPT rows carry TPI; metric rows carry a pitch in mm.
											const pitch = row.tpi
												? `${row.tpi} TPI`
												: `${row.pitch} mm`;
											return (
												<li
													key={label}
													className="flex justify-between border-b border-gray-100 pb-1.5 last:border-0"
												>
													<span className="font-semibold text-primary">
														{label}
													</span>
													<span className="text-gray-700 tabular-nums">
														{pitch}
													</span>
												</li>
											);
										})}
								</ul>
							</div>
						))}
					</div>
				</section>

				{sizes.length > 0 && (
					<section aria-labelledby="sizes-heading" className="mb-14">
						<h2
							id="sizes-heading"
							className="text-2xl font-semibold text-primary mb-4"
						>
							Metric threads by size
						</h2>
						<p className="text-gray-600 mb-5">
							Per-size pages with the coarse and fine series, tap drill and
							gauging detail — the sizes specified most often on Indian
							drawings.
						</p>
						<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
							{sizes.map((size) => (
								<li key={size.path}>
									<Link
										href={size.path}
										className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-center font-semibold text-primary shadow-sm transition-all hover:border-secondary hover:shadow-md"
									>
										M{size.size}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}

				<section className="rounded-xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white">
					<h2 className="text-xl font-semibold mb-3">
						Need these threads gauged instead?
					</h2>
					<p className="text-white/85 leading-relaxed mb-6 max-w-3xl">
						DSN Enterprises manufactures thread plug gauges, ring gauges and
						setting plugs at the Coimbatore works, cut and lapped as matched
						pairs and supplied with traceable calibration certificates. Send a
						drawing or a thread designation and we will quote to it.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link
							href="/products/thread-gauges"
							className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
						>
							Thread gauges
						</Link>
						<Link
							href="/contact"
							className="inline-flex items-center rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
						>
							Request a quote
						</Link>
					</div>
				</section>
			</div>
		</>
	);
}
