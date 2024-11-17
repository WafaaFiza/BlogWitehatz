import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link 
              href="/"
              className="flex items-center"
            >
              <Image
                src="/images/logo.png"
                alt="Witehatz Logo"
                width={200}
                height={67}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 