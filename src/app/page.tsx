"use client";

import { useState } from "react";
import Dashboard from "@/app/components/Dashboard";
import ContentWizard from "@/app/components/ContentWizard";
import BlogCreator from "@/app/components/BlogCreator";
import VideoCreator from "@/app/components/VideoCreator";
import ReelCreator from "@/app/components/ReelCreator";
import ImageCreator from "@/app/components/ImageCreator";
import ContentLibrary from "@/app/components/ContentLibrary";
import { ContentItem } from "@/lib/store/slices/contentSlice";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );

  const handleContentSelect = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const handleWizardComplete = () => {
    setShowWizard(false);
    setSelectedContent(null);
  };

  const handleWizardCancel = () => {
    setShowWizard(false);
    setSelectedContent(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Bizcontently
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Create viral content for your business
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setShowWizard(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Content
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {showWizard ? (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <ContentWizard
                  contentType={selectedContent?.type || "blog"}
                  onComplete={handleWizardComplete}
                  onCancel={handleWizardCancel}
                />
              </div>
            </div>
          ) : selectedContent ? (
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {selectedContent.type === "blog" && (
                  <BlogCreator
                    contentItem={selectedContent}
                    onStepComplete={() => setSelectedContent(null)}
                  />
                )}
                {selectedContent.type === "video" && (
                  <VideoCreator
                    contentItem={selectedContent}
                    onStepComplete={() => setSelectedContent(null)}
                  />
                )}
                {selectedContent.type === "reel" && (
                  <ReelCreator
                    contentItem={selectedContent}
                    onStepComplete={() => setSelectedContent(null)}
                  />
                )}
                {selectedContent.type === "image" && (
                  <ImageCreator
                    contentItem={selectedContent}
                    onStepComplete={() => setSelectedContent(null)}
                  />
                )}
              </div>
            </div>
          ) : (
            <ContentLibrary onSelectItem={handleContentSelect} />
          )}
        </div>
      </div>
    </main>
  );
}
