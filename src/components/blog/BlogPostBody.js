import parse from "html-react-parser";
import { linkProductMentions } from "@/lib/product-mention-links";

export default function BlogPostBody({ html }) {
	// Product links are added at render rather than written into Firestore, so
	// an admin save cannot drop them and a new post gets them without a script.
	// See src/lib/product-mention-links.js.
	const sanitized = linkProductMentions(
		(html ?? "").replace(/<h1/gi, "<h2").replace(/<\/h1>/gi, "</h2>"),
	);

	return <div className="prose max-w-none">{parse(sanitized)}</div>;
}
