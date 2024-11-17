export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
} 