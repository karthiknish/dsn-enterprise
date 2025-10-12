import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/brevo";
import { rateLimit } from "@/lib/rateLimit";

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Initialize Contentful environment variables
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulManagementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Security headers for all responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// Enhanced email template with better branding
const generateEmailTemplate = (contactData) => {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .field-label { font-weight: bold; color: #1e40af; margin-bottom: 5px; }
          .field-value { background: white; padding: 10px; border-left: 4px solid #1e40af; border-radius: 4px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          .timestamp { background: #fef3c7; padding: 10px; border-radius: 4px; text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>DSN Enterprises - Precision Gauges & Tools</p>
        </div>
        <div class="content">
          <div class="timestamp">
            <strong>📅 Submitted on:</strong> ${timestamp}
          </div>
          
          <div class="field">
            <div class="field-label">👤 Name:</div>
            <div class="field-value">${contactData.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">📧 Email:</div>
            <div class="field-value">
              <a href="mailto:${contactData.email}" style="color: #1e40af;">${contactData.email}</a>
            </div>
          </div>
          
          <div class="field">
            <div class="field-label">📞 Phone:</div>
            <div class="field-value">${contactData.phone || "Not provided"}</div>
          </div>
          
          <div class="field">
            <div class="field-label">🏢 Company:</div>
            <div class="field-value">${contactData.company || "Not provided"}</div>
          </div>
          
          <div class="field">
            <div class="field-label">🔧 Product Interest:</div>
            <div class="field-value">${contactData.productInterest || "Not specified"}</div>
          </div>
          
          <div class="field">
            <div class="field-label">💬 Message:</div>
            <div class="field-value" style="white-space: pre-line;">${contactData.message}</div>
          </div>
        </div>
        <div class="footer">
          <p><em>This email was sent from the DSN Enterprises contact form</em></p>
          <p>DSN Enterprises | Precision Gauge Manufacturers | Coimbatore, India</p>
        </div>
      </body>
      </html>
    `,
    text: `
NEW CONTACT FORM SUBMISSION - DSN ENTERPRISES
================================================

Submitted: ${timestamp}

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || "Not provided"}
Company: ${contactData.company || "Not provided"}
Product Interest: ${contactData.productInterest || "Not specified"}

Message:
${contactData.message}

---
DSN Enterprises | Precision Gauge Manufacturers
Coimbatore, India
    `
  };
};

export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': '60'
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400, headers: securityHeaders }
      );
    }

    console.log("Received contact form submission:", { ...body, email: body.email ? '[REDACTED]' : 'MISSING' });

    // Ensure environment variables are available
    if (!contentfulSpaceId || !contentfulManagementToken) {
      console.error("Contentful environment variables are missing!");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500, headers: securityHeaders }
      );
    }

    // Enhanced validation with specific error messages
    const validationErrors = {};

    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      validationErrors.name = "Name is required and must be a valid string";
    } else if (body.name.trim().length < 2) {
      validationErrors.name = "Name must be at least 2 characters long";
    } else if (body.name.trim().length > 100) {
      validationErrors.name = "Name must be less than 100 characters";
    }

    if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
      validationErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email.trim())) {
        validationErrors.email = "Please enter a valid email address";
      } else if (body.email.trim().length > 254) {
        validationErrors.email = "Email address is too long";
      }
    }

    if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
      validationErrors.message = "Message is required";
    } else if (body.message.trim().length < 10) {
      validationErrors.message = "Message must be at least 10 characters long";
    } else if (body.message.trim().length > 2000) {
      validationErrors.message = "Message must be less than 2000 characters";
    }

    if (body.phone) {
      if (typeof body.phone !== 'string') {
        validationErrors.phone = "Phone number must be a string";
      } else {
        const phoneRegex = /^[\d\s\+\-\(\)]{6,20}$/;
        if (!phoneRegex.test(body.phone.trim())) {
          validationErrors.phone = "Please enter a valid phone number (6-20 digits, +, -, () allowed)";
        }
      }
    }

    if (body.company && typeof body.company === 'string' && body.company.trim().length > 200) {
      validationErrors.company = "Company name must be less than 200 characters";
    }

    if (body.productInterest && typeof body.productInterest === 'string' && body.productInterest.trim().length > 100) {
      validationErrors.productInterest = "Product interest must be less than 100 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed:", validationErrors);
      return NextResponse.json(
        {
          error: "Validation failed",
          validationErrors,
        },
        { status: 400, headers: securityHeaders }
      );
    }

    // Sanitize and format the data
    const contactData = {
      name: body.name.trim().replace(/[<>]/g, ''),
      email: body.email.trim().toLowerCase().replace(/[<>]/g, ''),
      phone: body.phone ? body.phone.trim().replace(/[<>]/g, '') : "",
      company: body.company ? body.company.trim().replace(/[<>]/g, '') : "",
      message: body.message.trim().replace(/[<>]/g, ''),
      productInterest: body.productInterest ? body.productInterest.trim().replace(/[<>]/g, '') : "",
    };

    console.log("Attempting to create Contentful entry for:", { name: contactData.name, email: '[REDACTED]' });

    // Create entry in Contentful (dynamic import to prevent build-time execution)
    const { createContactEntry } = await import("@/lib/contentful");
    const entry = await createContactEntry(contactData);

    if (!entry || !entry.sys) {
      console.error("Failed to create Contentful entry - no entry returned");
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500, headers: securityHeaders }
      );
    }

    console.log("Successfully saved contact to Contentful with ID:", entry.sys.id);

    // Generate email content
    const emailContent = generateEmailTemplate(contactData);

    // Send notification emails to admins
    const adminEmails = [
      { email: "microfin2001@gmail.com", name: "DSN Enterprises Admin" },
    ];

    const emailPromises = adminEmails.map(admin => 
      sendEmail({
        to: admin.email,
        toName: admin.name,
        subject: `New Contact: ${contactData.name} - DSN Enterprises`,
        htmlContent: emailContent.html,
        textContent: emailContent.text,
      }).catch(emailError => {
        console.error(`Failed to send email to ${admin.email}:`, emailError);
        // Don't throw - continue with other emails
        return null;
      })
    );

    try {
      await Promise.allSettled(emailPromises);
      console.log("Email notifications processed");
    } catch (emailError) {
      console.error("Error processing email notifications:", emailError);
      // Continue even if email fails - the contact is saved
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        entryId: entry.sys.id,
      },
      { 
        status: 201,
        headers: securityHeaders
      }
    );

  } catch (error) {
    console.error("Unexpected error in contact API:", error);

    // Check for specific Contentful errors
    if (error.name === "AccessTokenInvalid") {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503, headers: securityHeaders }
      );
    }

    if (error.name === "ValidationFailed") {
      return NextResponse.json(
        { error: "Invalid data format. Please check your input and try again." },
        { status: 400, headers: securityHeaders }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { 
        status: 500,
        headers: securityHeaders
      }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: securityHeaders }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: securityHeaders }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: securityHeaders }
  );
}
