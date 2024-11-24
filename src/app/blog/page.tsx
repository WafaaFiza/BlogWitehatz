import { getAllPosts } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Posts</h1>
          <p className="text-lg text-gray-600">
            Explore our latest articles and insights
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              {post.coverImage && (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <time className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</time>
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                </Link>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-700 mt-4"
                >
                  Read more
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
} 