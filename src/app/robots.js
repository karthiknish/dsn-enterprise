const BASE_URL = 'https://dsnenterprises.in';

export default function robots() {
  return {
    host: BASE_URL,
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
