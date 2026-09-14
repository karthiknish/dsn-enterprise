/**
 * Lead counts for the admin dashboard, read from Firestore.
 *
 * GA4 can only report leads whose browser executed the tracking script, and it
 * counts events rather than enquiries. `contacts` is the record of enquiry that
 * actually arrived — it is the number the business acts on — so the dashboard
 * needs both, side by side, to make the disagreement visible instead of
 * silent. §2L in docs/SEO-STRATEGY.md records the discrepancy that motivated
 * this (over one window GA4 showed 2 form leads where Firestore held 1).
 *
 * Contacts carry `attribution.channel`, written at submit time, so this also
 * answers "which channel produced the enquiry" — which is what the SEO work is
 * ultimately judged on.
 *
 * Server-only. Never import from a client component.
 */

import { getAdminDb } from "@/lib/firebase-admin";

export const LEAD_COLLECTION = "contacts";

/**
 * Channel breakdown is derived in memory, and Firestore has no group-by, so the
 * newest N documents are read. At the current volume this is every document;
 * the cap exists so a future spike cannot turn a dashboard load into a full
 * collection scan. `sampled`/`capped` are returned so a partial read is never
 * presented as a complete one.
 */
const MAX_SAMPLE = 1000;

function toMillis(value) {
	return value?.toDate ? value.toDate().getTime() : null;
}

function toRows(map) {
	return [...map.entries()]
		.map(([label, count]) => ({ label, count }))
		.sort((a, b) => b.count - a.count);
}

function bump(map, key) {
	map.set(key, (map.get(key) || 0) + 1);
}

export async function getLeadStats(periodDays = 30) {
	const db = getAdminDb();
	const collection = db.collection(LEAD_COLLECTION);

	// Exact all-time total, independent of the sample cap.
	const totalSnapshot = await collection.count().get();
	const allTimeTotal = totalSnapshot.data().count;

	const snapshot = await collection
		.orderBy("createdAt", "desc")
		.limit(MAX_SAMPLE)
		.get();
	const docs = snapshot.docs.map((doc) => doc.data());

	const now = Date.now();
	const windowMs = periodDays * 86_400_000;

	const allChannels = new Map();
	const windowChannels = new Map();
	let current = 0;
	let previous = 0;
	let attributed = 0;
	let undated = 0;

	for (const doc of docs) {
		const channel = doc.attribution?.channel || "(not captured)";
		bump(allChannels, channel);
		if (doc.attribution) attributed += 1;

		const at = toMillis(doc.createdAt);
		if (at === null) {
			undated += 1;
			continue;
		}
		const age = now - at;
		if (age < windowMs) {
			current += 1;
			bump(windowChannels, channel);
		} else if (age < windowMs * 2) {
			previous += 1;
		}
	}

	return {
		allTime: {
			total: allTimeTotal,
			byChannel: toRows(allChannels),
		},
		current: {
			total: current,
			byChannel: toRows(windowChannels),
		},
		previous: { total: previous },
		attributed,
		sampled: docs.length,
		capped: docs.length >= MAX_SAMPLE,
		undated,
	};
}
