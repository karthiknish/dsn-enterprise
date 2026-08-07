/**
 * Minimal sitemap XML serialisation.
 *
 * Next's built-in `sitemap.js` convention can only emit one urlset per route
 * and cannot emit a `<sitemapindex>` at all, so the split segments are served
 * from plain route handlers. Keeping the serialiser here means the segment
 * routes stay three lines each and the escaping rules live in one place.
 */

const XML_ESCAPES = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&apos;",
};

function escapeXml(value) {
	return String(value).replace(/[&<>"']/g, (char) => XML_ESCAPES[char]);
}

function toIso(value) {
	if (!value) return null;
	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function urlNode(entry) {
	const parts = [`    <loc>${escapeXml(entry.url)}</loc>`];

	const lastmod = toIso(entry.lastModified);
	if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);

	if (entry.changeFrequency) {
		parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
	}

	if (typeof entry.priority === "number") {
		parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
	}

	// hreflang alternates. Google discards a cluster whose links are not
	// reciprocal, so these are emitted exactly as the entry declares them.
	const languages = entry.alternates?.languages || {};
	for (const [hreflang, href] of Object.entries(languages)) {
		parts.push(
			`    <xhtml:link rel="alternate" hreflang="${escapeXml(
				hreflang,
			)}" href="${escapeXml(href)}" />`,
		);
	}

	return `  <url>\n${parts.join("\n")}\n  </url>`;
}

/** Serialise sitemap entries into a `<urlset>` document. */
export function renderUrlset(entries) {
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...entries.map(urlNode),
		"</urlset>",
		"",
	].join("\n");
}

/** Serialise child sitemaps into a `<sitemapindex>` document. */
export function renderSitemapIndex(sitemaps) {
	const node = (sitemap) => {
		const lastmod = toIso(sitemap.lastModified);
		return [
			"  <sitemap>",
			`    <loc>${escapeXml(sitemap.url)}</loc>`,
			...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
			"  </sitemap>",
		].join("\n");
	};

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...sitemaps.map(node),
		"</sitemapindex>",
		"",
	].join("\n");
}

/** Standard response wrapper for every sitemap route. */
export function xmlResponse(body, { maxAge = 3600 } = {}) {
	return new Response(body, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": `public, max-age=0, s-maxage=${maxAge}, stale-while-revalidate=86400`,
		},
	});
}
