export interface TemplateVariable {
  name: string;
  value: string | number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
}

import { AttioRecord } from "@/types/attio";

export const replaceVariables = (
  template: string,
  data: Record<string, unknown>
): string => {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const value = key
      .split(".")
      .reduce(
        (obj: Record<string, unknown>, k: string) =>
          obj && typeof obj === "object"
            ? (obj[k] as Record<string, unknown>)
            : undefined,
        data
      );
    return value !== undefined ? String(value) : match;
  });
};

export const extractVariables = (template: string): string[] => {
  const matches = template.match(/\{\{([^}]+)\}\}/g) || [];
  return matches.map((match) => match.slice(2, -2));
};

export const formatAttioData = (data: AttioRecord): Record<string, unknown> => {
  const formatted: Record<string, unknown> = {};

  // Handle the actual Attio API response structure
  if (data?.values) {
    // Iterate through all fields in the values object
    Object.entries(data.values).forEach(([key, fieldArray]) => {
      // Check if the field has values (is an array with at least one item)
      if (Array.isArray(fieldArray) && fieldArray.length > 0) {
        // Use the first value in the array (most recent)
        const field = fieldArray[0];
        if (field && "value" in field) {
          formatted[key] = field.value;
        }
      }
    });
  }

  // Add ID information if available
  if (data?.id) {
    formatted.id = data.id;
  }

  return formatted;
};
