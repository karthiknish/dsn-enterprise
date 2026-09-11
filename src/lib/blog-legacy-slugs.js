/**
 * Old `/blog/<slug>` paths that must keep resolving.
 *
 * ## Why this list exists, and why it is hand-maintained
 *
 * A post's slug is stored on its Firestore document and its URL is derived from
 * it, so renaming a slug in the admin UI is free — and silently orphans the URL
 * Google has already indexed. Nothing in the stack notices: the post keeps
 * serving at its new address, the old one starts returning a hard 404, and the
 * signal accumulated against it is discarded with no redirect to carry it over.
 *
 * Live slugs therefore cannot be classified without a database read, and the
 * proxy is the wrong place for one (see `dynamic-route-guard.js`). A *legacy*
 * slug is a different thing: a fixed string known at build time, so mapping it
 * costs a path comparison and no I/O.
 *
 * ## Maintenance
 *
 * Add an entry whenever a published slug changes. The value is the post's
 * **current** slug — if it is renamed again, update the value in place rather
 * than appending a second entry, so every historical URL still resolves in one
 * hop. A stale value here redirects into a 404, which is worse than no redirect
 * at all, so this map is only correct as long as it is updated with the slug.
 *
 * @type {Map<string, string>}
 */
export const BLOG_LEGACY_SLUGS = new Map([
	// Comma dropped from the slug (fixed 2026-09-11). Search Console showed the
	// comma form still indexed — and 404ing — after the rename.
	[
		"snap-gauge-vs-ring-gauge-pick-by-the-form-error,-not-the-habit",
		"snap-gauge-vs-ring-gauge-pick-by-the-form-error-not-the-habit",
	],
]);

/**
 * The current slug for a retired one, or `null` if this is not a known legacy
 * path. A `Map` is used rather than an object literal so that inherited keys
 * (`__proto__`, `constructor`, `toString`) can never match a slug.
 *
 * @param {string} slug
 * @returns {string | null}
 */
export function getLegacyBlogSlug(slug) {
	return BLOG_LEGACY_SLUGS.get(slug) ?? null;
}
