/**
 * Brevo (formerly Sendinblue) API integration for sending emails
 */

// API key from environment variables
const BREVO_API_KEY = process.env.BREVO_API_KEY;

/**
 * Sends an email using the Brevo API
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.toName - Recipient name
 * @param {string} options.subject - Email subject
 * @param {string} options.htmlContent - HTML content of the email
 * @param {string} options.textContent - Plain text content of the email
 * @returns {Promise<Object>} - Response from Brevo API
 */
export async function sendEmail({
  to,
  toName,
  subject,
  htmlContent,
  textContent,
}) {
  if (!BREVO_API_KEY) {
    throw new Error("Brevo API key is not configured");
  }

  const url = "https://api.sendinblue.com/v3/smtp/email";

  const payload = {
    sender: {
      name: "DSN Enterprises",
      email: "noreply@dsnenterprises.in",
    },
    to: [
      {
        email: to,
        name: toName || to,
      },
    ],
    subject: subject,
    htmlContent: htmlContent,
    textContent: textContent || "",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Brevo API error: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    throw error;
  }
}
