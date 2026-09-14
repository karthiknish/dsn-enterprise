import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import ThreadSystemLinks from "@/components/threads/ThreadSystemLinks";
import ThreadTable from "@/components/threads/ThreadTable";
import {
	getThreadSystem,
	metricSizePath,
	relatedMetricSizes,
} from "@/lib/thread-pages.config";

/** Millimetre value with the unit left off — the column header carries it. */
const mm = (value) => `${value}`;

function SpecCard({ label, value, hint, emphasis }) {
	return (
		<div
			className={`rounded-xl border p-4 ${
				emphasis
					? "border-secondary bg-secondary/20"
					: "border-gray-200 bg-white shadow-sm"
			}`}
		>
			<dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
				{label}
			</dt>
			<dd className="mt-1 text-2xl font-semibold text-primary tabular-nums">
				{value}
				{hint && (
					<span className="ml-1 text-sm font-normal text-gray-500">{hint}</span>
				)}
			</dd>
		</div>
	);
}

const FINE_COLUMNS = [
	{ key: "designation", label: "Designation" },
	{ key: "pitch", label: "Pitch", sub: "mm", align: "right" },
	{ key: "pitchDiameter", label: "Pitch Ø", sub: "mm", align: "right" },
	{ key: "externalMinor", label: "Minor Ø ext.", sub: "mm", align: "right" },
	{ key: "internalMinor", label: "Minor Ø int.", sub: "mm", align: "right" },
	{ key: "tapDrill", label: "Tap drill", sub: "mm", align: "right" },
];

/**
 * One metric size: M6, M12, M20 and so on.
 *
 * This is the page that carries the per-size search demand (the
 * "m12 thread pitch" pattern measured 390-590 searches/month per size in
 * India). Everything it states is specific to this size, which is what stops
 * the set being 16 near-identical pages.
 */
export default function ThreadSizeReference({ page }) {
	const { spec, size } = page;
	const { coarse } = spec;
	const metric = getThreadSystem("metric");
	const related = relatedMetricSizes(size);

	const breadcrumbs = [
		{ href: "/", label: "Home" },
		{ href: "/threads", label: "Thread Reference" },
		{ href: "/threads/metric", label: "Metric" },
		{ href: metricSizePath(size), label: `M${size}` },
	];

	return (
		<>
			<PageHero
				breadcrumbs={breadcrumbs}
				title={`M${size} Thread Pitch and Dimensions`}
				description={`M${size} coarse pitch is ${coarse.pitch} mm. Basic pitch diameter ${coarse.pitchDiameter} mm, external minor diameter ${coarse.externalMinor} mm, and a ${coarse.tapDrill} mm tap drill.${
					spec.fine.length > 0
						? ` Fine pitches of ${spec.fine.map((f) => f.pitch).join(" mm and ")} mm are also tabulated.`
						: ""
				}`}
				centered={false}
			/>

			<div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
				<div className="prose max-w-none mb-10">
					<p className="text-lg text-gray-700 leading-relaxed">
						M{size} is an ISO metric thread on the 60° basic profile, so every
						dimension below follows from two numbers: the {size} mm nominal
						diameter and the {coarse.pitch} mm coarse pitch. Drawings that call
						up M{size} without a pitch mean the coarse series unless the note
						says otherwise.
					</p>
				</div>

				<section aria-labelledby="coarse-heading" className="mb-12">
					<h2
						id="coarse-heading"
						className="text-2xl font-semibold text-primary mb-2"
					>
						M{size} coarse pitch ({coarse.pitch} mm)
					</h2>
					<p className="text-gray-600 mb-5">
						Basic profile dimensions to ISO 68-1, with the tap drill for
						standard thread engagement.
					</p>
					<dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<SpecCard
							label="Nominal diameter"
							value={mm(coarse.major)}
							hint="mm"
						/>
						<SpecCard label="Pitch" value={mm(coarse.pitch)} hint="mm" />
						<SpecCard
							label="Pitch diameter"
							value={mm(coarse.pitchDiameter)}
							hint="mm"
						/>
						<SpecCard
							label="Minor Ø external"
							value={mm(coarse.externalMinor)}
							hint="mm"
						/>
						<SpecCard
							label="Minor Ø internal"
							value={mm(coarse.internalMinor)}
							hint="mm"
						/>
						<SpecCard
							label="Tap drill"
							value={mm(coarse.tapDrill)}
							hint="mm"
							emphasis
						/>
					</dl>
					<p className="mt-3 text-xs text-gray-500 leading-relaxed">
						Pitch diameter and minor diameters are derived from the ISO 68-1
						basic profile (d2 = d − 0.649519P, d3 = d − 1.226869P, D1 = d −
						1.082532P). The tap drill is the arithmetic d − P for 75-80% thread
						engagement; pick the nearest drill in the preferred series, which is
						why published charts quote {coarse.tapDrill} mm for some sizes and
						the adjacent tenth for others.
					</p>
				</section>

				{spec.fine.length > 0 && (
					<section aria-labelledby="fine-heading" className="mb-12">
						<h2
							id="fine-heading"
							className="text-2xl font-semibold text-primary mb-2"
						>
							M{size} fine pitches
						</h2>
						<p className="text-gray-600 mb-4">
							Fine series for the same nominal diameter. A fine pitch has a
							larger minor diameter than coarse at the same nominal size, so a
							gauge for one will not check the other.
						</p>
						<ThreadTable
							columns={FINE_COLUMNS}
							rows={spec.fine.map((f) => ({
								...f,
								designation: `M${size}x${f.pitch}`,
							}))}
							caption={`ISO metric fine pitch dimensions for M${size}`}
							note="Fine pitch dimensions are on the same 60° basic profile, so only the pitch changes between rows."
						/>
					</section>
				)}

				{spec.acrossFlats != null && (
					<section aria-labelledby="spanner-heading" className="mb-12">
						<h2
							id="spanner-heading"
							className="text-2xl font-semibold text-primary mb-2"
						>
							Spanner size
						</h2>
						<p className="text-gray-700 leading-relaxed">
							A standard M{size} hexagon head or nut takes a{" "}
							<span className="font-semibold text-primary">
								{spec.acrossFlats} mm
							</span>{" "}
							across-flats spanner under ISO 272.
							{spec.acrossFlatsSuperseded != null && (
								<>
									{" "}
									The pre-1999 revision of ISO 272 specified{" "}
									{spec.acrossFlatsSuperseded} mm for this size, and those
									spanners are still in most toolboxes, so both will be found on
									the same machine.
								</>
							)}
						</p>
					</section>
				)}

				<section aria-labelledby="gauging-heading" className="mb-12">
					<h2
						id="gauging-heading"
						className="text-2xl font-semibold text-primary mb-4"
					>
						How M{size} threads are gauged
					</h2>
					<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
						<p className="text-gray-700 leading-relaxed mb-4">
							An M{size} internal thread is checked with a thread plug gauge: a
							matched GO / NO-GO pair on one handle. The GO end checks the
							minimum material limit and must enter the full thread by hand; the
							NO-GO end checks the maximum material limit and must not enter.
							Because the two ends are cut and lapped as a pair, the setting
							between them is preserved when the gauge is reconditioned — which
							is what keeps a working gauge useful after years of use.
						</p>
						<p className="text-gray-700 leading-relaxed mb-5">
							External M{size} threads are checked with a thread ring gauge or a
							snap gauge, and setting plugs are used to keep those rings in
							calibration. The pitch diameter above ({coarse.pitchDiameter} mm)
							is the dimension being controlled; the major and minor diameters
							only matter as clearance.
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
								Enquire about M{size} gauges
							</Link>
						</div>
					</div>
				</section>

				{related.length > 0 && (
					<section aria-labelledby="related-heading" className="mb-12">
						<h2
							id="related-heading"
							className="text-2xl font-semibold text-primary mb-4"
						>
							Other metric sizes
						</h2>
						<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
							{related.map((other) => (
								<li key={other}>
									<Link
										href={metricSizePath(other)}
										className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-center font-semibold text-primary shadow-sm transition-all hover:border-secondary hover:shadow-md"
									>
										M{other}
									</Link>
								</li>
							))}
						</ul>
						<p className="mt-4 text-sm text-gray-600">
							Full coarse and fine series on the{" "}
							<Link
								href="/threads/metric"
								className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
							>
								metric thread pitch chart
							</Link>
							{metric?.indianStandard
								? `, adopted in India as ${metric.indianStandard}.`
								: "."}
						</p>
					</section>
				)}

				<ThreadSystemLinks exclude="metric" />
			</div>
		</>
	);
}
