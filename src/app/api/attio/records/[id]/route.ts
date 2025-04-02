import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Record ID is required" },
        { status: 400 }
      );
    }

    // Use the awaited ID
    const recordId = id;

    if (!process.env.ATTIO_API_TOKEN) {
      return NextResponse.json(
        { message: "Attio API token not configured" },
        { status: 500 }
      );
    }

    const workspaceId = process.env.ATTIO_WORKSPACE_ID;
    const objectType = process.env.ATTIO_OBJECT_TYPE;

    if (!workspaceId || !objectType) {
      return NextResponse.json(
        { message: "Attio workspace or object type not configured" },
        { status: 500 }
      );
    }

    // Use the correct Attio API v2 endpoint format per the documentation
    // GET https://api.attio.com/v2/objects/{object}/records/{record_id}
    const apiUrl = `${process.env.NEXT_PUBLIC_ATTIO_API_URL}/objects/${objectType}/records/${recordId}`;

    console.log(`Fetching from Attio API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.ATTIO_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
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
            `Failed to fetch record from Attio: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Attio record:", error);
    return NextResponse.json(
      { message: "Failed to fetch record from Attio" },
      { status: 500 }
    );
  }
}
