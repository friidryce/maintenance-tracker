import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Maintenance Tracker",
  description: "Track equipment maintenance and repairs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} 
        min-h-full
        bg-gray-50 dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        transition-colors duration-200
      `}>
        <Navbar />
        <main className="ml-64 min-h-screen p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
