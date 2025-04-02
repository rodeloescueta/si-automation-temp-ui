import { AttioErrorResponse, AttioRecord } from "@/types/attio";

/**
 * Fetch a record from Attio by ID
 */
export async function fetchAttioRecord(id: string): Promise<AttioRecord> {
  const response = await fetch(`/api/attio/records/${id}`);

  if (!response.ok) {
    const errorData: AttioErrorResponse = await response.json();
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Helper function to extract a field value from an Attio record
 */
export function getFieldValue<
  T = string | number | boolean | null | Record<string, unknown>
>(record: AttioRecord, fieldName: string): T | null {
  if (
    !record?.fields ||
    !record.fields[fieldName as keyof typeof record.fields]
  ) {
    return null;
  }

  return (
    (record.fields[fieldName as keyof typeof record.fields]?.value as T) || null
  );
}

/**
 * Helper function to extract a field display value from an Attio record
 */
export function getFieldDisplayValue(
  record: AttioRecord,
  fieldName: string
): string | null {
  if (
    !record?.fields ||
    !record.fields[fieldName as keyof typeof record.fields]
  ) {
    return null;
  }

  return (
    record.fields[fieldName as keyof typeof record.fields]?.display_value ||
    null
  );
}
