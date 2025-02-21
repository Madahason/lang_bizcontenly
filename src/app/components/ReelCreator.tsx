"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/store/store";
import { updateItem, ContentItem } from "@/lib/store/slices/contentSlice";
import { generateVideoScript } from "@/lib/utils/aiUtils";

interface ReelCreatorProps {
  contentItem: ContentItem;
  onStepComplete: () => void;
}

const ReelCreator: React.FC<ReelCreatorProps> = ({
  contentItem,
  onStepComplete,
}) => {
  const dispatch = useAppDispatch();
  const [trendingReels, setTrendingReels] = useState<any[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<string>("");
  const [script, setScript] = useState<string>("");
  const [platform, setPlatform] = useState<"instagram" | "tiktok">("instagram");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeTrends = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement Instagram/TikTok API integration for trend analysis
      const mockTrends = [
        {
          title: contentItem.title + " Life Hack",
          views: "2.5M",
          engagement: "96%",
          platform: "instagram",
        },
        {
          title: "Quick " + contentItem.title + " Tips",
          views: "1.8M",
          engagement: "94%",
          platform: "tiktok",
        },
        {
          title: contentItem.title + " Challenge",
          views: "3.2M",
          engagement: "98%",
          platform: "both",
        },
      ];

      setTrendingReels(mockTrends);
      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            trendingReels: mockTrends,
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

  const generateScript = async () => {
    if (!selectedTrend) return;

    setLoading(true);
    setError(null);

    try {
      const generatedScript = await generateVideoScript(
        selectedTrend,
        platform
      );
      setScript(generatedScript);

      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            selectedTrend,
            platform,
            script: generatedScript,
          },
          workflowState: {
            ...contentItem.workflowState,
            stepStatus: {
              ...contentItem.workflowState.stepStatus,
              scriptGeneration: "completed",
            },
          },
        })
      );

      onStepComplete();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate script"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Select Platform</h3>
        <div className="mt-4">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setPlatform("instagram")}
              className={`px-4 py-2 rounded-md ${
                platform === "instagram"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Instagram Reels
            </button>
            <button
              type="button"
              onClick={() => setPlatform("tiktok")}
              className={`px-4 py-2 rounded-md ${
                platform === "tiktok"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              TikTok
            </button>
          </div>
        </div>
      </div>

      {/* Trend Analysis Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Reel Trend Analysis
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

          {trendingReels.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Reel Style
              </label>
              <select
                value={selectedTrend}
                onChange={(e) => setSelectedTrend(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a trend</option>
                {trendingReels.map((reel, index) => (
                  <option key={index} value={reel.title}>
                    {reel.title} ({reel.views} views, {reel.engagement}{" "}
                    engagement)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Script Generation Section */}
      {selectedTrend && (
        <div>
          <h3 className="text-lg font-medium text-gray-900">Reel Script</h3>
          <div className="mt-4 space-y-4">
            <button
              type="button"
              onClick={generateScript}
              disabled={loading || !selectedTrend}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Generating..." : "Generate Script"}
            </button>

            {script && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Generated Script
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm text-gray-900">
                    {script}
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

export default ReelCreator;
