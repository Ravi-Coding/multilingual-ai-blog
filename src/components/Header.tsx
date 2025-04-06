

'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-3xl font-bold text-center sm:text-left">
          🌐 Multilingual AI Blog Generator
        </h1>
        <Link href="/" className="text-sm sm:text-base underline hover:text-gray-100 transition duration-200">
          Home
        </Link>
      </div>
    </header>
  );
}
