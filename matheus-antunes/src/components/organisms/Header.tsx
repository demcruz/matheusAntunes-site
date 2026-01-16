"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MA
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Home
          </Link>
          <Link href="/app" className="hover:text-gray-600 transition-colors">
            App
          </Link>
        </div>
      </nav>
    </header>
  );
}
