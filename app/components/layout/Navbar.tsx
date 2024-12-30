// app/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import AdminButton from '@/app/components/navbar/AdminButton';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          ParaEducator Portal
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/calendar" className="text-gray-300 hover:text-white">
            Calendar
          </Link>
          <AdminButton />
        </div>
      </div>
    </nav>
  );
}