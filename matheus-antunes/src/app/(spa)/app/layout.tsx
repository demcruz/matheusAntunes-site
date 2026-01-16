"use client";

import Link from "next/link";

export default function SpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4">
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/app" className="hover:text-blue-500 transition-colors">
            Dashboard
          </Link>
          <Link href="/app/profile" className="hover:text-blue-500 transition-colors">
            Perfil
          </Link>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
