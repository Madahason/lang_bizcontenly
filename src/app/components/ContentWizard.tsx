"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/store/store";
import {
  addItem,
  updateItem,
  ContentItem,
} from "@/lib/store/slices/contentSlice";
import {
  generateBlogOutline,
  generateVideoScript,
  generateEnhancedContent,
} from "@/lib/utils/aiUtils";

interface ContentWizardProps {
  contentType: "blog" | "video" | "reel" | "image";
  onComplete: () => void;
  onCancel: () => void;
}

const ContentWizard: React.FC<ContentWizardProps> = ({
  contentType,
  onComplete,
  onCancel,
}) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);

  const totalSteps = {
    blog: 4,
    video: 3,
    reel: 3,
    image: 2,
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const newItem: ContentItem = {
      id: crypto.randomUUID(),
      type: contentType,
      title: topic,
      status: "processing",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {},
      workflowState: {
        currentStep: step,
        totalSteps: totalSteps[contentType],
        stepStatus: {},
      },
    };

    setCurrentItem(newItem);

    try {
      let content = "";
      dispatch(addItem(newItem));

      switch (contentType) {
        case "blog":
          content = await generateBlogOutline(topic);
          break;
        case "video":
          content = await generateVideoScript(topic, "youtube");
          break;
        case "reel":
          content = await generateVideoScript(topic, "instagram");
          break;
        case "image":
          content = await generateEnhancedContent(topic);
          break;
      }

      setGeneratedContent(content);

      const updatedItem = {
        ...newItem,
        status: "completed" as const,
        metadata: { content },
        updatedAt: new Date().toISOString(),
      };

      dispatch(updateItem(updatedItem));
      setCurrentItem(updatedItem);
      setStep(step + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      if (newItem) {
        const failedItem = {
          ...newItem,
          status: "failed" as const,
          updatedAt: new Date().toISOString(),
        };
        dispatch(updateItem(failedItem));
        setCurrentItem(failedItem);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps[contentType] }).map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index
                      ? "bg-blue-600 text-white"
                      : step === index + 1
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                {index < totalSteps[contentType] - 1 && (
                  <div
                    className={`h-0.5 w-16 mx-2 ${
                      step > index ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Form */}
        <div className="space-y-6">
          {step === 1 && (
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700"
              >
                Topic
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder={`Enter your ${contentType} topic`}
                />
              </div>
            </div>
          )}

          {step > 1 && generatedContent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Content
              </label>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="whitespace-pre-wrap">{generatedContent}</pre>
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

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={
                step === totalSteps[contentType] ? onComplete : handleSubmit
              }
              disabled={loading || (step === 1 && !topic)}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                loading || (step === 1 && !topic)
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : step === totalSteps[contentType] ? (
                "Complete"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWizard;
