import { getPostBySlug, getAllPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Post } from '@/types/blog';
import Header from '@/components/Header';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.witehatz.com';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: `${post.title} | Witehatz Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Witehatz'],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/og-image.jpg'],
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post: Post = await getPostBySlug(params.slug);
  
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <header className="mb-8">
            <div className="mb-6">
              <time className="text-gray-500 text-sm">{formatDate(post.date)}</time>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 [text-wrap:balance]">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {post.coverImage && (
              <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          <div 
            className="prose prose-lg prose-blue max-w-none prose-img:rounded-xl prose-headings:[text-wrap:balance] 
            prose-h1:text-3xl prose-h1:sm:text-4xl
            prose-h2:text-2xl prose-h2:sm:text-3xl
            prose-h3:text-xl prose-h3:sm:text-2xl
            prose-p:text-gray-600 prose-p:[text-wrap:pretty]
            prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Share buttons */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <a 
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-blue-500 transition-colors"
              >
                Share on X
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 