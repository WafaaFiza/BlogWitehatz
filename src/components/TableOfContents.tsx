'use client';

import { useState, useEffect } from 'react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  text: string;
  level: number;
  id: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(content, 'text/html');
      const headingElements = doc.querySelectorAll('h2, h3');
      
      const headingsArray: Heading[] = Array.from(headingElements).map((heading) => ({
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
        id: heading.id,
      }));

      setHeadings(headingsArray);
    }
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-lg font-semibold">Table of Contents</h2>
        <span className="transform transition-transform duration-200">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && (
        <nav className="mt-4">
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`${
                  heading.level === 3 ? 'ml-4' : ''
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-gray-600 hover:text-gray-900"
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