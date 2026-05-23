"use client";

import Tooltip from "./Tooltip";

const btnClass = (active) =>
	`p-2 rounded text-gray-900 hover:bg-gray-200 ${active ? "bg-gray-300" : ""}`;

export default function MenuBarMarks({ editor }) {
	return (
		<>
			<Tooltip content="Bold">
				<button
					aria-label="Bold"
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={btnClass(editor.isActive("bold"))}
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
							d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Italic">
				<button
					aria-label="Italic"
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={btnClass(editor.isActive("italic"))}
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
							d="M10 4h4M14 4l-4 16M10 20h4"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Underline">
				<button
					aria-label="Underline"
					type="button"
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={btnClass(editor.isActive("underline"))}
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
							d="M7 4v7a5 5 0 0010 0V4M5 20h14"
						/>
					</svg>
				</button>
			</Tooltip>

			<Tooltip content="Strikethrough">
				<button
					aria-label="Strikethrough"
					type="button"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={btnClass(editor.isActive("strike"))}
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
							d="M17.5 10H6.5M6 6h9.5a3.5 3.5 0 010 7M9.5 17.5H16a3 3 0 100-6"
						/>
					</svg>
				</button>
			</Tooltip>
		</>
	);
}
