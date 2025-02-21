"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ViralVideoHub() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [generatedScript, setGeneratedScript] = useState("");

  // Mock data for UI demonstration
  const mockViralVideos = [
    {
      id: 1,
      title: "How I Built a Million Dollar Business",
      thumbnail: "https://picsum.photos/300/200",
      views: "2.4M",
      channelAvg: "500K",
      viralFactor: "4.8x",
      duration: "15:24",
    },
    {
      id: 2,
      title: "10 Morning Habits of Successful People",
      thumbnail: "https://picsum.photos/300/200",
      views: "1.8M",
      channelAvg: "300K",
      viralFactor: "6x",
      duration: "12:18",
    },
    {
      id: 3,
      title: "The Truth About Passive Income",
      thumbnail: "https://picsum.photos/300/200",
      views: "3.2M",
      channelAvg: "800K",
      viralFactor: "4x",
      duration: "18:45",
    },
  ];

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
                />
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 bg-[#9131E7] text-white rounded-lg hover:bg-[#9131E7]/90 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* Step 2: View Viral Examples */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Viral Video Examples
              </h2>
              <p className="text-gray-600">
                These videos significantly outperform their channel's average
                views. Click on a video to analyze its success factors.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockViralVideos.map((video) => (
                  <div
                    key={video.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedVideo(video);
                      setCurrentStep(3);
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {video.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Views:</span>
                          <span className="ml-1 text-[#9131E7]">
                            {video.views}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg:</span>
                          <span className="ml-1">{video.channelAvg}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Viral:</span>
                          <span className="ml-1 text-green-600">
                            {video.viralFactor}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Length:</span>
                          <span className="ml-1">{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                        {selectedVideo.views}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500">Viral Factor</span>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedVideo.viralFactor}
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
