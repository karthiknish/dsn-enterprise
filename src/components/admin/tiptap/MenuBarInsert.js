"use client";

import TableButton from "./TableButton";
import Tooltip from "./Tooltip";

export default function MenuBarInsert({ editor, onLinkClick, onImageClick }) {
	return (
		<>
			<Tooltip content="Add Link">
				<button
					aria-label="Add Link"
					type="button"
					onClick={onLinkClick}
					className={`p-2 rounded text-gray-900 hover:bg-gray-200 ${
						editor.isActive("link") ? "bg-gray-300" : ""
					}`}
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
							d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Add Image">
				<button
					aria-label="Add Image"
					type="button"
					onClick={onImageClick}
					className="p-2 rounded text-gray-900 hover:bg-gray-200"
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
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</button>
			</Tooltip>

			<TableButton editor={editor} />

			<Tooltip content="Horizontal Rule">
				<button
					aria-label="Horizontal Rule"
					type="button"
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					className="p-2 rounded text-gray-900 hover:bg-gray-200"
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
							d="M4 12h16"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Undo">
				<button
					aria-label="Undo"
					type="button"
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().undo()}
					className="p-2 rounded text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
							d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Redo">
				<button
					aria-label="Redo"
					type="button"
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().redo()}
					className="p-2 rounded text-gray-900 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
							d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
						/>
					</svg>
				</button>
			</Tooltip>
		</>
	);
}
