"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  Template,
  formatAttioData,
  replaceVariables,
} from "@/lib/utils/template";

export default function PitchTemplateGenerator() {
  const [recordId, setRecordId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [generatedContent, setGeneratedContent] = useState<string>("");

  // Load templates on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates");
        if (!response.ok) throw new Error("Failed to load templates");
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error loading templates:", error);
        setError("Failed to load templates");
      }
    };

    fetchTemplates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/attio/records/${recordId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch record");
      }

      setData(result.data);

      // If there's a selected template, generate content
      if (selectedTemplate) {
        const formattedData = formatAttioData(result.data);
        const content = replaceVariables(
          selectedTemplate.content,
          formattedData
        );
        setGeneratedContent(content);
      }
    } catch (error) {
      console.error("Error fetching record:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    if (data) {
      const formattedData = formatAttioData(data);
      const content = replaceVariables(template.content, formattedData);
      setGeneratedContent(content);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Pitch Template Generator</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="recordId" className="block text-sm font-medium mb-2">
            Attio Lead Record ID
          </label>
          <div className="flex gap-2">
            <Input
              id="recordId"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              placeholder="e.g., b5659af3-3418-4f62-aede-748aec4b73f3"
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Fetch Data"}
            </Button>
          </div>
        </div>
      </form>

      {error && (
        <Alert variant="destructive">
          <p>{error}</p>
        </Alert>
      )}

      {data && (
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Select Template</h2>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  variant={
                    selectedTemplate?.id === template.id ? "default" : "outline"
                  }
                  className="h-auto py-4"
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </Card>

          {selectedTemplate && (
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
              <div className="whitespace-pre-wrap font-mono bg-muted p-4 rounded">
                {generatedContent}
              </div>
            </Card>
          )}

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Lead Data</h2>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
