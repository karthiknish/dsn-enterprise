import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { generateProductCityPages, generateServiceCityPages } from '@/lib/seo-pages.config';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600; // Revalidate every hour


async function getBlogPosts() {
  try {
    const blogRef = collection(db, 'blogs');
    const q = query(
      blogRef,
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      slug: doc.data().slug,
      updatedAt:
        doc.data().updatedAt?.toDate?.() ||
        doc.data().createdAt?.toDate?.() ||
        new Date(),
    }));
  } catch (_error) {
    // Return empty array if Firebase is not accessible
    console.log('Sitemap: Unable to fetch blog posts, continuing without them');
    return [];
  }
}

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products/plain-gauges`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/products/thread-gauges`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/products/api-gauges`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/products/special-gauges`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/industries`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/quality`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calibration`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/resources`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  const blogPosts = await getBlogPosts();
  const blogPages = blogPosts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Product-City SEO pages
  const productCityPages = generateProductCityPages().map(page => ({
    url: `${SITE_URL}/products/${page.product}-${page.city}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Service-City SEO pages
  const serviceCityPages = generateServiceCityPages().map(page => ({
    url: `${SITE_URL}/services/${page.service}-${page.city}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...productCityPages, ...serviceCityPages];
}
