"use client";

import BlogPostTableRow from "./BlogPostTableRow";

export default function BlogPostsTable({
	posts,
	searchTerm,
	deleting,
	onDelete,
}) {
	return (
		<div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							<th className="py-3.5 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
								Title
							</th>
							<th className="py-3.5 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
								Status
							</th>
							<th className="py-3.5 px-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
								Published Date
							</th>
							<th className="py-3.5 px-4 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{posts.length > 0 ? (
							posts.map((post) => (
								<BlogPostTableRow
									key={post.id}
									post={post}
									deleting={deleting}
									onDelete={onDelete}
								/>
							))
						) : (
							<tr>
								<td
									colSpan="4"
									className="py-12 px-4 text-center text-gray-500"
								>
									No posts found matching &ldquo;{searchTerm}&rdquo;
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
