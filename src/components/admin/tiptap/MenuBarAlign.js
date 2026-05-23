"use client";

import Tooltip from "./Tooltip";

const btnClass = (editor, activeCheck) =>
	`p-2 rounded text-gray-900 hover:bg-gray-200 ${
		activeCheck ? "bg-gray-300" : ""
	}`;

export default function MenuBarAlign({ editor }) {
	return (
		<>
			<Tooltip content="Align Left">
				<button
					aria-label="Align Left"
					type="button"
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					className={btnClass(editor, editor.isActive({ textAlign: "left" }))}
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
							d="M4 6h16M4 12h10M4 18h14"
						/>
					</svg>
				</button>
			</Tooltip>
			<Tooltip content="Align Center">
				<button
					aria-label="Align Center"
					type="button"
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					className={btnClass(
						editor,
						editor.isActive({ textAlign: "center" }),
					)}
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
							d="M4 6h16M7 12h10M5 18h14"
						/>
					</svg>
				</button>
			</Tooltip>
			<Tooltip content="Align Right">
				<button
					aria-label="Align Right"
					type="button"
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					className={btnClass(editor, editor.isActive({ textAlign: "right" }))}
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
							d="M4 6h16M10 12h10M6 18h14"
						/>
					</svg>
				</button>
			</Tooltip>
		</>
	);
}
