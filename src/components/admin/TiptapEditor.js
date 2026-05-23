"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useReducer, useRef } from "react";
import {
	initialTiptapEditorUiState,
	tiptapEditorUiReducer,
} from "@/lib/tiptap-editor-ui-reducer";
import { EditorStyles } from "./tiptap/EditorStyles";
import ImageDialog from "./tiptap/ImageDialog";
import LinkDialog from "./tiptap/LinkDialog";
import MenuBar from "./tiptap/MenuBar";
import { createEditorProps, createExtensions } from "./tiptap/useEditorConfig";

export default function TiptapEditor({
	content,
	onChange,
	placeholder = "Start writing...",
	editorKey = 0,
}) {
	const isExternalUpdate = useRef(false);
	const editorRef = useRef(null);
	const dragCounter = useRef(0);
	const [ui, dispatch] = useReducer(
		tiptapEditorUiReducer,
		initialTiptapEditorUiState,
	);

	const editor = useEditor(
		{
			immediatelyRender: false,
			extensions: createExtensions(placeholder),
			content,
			onUpdate: ({ editor: activeEditor }) => {
				if (!isExternalUpdate.current) {
					onChange(activeEditor.getHTML());
				}
			},
			editorProps: {
				attributes: {
					class: "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4",
				},
				...createEditorProps(isExternalUpdate, onChange),
			},
		},
		[editorKey],
	);

	const handleLinkClick = () => {
		if (!editor) return;
		dispatch({
			type: "OPEN_LINK_DIALOG",
			linkUrl: editor.getAttributes("link").href || "",
		});
	};

	const handleImageClick = () => {
		dispatch({ type: "OPEN_IMAGE_DIALOG" });
	};

	const handleConfirmLink = (url, text) => {
		if (url) {
			if (text) {
				editor
					.chain()
					.focus()
					.extendMarkRange("link")
					.insertContent(text)
					.setLink({ href: url })
					.run();
			} else {
				editor.chain().focus().setLink({ href: url }).run();
			}
		}
	};

	const handleConfirmImage = (url, alt) => {
		if (url) {
			editor
				.chain()
				.focus()
				.setImage({ src: url, alt: alt || "" })
				.run();
		}
	};

	return (
		<div>
			<EditorStyles />
			<section
				key={editorKey}
				aria-label="Rich text editor"
				className={`border border-gray-300 rounded-lg bg-white overflow-visible relative transition-colors ${
					ui.isDragging ? "border-accent ring-2 ring-accent-200" : ""
				}`}
				onDragEnter={(e) => {
					e.preventDefault();
					dragCounter.current++;
					if (dragCounter.current === 1) {
						dispatch({ type: "SET_DRAGGING", isDragging: true });
					}
				}}
				onDragLeave={(e) => {
					e.preventDefault();
					dragCounter.current--;
					if (dragCounter.current === 0) {
						dispatch({ type: "SET_DRAGGING", isDragging: false });
					}
				}}
				onDragOver={(e) => {
					e.preventDefault();
				}}
				onDrop={(e) => {
					e.preventDefault();
					dragCounter.current = 0;
					dispatch({ type: "SET_DRAGGING", isDragging: false });
				}}
			>
				<MenuBar
					editor={editor}
					onLinkClick={handleLinkClick}
					onImageClick={handleImageClick}
				/>
				<div className="overflow-hidden rounded-b-lg">
					<EditorContent editor={editor} ref={editorRef} />
				</div>

				{ui.isDragging && (
					<div className="absolute inset-0 bg-accent-50/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center pointer-events-none z-10 border-2 border-dashed border-accent-400">
						<svg
							aria-hidden="true"
							className="w-16 h-16 text-accent mb-4"
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
						<p className="text-accent-700 font-semibold text-lg">
							Drop images here
						</p>
						<p className="text-accent text-sm mt-1">
							Supports JPG, PNG, GIF, WebP
						</p>
					</div>
				)}
			</section>

			<LinkDialog
				key={ui.linkDialogKey}
				isOpen={ui.showLinkDialog}
				onClose={() => dispatch({ type: "CLOSE_LINK_DIALOG" })}
				onConfirm={handleConfirmLink}
				initialUrl={ui.linkUrl}
			/>

			<ImageDialog
				key={ui.imageDialogKey}
				isOpen={ui.showImageDialog}
				onClose={() => dispatch({ type: "CLOSE_IMAGE_DIALOG" })}
				onConfirm={handleConfirmImage}
			/>
		</div>
	);
}
