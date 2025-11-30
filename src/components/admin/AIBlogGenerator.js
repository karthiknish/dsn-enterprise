'use client';

import { useState } from 'react';
import { FaMagic, FaSpinner, FaLightbulb, FaCopy, FaCheck, FaRedo } from 'react-icons/fa';

export default function AIBlogGenerator({ onContentGenerated, onMetadataGenerated }) {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [error, setError] = useState('');
  const [blogIdeas, setBlogIdeas] = useState([]);
  const [showIdeas, setShowIdeas] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContent = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          topic: topic.trim(),
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent(data.content);
        if (onContentGenerated) {
          onContentGenerated(data.content);
        }
      } else {
        setError(data.error || 'Failed to generate content');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMetadata = async (content) => {
    if (!topic.trim() || !content) {
      setError('Topic and content are required for metadata generation');
      return;
    }

    setIsGeneratingMeta(true);
    setError('');

    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'metadata',
          topic: topic.trim(),
          content: content,
        }),
      });

      const data = await response.json();

      if (data.success && onMetadataGenerated) {
        onMetadataGenerated(data.metadata);
      } else {
        setError(data.error || 'Failed to generate metadata');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  const loadBlogIdeas = async () => {
    setIsLoadingIdeas(true);
    setError('');

    try {
      const response = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ideas',
          category: 'precision gauges and industrial metrology',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBlogIdeas(data.ideas);
        setShowIdeas(true);
      } else {
        setError(data.error || 'Failed to load ideas');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  const selectIdea = (idea) => {
    setTopic(idea.title);
    setKeywords(idea.keywords.join(', '));
    setShowIdeas(false);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <FaMagic className="mr-2 text-purple-600" />
          AI Blog Generator
        </h3>
        <button
          onClick={loadBlogIdeas}
          disabled={isLoadingIdeas}
          className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
        >
          {isLoadingIdeas ? (
            <FaSpinner className="animate-spin mr-1" />
          ) : (
            <FaLightbulb className="mr-1" />
          )}
          Get Blog Ideas
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {showIdeas && blogIdeas.length > 0 && (
        <div className="mb-4 bg-white rounded-lg p-4 border border-purple-200">
          <h4 className="font-medium text-gray-900 mb-3">Suggested Blog Topics:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {blogIdeas.map((idea, index) => (
              <div
                key={index}
                onClick={() => selectIdea(idea)}
                className="p-3 bg-gray-50 rounded cursor-pointer hover:bg-purple-50 transition-colors"
              >
                <div className="font-medium text-gray-900 text-sm">{idea.title}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {idea.keywords?.map((kw, i) => (
                    <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      {kw}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span>Audience: {idea.targetAudience}</span>
                  <span className={`px-2 py-0.5 rounded ${
                    idea.estimatedSearchVolume === 'high' ? 'bg-green-100 text-green-700' :
                    idea.estimatedSearchVolume === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {idea.estimatedSearchVolume} volume
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowIdeas(false)}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Hide Ideas
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Topic / Title
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Guide to Thread Gauge Selection for Manufacturing"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Keywords (comma-separated)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., thread gauges, plug gauge, ring gauge, gauge selection"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateContent}
            disabled={isGenerating || !topic.trim()}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <FaMagic className="mr-2" />
                Generate Blog Content
              </>
            )}
          </button>
        </div>
      </div>

      {generatedContent && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Generated Content Preview:</h4>
            <div className="flex gap-2">
              <button
                onClick={copyContent}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                {copied ? <FaCheck className="mr-1 text-green-600" /> : <FaCopy className="mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={() => generateMetadata(generatedContent)}
                disabled={isGeneratingMeta}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
              >
                {isGeneratingMeta ? (
                  <FaSpinner className="animate-spin mr-1" />
                ) : (
                  <FaMagic className="mr-1" />
                )}
                Generate SEO Metadata
              </button>
              <button
                onClick={generateContent}
                disabled={isGenerating}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <FaRedo className="mr-1" />
                Regenerate
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {generatedContent}
              </pre>
            </div>
          </div>
          <button
            onClick={() => {
              if (onContentGenerated) {
                onContentGenerated(generatedContent);
              }
            }}
            className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <FaCheck className="mr-2" />
            Use This Content in Editor
          </button>
        </div>
      )}
    </div>
  );
}
