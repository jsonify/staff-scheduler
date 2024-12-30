// app/components/navbar/AdminButton.tsx
'use client';

import { useAuth } from '../auth/AuthProvider';

export default function AdminButton() {
  const { user, isAdmin, logout } = useAuth();

  if (!user) {
    return (
      <a href="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Admin Login
      </a>
    );
  }

  return (
    <button
      onClick={logout}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}

