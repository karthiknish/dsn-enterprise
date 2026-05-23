import Link from "next/link";

export default function SpecialGaugesRelatedCategories() {
	return (
		<section className="py-16 bg-secondary-light">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">
					Explore Other Categories
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					<Link
						href="/products/plain-gauges"
						className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
					>
						<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
							Plain Gauges
						</h3>
						<p className="text-gray-600 text-sm">
							Plug gauges, ring gauges, and setting masters
						</p>
					</Link>
					<Link
						href="/products/thread-gauges"
						className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
					>
						<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
							Thread Gauges
						</h3>
						<p className="text-gray-600 text-sm">
							Standard thread gauges for all thread forms
						</p>
					</Link>
					<Link
						href="/products/api-gauges"
						className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
					>
						<h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
							API Gauges
						</h3>
						<p className="text-gray-600 text-sm">API 5B & 7-2 certified gauges</p>
					</Link>
				</div>
			</div>
		</section>
	);
}
