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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Posts</h1>
          <p className="text-lg text-gray-600">
            Explore our latest articles and insights
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col md:flex-row h-40"
            >
              <div className="md:w-48 relative">
                <div className="h-full">
                  <Image
                    src={`/images/posts/${post.slug}.jpg`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-1">
                    <time>{formatDate(post.date)}</time>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{post.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-700"
                  >
                    Read more
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
} 