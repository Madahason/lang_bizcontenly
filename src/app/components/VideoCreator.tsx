"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/store/store";
import { updateItem, ContentItem } from "@/lib/store/slices/contentSlice";
import { generateVideoScript } from "@/lib/utils/aiUtils";

interface VideoCreatorProps {
  contentItem: ContentItem;
  onStepComplete: () => void;
}

const VideoCreator: React.FC<VideoCreatorProps> = ({
  contentItem,
  onStepComplete,
}) => {
  const dispatch = useAppDispatch();
  const [trendingVideos, setTrendingVideos] = useState<any[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<string>("");
  const [script, setScript] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeTrends = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement YouTube API integration for trend analysis
      const mockTrends = [
        {
          title: "Top 10 " + contentItem.title + " Secrets",
          views: "1.2M",
          engagement: "95%",
        },
        {
          title: contentItem.title + " Tutorial for Beginners",
          views: "800K",
          engagement: "88%",
        },
        {
          title: "Ultimate Guide to " + contentItem.title,
          views: "650K",
          engagement: "92%",
        },
      ];

      setTrendingVideos(mockTrends);
      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            trendingVideos: mockTrends,
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
        "youtube"
      );
      setScript(generatedScript);

      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            selectedTrend,
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
      {/* Trend Analysis Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Video Trend Analysis
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

          {trendingVideos.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Video Style
              </label>
              <select
                value={selectedTrend}
                onChange={(e) => setSelectedTrend(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a trend</option>
                {trendingVideos.map((video, index) => (
                  <option key={index} value={video.title}>
                    {video.title} ({video.views} views, {video.engagement}{" "}
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
          <h3 className="text-lg font-medium text-gray-900">Video Script</h3>
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

export default VideoCreator;
