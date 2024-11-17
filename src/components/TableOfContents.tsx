'use client';

import { useState } from 'react';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Extract headings from HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2, h3')).map(heading => ({
    level: parseInt(heading.tagName[1]),
    text: heading.textContent || '',
    slug: heading.id
  }));

  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-xl font-bold text-gray-900">Table of Contents</h2>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <nav className="mt-4">
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`${heading.level === 3 ? 'ml-4' : ''}`}
              >
                <a
                  href={`#${heading.slug}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
} 