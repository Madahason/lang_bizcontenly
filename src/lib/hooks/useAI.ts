import { useCallback, useState } from "react";
import { useContent } from "./useContent";
import {
  generateBlogOutline,
  generateVideoScript,
  generateEnhancedContent,
} from "@/lib/utils/aiUtils";

export function useAI() {
  const { updateContent, updateWorkflowState } = useContent();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = useCallback(
    async (
      contentId: string,
      type: "blog" | "video" | "reel" | "image",
      prompt: string,
      options?: {
        platform?: string;
        style?: string;
      }
    ) => {
      setLoading(true);
      setError(null);

      try {
        let generatedContent = "";

        // Update workflow state to processing
        updateWorkflowState(contentId, 1, "processing");

        switch (type) {
          case "blog":
            generatedContent = await generateBlogOutline(prompt);
            break;
          case "video":
            generatedContent = await generateVideoScript(
              prompt,
              options?.platform || "youtube"
            );
            break;
          case "reel":
            generatedContent = await generateVideoScript(
              prompt,
              options?.platform || "instagram"
            );
            break;
          case "image":
            generatedContent = await generateEnhancedContent(
              `Create a detailed image generation prompt for a ${
                options?.style || "modern"
              } style image about ${prompt}`
            );
            break;
        }

        // Update workflow state to completed
        updateWorkflowState(contentId, 1, "completed");

        return generatedContent;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to generate content";
        setError(errorMessage);
        updateWorkflowState(contentId, 1, "failed");
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [updateContent, updateWorkflowState]
  );

  const analyzeKeywords = useCallback(async (topic: string) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement keyword analysis using SEO APIs
      // For now, return mock data
      return [
        { keyword: topic + " tips", score: 85 },
        { keyword: "how to " + topic, score: 78 },
        { keyword: "best " + topic + " strategies", score: 72 },
      ];
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to analyze keywords";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeTrends = useCallback(
    async (
      type: "video" | "reel" | "image",
      topic: string,
      platform?: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        // TODO: Implement trend analysis using social media APIs
        // For now, return mock data
        switch (type) {
          case "video":
            return [
              {
                title: "Top 10 " + topic + " Secrets",
                views: "1.2M",
                engagement: "95%",
              },
              {
                title: topic + " Tutorial for Beginners",
                views: "800K",
                engagement: "88%",
              },
              {
                title: "Ultimate Guide to " + topic,
                views: "650K",
                engagement: "92%",
              },
            ];
          case "reel":
            return [
              {
                title: topic + " Life Hack",
                views: "2.5M",
                engagement: "96%",
                platform: platform || "instagram",
              },
              {
                title: "Quick " + topic + " Tips",
                views: "1.8M",
                engagement: "94%",
                platform: platform || "tiktok",
              },
              {
                title: topic + " Challenge",
                views: "3.2M",
                engagement: "98%",
                platform: "both",
              },
            ];
          case "image":
            return [
              {
                style: "Minimalist " + topic,
                engagement: "95%",
                platform: "instagram",
              },
              {
                style: topic + " Infographic",
                engagement: "88%",
                platform: "pinterest",
              },
              {
                style: "Abstract " + topic,
                engagement: "92%",
                platform: "all",
              },
            ];
          default:
            return [];
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to analyze trends";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    generateContent,
    analyzeKeywords,
    analyzeTrends,
  };
}
