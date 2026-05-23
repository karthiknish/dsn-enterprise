import Link from "next/link";
import JsonLdScripts from "@/components/seo/JsonLdScripts";
import {
	buildProductFaqs,
	getCityProfile,
	getProductHub,
	PRODUCT_PROFILES,
} from "@/lib/seo-location-data";
import { CITIES, PRODUCTS } from "@/lib/seo-pages.config";
import {
	buildBreadcrumbJsonLd,
	buildFaqJsonLd,
	buildProductLocationJsonLd,
} from "@/lib/seo-schema";

function CheckIcon() {
	return (
		<svg
			aria-hidden="true"
			className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

export default function ProductCityLanding({
	pageData,
	productSlug,
	citySlug,
	slug,
}) {
	const product = PRODUCTS.find((p) => p.slug === productSlug);
	const cityProfile = getCityProfile(citySlug);
	const productProfile = PRODUCT_PROFILES[productSlug];
	const hub = getProductHub(productSlug);
	const faqs = buildProductFaqs(pageData, productSlug, citySlug);
	const path = `/products/${slug}`;

	const schemas = [
		buildBreadcrumbJsonLd([
			{ name: "Home", url: "/" },
			{ name: "Products", url: "/products" },
			{ name: hub.hubLabel, url: hub.hubPath },
			{ name: `${pageData.productName} in ${pageData.cityName}`, url: path },
		]),
		buildProductLocationJsonLd({ pageData, productSlug, citySlug, path }),
		buildFaqJsonLd(faqs),
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<JsonLdScripts schemas={schemas} />

			<section className="bg-primary text-white py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<nav
							aria-label="Breadcrumb"
							className="text-sm mb-4 text-accent-100"
						>
							<Link href="/" className="hover:text-white">
								Home
							</Link>
							<span className="mx-2">/</span>
							<Link href="/products" className="hover:text-white">
								Products
							</Link>
							<span className="mx-2">/</span>
							<Link href={hub.hubPath} className="hover:text-white">
								{hub.hubLabel}
							</Link>
							<span className="mx-2">/</span>
							<span className="text-white/80">{pageData.cityName}</span>
						</nav>
						<p className="text-accent-200 text-sm font-medium uppercase tracking-wide mb-2">
							Precision gauges · Tamil Nadu
						</p>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-oswald leading-tight">
							{pageData.productName} in {pageData.cityName}
						</h1>
						<p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl">
							{product?.description || "Precision gauges built to drawing"}
							—manufactured in Coimbatore and supplied to {pageData.cityName}{" "}
							with traceable certificates and calibration support.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="/contact"
								className="inline-flex items-center bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
							>
								Request a Quote
							</Link>
							<a
								href="tel:+919363122005"
								className="inline-flex items-center bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/30"
							>
								+91 93631 22005
							</a>
							<Link
								href={hub.hubPath}
								className="inline-flex items-center text-accent-100 hover:text-white underline-offset-4 hover:underline px-2 py-3"
							>
								View {hub.hubLabel} →
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-8">
						<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
							<h2 className="text-2xl font-bold text-primary mb-4">
								Why {pageData.cityName} manufacturers choose DSN
							</h2>
							<p className="text-gray-700 mb-4 leading-relaxed">
								{cityProfile.localContext}
							</p>
							<p className="text-gray-700 mb-6 leading-relaxed">
								We manufacture {pageData.productName.toLowerCase()} at our
								Coimbatore works for plants in {pageData.cityName}—with
								drawing-based specs,{" "}
								{product?.description || "precision gauging"}, and certificates
								your QA team can file without rework.
							</p>
							<div className="flex flex-wrap gap-2 mb-6">
								{cityProfile.industrialAreas.map((area) => (
									<span
										key={area}
										className="px-3 py-1 bg-secondary-light text-primary text-sm rounded-full"
									>
										{area}
									</span>
								))}
							</div>
							<p className="text-sm text-gray-600 border-l-4 border-accent pl-4">
								<strong className="text-gray-900">Logistics:</strong>{" "}
								{cityProfile.logistics}
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
								<h3 className="font-semibold text-gray-900 mb-4 text-lg">
									Why choose us
								</h3>
								<ul className="space-y-3">
									{[
										"ISO 9001:2015 manufacture with documented inspection",
										`Scheduled dispatch into ${pageData.cityName} and Tamil Nadu`,
										"Custom members and progressive designs from drawing",
										"NABL-traceable calibration when your programme requires it",
										"Direct access to gauge engineers—not a call centre",
									].map((item) => (
										<li key={item} className="flex items-start">
											<CheckIcon />
											<span className="text-gray-700">{item}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
								<h3 className="font-semibold text-gray-900 mb-4 text-lg">
									Industries in {pageData.cityName}
								</h3>
								<ul className="space-y-3">
									{cityProfile.keyIndustries.map((item) => (
										<li key={item} className="flex items-start">
											<CheckIcon />
											<span className="text-gray-700">{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						{productProfile && (
							<>
								<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
									<h2 className="text-2xl font-bold text-primary mb-4">
										Applications
									</h2>
									<ul className="grid sm:grid-cols-2 gap-3">
										{productProfile.applications.map((app) => (
											<li key={app} className="flex items-start text-gray-700">
												<CheckIcon />
												{app}
											</li>
										))}
									</ul>
								</div>

								<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 overflow-x-auto">
									<h2 className="text-2xl font-bold text-primary mb-6">
										Technical specifications
									</h2>
									<table className="w-full text-sm">
										<tbody className="divide-y divide-gray-100">
											{productProfile.specs.map((row) => (
												<tr key={row.label}>
													<td className="py-3 text-gray-600 font-medium w-2/5">
														{row.label}
													</td>
													<td className="py-3 text-gray-900">{row.value}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</>
						)}

						<div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-8 text-white">
							<h2 className="text-xl font-bold mb-6">
								How we build your gauges
							</h2>
							<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
								{[
									[
										"Design",
										"Tolerance and thread review against your drawing before cutting",
									],
									[
										"Manufacture",
										"CNC machining, grinding, and lapping to agreed size",
									],
									[
										"Heat treat",
										"Hardening and SUB-ZERO stabilisation for wear life",
									],
									[
										"Inspect",
										"Final measurement and calibration certificate on dispatch",
									],
								].map(([title, desc], i) => (
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
							<h2 className="text-2xl font-bold text-primary mb-6">
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
							<h2 className="text-xl font-bold text-primary mb-4">
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
							<h2 className="text-2xl font-bold text-primary mb-3">
								Get {pageData.productName} for {pageData.cityName}
							</h2>
							<p className="text-gray-700 mb-6 max-w-xl mx-auto">
								Email or upload your drawing with quantity and certificate
								needs—we confirm feasibility, lead time, and price from
								Coimbatore.
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
							<h2 className="text-xl font-bold text-primary mb-4">
								{pageData.productName} in other cities
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
								{CITIES.filter((c) => c.slug !== citySlug).map((otherCity) => (
									<Link
										key={otherCity.slug}
										href={`/products/${productSlug}-${otherCity.slug}`}
										className="text-accent hover:text-accent-700 hover:underline"
									>
										{otherCity.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
