import Link from "next/link";

export default function ProductCityHero({
	pageData,
	product,
	hub,
}) {
	return (
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
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-oswald leading-tight">
						{pageData.productName} in {pageData.cityName}
					</h1>
					<p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl">
						{product?.description || "Precision gauges built to drawing"}
						,manufactured in Coimbatore and supplied to {pageData.cityName}{" "}
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
	);
}
