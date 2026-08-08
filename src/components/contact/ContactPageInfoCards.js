"use client";

import { UilClock, UilMapMarker, UilPhone } from "@iconscout/react-unicons";
import { m } from "framer-motion";

const items = [
	{
		icon: UilMapMarker,
		title: "Our Location",
		content: "Coimbatore, Tamil Nadu, India",
	},
	{
		icon: UilPhone,
		title: "Phone",
		content: (
			<a
				href="tel:+919363122005"
				className="hover:text-primary break-all sm:break-normal"
			>
				+91 93631 22005
			</a>
		),
	},
	{
		icon: UilClock,
		title: "Business Hours",
		content: (
			<span className="block leading-relaxed">
				Mon – Fri: 9:00 AM – 6:00 PM
				<br />
				Sat: 9:00 AM – 1:00 PM
				<br />
				Sun: Closed
			</span>
		),
	},
];

export default function ContactPageInfoCards() {
	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">
			<div className="grid grid-cols-1 divide-y divide-gray-200/80">
				{items.map(({ icon: Icon, title, content }, index) => (
					<m.div
						key={title}
						className="flex items-start gap-4 p-6"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-30px" }}
						transition={{ duration: 0.4, delay: index * 0.05 }}
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<Icon className="h-5 w-5" />
						</div>
						<div className="min-w-0 flex-1">
							<h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
								{title}
							</h3>
							<p className="text-[15px] leading-relaxed text-gray-900">
								{content}
							</p>
						</div>
					</m.div>
				))}
			</div>
		</div>
	);
}
