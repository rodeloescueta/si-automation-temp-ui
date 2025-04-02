import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.ATTIO_API_TOKEN) {
      return NextResponse.json(
        { message: "Attio API token not configured" },
        { status: 500 }
      );
    }

    // Get the list of objects from Attio API
    const apiUrl = `${process.env.NEXT_PUBLIC_ATTIO_API_URL}/objects`;

    console.log(`Fetching Attio objects from API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.ATTIO_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Failed to parse error response" }));
      console.error("Attio API error:", error);
      return NextResponse.json(
        {
          message:
            error.message ||
            `Failed to fetch objects from Attio: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Attio objects:", error);
    return NextResponse.json(
      { message: "Failed to fetch objects from Attio" },
      { status: 500 }
    );
  }
}
