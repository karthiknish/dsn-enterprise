"use client";

import {
	UilClock,
	UilMapMarker,
	UilPhone,
	UilWhatsapp,
} from "@iconscout/react-unicons";
import { m } from "framer-motion";
import TrackedLink from "@/components/analytics/TrackedLink";
import {
	EMAIL,
	NAP_LINE,
	PHONE_DISPLAY,
	PHONE_TEL,
	whatsappUrl,
} from "@/lib/site";

const items = [
	{
		icon: UilMapMarker,
		title: "Our Location",
		content: NAP_LINE,
	},
	{
		icon: UilPhone,
		title: "Phone",
		content: (
			<TrackedLink
				href={`tel:${PHONE_TEL}`}
				kind="phone"
				location="Contact Page"
				className="hover:text-primary break-all sm:break-normal"
			>
				{PHONE_DISPLAY}
			</TrackedLink>
		),
	},
	{
		icon: UilWhatsapp,
		title: "WhatsApp",
		content: (
			<TrackedLink
				href={whatsappUrl()}
				kind="whatsapp"
				location="Contact Page"
				target="_blank"
				rel="noopener noreferrer"
				className="hover:text-primary"
			>
				{PHONE_DISPLAY}
			</TrackedLink>
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
			<div className="border-t border-gray-200/80 p-6">
				<h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
					Email
				</h3>
				<p className="text-[15px] leading-relaxed text-gray-900">
					<TrackedLink
						href={`mailto:${EMAIL}`}
						kind="email"
						location="Contact Page"
						className="hover:text-primary break-all"
					>
						{EMAIL}
					</TrackedLink>
				</p>
			</div>
		</div>
	);
}
