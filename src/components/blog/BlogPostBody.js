import parse from "html-react-parser";

/**
 * Renders trusted blog HTML from Firestore (admin-authored TipTap content).
 */
export default function BlogPostBody({ html }) {
	return (
		<div className="prose prose-lg max-w-none prose-headings:font-oswald prose-headings:text-gray-900 prose-a:text-accent prose-img:rounded-lg">
			{parse(html ?? "")}
		</div>
	);
}
