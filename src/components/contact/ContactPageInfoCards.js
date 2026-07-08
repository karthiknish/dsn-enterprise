"use client";

import { m } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const cards = [
	{
		icon: FaMapMarkerAlt,
		title: "Our Location",
		content: (
			<>
				Coimbatore,
				<br /> Tamil Nadu,
				<br />
				India
			</>
		),
		delay: 0,
	},
	{
		icon: FaPhone,
		title: "Phone",
		content: <a href="tel:+919363122005">+91 9363122005</a>,
		delay: 0.1,
	},
	{
		icon: FaClock,
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
		delay: 0.2,
	},
];

export default function ContactPageInfoCards() {
	return (
		<div className="mt-8">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{cards.map(({ icon: Icon, title, content, delay }) => (
					<m.div
						key={title}
						className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 text-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay }}
					>
						<div className="flex justify-center mb-3">
							<Icon className="text-3xl text-primary" />
						</div>
						<h3 className="text-lg font-semibold mb-2 text-gray-900">
							{title}
						</h3>
						<p className="text-sm text-gray-600">{content}</p>
					</m.div>
				))}
			</div>
		</div>
	);
}
