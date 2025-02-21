"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/store/store";
import { updateItem, ContentItem } from "@/lib/store/slices/contentSlice";
import { generateEnhancedContent } from "@/lib/utils/aiUtils";

interface ImageCreatorProps {
  contentItem: ContentItem;
  onStepComplete: () => void;
}

const ImageCreator: React.FC<ImageCreatorProps> = ({
  contentItem,
  onStepComplete,
}) => {
  const dispatch = useAppDispatch();
  const [trendingImages, setTrendingImages] = useState<any[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeTrends = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement social media API integration for image trend analysis
      const mockTrends = [
        {
          style: "Minimalist " + contentItem.title,
          engagement: "95%",
          platform: "instagram",
        },
        {
          style: contentItem.title + " Infographic",
          engagement: "88%",
          platform: "pinterest",
        },
        {
          style: "Abstract " + contentItem.title,
          engagement: "92%",
          platform: "all",
        },
      ];

      setTrendingImages(mockTrends);
      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            trendingImages: mockTrends,
          },
          workflowState: {
            ...contentItem.workflowState,
            stepStatus: {
              ...contentItem.workflowState.stepStatus,
              trendAnalysis: "completed",
            },
          },
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze trends");
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!selectedStyle) return;

    setLoading(true);
    setError(null);

    try {
      const prompt = await generateEnhancedContent(
        `Create a detailed image generation prompt for a ${selectedStyle} style image about ${contentItem.title}`
      );
      setGeneratedPrompt(prompt);

      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            selectedStyle,
            imagePrompt: prompt,
          },
          workflowState: {
            ...contentItem.workflowState,
            stepStatus: {
              ...contentItem.workflowState.stepStatus,
              promptGeneration: "completed",
            },
          },
        })
      );

      onStepComplete();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate image prompt"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Trend Analysis Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Image Trend Analysis
        </h3>
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={analyzeTrends}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Analyzing..." : "Analyze Trends"}
          </button>

          {trendingImages.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Image Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a style</option>
                {trendingImages.map((image, index) => (
                  <option key={index} value={image.style}>
                    {image.style} ({image.engagement} engagement on{" "}
                    {image.platform})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Image Generation Section */}
      {selectedStyle && (
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Image Generation
          </h3>
          <div className="mt-4 space-y-4">
            <button
              type="button"
              onClick={generateImage}
              disabled={loading || !selectedStyle}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Generating..." : "Generate Image Prompt"}
            </button>

            {generatedPrompt && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Generated Image Prompt
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm text-gray-900">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCreator;
