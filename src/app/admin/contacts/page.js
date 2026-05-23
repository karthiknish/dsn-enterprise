"use client";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Suspense, use, useState } from "react";
import ContactDetailPanel from "@/components/admin/contacts/ContactDetailPanel";
import ContactsList from "@/components/admin/contacts/ContactsList";
import { fetchContacts } from "@/lib/admin-firestore";
import { db } from "@/lib/firebase";

const contactsResource = fetchContacts()
	.then((data) => ({ ok: true, data }))
	.catch((error) => {
		console.error("Error fetching contacts:", error);
		return {
			ok: false,
			error: "Could not load contacts. Check connection and try again.",
		};
	});

function ContactsPageContent() {
	const result = use(contactsResource);
	const [contacts, setContacts] = useState(
		result.ok ? result.data : [],
	);
	const fetchError = result.ok ? null : result.error;
	const [selectedContact, setSelectedContact] = useState(null);

	const handleMarkAsRead = async (contactId) => {
		try {
			await updateDoc(doc(db, "contacts", contactId), { read: true });
			setContacts((prev) =>
				prev.map((c) => (c.id === contactId ? { ...c, read: true } : c)),
			);
		} catch (error) {
			console.error("Error marking as read:", error);
		}
	};

	const handleDelete = async (contactId) => {
		if (!confirm("Are you sure you want to delete this contact?")) return;

		try {
			await deleteDoc(doc(db, "contacts", contactId));
			setContacts((prev) => prev.filter((c) => c.id !== contactId));
			if (selectedContact?.id === contactId) {
				setSelectedContact(null);
			}
		} catch (error) {
			console.error("Error deleting contact:", error);
		}
	};

	return (
		<div>
			<h1 className="sr-only">Contacts</h1>
			<div className="mb-8">
				<p className="text-gray-600">Manage contact form submissions</p>
			</div>

			{fetchError && (
				<div
					className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
					role="alert"
				>
					{fetchError}
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<ContactsList
					contacts={contacts}
					selectedContact={selectedContact}
					onSelect={setSelectedContact}
					onMarkAsRead={handleMarkAsRead}
					onDelete={handleDelete}
				/>
				<ContactDetailPanel
					contact={selectedContact}
					onMarkAsRead={handleMarkAsRead}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
}

function ContactsLoading() {
	return (
		<output
			className="flex items-center justify-center min-h-[40vh] w-full"
			aria-live="polite"
		>
			<span className="sr-only">Loading contacts</span>
			<div
				className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
				aria-hidden
			/>
		</output>
	);
}

export default function ContactsPage() {
	return (
		<Suspense fallback={<ContactsLoading />}>
			<ContactsPageContent />
		</Suspense>
	);
}
