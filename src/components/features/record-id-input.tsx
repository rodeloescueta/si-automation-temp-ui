"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RecordIdInputProps {
  onSearch: (recordId: string) => void;
  isLoading?: boolean;
}

export function RecordIdInput({
  onSearch,
  isLoading = false,
}: RecordIdInputProps) {
  const [recordId, setRecordId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordId.trim()) {
      onSearch(recordId.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Enter Attio Record ID"
        value={recordId}
        onChange={(e) => setRecordId(e.target.value)}
      />
      <Button type="submit" disabled={isLoading || !recordId.trim()}>
        {isLoading ? "Loading..." : "Search"}
      </Button>
    </form>
  );
}
