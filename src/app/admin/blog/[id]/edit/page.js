import EditBlogPostClient from "./EditBlogPostClient";

export default async function EditBlogPage({ params }) {
	const { id } = await params;
	return <EditBlogPostClient postId={id} />;
}
