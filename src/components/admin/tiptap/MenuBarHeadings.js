"use client";

import Tooltip from "./Tooltip";

const headingBtn = (editor, level, label) =>
	`p-2 rounded text-gray-900 hover:bg-gray-200 font-bold ${
		editor.isActive("heading", { level }) ? "bg-gray-300" : ""
	}`;

export default function MenuBarHeadings({ editor }) {
	return (
		<>
			<Tooltip content="Heading 1">
				<button
					aria-label="Heading 1"
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={headingBtn(editor, 1, "H1")}
				>
					H1
				</button>
			</Tooltip>
			<Tooltip content="Heading 2">
				<button
					aria-label="Heading 2"
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={headingBtn(editor, 2, "H2")}
				>
					H2
				</button>
			</Tooltip>
			<Tooltip content="Heading 3">
				<button
					aria-label="Heading 3"
					type="button"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={headingBtn(editor, 3, "H3")}
				>
					H3
				</button>
			</Tooltip>
		</>
	);
}
