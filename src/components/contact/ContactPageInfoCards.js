"use client";

import { m } from "framer-motion";
import { UilClock, UilMapMarker, UilPhone } from "@iconscout/react-unicons";

const items = [
	{
		icon: UilMapMarker,
		title: "Our Location",
		content: (
			<>
				Coimbatore,
				<br /> Tamil Nadu,
				<br />
				India
			</>
		),
	},
	{
		icon: UilPhone,
		title: "Phone",
		content: <a href="tel:+919363122005">+91 9363122005</a>,
	},
	{
		icon: UilClock,
		title: "Business Hours",
		content: (
			<>
				Monday - Friday: 9:00 AM - 6:00 PM
				<br />
				Saturday: 9:00 AM - 1:00 PM
				<br />
				Sunday: Closed
			</>
		),
	},
];

export default function ContactPageInfoCards() {
	return (
		<div className="mt-8">
			<div className="bg-white rounded-2xl border border-gray-200/80 hover:shadow-lg transition-all duration-300 overflow-hidden">
				<div className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-gray-200/80 sm:divide-y-0 sm:divide-x">
					{items.map(({ icon: Icon, title, content }, index) => (
						<m.div
							key={title}
							className="flex items-start gap-4 p-6 lg:p-8"
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-30px" }}
							transition={{ duration: 0.45, delay: index * 0.06 }}
						>
							<div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
								<Icon className="w-5 h-5" />
							</div>
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
									{title}
								</h3>
								<p className="text-base text-gray-900 leading-relaxed">
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
