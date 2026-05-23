"use client";

import { m } from "framer-motion";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

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
		icon: FaEnvelope,
		title: "Email",
		content: (
			<a href="mailto:microfin2001@gmail.com">microfin2001@gmail.com</a>
		),
		delay: 0.2,
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
		delay: 0.3,
	},
];

export default function ContactPageInfoCards() {
	return (
		<section className="py-16 bg-secondary-light">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{cards.map(({ icon: Icon, title, content, delay }) => (
						<m.div
							key={title}
							className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 text-center"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay }}
						>
							<div className="flex justify-center mb-4">
								<Icon className="text-4xl text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
							<p className="text-gray-600">{content}</p>
						</m.div>
					))}
				</div>
			</div>
		</section>
	);
}
