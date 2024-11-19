'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Witehatz Logo"
                width={300}
                height={100}
                className="h-20 w-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="https://www.witehatz.com" 
              className="text-gray-600 hover:text-black transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Return to Witehatz.com
            </a>
            <Link href="/blog" className="text-gray-600 hover:text-black transition-colors">
              All Posts
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
              <a
                href="https://www.witehatz.com"
                className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Return to Witehatz.com
              </a>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                All Posts
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 