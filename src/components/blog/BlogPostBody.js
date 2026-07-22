import parse from "html-react-parser";

export default function BlogPostBody({ html }) {
	const sanitized = (html ?? "").replace(/<h1/gi, "<h2").replace(/<\/h1>/gi, "</h2>");

	return (
		<div className="prose prose-lg max-w-none prose-headings:font-oswald prose-headings:text-gray-900 prose-a:text-accent prose-img:rounded-lg">
			{parse(sanitized)}
		</div>
	);
}
