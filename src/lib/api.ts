import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import { Post } from '@/types/blog';

const postsDirectory = join(process.cwd(), '_posts');

// Create markdown parser instance outside of functions
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(anchor, {
  permalink: anchor.permalink.ariaHidden({
    symbol: `<svg class="anchor-icon ml-2 h-4 w-4 opacity-0 group-hover:opacity-100" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path fillRule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
            </svg>`,
    placement: 'before',
    class: 'group'
  }),
  level: [1, 2, 3]
});

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    content: md.render(content),
    coverImage: data.coverImage || null,
  };
}

export function getAllPosts(): Post[] {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => /\.md$/.test(slug))
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
} 