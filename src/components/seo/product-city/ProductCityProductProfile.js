import ProductCityCheckIcon from "./ProductCityCheckIcon";

export default function ProductCityProductProfile({ productProfile }) {
	if (!productProfile) return null;

	return (
		<>
			<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
				<h2 className="text-2xl font-semibold text-primary mb-4">Applications</h2>
				<ul className="grid sm:grid-cols-2 gap-3">
					{productProfile.applications.map((app) => (
						<li key={app} className="flex items-start text-gray-700">
							<ProductCityCheckIcon />
							{app}
						</li>
					))}
				</ul>
			</div>

			<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 overflow-x-auto">
				<h2 className="text-2xl font-semibold text-primary mb-6">
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
	);
}
