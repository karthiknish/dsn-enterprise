"use client";

import { useState, useEffect, useCallback } from "react";
import { searchPhotos, getCuratedPhotos } from "@/lib/pexels";

export default function PexelsImagePicker({ onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Load curated photos on mount
  useEffect(() => {
    loadCuratedPhotos();
  }, []);

  const loadCuratedPhotos = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getCuratedPhotos(15, 1);
      setPhotos(result.photos || []);
      setHasMore(result.photos?.length === 15);
      setPage(1);
    } catch (err) {
      setError(err.message || "Failed to load photos");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query.trim()) {
      loadCuratedPhotos();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await searchPhotos(query.trim(), 15, 1);
      setPhotos(result.photos || []);
      setHasMore(result.photos?.length === 15);
      setPage(1);
    } catch (err) {
      setError(err.message || "Failed to search photos");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = query.trim()
        ? await searchPhotos(query.trim(), 15, nextPage)
        : await getCuratedPhotos(15, nextPage);

      setPhotos([...photos, ...(result.photos || [])]);
      setHasMore(result.photos?.length === 15);
      setPage(nextPage);
    } catch (err) {
      setError(err.message || "Failed to load more photos");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (photo) => {
    // Use the large2x size for good quality
    onSelect({
      url: photo.src.large2x,
      alt: photo.alt || query || "Blog image",
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      pexelsUrl: photo.url,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Select Image from Pexels
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
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

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images (e.g., technology, business, nature)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video bg-gray-100"
                  onClick={() => handleSelect(photo)}
                >
                  <img
                    src={photo.src.medium}
                    alt={photo.alt || "Pexels photo"}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Select
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">
                      📷 {photo.photographer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Load More */}
            {!loading && hasMore && photos.length > 0 && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && photos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <svg
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

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-3">
            <p className="text-xs text-gray-500 text-center">
              Photos provided by{" "}
              <a
                href="https://www.pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Pexels
              </a>
              . Free for commercial use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
