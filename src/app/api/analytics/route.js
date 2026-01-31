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
    const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf8'));

    // Fix private key formatting issue (literal \n vs real newlines)
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }

    // Authenticate using the credentials object
    const client = new BetaAnalyticsDataClient({
      credentials,
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
