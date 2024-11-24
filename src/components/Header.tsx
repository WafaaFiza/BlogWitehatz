'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center font-bold text-xl">
              Witehatz
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link href="/blog" className="inline-flex items-center px-1 pt-1 text-gray-900">
              Blog
            </Link>
            <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 