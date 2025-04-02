import { NextResponse } from "next/server";
import { loadTemplates } from "@/lib/server/template";

export async function GET() {
  try {
    const templates = await loadTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error loading templates:", error);
    return NextResponse.json(
      { message: "Failed to load templates" },
      { status: 500 }
    );
  }
}
