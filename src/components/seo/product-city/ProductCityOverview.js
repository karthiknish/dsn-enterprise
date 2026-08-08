import ProductCityCheckIcon from "./ProductCityCheckIcon";

export default function ProductCityOverview({
	pageData,
	product,
	cityProfile,
	cityProductNote,
}) {
	return (
		<>
			<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
				<h2 className="text-2xl font-semibold text-primary mb-4">
					Why {pageData.cityName} manufacturers choose DSN
				</h2>
				<p className="text-gray-700 mb-4 leading-relaxed">
					{cityProfile.localContext}
				</p>
				<p className="text-gray-700 mb-6 leading-relaxed">
					We manufacture {pageData.productName.toLowerCase()} at our Coimbatore
					works for plants in {pageData.cityName}, with drawing-based specs,{" "}
					{product?.description || "precision gauging"}, and certificates your
					QA team can file without rework.
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
				<p className="text-sm text-gray-600 bg-accent/5 rounded-lg px-4 py-3">
					<strong className="text-gray-900">Logistics:</strong>{" "}
					{cityProfile.logistics}
				</p>
			</div>

			{/* The single most page-specific block: what actually goes wrong with
			    this product in this city. This is what differentiates siblings. */}
			{cityProductNote ? (
				<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
					<h2 className="text-2xl font-semibold text-primary mb-4">
						{pageData.productName} in {pageData.cityName}: what to watch for
					</h2>
					<p className="text-gray-700 leading-relaxed">{cityProductNote}</p>
				</div>
			) : null}

			{cityProfile.nearbyTowns?.length ? (
				<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
					<h2 className="text-xl font-semibold text-primary mb-3">
						Delivery around {pageData.cityName}
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						{cityProfile.distanceKm === 0
							? `Our works is in ${pageData.cityName}, so collection, factory visits, and fit trials on your actual part are all practical the same day.`
							: `${pageData.cityName} is roughly ${cityProfile.distanceKm} km from our Coimbatore works via ${cityProfile.corridor}. Normal transit is ${cityProfile.transit}.`}{" "}
						{cityProfile.buyingPattern}
					</p>
					<p className="text-sm text-gray-600">
						<strong className="text-gray-900">Also covered:</strong>{" "}
						{cityProfile.nearbyTowns.join(", ")}
					</p>
				</div>
			) : null}

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
							"Direct access to gauge engineers,not a call centre",
						].map((item) => (
							<li key={item} className="flex items-start">
								<ProductCityCheckIcon />
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
								<ProductCityCheckIcon />
								<span className="text-gray-700">{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
