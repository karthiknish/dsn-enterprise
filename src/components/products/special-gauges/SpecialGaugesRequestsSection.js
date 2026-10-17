import Link from "next/link";

const requests = [
	{
		title: "Outer profile checking gauges",
		detail:
			"A go/no-go template or profile gauge for a component's outer contour, made to your drawing so operators can check parts at the machine.",
	},
	{
		title: "PCD and bolt-circle gauges",
		detail:
			"Fixed or adjustable gauges for the pitch circle diameter of wheels, flanges and hubs, with the hole count and diameter taken from your drawing.",
	},
	{
		title: "Distance and gap gauges",
		detail:
			"Gauges for the spacing between rollers, pins or faces on a machine, where a vernier is too slow or leaves too much to the operator.",
	},
	{
		title: "Gauges from a sample part",
		detail:
			"No drawing? Send a sample or a sketch with the tolerance you need and we will tell you what gauge can inspect it.",
	},
];

export default function SpecialGaugesRequestsSection() {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-semibold mb-3 text-gray-900">
						Gauges Customers Ask Us to Make
					</h2>
					<p className="text-lg text-gray-700 mb-8">
						Most custom enquiries start with a feature the shop cannot check
						with a catalogue gauge. These are the requests we see most often.
					</p>
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{requests.map((item) => (
							<li
								key={item.title}
								className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
							>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed">
									{item.detail}
								</p>
							</li>
						))}
					</ul>
					<p className="mt-8 text-gray-700">
						<Link
							href="/contact?product=Custom%20Gauge"
							className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
						>
							Send your drawing or sample for a quote
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
