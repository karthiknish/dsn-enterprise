"use client";

import { UilClock, UilMapMarker, UilPhone } from "@iconscout/react-unicons";
import { m } from "framer-motion";

const items = [
	{
		icon: UilMapMarker,
		title: "Our Location",
		content: (
			<>
				<span className="block">Coimbatore,</span>
				<span className="block">Tamil Nadu, India</span>
			</>
		),
	},
	{
		icon: UilPhone,
		title: "Phone",
		content: (
			<a
				href="tel:+919363122005"
				className="whitespace-nowrap hover:text-primary"
			>
				+91 93631 22005
			</a>
		),
	},
	{
		icon: UilClock,
		title: "Business Hours",
		content: (
			<>
				<span className="block">Mon – Fri: 9:00 AM – 6:00 PM</span>
				<span className="block">Sat: 9:00 AM – 1:00 PM</span>
				<span className="block">Sun: Closed</span>
			</>
		),
	},
];

export default function ContactPageInfoCards() {
	return (
		<div className="mt-8">
			<div className="bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg transition-all duration-300 overflow-hidden">
				<div className="grid grid-cols-1 lg:grid-cols-3 divide-y divide-gray-200/80 lg:divide-y-0 lg:divide-x">
					{items.map(({ icon: Icon, title, content }, index) => (
						<m.div
							key={title}
							className="flex items-start gap-4 p-6 lg:p-7 min-w-0"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45, delay: index * 0.06 }}
						>
							<div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
								<Icon className="w-5 h-5" />
							</div>
							<div className="min-w-0">
								<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
									{title}
								</h3>
								<p className="text-[15px] text-gray-900 leading-relaxed break-words">
									{content}
								</p>
							</div>
						</m.div>
					))}
				</div>
			</div>
		</div>
	);
}
