import Link from "next/link";
import JsonLdScripts from "@/components/seo/JsonLdScripts";
import {
	buildServiceFaqs,
	getCityProfile,
	SERVICE_PROFILES,
} from "@/lib/seo-location-data";
import { CITIES, SERVICES } from "@/lib/seo-pages.config";
import {
	buildBreadcrumbJsonLd,
	buildFaqJsonLd,
	buildServiceLocationJsonLd,
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

export default function ServiceCityLanding({
	pageData,
	serviceSlug,
	citySlug,
	slug,
}) {
	const service = SERVICES.find((s) => s.slug === serviceSlug);
	const cityProfile = getCityProfile(citySlug);
	const serviceProfile = SERVICE_PROFILES[serviceSlug];
	const faqs = buildServiceFaqs(pageData, serviceSlug, citySlug);
	const path = `/services/${slug}`;
	const hubPath = serviceProfile?.hubPath || "/services";
	const hubLabel = serviceProfile?.hubLabel || "Services";

	const schemas = [
		buildBreadcrumbJsonLd([
			{ name: "Home", url: "/" },
			{ name: "Services", url: "/services" },
			{ name: pageData.serviceName, url: hubPath },
			{ name: `${pageData.cityName}`, url: path },
		]),
		buildServiceLocationJsonLd({ pageData, path }),
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
							<Link href="/services" className="hover:text-white">
								Services
							</Link>
							<span className="mx-2">/</span>
							<span className="text-white/80">{pageData.cityName}</span>
						</nav>
						<p className="text-accent-200 text-sm font-medium uppercase tracking-wide mb-2">
							Gauge services · Tamil Nadu
						</p>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-oswald leading-tight">
							{pageData.serviceName} in {pageData.cityName}
						</h1>
						<p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl">
							{service?.description || "Professional gauge services"} for{" "}
							{pageData.cityName} plants—run from our Coimbatore facility with
							audit-ready documentation.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="/contact"
								className="inline-flex items-center bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
							>
								Get a Quote
							</Link>
							<a
								href="tel:+919363122005"
								className="inline-flex items-center bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 border border-white/30"
							>
								+91 93631 22005
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-8">
						<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
							<h2 className="text-2xl font-bold text-primary mb-4">
								{pageData.serviceName} for {pageData.cityName} industries
							</h2>
							<p className="text-gray-700 mb-4 leading-relaxed">
								{cityProfile.localContext}
							</p>
							<p className="text-gray-700 mb-6 leading-relaxed">
								Our {pageData.serviceName.toLowerCase()} team uses controlled
								lab processes, trained metrologists, and certificates formatted
								for ISO audits, customer source inspection, and internal recall
								programmes.
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
								<strong className="text-gray-900">Service coverage:</strong>{" "}
								{cityProfile.logistics}
							</p>
						</div>

						{serviceProfile && (
							<div className="bg-accent/10 rounded-xl p-8 border border-accent/20">
								<h2 className="text-xl font-bold text-primary mb-4">
									Our process
								</h2>
								<ol className="list-decimal list-inside space-y-2 text-gray-700">
									{serviceProfile.processSteps.map((step) => (
										<li key={step} className="pl-1">
											{step}
										</li>
									))}
								</ol>
							</div>
						)}

						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
								<h3 className="font-semibold text-gray-900 mb-4 text-lg">
									Service benefits
								</h3>
								<ul className="space-y-3">
									{[
										"Quick turnaround from Coimbatore lab",
										"NABL-aligned calibration processes",
										"Pickup and delivery across Tamil Nadu",
										"Detailed certificates with results",
										"Engineering advice on gauge life",
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
									Sectors we support
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

						<div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-8 text-white">
							<h2 className="text-xl font-bold mb-6">Why DSN Enterprises</h2>
							<div className="grid md:grid-cols-2 gap-6">
								{[
									[
										"30+ years in gauge making",
										"Serving Tamil Nadu since 1990",
									],
									["5000+ customers", "Automotive, textile, and engineering"],
									[
										"Coimbatore manufacturing",
										"Direct factory technical access",
									],
									["Full documentation", "Audit-ready certificates"],
								].map(([title, desc]) => (
									<div key={title}>
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

						<div className="bg-secondary-light rounded-xl p-8 text-center border border-primary/10">
							<h2 className="text-2xl font-bold text-primary mb-3">
								Book {pageData.serviceName} in {pageData.cityName}
							</h2>
							<p className="text-gray-700 mb-6">
								Send your gauge list or drawing—we confirm scope, pickup, and
								lead time.
							</p>
							<div className="flex flex-wrap justify-center gap-4">
								<Link
									href="/contact"
									className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark font-medium"
								>
									Contact Us
								</Link>
								<Link
									href={hubPath}
									className="bg-white text-primary px-6 py-3 rounded-lg border-2 border-primary font-medium"
								>
									{hubLabel}
								</Link>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
							<h2 className="text-xl font-bold text-primary mb-4">
								Other service locations
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
								{CITIES.filter((c) => c.slug !== citySlug).map((otherCity) => (
									<Link
										key={otherCity.slug}
										href={`/services/${serviceSlug}-${otherCity.slug}`}
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
