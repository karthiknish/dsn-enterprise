"use client";

import MenuBarAlign from "./MenuBarAlign";
import MenuBarHeadings from "./MenuBarHeadings";
import MenuBarInsert from "./MenuBarInsert";
import MenuBarListsBlocks from "./MenuBarListsBlocks";
import MenuBarMarks from "./MenuBarMarks";
import MenuBarSeparator from "./MenuBarSeparator";

export default function MenuBar({ editor, onLinkClick, onImageClick }) {
	if (!editor) {
		return null;
	}

	return (
		<div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50 overflow-visible relative">
			<MenuBarMarks editor={editor} />
			<MenuBarSeparator />
			<MenuBarHeadings editor={editor} />
			<MenuBarSeparator />
			<MenuBarAlign editor={editor} />
			<MenuBarListsBlocks editor={editor} />
			<MenuBarSeparator />
			<MenuBarInsert
				editor={editor}
				onLinkClick={onLinkClick}
				onImageClick={onImageClick}
			/>
		</div>
	);
}
