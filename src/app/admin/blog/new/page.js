"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dynamic from "next/dynamic";

// Dynamically import TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import("@/components/admin/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
    </div>
  ),
});

// Dynamically import PexelsImagePicker
const PexelsImagePicker = dynamic(
  () => import("@/components/admin/PexelsImagePicker"),
  { ssr: false }
);

// Dynamically import AIBlogGenerator
const AIBlogGenerator = dynamic(
  () => import("@/components/admin/AIBlogGenerator"),
  { ssr: false }
);

const STORAGE_KEY = "blog-draft-new";

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPexelsPicker, setShowPexelsPicker] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [imageTab, setImageTab] = useState("upload"); // 'upload', 'pexels', 'url'
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const [generatingExcerpt, setGeneratingExcerpt] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [savedDraft, setSavedDraft] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    imageAttribution: null,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    publishedDate: "",
  });

  // Check for saved draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.title || parsed.content) {
          setSavedDraft(parsed);
          setShowRestoreDialog(true);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Auto-save to localStorage
  const saveToLocalStorage = useCallback(() => {
    if (formData.title || formData.content || formData.excerpt) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...formData,
        savedAt: new Date().toISOString()
      }));
    }
  }, [formData]);

  // Debounced auto-save
  useEffect(() => {
    const timeoutId = setTimeout(saveToLocalStorage, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData, saveToLocalStorage]);

  const restoreDraft = () => {
    if (savedDraft) {
      setFormData(savedDraft);
      setShowRestoreDialog(false);
      showNotification("Draft restored successfully", "success");
    }
  };

  const discardDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setShowRestoreDialog(false);
    setSavedDraft(null);
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  // Auto-fill SEO fields based on title and content
  useEffect(() => {
    // Auto-fill meta title if empty and title exists
    if (formData.title && !formData.metaTitle) {
      // Truncate to 60 chars for SEO
      const metaTitle = formData.title.length > 60 
        ? formData.title.substring(0, 57) + '...'
        : formData.title;
      setFormData(prev => ({ ...prev, metaTitle }));
    }
  }, [formData.title]);

  useEffect(() => {
    // Auto-fill meta description from excerpt or content
    if (!formData.metaDescription) {
      let description = '';
      
      if (formData.excerpt) {
        description = formData.excerpt;
      } else if (formData.content) {
        // Strip HTML tags and get plain text
        const plainText = formData.content
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        description = plainText;
      }
      
      if (description) {
        // Truncate to 160 chars for SEO
        const metaDescription = description.length > 160 
          ? description.substring(0, 157) + '...'
          : description;
        setFormData(prev => ({ ...prev, metaDescription }));
      }
    }
  }, [formData.excerpt, formData.content]);

  // Convert markdown to HTML for TipTap
  const markdownToHtml = (markdown) => {
    if (!markdown) return "";
    
    // Split into lines for better processing
    const lines = markdown.split('\n');
    let html = '';
    let inList = false;
    let listType = null;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Headers (process in order from h6 to h1)
      if (line.match(/^###### /)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<h6>${line.replace(/^###### /, '')}</h6>`;
        continue;
      }
      if (line.match(/^##### /)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<h5>${line.replace(/^##### /, '')}</h5>`;
        continue;
      }
      if (line.match(/^#### /)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<h4>${line.replace(/^#### /, '')}</h4>`;
        continue;
      }
      if (line.match(/^### /)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<h3>${line.replace(/^### /, '')}</h3>`;
        continue;
      }
      if (line.match(/^## /)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<h2>${line.replace(/^## /, '')}</h2>`;
        continue;
      }
      if (line.match(/^# /)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<h1>${line.replace(/^# /, '')}</h1>`;
        continue;
      }
      
      // Horizontal rule
      if (line.match(/^---+$/)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += '<hr>';
        continue;
      }
      
      // Blockquote
      if (line.match(/^>\s*/)) {
        if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
        html += `<blockquote><p>${line.replace(/^>\s*/, '')}</p></blockquote>`;
        continue;
      }
      
      // Unordered list
      if (line.match(/^\s*[-*+]\s+/)) {
        const content = line.replace(/^\s*[-*+]\s+/, '');
        if (!inList || listType !== 'ul') {
          if (inList) html += '</ol>';
          html += '<ul>';
          inList = true;
          listType = 'ul';
        }
        html += `<li>${processInlineMarkdown(content)}</li>`;
        continue;
      }
      
      // Ordered list
      if (line.match(/^\s*\d+\.\s+/)) {
        const content = line.replace(/^\s*\d+\.\s+/, '');
        if (!inList || listType !== 'ol') {
          if (inList) html += '</ul>';
          html += '<ol>';
          inList = true;
          listType = 'ol';
        }
        html += `<li>${processInlineMarkdown(content)}</li>`;
        continue;
      }
      
      // Empty line - close list and add paragraph break
      if (line.trim() === '') {
        if (inList) {
          html += listType === 'ul' ? '</ul>' : '</ol>';
          inList = false;
          listType = null;
        }
        continue;
      }
      
      // Regular paragraph
      if (inList) {
        html += listType === 'ul' ? '</ul>' : '</ol>';
        inList = false;
        listType = null;
      }
      html += `<p>${processInlineMarkdown(line)}</p>`;
    }
    
    // Close any open list
    if (inList) {
      html += listType === 'ul' ? '</ul>' : '</ol>';
    }
    
    return html;
  };
  
  // Process inline markdown (bold, italic, links, code)
  const processInlineMarkdown = (text) => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
  };

  const handleGenerateTitles = async () => {
    const topic = formData.title || "precision gauges industrial metrology";
    setGeneratingTitle(true);
    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'title', topic }),
      });
      const data = await response.json();
      if (data.success && data.titles) {
        setTitleSuggestions(data.titles);
        setShowTitleSuggestions(true);
      }
    } catch (error) {
      console.error('Error generating titles:', error);
    } finally {
      setGeneratingTitle(false);
    }
  };

  const handleSelectTitle = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
    setShowTitleSuggestions(false);
  };

  const handleGenerateExcerpt = async () => {
    if (!formData.title) {
      showNotification('Please enter a title first', 'error');
      return;
    }
    setGeneratingExcerpt(true);
    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'excerpt', 
          topic: formData.title,
          content: formData.content 
        }),
      });
      const data = await response.json();
      if (data.success && data.excerpt) {
        setFormData({ ...formData, excerpt: data.excerpt });
      }
    } catch (error) {
      console.error('Error generating excerpt:', error);
    } finally {
      setGeneratingExcerpt(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData({ ...formData, featuredImage: downloadURL });
      showNotification("Image uploaded successfully", "success");
    } catch (error) {
      console.error("Error uploading image:", error);
      showNotification("Failed to upload image. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showNotification("Please enter a title", "error");
      return;
    }

    if (!formData.content.trim()) {
      showNotification("Please add some content", "error");
      return;
    }

    setSaving(true);
    try {
      const docData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        featuredImage: formData.featuredImage,
        imageAttribution: formData.imageAttribution,
        status: formData.status,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (formData.publishedDate) {
        docData.publishedDate = Timestamp.fromDate(new Date(formData.publishedDate));
      }

      await addDoc(collection(db, "blogs"), docData);
      // Clear the draft from localStorage on successful save
      localStorage.removeItem(STORAGE_KEY);
      showNotification("Post created successfully!", "success");
      setTimeout(() => router.push("/admin/blog"), 1000);
    } catch (error) {
      console.error("Error creating post:", error);
      showNotification(`Failed to create post: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAIContentGenerated = (content) => {
    // Convert markdown to HTML for TipTap
    const htmlContent = markdownToHtml(content);
    setFormData({ ...formData, content: htmlContent });
  };

  const handleAIMetadataGenerated = (metadata) => {
    setFormData({
      ...formData,
      metaTitle: metadata.metaTitle || formData.title,
      metaDescription: metadata.metaDescription || formData.excerpt,
      excerpt: metadata.excerpt || formData.excerpt,
      slug: metadata.suggestedSlug || formData.slug,
      keywords: metadata.keywords || [],
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn ${
          notification.type === 'error' 
            ? 'bg-red-50 border border-red-200 text-red-800' 
            : notification.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-gray-50 border border-gray-200 text-gray-800'
        }`}>
          {notification.type === 'error' && (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {notification.type === 'success' && (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Restore Draft Dialog */}
      {showRestoreDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Restore Draft?</h3>
            </div>
            <p className="text-gray-600 mb-2">
              You have an unsaved draft from a previous session.
            </p>
            {savedDraft && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="font-medium text-gray-900 truncate">{savedDraft.title || "Untitled"}</p>
                <p className="text-sm text-gray-500">
                  Saved {savedDraft.savedAt ? new Date(savedDraft.savedAt).toLocaleString() : "recently"}
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={discardDraft}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Discard
              </button>
              <button
                onClick={restoreDraft}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600">Write and publish a new blog post</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAIGenerator(!showAIGenerator)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm ${
            showAIGenerator
              ? "bg-purple-100 text-purple-700 border border-purple-300"
              : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {showAIGenerator ? "Hide AI Assistant" : "AI Assistant"}
        </button>
      </div>

      {showAIGenerator && (
        <div className="mb-8 animate-fadeIn">
          <AIBlogGenerator
            onContentGenerated={handleAIContentGenerated}
            onMetadataGenerated={handleAIMetadataGenerated}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateTitles}
                      disabled={generatingTitle}
                      className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 disabled:opacity-50"
                    >
                      {generatingTitle ? (
                        <>
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          AI Suggest Titles
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                      placeholder="Enter post title"
                    />
                    {showTitleSuggestions && titleSuggestions.length > 0 && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="p-2 border-b border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">AI Suggested Titles</span>
                          <button
                            type="button"
                            onClick={() => setShowTitleSuggestions(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <ul className="max-h-48 overflow-y-auto">
                          {titleSuggestions.map((title, index) => (
                            <li key={index}>
                              <button
                                type="button"
                                onClick={() => handleSelectTitle(title)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                              >
                                {title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 text-sm mr-2 bg-gray-50 px-2 py-2 border border-gray-300 rounded-l-lg border-r-0">
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="flex-1 px-4 py-2 text-gray-900 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                      placeholder="post-url-slug"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Excerpt
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateExcerpt}
                      disabled={generatingExcerpt || !formData.title}
                      className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 disabled:opacity-50"
                    >
                      {generatingExcerpt ? (
                        <>
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          AI Generate
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                    placeholder="Brief description of the post for SEO and previews"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="prose-editor">
                <TiptapEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your blog post content here..."
                />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, metaTitle: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                    placeholder="SEO title (auto-filled from title)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended length: 50-60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, metaDescription: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                    placeholder="SEO description (auto-filled from content)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended length: 150-160 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Box - Sticky */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6 z-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Publish</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishedDate}
                    onChange={(e) =>
                      setFormData({ ...formData, publishedDate: e.target.value })
                    }
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium shadow-sm"
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving
                      </span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Featured Image
              </h3>
              
              {formData.featuredImage ? (
                <div className="space-y-4">
                  <div className="relative group">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
                  </div>
                  
                  {formData.imageAttribution && (
                    <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                      📷 Photo by{" "}
                      <a
                        href={formData.imageAttribution.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {formData.imageAttribution.photographer}
                      </a>{" "}
                      on{" "}
                      <a
                        href={formData.imageAttribution.pexelsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        Pexels
                      </a>
                    </p>
                  )}
                  
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        featuredImage: "",
                        imageAttribution: null,
                      })
                    }
                    className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Image Source Tabs */}
                  <div className="flex border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => setImageTab("upload")}
                      className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                        imageTab === "upload"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab("pexels")}
                      className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                        imageTab === "pexels"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Pexels
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab("url")}
                      className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                        imageTab === "url"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      URL
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="pt-2">
                    {imageTab === "upload" && (
                      <label className="block group cursor-pointer">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center group-hover:border-green-500 group-hover:bg-green-50 transition-all">
                          {uploading ? (
                            <div className="flex flex-col items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mb-2"></div>
                              <span className="text-sm text-gray-500">Uploading...</span>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="w-10 h-10 mx-auto text-gray-400 group-hover:text-green-500 mb-2 transition-colors"
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
                              <p className="text-sm text-gray-600 font-medium">
                                Click to upload
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    )}

                    {imageTab === "pexels" && (
                      <button
                        type="button"
                        onClick={() => setShowPexelsPicker(true)}
                        className="w-full px-4 py-8 border-2 border-dashed border-teal-300 bg-teal-50 rounded-lg hover:bg-teal-100 hover:border-teal-400 transition-all flex flex-col items-center justify-center gap-2 group"
                      >
                        <svg
                          className="w-8 h-8 text-teal-600 group-hover:scale-110 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <span className="text-sm font-medium text-teal-800">
                          Search Free Stock Photos
                        </span>
                      </button>
                    )}

                    {imageTab === "url" && (
                      <div className="space-y-2">
                        <input
                          type="url"
                          value={formData.featuredImage}
                          onChange={(e) =>
                            setFormData({ ...formData, featuredImage: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="https://example.com/image.jpg"
                        />
                        <p className="text-xs text-gray-500">
                          Paste a direct link to an image
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Pexels Image Picker Modal */}
      {showPexelsPicker && (
        <PexelsImagePicker
          onSelect={(image) => {
            setFormData({
              ...formData,
              featuredImage: image.url,
              imageAttribution: {
                photographer: image.photographer,
                photographerUrl: image.photographerUrl,
                pexelsUrl: image.pexelsUrl,
              },
            });
            setShowPexelsPicker(false);
          }}
          onClose={() => setShowPexelsPicker(false)}
        />
      )}
    </div>
  );
}
