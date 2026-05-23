export default function JsonLdScripts({ schemas }) {
	return schemas.map((schema) => (
		<script key={schema["@type"]} type="application/ld+json">
			{JSON.stringify(schema)}
		</script>
	));
}
