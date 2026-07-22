import Link from "next/link";
import { CITIES, PRODUCTS, SERVICES } from "@/lib/seo-pages.config";

export default function CityLinks({ type, categorySlug }) {
	const items =
		type === "product"
			? PRODUCTS.filter((p) => p.slug === categorySlug)
			: SERVICES.filter((s) => s.slug === categorySlug);

	if (items.length === 0) return null;

	const item = items[0];
	const basePath = type === "product" ? "/products" : "/services";

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 text-center">
						{item.name} Across Tamil Nadu
					</h2>
					<p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
						We manufacture and supply {item.name.toLowerCase()} to industrial
						centres across Tamil Nadu from our Coimbatore facility. Explore
						city-specific pages for local information and logistics details.
					</p>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{CITIES.map((city) => (
							<Link
								key={city.slug}
								href={`${basePath}/${item.slug}-${city.slug}`}
								className="block bg-gray-50 hover:bg-accent/5 border border-gray-200 hover:border-accent rounded-lg p-4 text-center transition-colors group"
							>
								<span className="text-sm font-medium text-gray-900 group-hover:text-accent transition-colors">
									{item.name} in {city.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
