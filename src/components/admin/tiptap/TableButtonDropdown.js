"use client";

function MenuAction({ label, onClick, iconPath, destructive = false }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 ${
				destructive
					? "text-red-600 hover:bg-red-50"
					: "text-gray-700 hover:bg-gray-100"
			}`}
		>
			<svg
				aria-hidden="true"
				className="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d={iconPath}
				/>
			</svg>
			{label}
		</button>
	);
}

export default function TableButtonDropdown({
	dropdownRef,
	position,
	isInTable,
	onInsertTable,
	onAddColumnBefore,
	onAddColumnAfter,
	onDeleteColumn,
	onAddRowBefore,
	onAddRowAfter,
	onDeleteRow,
	onToggleHeaderColumn,
	onToggleHeaderRow,
	onDeleteTable,
}) {
	return (
		<div
			ref={dropdownRef}
			className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-[99999] min-w-[180px]"
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
			}}
		>
			<div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
				Table Actions
			</div>

			{!isInTable ? (
				<MenuAction
					label="Insert Table"
					onClick={onInsertTable}
					iconPath="M12 4v16m8-8H4"
				/>
			) : (
				<>
					<MenuAction
						label="Add Column Before"
						onClick={onAddColumnBefore}
						iconPath="M11 19l-7-7 7-7m8 14l-7-7 7-7"
					/>
					<MenuAction
						label="Add Column After"
						onClick={onAddColumnAfter}
						iconPath="M13 5l7 7-7 7M5 5l7 7-7 7"
					/>
					<MenuAction
						label="Delete Column"
						onClick={onDeleteColumn}
						iconPath="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
					<div className="border-t border-gray-100 my-1" />
					<MenuAction
						label="Add Row Before"
						onClick={onAddRowBefore}
						iconPath="M5 15l7-7 7 7"
					/>
					<MenuAction
						label="Add Row After"
						onClick={onAddRowAfter}
						iconPath="M19 9l-7 7-7-7"
					/>
					<MenuAction
						label="Delete Row"
						onClick={onDeleteRow}
						iconPath="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
					<div className="border-t border-gray-100 my-1" />
					<MenuAction
						label="Toggle Header Column"
						onClick={onToggleHeaderColumn}
						iconPath="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"
					/>
					<MenuAction
						label="Toggle Header Row"
						onClick={onToggleHeaderRow}
						iconPath="M4 6h16M4 12h16M4 18h16"
					/>
					<div className="border-t border-gray-100 my-1" />
					<MenuAction
						label="Delete Table"
						onClick={onDeleteTable}
						destructive
						iconPath="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</>
			)}
		</div>
	);
}
