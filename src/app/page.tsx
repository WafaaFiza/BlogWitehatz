import { getAllPosts } from '@/lib/api';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Post } from '@/types/blog';
import Image from 'next/image';
import Header from '@/components/Header';

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 6);
  const remainingPosts = posts.slice(6);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section with Modern Grid Pattern */}
        <div className="relative bg-white overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          
          <div className="relative">
            <div className="absolute -top-36 -left-36 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
            <div className="absolute -top-36 -right-36 w-96 h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-36 left-1/2 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 [text-wrap:balance]">
                  Witehatz Blog
                </h1>
                <p className="text-xl text-gray-600 mb-6 [text-wrap:balance]">
                  Exploring the frontiers of cybersecurity, cloud computing, and enterprise technology.
                  Stay ahead with our expert insights and practical guides.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-white">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
                    Zero Trust Security
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
                    Cloud Infrastructure
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
                    AI in Cybersecurity
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-900 border border-gray-800">
                    Remote Work Security
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Posts - Bento Box Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <div 
                key={post.slug}
                className={`group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100
                  ${index === 0 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[300px]'}`}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={`/images/posts/${post.slug}.jpg`}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <time className="text-sm text-gray-300 mb-2">{formatDate(post.date)}</time>
                      <h3 className={`font-bold text-white mb-2 group-hover:text-blue-200 transition-colors ${
                        index === 0 ? 'text-2xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Only show Latest Posts section if there are remaining posts */}
        {remainingPosts.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Insights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <article 
                    key={post.slug} 
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={`/images/posts/${post.slug}.jpg`}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <time className="text-sm text-gray-500 mb-2 block">{formatDate(post.date)}</time>
                      <Link href={`/blog/${post.slug}`} className="group">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      </Link>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-700"
                      >
                        Read article
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer - Simplified */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Witehatz</h3>
              <p className="text-sm">
                A modern blog about technology and development.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-sm">
                blog@witehatz.com
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-white">Twitter</a>
                <a href="#" className="hover:text-white">GitHub</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © {new Date().getFullYear()} Witehatz. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
