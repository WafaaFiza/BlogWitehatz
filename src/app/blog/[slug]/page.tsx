import { getPostBySlug, getAllPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Post } from '@/types/blog';
import Header from '@/components/Header';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

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

  const siteUrl = 'https://your-vercel-domain.vercel.app'; // Update this with your actual domain

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900">{post.title}</span>
            </li>
          </ol>
        </nav>

        <article className="prose prose-lg max-w-none">
          <header className="not-prose mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <time className="text-gray-500">{formatDate(post.date)}</time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {post.coverImage && (
              <div className="relative aspect-[2/1] mb-8 rounded-xl overflow-hidden">
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

          <TableOfContents content={post.content} />
          
          <div 
            className="prose prose-lg prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Share this article:
              <div className="flex gap-4 mt-2">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteUrl}/blog/${post.slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-500"
                >
                  Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://blog.witehatz.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-700"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 