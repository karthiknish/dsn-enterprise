import parse from "html-react-parser";

export default function BlogPostBody({ html }) {
	const sanitized = (html ?? "")
		.replace(/<h1/gi, "<h2")
		.replace(/<\/h1>/gi, "</h2>");

	return <div className="prose max-w-none">{parse(sanitized)}</div>;
}
