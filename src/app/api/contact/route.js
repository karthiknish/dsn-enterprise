import { NextResponse } from "next/server";
import { createContactEntry } from "@/lib/contentful";

// Initialize Contentful environment variables
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulManagementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

console.log("API route environment check:", {
  contentfulSpaceIdDefined: !!contentfulSpaceId,
  contentfulManagementTokenDefined: !!contentfulManagementToken,
});

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log("Received contact form submission:", body);

    // Ensure environment variables are available
    if (!contentfulSpaceId || !contentfulManagementToken) {
      console.error("Contentful environment variables are missing!");
      return NextResponse.json(
        { error: "Server configuration error: Missing Contentful credentials" },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      console.log("Validation failed: missing required fields");
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Format the data for Contentful
    const contactData = {
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      company: body.company || "",
      message: body.message,
      productInterest: body.productInterest || "",
    };

    console.log("Attempting to create Contentful entry:", contactData);

    // Create entry in Contentful
    const entry = await createContactEntry(contactData);

    if (!entry || !entry.sys) {
      return NextResponse.json(
        { error: "Failed to create entry in Contentful" },
        { status: 500 }
      );
    }

    console.log(
      "Successfully saved contact to Contentful with ID:",
      entry.sys.id
    );

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Contact information saved successfully",
        entryId: entry.sys.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);

    // Check for specific Contentful errors
    if (error.name === "AccessTokenInvalid") {
      return NextResponse.json(
        { error: "Invalid Contentful access token" },
        { status: 401 }
      );
    }

    if (error.name === "ValidationFailed") {
      return NextResponse.json(
        { error: "Contentful validation failed", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
