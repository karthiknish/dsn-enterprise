"use client";

import { getContactStatusColor, previewContactMessage } from "@/lib/contact-status";

export default function ContactsList({
	contacts,
	selectedContact,
	onSelect,
}) {
	if (contacts.length === 0) {
		return (
			<div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center">
				<svg
					aria-hidden="true"
					className="w-16 h-16 mx-auto text-gray-400 mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					No contacts yet
				</h3>
				<p className="text-gray-500">
					Contact form submissions will appear here.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
			<div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
				<span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
					{contacts.length} {contacts.length === 1 ? "submission" : "submissions"}
				</span>
			</div>
			<div>
				{contacts.map((contact) => {
					const isSelected = selectedContact?.id === contact.id;
					return (
						<button
							key={contact.id}
							type="button"
							className={`block p-4 cursor-pointer transition-colors text-left w-full border-b border-gray-100 last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
								isSelected
									? "bg-primary/5 border-l-2 border-l-primary"
									: "hover:bg-gray-50 border-l-2 border-l-transparent"
							}`}
							onClick={() => onSelect(contact)}
							aria-pressed={isSelected}
						>
							<div className="flex items-start justify-between">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<h3 className="font-medium text-gray-900 truncate">
											{contact.name}
										</h3>
										<span
											className={`px-2 py-0.5 text-xs font-medium rounded-full ${getContactStatusColor(
												contact.status,
											)}`}
										>
											{contact.status || "new"}
										</span>
									</div>
									<p className="text-sm text-gray-600 truncate">
										{contact.email}
									</p>
									<p className="text-sm text-gray-500 truncate mt-1">
										{previewContactMessage(contact.message)}
									</p>
									<p className="text-xs text-gray-400 mt-2">
										{contact.createdAt?.toDate?.()?.toLocaleString() ||
											"No date"}
									</p>
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
