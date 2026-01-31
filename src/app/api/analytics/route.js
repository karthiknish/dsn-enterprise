import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// Note: Ensure the service account JSON has access to your GA4 property
const propertyId = process.env.GA_PROPERTY_ID;
const credentialsBase64 = process.env.GOOGLE_SERVICES_JSON_BASE64;

export async function GET() {
  if (!propertyId) {
    return NextResponse.json(
      { error: 'GA_PROPERTY_ID is not configured' },
      { status: 500 }
    );
  }

  if (!credentialsBase64) {
    return NextResponse.json(
      { error: 'GOOGLE_SERVICES_JSON_BASE64 is not configured' },
      { status: 500 }
    );
  }

  try {
    // Parse credentials from Base64 environment variable
    // Clean the base64 string from potential quotes or whitespace
    const cleanBase64 = credentialsBase64.trim().replace(/^"|"$/g, '');
    const credentials = JSON.parse(Buffer.from(cleanBase64, 'base64').toString('utf8'));

    // The private_key needs to have real newlines. 
    // If it was parsed from JSON, it should already have them.
    // However, some env parsers might have messed them up.
    let privateKey = credentials.private_key;
    if (privateKey && typeof privateKey === 'string') {
      // Ensure literal \n are replaced with real newlines just in case
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    // Authenticate using the credentials object
    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: privateKey,
      },
      projectId: credentials.project_id,
    });

    // Run a report for basic metrics
    const [response] = await client.runReport({
      property: `properties/${propertyId.replace('properties/', '')}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'sessions',
        },
        {
          name: 'screenPageViews',
        },
        {
          name: 'bounceRate',
        },
      ],
    });

    // Run a second report for top pages
    const [topPagesResponse] = await client.runReport({
      property: `properties/${propertyId.replace('properties/', '')}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
      limit: 10,
    });

    return NextResponse.json({
      report: response,
      topPages: topPagesResponse,
    });
  } catch (error) {
    console.error('GA Data API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
