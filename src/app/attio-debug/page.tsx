"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AttioRecord } from "@/types/attio";

interface AttioObject {
  id: string;
  name: string;
  slug: string;
  workspace_id: string;
}

export default function AttioDebug() {
  const [objects, setObjects] = useState<AttioObject[] | null>(null);
  const [isLoadingObjects, setIsLoadingObjects] = useState(false);
  const [objectsError, setObjectsError] = useState<string | null>(null);

  const [recordId, setRecordId] = useState<string>(
    "b5659af3-3418-4f62-aede-748aec4b73f3"
  );
  const [record, setRecord] = useState<AttioRecord | null>(null);
  const [isLoadingRecord, setIsLoadingRecord] = useState(false);
  const [recordError, setRecordError] = useState<string | null>(null);

  const fetchObjects = async () => {
    setIsLoadingObjects(true);
    setObjectsError(null);

    try {
      const response = await fetch("/api/attio/objects");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      setObjects(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setObjectsError(errorMessage);
      console.error("Error fetching objects:", err);
    } finally {
      setIsLoadingObjects(false);
    }
  };

  const fetchRecord = async () => {
    if (!recordId.trim()) return;

    setIsLoadingRecord(true);
    setRecordError(null);
    setRecord(null);

    try {
      const response = await fetch(`/api/attio/records/${recordId.trim()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      setRecord(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setRecordError(errorMessage);
      console.error("Error fetching record:", err);
    } finally {
      setIsLoadingRecord(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Attio API Debug</CardTitle>
          <CardDescription>
            Test and debug the Attio API configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">API Configuration</h3>
            <p className="text-sm mb-4">
              <strong>API URL:</strong>{" "}
              {process.env.NEXT_PUBLIC_ATTIO_API_URL || "Not configured"}
              <br />
              <strong>Object Type:</strong>{" "}
              {process.env.ATTIO_OBJECT_TYPE ||
                "Using server environment variable (leads)"}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Available Objects</h3>
              <Button onClick={fetchObjects} disabled={isLoadingObjects}>
                {isLoadingObjects ? "Loading..." : "Fetch Objects"}
              </Button>

              {objectsError && (
                <Alert variant="destructive" className="mt-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{objectsError}</AlertDescription>
                </Alert>
              )}

              {objects && (
                <div className="mt-4">
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(objects, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Test Record Fetch</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={recordId}
                  onChange={(e) => setRecordId(e.target.value)}
                  placeholder="Enter record ID"
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button onClick={fetchRecord} disabled={isLoadingRecord}>
                  {isLoadingRecord ? "Loading..." : "Fetch Record"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Example Lead ID: b5659af3-3418-4f62-aede-748aec4b73f3
              </p>

              {recordError && (
                <Alert variant="destructive" className="mt-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{recordError}</AlertDescription>
                </Alert>
              )}

              {record && (
                <div className="mt-4">
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-auto text-sm">
                    {JSON.stringify(record, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
