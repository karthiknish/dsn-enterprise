export default function JsonLdScripts({ schemas }) {
	return schemas.map((schema) => (
		<script
			key={schema["@type"]}
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires serialized schema markup
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	));
}
