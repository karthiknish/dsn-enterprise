"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogPostTableRow({ post, deleting, onDelete }) {
	const publishedAt =
		post.publishedDate?.toDate?.() || post.createdAt?.toDate?.();
	const formattedDate = publishedAt
		? publishedAt.toLocaleDateString(undefined, {
				year: "numeric",
				month: "short",
				day: "numeric",
			})
		: "No date";

	return (
		<tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
			<td className="py-3.5 px-4 whitespace-nowrap">
				<div className="flex items-center">
					{post.featuredImage ? (
						<Image
							src={post.featuredImage}
							alt=""
							width={40}
							height={40}
							unoptimized
							className="w-10 h-10 rounded-lg object-cover mr-3 border border-gray-200"
						/>
					) : (
						<div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3 border border-gray-200">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
					)}
					<div>
						<div className="text-sm font-medium text-gray-900">{post.title}</div>
						<div className="text-xs text-gray-500 font-mono">/{post.slug}</div>
					</div>
				</div>
			</td>
			<td className="py-3.5 px-4 whitespace-nowrap">
				<span
					className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
						post.status === "published"
							? "bg-success-50 text-success-700"
							: "bg-gray-100 text-gray-600"
					}`}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full ${
							post.status === "published" ? "bg-success-500" : "bg-gray-400"
						}`}
					/>
					{post.status.charAt(0).toUpperCase() + post.status.slice(1)}
				</span>
			</td>
			<td className="py-3.5 px-4 whitespace-nowrap text-sm text-gray-500">
				{formattedDate}
			</td>
			<td className="py-3.5 px-4 whitespace-nowrap text-right text-sm font-medium">
				<div className="flex items-center justify-end gap-1">
					<Link
						href={`/blog/${post.slug}`}
						target="_blank"
						className="text-gray-400 hover:text-accent hover:bg-gray-100 rounded-md p-1.5 transition-colors"
						title="View Live"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					</Link>
					<Link
						href={`/admin/blog/${post.id}/edit`}
						className="text-gray-400 hover:text-accent hover:bg-gray-100 rounded-md p-1.5 transition-colors"
						title="Edit"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</Link>
					<button
						type="button"
						onClick={() => onDelete(post.id, post.title)}
						disabled={deleting === post.id}
						className="text-gray-400 hover:text-red-600 hover:bg-gray-100 disabled:opacity-50 rounded-md p-1.5 transition-colors"
						title="Delete"
						aria-label={`Delete ${post.title}`}
					>
						{deleting === post.id ? (
							<svg
								aria-hidden="true"
								className="w-5 h-5 animate-spin"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						) : (
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						)}
					</button>
				</div>
			</td>
		</tr>
	);
}
