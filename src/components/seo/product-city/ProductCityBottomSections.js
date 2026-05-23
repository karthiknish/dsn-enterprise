import Link from "next/link";
import { CITIES } from "@/lib/seo-pages.config";

const processSteps = [
	["Design", "Tolerance and thread review against your drawing before cutting"],
	["Manufacture", "CNC machining, grinding, and lapping to agreed size"],
	["Heat treat", "Hardening and SUB-ZERO stabilisation for wear life"],
	["Inspect", "Final measurement and calibration certificate on dispatch"],
];

export default function ProductCityBottomSections({
	pageData,
	productSlug,
	citySlug,
	hub,
	faqs,
}) {
	return (
		<>
			<div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-8 text-white">
				<h2 className="text-xl font-semibold mb-6">How we build your gauges</h2>
				<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
					{processSteps.map(([title, desc], i) => (
						<div key={title} className="text-center">
							<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
								{i + 1}
							</div>
							<h3 className="font-semibold mb-1">{title}</h3>
							<p className="text-white/80 text-sm">{desc}</p>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
				<h2 className="text-2xl font-semibold text-primary mb-6">
					Frequently asked questions
				</h2>
				<div className="space-y-6">
					{faqs.map((faq) => (
						<div
							key={faq.question}
							className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
						>
							<h3 className="font-semibold text-gray-900 mb-2">
								{faq.question}
							</h3>
							<p className="text-gray-600 text-sm leading-relaxed">
								{faq.answer}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
				<h2 className="text-xl font-semibold text-primary mb-4">
					Related resources
				</h2>
				<div className="grid sm:grid-cols-2 gap-3">
					<Link
						href={hub.hubPath}
						className="text-accent hover:text-accent-700 font-medium"
					>
						{hub.hubLabel} overview →
					</Link>
					<Link
						href="/calibration"
						className="text-accent hover:text-accent-700 font-medium"
					>
						Gauge calibration services →
					</Link>
					<Link
						href="/blog"
						className="text-accent hover:text-accent-700 font-medium"
					>
						Metrology articles & guides →
					</Link>
					<Link
						href="/contact"
						className="text-accent hover:text-accent-700 font-medium"
					>
						Contact DSN Enterprises →
					</Link>
				</div>
			</div>

			<div className="bg-secondary-light rounded-xl p-8 text-center border border-primary/10">
				<h2 className="text-2xl font-semibold text-primary mb-3">
					Get {pageData.productName} for {pageData.cityName}
				</h2>
				<p className="text-gray-700 mb-6 max-w-xl mx-auto">
					Email or upload your drawing with quantity and certificate needs,we
					confirm feasibility, lead time, and price from Coimbatore.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<Link
						href="/contact"
						className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark font-medium"
					>
						Request Quote
					</Link>
					<Link
						href="/products"
						className="bg-white text-primary px-6 py-3 rounded-lg border-2 border-primary hover:bg-gray-50 font-medium"
					>
						All Products
					</Link>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
				<h2 className="text-xl font-semibold text-primary mb-4">
					{pageData.productName} in other cities
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
					{CITIES.flatMap((c) =>
						c.slug !== citySlug
							? [
									<Link
										key={c.slug}
										href={`/products/${productSlug}-${c.slug}`}
										className="text-accent hover:text-accent-700 hover:underline"
									>
										{c.name}
									</Link>,
								]
							: [],
					)}
				</div>
			</div>
		</>
	);
}
