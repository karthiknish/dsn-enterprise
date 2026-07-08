"use client";

import Image from "next/image";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { getUnsplashPhotos, searchUnsplashPhotos } from "@/lib/unsplash";
import {
	initialUnsplashPickerState,
	unsplashPickerReducer,
} from "@/lib/unsplash-picker-reducer";

export default function UnsplashImagePicker({ onSelect, onClose }) {
	const [state, dispatch] = useReducer(
		unsplashPickerReducer,
		initialUnsplashPickerState,
	);
	const pageRef = useRef(1);

	const loadLatestPhotos = useCallback(async () => {
		dispatch({ type: "LOAD_START" });
		try {
			const result = await getUnsplashPhotos(15, 1);
			const photos = result.photos || [];
			dispatch({
				type: "LOAD_SUCCESS",
				photos,
				hasMore: photos.length === 15,
			});
			pageRef.current = 1;
		} catch (err) {
			dispatch({
				type: "LOAD_ERROR",
				error: err.message || "Failed to load photos",
			});
		}
	}, []);

	useEffect(() => {
		loadLatestPhotos();
	}, [loadLatestPhotos]);

	const handleSearch = async () => {
		if (!state.query.trim()) {
			loadLatestPhotos();
			return;
		}

		dispatch({ type: "LOAD_START" });
		try {
			const result = await searchUnsplashPhotos(state.query.trim(), 15, 1);
			const photos = result.photos || [];
			dispatch({
				type: "LOAD_SUCCESS",
				photos,
				hasMore: photos.length === 15,
			});
			pageRef.current = 1;
		} catch (err) {
			dispatch({
				type: "LOAD_ERROR",
				error: err.message || "Failed to search photos",
			});
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			e.stopPropagation();
			handleSearch();
		}
	};

	const loadMore = async () => {
		if (state.loading || !state.hasMore) return;

		dispatch({ type: "LOAD_START" });
		try {
			const nextPage = pageRef.current + 1;
			const result = state.query.trim()
				? await searchUnsplashPhotos(state.query.trim(), 15, nextPage)
				: await getUnsplashPhotos(15, nextPage);

			const existingIds = new Set(state.photos.map((p) => p.id));
			const newPhotos = (result.photos || []).filter(
				(p) => !existingIds.has(p.id),
			);

			dispatch({
				type: "APPEND_PHOTOS",
				photos: newPhotos,
				hasMore: (result.photos?.length || 0) > 0,
			});
			pageRef.current = nextPage;
		} catch (err) {
			dispatch({
				type: "LOAD_ERROR",
				error: err.message || "Failed to load more photos",
			});
		}
	};

	const handleSelect = (photo) => {
		onSelect({
			url: photo.urls?.regular,
			alt:
				photo.alt_description ||
				photo.description ||
				state.query ||
				"Blog image",
			photographer: photo.user?.name,
			photographerUrl: photo.user?.links?.html,
			unsplashUrl: photo.links?.html,
		});
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
				<button
					type="button"
					className="fixed inset-0 bg-gray-950 bg-opacity-50 transition-opacity cursor-default"
					onClick={onClose}
					aria-label="Close image picker"
				/>

				<div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
					<div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold text-gray-900">
								Select Image from Unsplash
							</h2>
							<button
								type="button"
								onClick={onClose}
								className="text-gray-400 hover:text-gray-600"
								aria-label="Close"
							>
								<svg
									aria-hidden="true"
									className="w-6 h-6"
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

						<div className="flex gap-2">
							<label
								id="unsplash-search-label"
								htmlFor="unsplash-search"
								className="sr-only"
							>
								Search stock images
							</label>
							<input
								id="unsplash-search"
								aria-labelledby="unsplash-search-label"
								type="text"
								value={state.query}
								onChange={(e) =>
									dispatch({ type: "SET_QUERY", query: e.target.value })
								}
								placeholder="Search for images (e.g., technology, business, nature)"
								onKeyDown={handleKeyDown}
								className="flex-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
							/>
							<button
								type="button"
								onClick={handleSearch}
								disabled={state.loading}
								className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
							>
								Search
							</button>
						</div>
					</div>

					<div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
						{state.error && (
							<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
								{state.error}
							</div>
						)}

						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{state.photos.map((photo) => (
								<button
									type="button"
									key={photo.id}
									className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video bg-gray-100 w-full text-left"
									onClick={() => handleSelect(photo)}
								>
									<Image
										src={photo.urls?.small}
										alt={photo.alt_description || "Unsplash photo"}
										fill
										unoptimized
										sizes="(min-width: 768px) 33vw, 50vw"
										className="object-cover transition-transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gray-950 bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
										<span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
											Select
										</span>
									</div>
									<div className="absolute bottom-0 left-0 right-0 bg-gray-950/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<p className="text-white text-xs truncate">
											📷 {photo.user?.name}
										</p>
									</div>
								</button>
							))}
						</div>

						{state.loading && (
							<div className="flex items-center justify-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
							</div>
						)}

						{!state.loading && state.hasMore && state.photos.length > 0 && (
							<div className="text-center mt-6">
								<button
									type="button"
									onClick={loadMore}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
								>
									Load More
								</button>
							</div>
						)}

						{!state.loading && state.photos.length === 0 && (
							<div className="text-center py-12 text-gray-500">
								<svg
									aria-hidden="true"
									className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
								<p>No photos found. Try a different search term.</p>
							</div>
						)}
					</div>

					<div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-3">
						<p className="text-xs text-gray-500 text-center">
							Photos provided by{" "}
							<a
								href="https://unsplash.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								Unsplash
							</a>
							. Free for commercial use.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
