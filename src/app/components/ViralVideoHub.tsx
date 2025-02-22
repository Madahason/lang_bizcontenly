"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VideoStats {
  videoId: string;
  title: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  channelStats: {
    subscriberCount: number;
    videoCount: number;
    averageViews: number;
  };
  metrics: {
    viewsRatio: number;
    engagementRate: number;
    daysAgo: number;
    isViral: boolean;
  };
}

export default function ViralVideoHub() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoStats | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoStats | null>(null);
  const [generatedScript, setGeneratedScript] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<VideoStats[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(
        `/api/youtube/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to search videos");
      }

      setSearchResults(data.videos);
      setCurrentStep(2);
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSearching(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatUploadDate = (daysAgo: number) => {
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    if (daysAgo < 60) return "1 month ago";
    return `${Math.floor(daysAgo / 30)} months ago`;
  };

  const steps = [
    { number: 1, title: "Search" },
    { number: 2, title: "View Examples" },
    { number: 3, title: "Select Reference" },
    { number: 4, title: "Generate Script" },
    { number: 5, title: "Edit & Customize" },
    { number: 6, title: "Production" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.number
                      ? "bg-[#9131E7] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep >= step.number
                      ? "text-[#9131E7]"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
                {step.number < steps.length && (
                  <div
                    className={`absolute top-4 left-8 w-[calc(100%-2rem)] h-0.5 -z-10 ${
                      currentStep > step.number ? "bg-[#9131E7]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Step 1: Search */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Find Viral Video Inspiration
              </h2>
              <p className="text-gray-600">
                Enter a topic to discover viral YouTube videos that outperform
                their channel's average views.
              </p>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter topic (e.g., 'morning routine', 'productivity tips')"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9131E7]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-6 py-2 bg-[#9131E7] text-white rounded-lg hover:bg-[#9131E7]/90 transition-colors disabled:opacity-50"
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </div>
              {searchError && (
                <div className="text-red-500 text-sm">{searchError}</div>
              )}
            </div>
          )}

          {/* Step 2: View Viral Examples */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Viral Video Examples
              </h2>
              <p className="text-gray-600">
                These videos from the last 6 months significantly outperform
                their channel's average views. Click on a video to preview or
                analyze.
              </p>

              {/* Video Preview Modal */}
              {previewVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg w-full max-w-3xl">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {previewVideo.title}
                      </h3>
                      <button
                        onClick={() => setPreviewVideo(null)}
                        className="text-gray-500 hover:text-gray-700"
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
                    <div className="aspect-[16/9] bg-black my-2">
                      <iframe
                        className="w-full h-[351px]"
                        src={`https://www.youtube.com/embed/${previewVideo.videoId}`}
                        title={previewVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-2">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Views</span>
                          <span className="font-semibold text-[#9131E7]">
                            {formatNumber(previewVideo.viewCount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Likes</span>
                          <span className="font-semibold">
                            {formatNumber(previewVideo.likeCount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Comments</span>
                          <span className="font-semibold">
                            {formatNumber(previewVideo.commentCount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">
                            Channel Subs
                          </span>
                          <span className="font-semibold">
                            {formatNumber(
                              previewVideo.channelStats.subscriberCount
                            )}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedVideo(previewVideo);
                          setPreviewVideo(null);
                          setCurrentStep(3);
                        }}
                        className="mt-6 w-full bg-[#9131E7] text-white py-3 rounded-lg hover:bg-[#9131E7]/90 transition-colors font-semibold text-base"
                      >
                        Analyze This Video
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((video) => (
                  <div
                    key={video.videoId}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setPreviewVideo(video)}
                  >
                    <div className="relative group">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
                        <svg
                          className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {video.channelTitle} •{" "}
                        {formatUploadDate(video.metrics.daysAgo)}
                      </p>
                      <div className="grid grid-cols-2 gap-y-1 text-xs">
                        <div>
                          <span className="text-gray-500">Views:</span>
                          <span className="ml-1 text-[#9131E7] font-semibold">
                            {formatNumber(video.viewCount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Likes:</span>
                          <span className="ml-1 font-semibold">
                            {formatNumber(video.likeCount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Comments:</span>
                          <span className="ml-1 font-semibold">
                            {formatNumber(video.commentCount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Subs:</span>
                          <span className="ml-1 font-semibold">
                            {formatNumber(video.channelStats.subscriberCount)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Viral
                        </span>
                        {video.viewCount >
                          video.channelStats.subscriberCount && (
                          <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                            &gt; Subs
                          </span>
                        )}
                        {video.metrics.daysAgo <= 7 && (
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {searchResults.length === 0 && !isSearching && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No viral videos found from the last 6 months for this topic.
                    Try a different search term.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Select Reference */}
          {currentStep === 3 && selectedVideo && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Video Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mt-4">
                    {selectedVideo.title}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500">Total Views</span>
                      <div className="text-2xl font-bold text-[#9131E7]">
                        {formatNumber(selectedVideo.viewCount)}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500">Viral Factor</span>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedVideo.metrics.viewsRatio.toFixed(1)}x
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Success Factors</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Strong hook in first 15 seconds
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Clear value proposition
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Engaging storytelling
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Strategic call-to-actions
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-full py-3 bg-[#9131E7] text-white rounded-lg hover:bg-[#9131E7]/90 transition-colors"
                  >
                    Use as Reference
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Generate Script */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Generate Script
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Script Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Target Length
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>5-7 minutes</option>
                          <option>8-10 minutes</option>
                          <option>11-15 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Style
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Educational</option>
                          <option>Entertainment</option>
                          <option>Tutorial</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">
                          Tone
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Professional</option>
                          <option>Casual</option>
                          <option>Energetic</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="w-full py-3 bg-[#9131E7] text-white rounded-lg hover:bg-[#9131E7]/90 transition-colors"
                  >
                    Generate Script
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Script Structure</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#9131E7] text-white flex items-center justify-center text-sm mr-3">
                        1
                      </span>
                      <span>Hook (15 seconds)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#9131E7] text-white flex items-center justify-center text-sm mr-3">
                        2
                      </span>
                      <span>Introduction (30-45 seconds)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#9131E7] text-white flex items-center justify-center text-sm mr-3">
                        3
                      </span>
                      <span>Main Content (3-4 key points)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-[#9131E7] text-white flex items-center justify-center text-sm mr-3">
                        4
                      </span>
                      <span>Call to Action</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Edit & Customize */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Edit & Customize Script
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Script Editor
                      </label>
                      <textarea
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9131E7]"
                        placeholder="Your script will appear here..."
                        value={generatedScript}
                        onChange={(e) => setGeneratedScript(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">AI Suggestions</h4>
                    <div className="space-y-3">
                      <button className="w-full p-2 text-left text-sm bg-white border border-gray-200 rounded-lg hover:border-[#9131E7] transition-colors">
                        💡 Add more emotional hooks
                      </button>
                      <button className="w-full p-2 text-left text-sm bg-white border border-gray-200 rounded-lg hover:border-[#9131E7] transition-colors">
                        💡 Strengthen the call to action
                      </button>
                      <button className="w-full p-2 text-left text-sm bg-white border border-gray-200 rounded-lg hover:border-[#9131E7] transition-colors">
                        💡 Add statistical evidence
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-[#9131E7] transition-colors">
                        Add Transition
                      </button>
                      <button className="w-full py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-[#9131E7] transition-colors">
                        Add B-Roll Marker
                      </button>
                      <button className="w-full py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-[#9131E7] transition-colors">
                        Add Sound Effect
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="w-full py-3 bg-[#9131E7] text-white rounded-lg hover:bg-[#9131E7]/90 transition-colors"
                  >
                    Continue to Production
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Production */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Video Production
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Production Assets</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span>AI Video Generation</span>
                          <button className="text-[#9131E7]">Generate</button>
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span>Stock Footage</span>
                          <button className="text-[#9131E7]">Browse</button>
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span>Background Music</span>
                          <button className="text-[#9131E7]">Select</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Timeline</h4>
                    <div className="space-y-2">
                      <div className="h-12 bg-white rounded-lg border border-gray-200"></div>
                      <div className="h-12 bg-white rounded-lg border border-gray-200"></div>
                      <div className="h-12 bg-white rounded-lg border border-gray-200"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-4">Preview</h4>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">
                        Preview will appear here
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      Save Draft
                    </button>
                    <button className="flex-1 py-3 bg-[#9131E7] text-white rounded-lg hover:bg-[#9131E7]/90 transition-colors">
                      Export Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className={`px-6 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ${
                currentStep === 1 ? "invisible" : ""
              }`}
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
              className={`px-6 py-2 text-[#9131E7] rounded-lg hover:bg-gray-100 transition-colors ${
                currentStep === 6 ? "invisible" : ""
              }`}
            >
              Skip →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
