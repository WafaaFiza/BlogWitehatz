import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from 'next/image';

const proximaNova = localFont({
  src: './fonts/Proxima Nova Font.otf',
  variable: '--font-proxima-nova',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.witehatz.com'),
  title: "Witehatz Blog - Cybersecurity & Technology Insights",
  description: "Expert insights on cybersecurity, cloud computing, and enterprise technology. Stay ahead with practical guides and industry analysis.",
  keywords: "cybersecurity, cloud computing, technology blog, enterprise security, tech insights",
  authors: [{ name: "Witehatz Team" }],
  robots: "index, follow",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.witehatz.com',
  },
  icons: {
    icon: '/favicon.ico?v=1',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Witehatz Blog',
    description: 'A modern blog about technology and development',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.witehatz.com',
    siteName: 'Witehatz',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Witehatz Blog',
    description: 'A modern blog about technology and development',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${proximaNova.variable} font-proxima antialiased`}>
        {children}
      </body>
    </html>
  );
}
