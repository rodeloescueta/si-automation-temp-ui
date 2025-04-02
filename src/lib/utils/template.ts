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

  // Handle nested fields structure from Attio API
  if (data?.fields) {
    Object.entries(data.fields).forEach(([key, field]) => {
      if (field && "value" in field) {
        formatted[key] = field.value;
      }
    });
  }

  return formatted;
};
