"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecordIdInput } from "@/components/features/record-id-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { fetchAttioRecord } from "@/lib/api/attio";
import { AttioRecord } from "@/types/attio";

export default function PitchTemplateGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [recordData, setRecordData] = useState<AttioRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (recordId: string) => {
    setIsLoading(true);
    setError(null);
    setRecordData(null);

    try {
      // Add loading delay to improve UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = await fetchAttioRecord(recordId);
      setRecordData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching record:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pitch Template Generator</CardTitle>
          <CardDescription>
            Generate personalized pitch templates using Attio CRM data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Enter an Attio lead record ID to fetch the data and generate a
              pitch template
            </p>
            <RecordIdInput onSearch={handleSearch} isLoading={isLoading} />
            <p className="text-xs text-muted-foreground mt-2">
              Example Lead ID: b5659af3-3418-4f62-aede-748aec4b73f3
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {recordData && (
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Lead Data:</h3>
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(recordData, null, 2)}
                </pre>
              </div>

              {/* We'll add the template generation here in the future */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
