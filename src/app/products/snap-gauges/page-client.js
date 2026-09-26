import { UilCheck } from "@iconscout/react-unicons";
import Image from "next/image";
import Link from "next/link";
import { Cta10 } from "@/components/cta10";
import ProductCategoryHero from "@/components/layout/ProductCategoryHero";
import ProductQuoteChecklist from "@/components/products/ProductQuoteChecklist";
import CityLinks from "@/components/seo/CityLinks";

/**
 * Every figure and claim on this page already appears elsewhere on the site:
 * the IS 8023 progressive type and the 160 mm single-ended range on /products,
 * the anvil, marking and certificate lines in the snap-gauge product profile
 * (src/lib/seo-location-data.js), and the snap-versus-ring guidance in the
 * snap-gauge-vs-ring-gauge article. Nothing new is asserted — rule 5.
 */

const SNAP_VS_RING_POST =
	"/blog/snap-gauge-vs-ring-gauge-pick-by-the-form-error-not-the-habit";
const IS_3455_POST =
	"/blog/using-is-919-and-is-3455-to-make-better-plain-gauging-decisions";

const types = [
	{
		name: "Fixed progressive snap gauges",
		detail:
			"Single-ended plate snap gauges of the progressive type described in IS 8023, up to 160 mm. The GO gap sits at the mouth and the NO-GO gap behind it, so one push checks both limits: a good shaft passes the first anvils and stops at the second.",
	},
	{
		name: "Adjustable snap gauges",
		detail:
			"A frame with anvils that are set to your limits and locked. When the drawing changes or the anvils wear, the gauge is reset and recalibrated rather than replaced.",
	},
];

const features = [
	"Hardened, wear-resistant anvils",
	"Precision ground measuring faces",
	"Clear GO / NO-GO marking",
	"Built to the drawing and its tolerance band",
	"Calibration certificate available on dispatch",
	"Recalibration and repair of snap gauges in use",
];

const specifications = [
	{ label: "Types", value: "Fixed progressive and adjustable" },
	{ label: "Fixed range", value: "Single-ended, up to 160 mm" },
	{ label: "Limits", value: "Set to the GO / NO-GO limits on your drawing" },
	{ label: "Anvils", value: "Hardened, wear-resistant contacts" },
	{ label: "Finish", value: "Precision ground measuring faces" },
	{ label: "Certificate", value: "Calibration available on dispatch" },
];

const standards = [
	"IS 8023 - Single Ended Progressive Type Plate Snap Gauges",
	"IS 3455 - Gauging Practice for Plain Work Pieces",
	"IS 919 (Part 1, Part 2) - ISO System of Limits & Fits",
];

const linkClass =
	"text-primary underline decoration-secondary decoration-2 underline-offset-2";

export default function SnapGaugesPage() {
	return (
		<div>
			<ProductCategoryHero
				title="Snap Gauge Manufacturer"
				quoteProduct="Snap Gauges"
				description="Fixed progressive and adjustable snap gauges for fast GO/NO-GO checks on shafts, pins and turned parts, made in Coimbatore to the limits on your drawing."
				image={{
					src: "/images/snap-gauge.png",
					alt: "Plain snap gauge for GO/NO-GO checking of shaft diameters",
				}}
			/>

			<section className="py-16 md:py-20 bg-surface-subtle">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-semibold mb-6 text-gray-900">
							What a snap gauge checks
						</h2>
						<p className="text-lg text-gray-700 mb-6">
							A snap gauge is a GO / NO-GO limit gauge for an external diameter.
							The shaft is pushed through the gauge’s gap: it must pass the GO
							anvils and must not pass the NO-GO anvils. There is no reading to
							take, which is why snap gauges are used on production lines where
							every part is checked and a micrometer would be slower than the
							machine.
						</p>
						<p className="text-lg text-gray-700">
							DSN Enterprises manufactures snap gauges in Coimbatore alongside
							our{" "}
							<Link href="/products/plain-gauges" className={linkClass}>
								plain plug and ring gauges
							</Link>
							. Each gauge is made to the GO and NO-GO limits of the feature on
							your drawing, following the gauging practice in{" "}
							<Link href={IS_3455_POST} className={linkClass}>
								IS 3455
							</Link>
							.
						</p>
					</div>
				</div>
			</section>

			<section className="py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
						<div className="relative h-72 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
							<Image
								src="/images/snap-gauge.png"
								alt="Snap gauge with GO and NO-GO anvils"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-contain p-8"
							/>
						</div>
						<div>
							<h2 className="text-3xl font-semibold mb-6 text-gray-900">
								Snap gauges we make
							</h2>
							<div className="space-y-6">
								{types.map((type) => (
									<div key={type.name}>
										<h3 className="text-xl font-semibold mb-2 text-gray-900">
											{type.name}
										</h3>
										<p className="text-gray-700">{type.detail}</p>
									</div>
								))}
							</div>
						</div>
					</div>
					<ul className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-12">
						{features.map((feature) => (
							<li
								key={feature}
								className="flex items-start bg-white rounded-lg border border-gray-200/80 p-4 text-gray-700"
							>
								<UilCheck className="w-5 h-5 text-primary mt-0.5 mr-2 shrink-0" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-semibold mb-6 text-gray-900">
							Snap gauge or ring gauge?
						</h2>
						<p className="text-lg text-gray-700 mb-6">
							A snap gauge touches the shaft at two opposed points, like a
							micrometer. A shaft with odd-numbered lobing — the three- and
							five-lobed shapes that centreless grinding tends to produce —
							reads the same diameter at every orientation between two points,
							so a snap gauge can pass a shaft that will not assemble. A ring
							gauge checks the whole circumference and catches it.
						</p>
						<p className="text-lg text-gray-700">
							The practical rule: for centreless ground shafts, use a{" "}
							<Link href="/products/plain-gauges" className={linkClass}>
								plain ring gauge
							</Link>{" "}
							for final acceptance unless roundness is verified separately; for
							shafts turned between centres, a snap gauge is usually sufficient
							and faster. The full comparison, including cost per inspection
							point, is in{" "}
							<Link href={SNAP_VS_RING_POST} className={linkClass}>
								snap gauge vs ring gauge: pick by the form error
							</Link>
							.
						</p>
					</div>
				</div>
			</section>

			<section className="py-16 bg-surface-muted">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-secondary-light p-8 rounded-lg">
							<h2 className="text-xl font-semibold mb-6 text-gray-900">
								Specifications
							</h2>
							<table className="w-full">
								<tbody>
									{specifications.map((spec) => (
										<tr
											key={spec.label}
											className="border-b border-gray-200 last:border-0"
										>
											<td className="py-3 pr-4 text-gray-600">{spec.label}</td>
											<td className="py-3 font-medium text-gray-900">
												{spec.value}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="bg-secondary-light p-8 rounded-lg">
							<h2 className="text-xl font-semibold mb-6 text-gray-900">
								Standards
							</h2>
							<ul className="space-y-3">
								{standards.map((standard) => (
									<li key={standard} className="flex items-start text-sm">
										<span className="text-primary mr-2">•</span>
										<span className="text-gray-700">{standard}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<ProductQuoteChecklist
				product="Snap Gauges"
				productLabel="snap gauge"
				items={[
					"The shaft diameter and its tolerance, e.g. Ø40 f7",
					"Fixed (one size) or adjustable (reset when limits change)",
				]}
			/>

			<CityLinks type="product" categorySlug="snap-gauges" />

			<section className="py-16 bg-secondary-light">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
						Explore Other Categories
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						{[
							{
								href: "/products/plain-gauges",
								name: "Plain Gauges",
								text: "Plug gauges, ring gauges, setting masters and pins",
							},
							{
								href: "/products/thread-gauges",
								name: "Thread Gauges",
								text: "Thread plug and ring gauges for all thread forms",
							},
							{
								href: "/products/special-gauges",
								name: "Special Gauges",
								text: "Custom gauges manufactured to your drawing",
							},
						].map((category) => (
							<Link
								key={category.href}
								href={category.href}
								className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
							>
								<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
									{category.name}
								</h3>
								<p className="text-gray-600 text-sm">{category.text}</p>
							</Link>
						))}
					</div>
				</div>
			</section>

			<Cta10
				reference="Ref. DSN-SNG-01"
				heading="Need Snap Gauges?"
				description="Send the shaft size and tolerance, or the drawing, and we will quote fixed or adjustable snap gauges set to your limits."
				buttons={{
					primary: {
						text: "Get a Quote",
						url: "/contact?product=Snap%20Gauges",
					},
					secondary: { text: "Plain Gauges", url: "/products/plain-gauges" },
				}}
			/>
		</div>
	);
}
