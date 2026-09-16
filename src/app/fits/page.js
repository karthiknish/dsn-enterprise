import Link from "next/link";
import { Cta10 } from "@/components/cta10";
import PageHero from "@/components/layout/PageHero";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
	buildFaqJsonLd,
	jsonLdProps,
	ORG_ID,
	WEBSITE_ID,
} from "@/lib/seo-schema";
import { SITE_URL } from "@/lib/site";
import { metadata as routeMetadata } from "./metadata";

export const metadata = routeMetadata;

/**
 * The Q&A on this page, in one array.
 *
 * It is rendered visibly AND emitted as FAQPage JSON-LD, so the structured data
 * cannot state a question the page does not show. Answers restate the body; they
 * add no figure the body does not already carry — which, for this page, is
 * none: see "Why the numbers are not on this page".
 */
const FAQS = [
	{
		question: "What does H7 mean?",
		answer:
			"H7 is a hole tolerance. H is the fundamental deviation: the lower deviation is zero, so the tolerance zone begins at the basic size and runs upward into the clearance side. 7 is the IT grade, which sets the width of that zone. A hole made to H7 is therefore never smaller than the basic size.",
	},
	{
		question: "What is the difference between H7 and h6?",
		answer:
			"The capital H is a hole; the lowercase h is a shaft. Both are the boundary case where the fundamental deviation is zero at the basic size, but H7 places the hole's zone above the basic size while h6 places the shaft's zone below it. Together, H7/h6 is the classic close-running clearance fit.",
	},
	{
		question: "What is an IT grade?",
		answer:
			"IT is the standard tolerance grade defined by ISO 286 and, identically in India, by IS 919. The series runs from IT01 to IT18. A lower number is a tighter tolerance, and the same grade is a wider zone on a larger diameter, because the grades are defined size-range by size-range rather than as a single absolute value.",
	},
	{
		question: "What is the difference between hole-basis and shaft-basis?",
		answer:
			"In a hole-basis system the hole is always H and the shaft letter changes the fit — H7/g6, H7/h6, H7/p6. In a shaft-basis system the shaft is always h and the hole letter changes — G7/h6. Hole-basis is the shop default because one reamer and one plug gauge per nominal size then covers every fit at that size.",
	},
	{
		question: "Is IS 919 the same as ISO 286?",
		answer:
			"IS 919 (Part 1) : 2014 is identical to ISO 286-1:2010, and IS 919 (Part 2) : 2014 is identical to ISO 286-2:2010. An H7/g6 call-out means the same thing whether the drawing cites the IS number or the ISO number, which is what lets one part be supplied to an Indian and an export customer from the same drawing.",
	},
	{
		question: "Why does this page not list tolerance values?",
		answer:
			"Because the published limits are a transcription, not a calculation. They are a rounded preferred-number series that does not reproduce exactly from the grade formula, so a value computed from the formula can disagree with the standard it is attributed to. A wrong limit is not a lost ranking, it is a scrapped batch — so this page explains the system and sends you to the source tables instead.",
	},
];

const FIT_TYPES = [
	{
		name: "Clearance fit",
		examples: "H7/g6, H7/h6, H8/f7",
		description:
			"The hole is always larger than the shaft, so there is play in every assembly. Used where parts must slide, rotate, or be located without force — sliding gears, spigots, and running fits.",
	},
	{
		name: "Transition fit",
		examples: "H7/k6, H7/m6, H7/n6",
		description:
			"The zones overlap, so the same pair may come out with a small clearance or a small interference depending on where each part fell inside its own tolerance. Used for accurate location that is still assembled by hand or with light pressure — dowels, keys, and gear location.",
	},
	{
		name: "Interference fit",
		examples: "H7/p6, H7/s6, H7/u6",
		description:
			"The hole is always smaller than the shaft, so the joint holds by elastic deformation and friction. Used for permanent joints — bearing rings, bushings, and press-fit pins — and usually assembled with force, heat, or cold.",
	},
];

export default function FitsPage() {
	return (
		<>
			<BreadcrumbSchema
				items={[
					{ name: "Home", url: "/" },
					{ name: "Limits and Fits", url: "/fits" },
				]}
			/>
			<script
				{...jsonLdProps(
					buildFaqJsonLd(FAQS, {
						id: `${SITE_URL}/fits#faq`,
						isPartOfId: WEBSITE_ID,
						aboutId: ORG_ID,
					}),
				)}
			/>

			<PageHero
				breadcrumbs={[
					{ href: "/", label: "Home" },
					{ href: "/fits", label: "Limits and Fits" },
				]}
				title="Limits and Fits: IT Grades, H7/g6 and How a Fit Is Chosen"
				description="What an IT grade means, how the deviation letter positions a tolerance zone, why hole-basis is the shop default — and why no limit tables appear on this page."
				centered={false}
			/>

			<div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
				{/* Answer-first: the whole page in one paragraph, for a reader in a
				    hurry and for a retrieval system that quotes the opening. */}
				<section aria-labelledby="short-version" className="mb-12">
					<h2
						id="short-version"
						className="text-2xl font-semibold text-primary mb-4"
					>
						The short version
					</h2>
					<p className="text-lg text-gray-700 leading-relaxed">
						A <strong>fit</strong> is the relationship between the tolerance
						zones of a hole and a shaft. In a call-out like{" "}
						<strong>H7/g6</strong>, the <em>number</em> is the IT grade — how
						wide the tolerance is — and the <em>letter</em> is the fundamental
						deviation — where that zone sits relative to the basic size. The
						drawing gives both because neither alone says whether the parts will
						assemble. This page explains the system. It does not print the limit
						values, and the section{" "}
						<a
							href="#why-no-numbers"
							className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
						>
							why the numbers are not on this page
						</a>{" "}
						says why that is deliberate.
					</p>
				</section>

				<section aria-labelledby="what-they-describe" className="mb-12">
					<h2
						id="what-they-describe"
						className="text-2xl font-semibold text-primary mb-4"
					>
						What limits and fits actually describe
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						Every mating dimension starts from a <strong>basic size</strong> —
						the nominal figure on the drawing. Nothing is ever made exactly to
						it, so each part is given a <strong>tolerance zone</strong>: a band
						of permitted sizes between an upper and a lower limit. The zone has
						two independent properties, and the call-out names both.
					</p>
					<ul className="space-y-3 text-gray-700">
						<li>
							<strong>The width of the zone</strong> is the tolerance grade —
							the IT number.
						</li>
						<li>
							<strong>Where the zone sits</strong> relative to the basic size is
							the fundamental deviation — the letter.
						</li>
					</ul>
					<p className="text-gray-700 leading-relaxed mt-4">
						The two documents behind this are <strong>ISO 286-1:2010</strong>,
						adopted in India as <strong>IS 919 (Part 1) : 2014</strong>, which
						sets out the basis of tolerances, deviations and fits; and{" "}
						<strong>ISO 286-2:2010</strong>, adopted as{" "}
						<strong>IS 919 (Part 2) : 2014</strong>, which holds the tables of
						standard tolerance grades and limit deviations for holes and shafts.
					</p>
				</section>

				<section aria-labelledby="it-grade" className="mb-12">
					<h2
						id="it-grade"
						className="text-2xl font-semibold text-primary mb-4"
					>
						What an IT grade is
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						<strong>IT</strong> is the standard tolerance grade defined by the
						standard. The series runs from <strong>IT01</strong> up to{" "}
						<strong>IT18</strong>: a lower number is a tighter tolerance, a
						higher number a looser one. A grade is a <em>relative</em> width,
						not a fixed distance — the same grade is a wider band on a large
						diameter than on a small one, because the grades are defined
						size-range by size-range.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						The conventional division of labour between the grades is worth
						knowing, because it tells you what a drawing is asking for:
					</p>
					<ul className="space-y-3 text-gray-700">
						<li>
							<strong>The lowest grades</strong> — for gauges, gauge blocks and
							precision instruments, where the tolerance must be a small
							fraction of the work tolerance.
						</li>
						<li>
							<strong>The middle-low grades</strong> — for precision fits on
							machine parts: shafts in bearings, gears on shafts, pistons in
							bores.
						</li>
						<li>
							<strong>The middle grades</strong> — for general engineering fits
							that assemble and locate without close precision.
						</li>
						<li>
							<strong>The highest grades</strong> — for dimensions that do not
							mate at all, where a tolerance is only there to stop the drawing
							being open-ended.
						</li>
					</ul>
				</section>

				<section aria-labelledby="letters" className="mb-12">
					<h2 id="letters" className="text-2xl font-semibold text-primary mb-4">
						The letter positions the zone
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						The standard uses the same alphabet twice.{" "}
						<strong>Uppercase letters are holes, lowercase are shafts</strong>,
						which is why H7 is a hole and h6 is a shaft even though the two read
						almost identically on a drawing.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						For a <strong>hole</strong>, the letters A through G place the
						tolerance zone above the basic size, which always leaves a clearance
						against a shaft made to h. <strong>H</strong> is the boundary case:
						its lower deviation is zero, so the zone begins at the basic size.
						The letters from J onward shift the zone downward, producing
						transition and interference fits against that same shaft.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						For a <strong>shaft</strong>, the pattern mirrors in lowercase: a
						through g sit below the basic size, <strong>h</strong> is the
						boundary case with a zero upper deviation, and j through zc sit at
						or above it. This is why <strong>H7/h6</strong> is a clearance fit
						(the two zones fall on opposite sides of the basic size) while{" "}
						<strong>H7/p6</strong> is an interference fit (the shaft zone has
						crossed to the other side of the hole zone).
					</p>
				</section>

				<section aria-labelledby="basis" className="mb-12">
					<h2 id="basis" className="text-2xl font-semibold text-primary mb-4">
						Hole-basis and shaft-basis
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						Because there are two letters in every call-out, one of them has to
						be held constant for a workshop to keep its tooling sane. Which one
						you hold decides the system:
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
							<h3 className="font-semibold text-primary mb-2">
								Hole-basis (the default)
							</h3>
							<p className="text-sm text-gray-700 leading-relaxed">
								The hole is always <strong>H</strong>; the shaft letter carries
								the fit. Call-outs read H7/g6, H7/h6, H7/k6, H7/p6. One reamer
								and one plug gauge per nominal size then covers every fit at
								that size, which is why it dominates general engineering.
							</p>
						</div>
						<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
							<h3 className="font-semibold text-primary mb-2">Shaft-basis</h3>
							<p className="text-sm text-gray-700 leading-relaxed">
								The shaft is always <strong>h</strong>; the hole letter carries
								the fit. Call-outs read G7/h6, F8/h6. Used when the shaft is a
								purchased or cold-drawn standard — ground bar stock that cannot
								be changed — so the hole has to absorb the fit instead.
							</p>
						</div>
					</div>
				</section>

				<section aria-labelledby="fit-types" className="mb-12">
					<h2
						id="fit-types"
						className="text-2xl font-semibold text-primary mb-4"
					>
						Clearance, transition and interference
					</h2>
					<p className="text-gray-700 leading-relaxed mb-5">
						Every fit falls into one of three families, and the family is
						decided by whether the two zones overlap.
					</p>
					<div className="space-y-4">
						{FIT_TYPES.map((fit) => (
							<div
								key={fit.name}
								className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
							>
								<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
									<h3 className="font-semibold text-primary">{fit.name}</h3>
									<span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
										{fit.examples}
									</span>
								</div>
								<p className="text-sm text-gray-700 leading-relaxed">
									{fit.description}
								</p>
							</div>
						))}
					</div>
					<p className="text-gray-700 leading-relaxed mt-4">
						The boundary between transition and interference is not fixed: the
						same letters can give a light interference at one size and a
						transition at another, because the deviation is defined per size
						range. That is one more reason the family should be read from the
						table for your size, not from the letters alone.
					</p>
				</section>

				<section aria-labelledby="choosing" className="mb-12">
					<h2
						id="choosing"
						className="text-2xl font-semibold text-primary mb-4"
					>
						How a fit is chosen
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						A fit is a functional decision before it is a table lookup. The
						questions that settle it:
					</p>
					<ol className="list-decimal space-y-3 pl-6 text-gray-700">
						<li>
							<strong>What must the joint do?</strong> Move freely, locate
							accurately, or transmit torque without slipping. That alone
							selects the clearance / transition / interference family.
						</li>
						<li>
							<strong>How will it be assembled?</strong> By hand, by press, or
							with heat or cold. A fit that needs a press on the shop floor is a
							different choice from the same fit in a drawing that will be
							assembled once at the works.
						</li>
						<li>
							<strong>What are the materials and wall sections?</strong> A thin
							hub stretches more than a thick one under the same interference,
							so the same call-out is not equally safe on both.
						</li>
						<li>
							<strong>What temperature will it run at?</strong> If bore and
							shaft material differ, or the assembly runs hot, the fit changes
							with temperature. This is the same expansion problem that makes
							carbide gauges need temperature control in IS 3455.
						</li>
						<li>
							<strong>Is one member standard stock?</strong> If the shaft is
							bought ground to h, the hole must take the fit — shaft-basis.
						</li>
					</ol>
					<p className="text-gray-700 leading-relaxed mt-4">
						Only after those are answered does the call-out get read out of the
						standard&apos;s table for the size and grade range in question.
					</p>
				</section>

				<section aria-labelledby="why-no-numbers" className="mb-12">
					<h2
						id="why-no-numbers"
						className="text-2xl font-semibold text-primary mb-4"
					>
						Why the numbers are not on this page
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						The limit values live in the standard&apos;s Part 2 tables, and this
						page deliberately does not reproduce them. Two reasons, and both
						matter.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						The first is ownership. The IS tables are BIS copyright and the ISO
						tables are ISO copyright. A reference page that retypes them is
						either licensed or it is not, and this one is not.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						The second is arithmetic. The published limits are a{" "}
						<strong>rounded preferred-number series</strong>, not the raw output
						of the grade formula. Measured across a sample of ISO 286-1 cells,
						the formula disagrees with the published table in roughly half of
						them, because the table has been rounded to a convenient series and
						the formula has not. A page that computed its own values would
						therefore be wrong about half the time on the only numbers that give
						it value. For a tolerance, that is not a lost ranking — it is a
						scrapped batch or a rejected assembly at a customer&apos;s works.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						So: get <strong>IS 919 (Part 2) : 2014</strong> (or ISO 286-2:2010)
						from the source, quote the edition on the drawing, and work from
						that table. If you would rather not work through it, send us the
						drawing and the fit class and we will apply it to the gauge.
					</p>
					<div className="rounded-xl border border-primary/15 bg-white p-6">
						<p className="text-gray-700 leading-relaxed mb-0">
							Related reading:{" "}
							<Link
								href="/blog/using-is-919-and-is-3455-to-make-better-plain-gauging-decisions"
								className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
							>
								IS 919 and IS 3455 explained
							</Link>{" "}
							— what each standard covers, which edition is current, and the
							H/Y/Z gauge tolerance and wear framework.
						</p>
					</div>
				</section>

				<section aria-labelledby="gauging" className="mb-12">
					<h2 id="gauging" className="text-2xl font-semibold text-primary mb-4">
						From limits to gauging
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						Once the limits are set, something has to check them at the machine.
						That is limit gauging: a full-form <strong>GO</strong> member that
						checks the assembly condition over the full length, and a short{" "}
						<strong>NO-GO</strong> member that checks size at a point — the
						Taylor principle as IS 3455 states it. A gauge is made to its own
						tolerance, placed inside the workpiece limit, and allowed to wear to
						a defined limit rather than to the part limit.
					</p>
					<p className="text-gray-700 leading-relaxed mb-5">
						DSN Enterprises manufactures plain plug, ring and snap gauges to the
						fit classes on your drawing — H7 bores and their shaft counterparts
						among them — with matched GO/NO-GO members and traceable calibration
						certificates.
					</p>
					<div className="flex flex-wrap gap-3">
						<Link
							href="/products/plain-gauges"
							className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
						>
							Plain gauges we manufacture
						</Link>
						<Link
							href="/threads"
							className="inline-flex items-center rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
						>
							Thread reference charts
						</Link>
					</div>
				</section>

				<section aria-labelledby="fits-faq" className="mb-12">
					<h2
						id="fits-faq"
						className="text-2xl font-semibold text-primary mb-6"
					>
						Questions this page answers
					</h2>
					<div className="divide-y divide-gray-100 border-y border-gray-100">
						{FAQS.map((faq) => (
							<details key={faq.question} className="group py-4">
								<summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-gray-900">
									<span>{faq.question}</span>
									<span
										aria-hidden
										className="mt-1 shrink-0 text-gray-400 transition-transform group-open:rotate-45"
									>
										+
									</span>
								</summary>
								<p className="mt-3 text-gray-600 leading-relaxed">
									{faq.answer}
								</p>
							</details>
						))}
					</div>
				</section>
			</div>

			<Cta10
				reference="Ref. DSN-FITS-01"
				heading="Working to a Fit Class?"
				description="Send the drawing, the fit call-out and the size. We will make the gauge to the limits you specify and issue the calibration certificate against them."
				buttons={{
					primary: { text: "Send a Drawing", url: "/contact" },
					secondary: { text: "+91 93631 22005", url: "tel:+919363122005" },
				}}
			/>
		</>
	);
}
