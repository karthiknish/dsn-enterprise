import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

// Note: Ensure the service account JSON has access to your GA4 property
const propertyId = process.env.GA_PROPERTY_ID;
const credentialsBase64 = process.env.GOOGLE_SERVICES_JSON_BASE64;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d';
  
  const dateRangeMap = {
    '7d': '7daysAgo',
    '30d': '30daysAgo',
    '90d': '90daysAgo',
  };
  
  const startDate = dateRangeMap[period] || '30daysAgo';

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
    const cleanBase64 = credentialsBase64.trim().replace(/^"|"$/g, '');
    const credentials = JSON.parse(Buffer.from(cleanBase64, 'base64').toString('utf8'));

    let privateKey = credentials.private_key;
    if (privateKey && typeof privateKey === 'string') {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: privateKey,
      },
      projectId: credentials.project_id,
    });

    // 1. Total Metrics for the period
    const [totalResponse] = await client.runReport({
      property: `properties/${propertyId.replace('properties/', '')}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
      ],
    });

    // 2. Daily Trends for Graph
    const [trendResponse] = await client.runReport({
      property: `properties/${propertyId.replace('properties/', '')}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    // 3. Top Pages
    const [topPagesResponse] = await client.runReport({
      property: `properties/${propertyId.replace('properties/', '')}`,
      dateRanges: [{ startDate, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 10,
    });

    return NextResponse.json({
      metrics: totalResponse.rows?.[0]?.metricValues || [],
      trends: trendResponse.rows || [],
      topPages: topPagesResponse.rows || [],
    });
  } catch (error) {
    console.error('GA Data API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
