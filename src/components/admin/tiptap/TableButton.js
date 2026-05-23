"use client";

import { useEffect, useRef, useState } from "react";
import TableButtonDropdown from "./TableButtonDropdown";
import Tooltip from "./Tooltip";

export default function TableButton({ editor }) {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const buttonRef = useRef(null);
	const dropdownRef = useRef(null);

	const closeMenu = () => setIsOpen(false);

	const run = (command) => {
		command();
		closeMenu();
	};

	const insertTable = () =>
		run(() =>
			editor
				.chain()
				.focus()
				.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
				.run(),
		);

	const addColumnBefore = () =>
		run(() => editor.chain().focus().addColumnBefore().run());
	const addColumnAfter = () =>
		run(() => editor.chain().focus().addColumnAfter().run());
	const deleteColumn = () =>
		run(() => editor.chain().focus().deleteColumn().run());
	const addRowBefore = () =>
		run(() => editor.chain().focus().addRowBefore().run());
	const addRowAfter = () =>
		run(() => editor.chain().focus().addRowAfter().run());
	const deleteRow = () => run(() => editor.chain().focus().deleteRow().run());
	const deleteTable = () =>
		run(() => editor.chain().focus().deleteTable().run());
	const toggleHeaderColumn = () =>
		run(() => editor.chain().focus().toggleHeaderColumn().run());
	const toggleHeaderRow = () =>
		run(() => editor.chain().focus().toggleHeaderRow().run());

	const isInTable = editor.isActive("table");

	const toggleDropdown = () => {
		if (!isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			setPosition({
				top: rect.bottom + 4,
				left: rect.left,
			});
		}
		setIsOpen((open) => !open);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	if (!editor) return null;

	return (
		<div className="relative" ref={buttonRef}>
			<Tooltip content="Insert Table">
				<button
					type="button"
					aria-label="Insert table"
					onClick={toggleDropdown}
					className={`p-2 rounded text-gray-900 hover:bg-gray-200 ${
						isInTable ? "bg-accent-200" : ""
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
							d="M3 3h18v18H3V3zM3 9h18M3 15h18M9 3v18M15 3v18"
						/>
					</svg>
				</button>
			</Tooltip>

			{isOpen && (
				<TableButtonDropdown
					dropdownRef={dropdownRef}
					position={position}
					isInTable={isInTable}
					onInsertTable={insertTable}
					onAddColumnBefore={addColumnBefore}
					onAddColumnAfter={addColumnAfter}
					onDeleteColumn={deleteColumn}
					onAddRowBefore={addRowBefore}
					onAddRowAfter={addRowAfter}
					onDeleteRow={deleteRow}
					onToggleHeaderColumn={toggleHeaderColumn}
					onToggleHeaderRow={toggleHeaderRow}
					onDeleteTable={deleteTable}
				/>
			)}
		</div>
	);
}
