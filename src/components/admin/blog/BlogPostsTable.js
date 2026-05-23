"use client";

import BlogPostTableRow from "./BlogPostTableRow";

export default function BlogPostsTable({
	posts,
	searchTerm,
	deleting,
	onDelete,
}) {
	return (
		<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Title
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Published Date
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
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
									className="px-6 py-12 text-center text-gray-500"
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
