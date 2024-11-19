import { getAllPosts } from '@/lib/api';

export default async function sitemap() {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.witehatz.com';

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  const routes = ['', '/blog', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...postUrls];
} 