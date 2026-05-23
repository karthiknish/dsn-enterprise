"use client";

import Image from "next/image";
import { useReducer, useRef } from "react";
import {
	imageDialogReducer,
	initialImageDialogState,
} from "@/lib/image-dialog-reducer";

export default function ImageDialog({ isOpen, onClose, onConfirm }) {
	const [state, dispatch] = useReducer(imageDialogReducer, initialImageDialogState);
	const dragCounter = useRef(0);
	const fileInputRef = useRef(null);

	const processFile = (file) => {
		if (file?.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result;
				if (result && typeof result === "string") {
					dispatch({
						type: "SET_FILE_PREVIEW",
						url: result,
						preview: result,
						fileName: file.name,
					});
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragEnter = (e) => {
		e.preventDefault();
		dragCounter.current++;
		if (dragCounter.current === 1) {
			dispatch({ type: "SET_DRAGGING", isDragging: true });
		}
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		dragCounter.current--;
		if (dragCounter.current === 0) {
			dispatch({ type: "SET_DRAGGING", isDragging: false });
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		dragCounter.current = 0;
		dispatch({ type: "SET_DRAGGING", isDragging: false });

		const files = Array.from(e.dataTransfer.files).filter((file) =>
			file.type.startsWith("image/"),
		);

		if (files.length > 0) {
			processFile(files[0]);
		}
	};

	const handleFileSelect = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			processFile(file);
		}
	};

	const handleConfirm = () => {
		onConfirm(state.url, state.alt || state.fileName);
		onClose();
	};

	const clearFile = () => {
		dispatch({ type: "CLEAR_FILE" });
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[99999] flex items-center justify-center bg-gray-950 bg-opacity-50">
			<div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 animate-fadeIn">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold text-gray-900">Insert Image</h3>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close dialog"
						className="text-gray-400 hover:text-gray-600"
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* biome-ignore lint/a11y/noStaticElementInteractions: drag-and-drop zone requires drag event handlers */}
				<div
					className={`relative border-2 border-dashed rounded-lg transition-colors ${
						state.isDragging
							? "border-accent bg-accent-50"
							: "border-gray-300 hover:border-gray-400"
					}`}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						aria-label="Upload image file"
						className="hidden"
					/>

					{state.preview ? (
						<div className="p-6 text-center space-y-3">
							<Image
								src={state.preview}
								alt="Preview"
								width={320}
								height={160}
								unoptimized
								className="max-h-40 mx-auto rounded-lg object-contain"
							/>
							<p className="text-sm text-gray-600 truncate">{state.fileName}</p>
							<button
								type="button"
								onClick={clearFile}
								className="text-red-500 hover:text-red-700 text-sm font-medium"
							>
								Remove image
							</button>
						</div>
					) : (
						<button
							type="button"
							className="w-full p-6 text-center cursor-pointer"
							onClick={() => fileInputRef.current?.click()}
						>
							<svg
								aria-hidden="true"
								className="w-12 h-12 mx-auto text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<p className="text-gray-700 font-medium mt-2">
								{state.isDragging ? "Drop image here" : "Drag & drop an image"}
							</p>
							<p className="text-gray-500 text-sm">or click to browse</p>
							<p className="text-gray-400 text-xs">
								Supports JPG, PNG, GIF, WebP
							</p>
						</button>
					)}
				</div>

				<div className="mt-4">
					<label
						id="image-url-label"
						htmlFor="image-url"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Or paste Image URL
					</label>
					<input
						id="image-url"
						aria-labelledby="image-url-label"
						type="url"
						value={state.url}
						onChange={(e) =>
							dispatch({ type: "SET_URL", url: e.target.value })
						}
						placeholder="https://example.com/image.jpg"
						className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
					/>
				</div>

				<div className="mt-4">
					<label
						id="image-alt-label"
						htmlFor="image-alt"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Alt Text
					</label>
					<input
						id="image-alt"
						aria-labelledby="image-alt-label"
						type="text"
						value={state.alt}
						onChange={(e) =>
							dispatch({ type: "SET_ALT", alt: e.target.value })
						}
						placeholder="Image description"
						className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
					/>
				</div>

				<div className="flex gap-3 mt-6">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={!state.url}
						className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Insert Image
					</button>
				</div>
			</div>
		</div>
	);
}
