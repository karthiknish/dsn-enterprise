"use client";

import Tooltip from "./Tooltip";

const btnClass = (editor, activeCheck) =>
	`p-2 rounded text-gray-900 hover:bg-gray-200 ${
		activeCheck ? "bg-gray-300" : ""
	}`;

export default function MenuBarListsBlocks({ editor }) {
	return (
		<>
			<Tooltip content="Bullet List">
				<button
					aria-label="Bullet List"
					type="button"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={btnClass(editor, editor.isActive("bulletList"))}
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
							d="M4 6h16M4 12h16M4 18h16"
						/>
						<circle cx="2" cy="6" r="1" fill="currentColor" />
						<circle cx="2" cy="12" r="1" fill="currentColor" />
						<circle cx="2" cy="18" r="1" fill="currentColor" />
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Numbered List">
				<button
					aria-label="Numbered List"
					type="button"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={btnClass(editor, editor.isActive("orderedList"))}
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
							d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Blockquote">
				<button
					aria-label="Blockquote"
					type="button"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={btnClass(editor, editor.isActive("blockquote"))}
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
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Code Block">
				<button
					aria-label="Code Block"
					type="button"
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={btnClass(editor, editor.isActive("codeBlock"))}
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
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
						/>
					</svg>
				</button>
			</Tooltip>
		</>
	);
}
