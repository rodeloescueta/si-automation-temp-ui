import fs from "fs";
import path from "path";
import { cache } from "react";

export interface TemplateVariable {
  name: string;
  value: string | number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
}

// Cache the template loading to improve performance
export const loadTemplates = cache(async (): Promise<Template[]> => {
  const templatesDir = path.join(process.cwd(), "src/templates/pitch");
  const files = fs.readdirSync(templatesDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const content = fs.readFileSync(path.join(templatesDir, file), "utf-8");
      const id = file.replace(".md", "");
      const name = id.charAt(0).toUpperCase() + id.slice(1);

      return {
        id,
        name,
        content,
      };
    });
});
