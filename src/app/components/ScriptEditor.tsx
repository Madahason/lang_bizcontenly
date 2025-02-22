import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ScriptSection {
  type: string;
  content: string;
  duration?: string;
  timestamp?: string;
}

interface ScriptEditorProps {
  script: string;
  onScriptUpdate: (updatedScript: string) => void;
}

const SECTION_TYPES = {
  HOOK: {
    label: "Hook",
    description: "Attention-grabbing opening that draws viewers in",
    defaultDuration: "0:30",
  },
  PATTERN_INTERRUPT: {
    label: "Pattern Interrupt",
    description: "Unexpected element that maintains viewer engagement",
    defaultDuration: "0:15",
  },
  PARTICIPATION: {
    label: "Participation",
    description: "Viewer engagement prompt or call for interaction",
    defaultDuration: "0:20",
  },
  VALUE: {
    label: "Value Point",
    description: "Key insight or important information",
    defaultDuration: "0:45",
  },
  CTA: {
    label: "Call to Action",
    description: "Clear directive for viewer next steps",
    defaultDuration: "0:30",
  },
  CONTENT: {
    label: "Content",
    description: "Main content and explanation",
    defaultDuration: "1:00",
  },
};

export default function ScriptEditor({
  script,
  onScriptUpdate,
}: ScriptEditorProps) {
  const [sections, setSections] = useState<ScriptSection[]>([]);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [totalDuration, setTotalDuration] = useState("0:00");

  useEffect(() => {
    // Parse the script into sections based on markers
    const parsedSections = script
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const typeMatch = line.match(/\[(.*?)\]/);
        const type = typeMatch?.[1] || "CONTENT";
        const content = line.replace(/\[.*?\]/, "").trim();
        const defaultDuration =
          SECTION_TYPES[type as keyof typeof SECTION_TYPES]?.defaultDuration ||
          "0:30";

        return {
          type,
          content,
          duration: defaultDuration,
          timestamp: "0:00", // Will be calculated
        };
      });

    // Calculate timestamps
    let currentTime = 0;
    const sectionsWithTimestamps = parsedSections.map((section) => {
      const [minutes, seconds] = section.duration?.split(":").map(Number) || [
        0, 30,
      ];
      const durationInSeconds = minutes * 60 + seconds;
      const timestamp = formatTime(currentTime);
      currentTime += durationInSeconds;
      return { ...section, timestamp };
    });

    setSections(sectionsWithTimestamps);
    setTotalDuration(formatTime(currentTime));
  }, [script]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const parseTime = (timeStr: string): number => {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const handleSectionUpdate = (
    index: number,
    updatedSection: Partial<ScriptSection>
  ) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], ...updatedSection };

    // Recalculate timestamps if duration changed
    if (updatedSection.duration) {
      let currentTime = 0;
      newSections.forEach((section, i) => {
        section.timestamp = formatTime(currentTime);
        const [minutes, seconds] = section.duration?.split(":").map(Number) || [
          0, 30,
        ];
        currentTime += minutes * 60 + seconds;
      });
      setTotalDuration(formatTime(currentTime));
    }

    setSections(newSections);

    // Reconstruct the full script
    const updatedScript = newSections
      .map((section) => `[${section.type}] ${section.content}`)
      .join("\n");
    onScriptUpdate(updatedScript);
  };

  const addNewSection = (type: string) => {
    const newSection: ScriptSection = {
      type,
      content: "",
      duration:
        SECTION_TYPES[type as keyof typeof SECTION_TYPES]?.defaultDuration ||
        "0:30",
      timestamp: "0:00", // Will be recalculated
    };

    const newSections = [...sections, newSection];

    // Recalculate timestamps
    let currentTime = 0;
    newSections.forEach((section) => {
      section.timestamp = formatTime(currentTime);
      const [minutes, seconds] = section.duration?.split(":").map(Number) || [
        0, 30,
      ];
      currentTime += minutes * 60 + seconds;
    });

    setSections(newSections);
    setTotalDuration(formatTime(currentTime));
  };

  const deleteSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);

    const updatedScript = newSections
      .map((section) => `[${section.type}] ${section.content}`)
      .join("\n");
    onScriptUpdate(updatedScript);
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [
      newSections[index],
      newSections[index - 1],
    ];
    setSections(newSections);
  };

  const moveSectionDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [
      newSections[index + 1],
      newSections[index],
    ];
    setSections(newSections);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit & Customize Script</CardTitle>
          <CardDescription>
            Total Duration: {totalDuration} • {sections.length} Sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                {Object.entries(SECTION_TYPES).map(([type, info]) => (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => addNewSection(type)}
                    title={info.description}
                  >
                    Add {info.label}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {sections.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className="hover:bg-muted/50 px-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {section.timestamp}
                        </span>
                        <span>
                          {SECTION_TYPES[
                            section.type as keyof typeof SECTION_TYPES
                          ]?.label || section.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSectionUp(index);
                          }}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSectionDown(index);
                          }}
                          disabled={index === sections.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSection(index);
                          }}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Section Type</Label>
                          <Select
                            value={section.type}
                            onValueChange={(value) =>
                              handleSectionUpdate(index, { type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(SECTION_TYPES).map(
                                ([type, info]) => (
                                  <SelectItem key={type} value={type}>
                                    {info.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            type="text"
                            value={section.duration}
                            onChange={(e) =>
                              handleSectionUpdate(index, {
                                duration: e.target.value,
                              })
                            }
                            placeholder="0:30"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Content</Label>
                        <Textarea
                          value={section.content}
                          onChange={(e) =>
                            handleSectionUpdate(index, {
                              content: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {
                          SECTION_TYPES[
                            section.type as keyof typeof SECTION_TYPES
                          ]?.description
                        }
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {showPreview && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Script Preview</CardTitle>
                  <CardDescription>
                    Total Duration: {totalDuration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
                    {sections
                      .map(
                        (section) =>
                          `[${section.timestamp}] [${section.type}] ${section.content}`
                      )
                      .join("\n\n")}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
