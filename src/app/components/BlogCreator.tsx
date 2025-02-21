"use client";

import { useState } from "react";
import { useAppDispatch } from "@/lib/store/store";
import { updateItem, ContentItem } from "@/lib/store/slices/contentSlice";
import { generateBlogOutline } from "@/lib/utils/aiUtils";

interface BlogCreatorProps {
  contentItem: ContentItem;
  onStepComplete: () => void;
}

const BlogCreator: React.FC<BlogCreatorProps> = ({
  contentItem,
  onStepComplete,
}) => {
  const dispatch = useAppDispatch();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [outline, setOutline] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeKeywords = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement keyword analysis using SEO APIs
      const mockKeywords = [
        { keyword: contentItem.title + " tips", score: 85 },
        { keyword: "how to " + contentItem.title, score: 78 },
        { keyword: "best " + contentItem.title + " strategies", score: 72 },
      ];

      setKeywords(mockKeywords.map((k) => k.keyword));
      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            keywords: mockKeywords,
          },
          workflowState: {
            ...contentItem.workflowState,
            stepStatus: {
              ...contentItem.workflowState.stepStatus,
              keywordAnalysis: "completed",
            },
          },
        })
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze keywords"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateOutline = async () => {
    if (!selectedKeyword) return;

    setLoading(true);
    setError(null);

    try {
      const generatedOutline = await generateBlogOutline(selectedKeyword);
      setOutline(generatedOutline);

      dispatch(
        updateItem({
          ...contentItem,
          metadata: {
            ...contentItem.metadata,
            selectedKeyword,
            outline: generatedOutline,
          },
          workflowState: {
            ...contentItem.workflowState,
            stepStatus: {
              ...contentItem.workflowState.stepStatus,
              outlineGeneration: "completed",
            },
          },
        })
      );

      onStepComplete();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate outline"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Keyword Analysis Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">Keyword Analysis</h3>
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={analyzeKeywords}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Analyzing..." : "Analyze Keywords"}
          </button>

          {keywords.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Target Keyword
              </label>
              <select
                value={selectedKeyword}
                onChange={(e) => setSelectedKeyword(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a keyword</option>
                {keywords.map((keyword) => (
                  <option key={keyword} value={keyword}>
                    {keyword}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Outline Generation Section */}
      {selectedKeyword && (
        <div>
          <h3 className="text-lg font-medium text-gray-900">Blog Outline</h3>
          <div className="mt-4 space-y-4">
            <button
              type="button"
              onClick={generateOutline}
              disabled={loading || !selectedKeyword}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Generating..." : "Generate Outline"}
            </button>

            {outline && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Generated Outline
                </label>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm text-gray-900">
                    {outline}
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

export default BlogCreator;
