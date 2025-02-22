import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScriptEditor from "./ScriptEditor";

interface GeneratedScript {
  transcript: string;
  analysis: {
    hook: string;
    segments: { title: string; timestamp: string }[];
    callToActions: string[];
    transitions: string[];
    patterns: {
      pacing: string;
      storyStructure: string;
      emotionalTriggers: string[];
      keyPhrases: string[];
      retentionMetrics: {
        averageSegmentDuration: number;
        pacingVariation: string;
        engagementTriggers: number;
        audiencePrompts: number;
      };
      contentFlow: {
        patternInterrupts: number;
        storyArcs: number;
        tensionPoints: number;
        resolutionPoints: number;
      };
      audienceEngagement: {
        participationPrompts: string[];
        psychologicalHooks: string[];
        valueDelivery: string[];
        socialProof: string[];
      };
    };
  };
  metadata: {
    duration: string;
    viewCount: string;
    engagement: {
      likeCount: string;
      commentCount: string;
    };
    channel: {
      name: string;
      subscriberCount: string;
    };
  };
  source: string;
}

export default function ScriptGenerator() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedScript, setGeneratedScript] =
    useState<GeneratedScript | null>(null);
  const [editedScript, setEditedScript] = useState<string>("");

  const formatScriptWithSections = (script: string) => {
    // Split script into lines and remove empty lines
    const lines = script.split("\n").filter((line) => line.trim());

    // If the script already has section markers, return as is
    if (
      lines.some((line) =>
        line.match(
          /^\[(HOOK|PATTERN_INTERRUPT|PARTICIPATION|VALUE|CTA|CONTENT)\]/
        )
      )
    ) {
      return script;
    }

    // Format script with sections
    const formattedLines = lines.map((line, index) => {
      if (index === 0) return `[HOOK] ${line}`;
      if (index === lines.length - 1) return `[CTA] ${line}`;

      // Alternate between different section types for the middle content
      const sectionTypes = ["PATTERN_INTERRUPT", "VALUE", "CONTENT"];
      const sectionType = sectionTypes[index % sectionTypes.length];
      return `[${sectionType}] ${line}`;
    });

    return formattedLines.join("\n");
  };

  const extractVideoId = (url: string): string => {
    try {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        // Handle youtu.be format
        if (url.includes("youtu.be")) {
          return url.split("youtu.be/")[1].split("?")[0];
        }

        // Handle youtube.com format
        const urlObj = new URL(url);
        if (url.includes("watch")) {
          return urlObj.searchParams.get("v") || "";
        }
        if (url.includes("embed")) {
          return urlObj.pathname.split("/").pop() || "";
        }
      }

      // Handle direct video ID
      if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
        return url;
      }

      throw new Error("Invalid YouTube URL or video ID");
    } catch (error) {
      throw new Error("Failed to extract video ID from URL");
    }
  };

  const generateScript = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate and extract video ID
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      // First, get video metadata and generate script
      const scriptResponse = await fetch(
        `/api/youtube/transcript?videoUrl=${encodeURIComponent(videoId)}`
      );

      if (!scriptResponse.ok) {
        const errorData = await scriptResponse.json();
        throw new Error(errorData.error || "Failed to generate script");
      }

      const scriptData = await scriptResponse.json();

      // Format the script with sections if needed
      const formattedScript = formatScriptWithSections(scriptData.transcript);

      // Create the final script data
      const finalScriptData: GeneratedScript = {
        ...scriptData,
        transcript: formattedScript,
      };

      setGeneratedScript(finalScriptData);
      setEditedScript(formattedScript);
    } catch (err) {
      console.error("Script generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate script"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScriptUpdate = (updatedScript: string) => {
    setEditedScript(updatedScript);
    if (generatedScript) {
      setGeneratedScript({
        ...generatedScript,
        transcript: updatedScript,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Script Generator</CardTitle>
          <CardDescription>
            Generate and customize scripts for your YouTube videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="videoUrl">YouTube Video URL</Label>
                <Input
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={generateScript}
                  disabled={loading || !videoUrl}
                  className="bg-[#9131E7] hover:bg-[#9131E7]/90"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Generating...
                    </div>
                  ) : (
                    "Generate Script"
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {generatedScript && (
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="edit" className="flex-1">
                    Edit & Customize
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="flex-1">
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="metadata" className="flex-1">
                    Video Info
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                  <ScriptEditor
                    script={editedScript}
                    onScriptUpdate={handleScriptUpdate}
                  />
                </TabsContent>

                <TabsContent value="analysis">
                  <Card>
                    <CardHeader>
                      <CardTitle>Script Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                        {JSON.stringify(generatedScript.analysis, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="metadata">
                  <Card>
                    <CardHeader>
                      <CardTitle>Video Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                        {JSON.stringify(generatedScript.metadata, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
