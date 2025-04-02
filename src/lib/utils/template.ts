export interface TemplateVariable {
  name: string;
  value: string | number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
}

export const replaceVariables = (
  template: string,
  data: Record<string, any>
): string => {
  return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const value = key
      .split(".")
      .reduce((obj: any, k: string) => obj?.[k], data);
    return value !== undefined ? String(value) : match;
  });
};

export const extractVariables = (template: string): string[] => {
  const matches = template.match(/\{\{([^}]+)\}\}/g) || [];
  return matches.map((match) => match.slice(2, -2));
};

export const formatAttioData = (data: any): Record<string, any> => {
  const formatted: Record<string, any> = {};

  // Handle nested values structure from Attio API
  if (data?.values) {
    Object.entries(data.values).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value) && value.length > 0) {
        formatted[key] = value[0].value;
      }
    });
  }

  return formatted;
};
