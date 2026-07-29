import { jsonLdProps } from "@/lib/seo-schema";

/**
 * Renders JSON-LD blocks.
 *
 * Uses jsonLdProps rather than `{JSON.stringify(schema)}` as a text child:
 * React escapes text children, so an `&` in a product or article title became
 * `&amp;` inside the JSON string value. The document still parsed, but the
 * machine-readable payload carried HTML entities into the one audience that
 * cannot decode them.
 */
export default function JsonLdScripts({ schemas }) {
	return schemas.map((schema, i) => (
		<script
			// @id is stable where present; fall back to type + index because a
			// page can legitimately carry two blocks of the same @type.
			key={schema["@id"] || `${schema["@type"]}-${i}`}
			{...jsonLdProps(schema)}
		/>
	));
}
