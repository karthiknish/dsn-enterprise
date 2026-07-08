"use client";

export default function ContactDetailPanel({
	contact,
	onClose,
	onStatusChange,
	onDelete,
}) {
	if (!contact) {
		return (
			<div className="bg-white rounded-2xl border border-gray-200/80 p-6 text-center text-gray-500">
				<svg
					aria-hidden="true"
					className="w-12 h-12 mx-auto text-gray-400 mb-3"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
					/>
				</svg>
				<p>Select a contact to view details</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-2xl border border-gray-200/80 p-6 lg:sticky lg:top-24">
			<div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
				<h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
				<button
					type="button"
					onClick={onClose}
					className="text-gray-400 hover:text-gray-600 p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					aria-label="Close details"
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div className="space-y-4">
				<div>
					<p className="text-xs uppercase tracking-wide text-gray-500">Name</p>
					<p className="text-sm text-gray-900 mt-1">{contact.name}</p>
				</div>

				<div>
					<p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
					<p className="mt-1">
						<a
							href={`mailto:${contact.email}`}
							className="text-sm text-primary hover:text-primary-dark"
						>
							{contact.email}
						</a>
					</p>
				</div>

				{contact.phone && (
					<div>
						<p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
						<p className="mt-1">
							<a
								href={`tel:${contact.phone}`}
								className="text-sm text-primary hover:text-primary-dark"
							>
								{contact.phone}
							</a>
						</p>
					</div>
				)}

				{contact.company && (
					<div>
						<p className="text-xs uppercase tracking-wide text-gray-500">Company</p>
						<p className="text-sm text-gray-900 mt-1">{contact.company}</p>
					</div>
				)}

				{contact.productInterest && (
					<div>
						<p className="text-xs uppercase tracking-wide text-gray-500">
							Product Interest
						</p>
						<p className="text-sm text-gray-900 mt-1">{contact.productInterest}</p>
					</div>
				)}

				<div>
					<p className="text-xs uppercase tracking-wide text-gray-500">Message</p>
					<p className="text-sm text-gray-900 whitespace-pre-wrap mt-1">
						{contact.message}
					</p>
				</div>

				<div>
					<label
						htmlFor="contact-status"
						className="text-xs uppercase tracking-wide text-gray-500"
					>
						Status
					</label>
					<select
						id="contact-status"
						value={contact.status || "new"}
						onChange={(e) => onStatusChange(contact.id, e.target.value)}
						className="mt-1 block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
					>
						<option value="new">New</option>
						<option value="contacted">Contacted</option>
						<option value="resolved">Resolved</option>
					</select>
				</div>

				<div>
					<p className="text-xs uppercase tracking-wide text-gray-500">Submitted</p>
					<p className="text-sm text-gray-900 mt-1">
						{contact.createdAt?.toDate?.()?.toLocaleString() || "No date"}
					</p>
				</div>

				<div className="pt-4 mt-2 border-t border-gray-100 flex gap-2">
					<a
						href={`mailto:${contact.email}?subject=Re: Your inquiry to DSN Enterprises`}
						className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
					>
						Reply
					</a>
					<button
						type="button"
						onClick={() => onDelete(contact.id)}
						className="px-4 py-2 text-sm font-medium border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
						aria-label="Delete submission"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
