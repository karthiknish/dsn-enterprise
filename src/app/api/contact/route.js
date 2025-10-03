import { NextResponse } from "next/server";
import { createContactEntry } from "@/lib/contentful";
import { sendEmail } from "@/lib/brevo";
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

    // Validate required fields with specific error messages
    const validationErrors = {};

    if (!body.name || body.name.trim() === "") {
      validationErrors.name = "Name is required";
    }

    if (!body.email || body.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!body.message || body.message.trim() === "") {
      validationErrors.message = "Message is required";
    }

    if (body.phone && !/^[0-9+\-\s()]{6,20}$/.test(body.phone)) {
      validationErrors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed:", validationErrors);
      return NextResponse.json(
        {
          error: "Validation failed",
          validationErrors,
        },
        { status: 400 }
      );
    }

    // Format the data for Contentful
    const contactData = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone ? body.phone.trim() : "",
      company: body.company ? body.company.trim() : "",
      message: body.message.trim(),
      productInterest: body.productInterest ? body.productInterest.trim() : "",
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

    // Send confirmation email to admins
    try {
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${
          contactData.company || "Not provided"
        }</p>
        <p><strong>Product Interest:</strong> ${
          contactData.productInterest || "Not specified"
        }</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `;

      // Send to first admin
      await sendEmail({
        to: "microfin2001@gmail.com",
        toName: "DSN Enterprises Admin",
        subject: "New Contact Form Submission - DSN Enterprises",
        htmlContent: emailHtml,
        textContent: `New Contact Form Submission from ${contactData.name} (${contactData.email})`,
      });

      // Send to second admin
      await sendEmail({
        to: "microfin2001@gmail.com",
        toName: "DSN Enterprises Admin",
        subject: "New Contact Form Submission - DSN Enterprises",
        htmlContent: emailHtml,
        textContent: `New Contact Form Submission from ${contactData.name} (${contactData.email})`,
      });

      console.log("Confirmation emails sent to admins successfully");
    } catch (emailError) {
      console.error("Error sending confirmation emails:", emailError);
      // Continue with the response even if email sending fails
    }

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
