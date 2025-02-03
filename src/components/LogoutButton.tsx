'use client';

import { FaSignOutAlt } from 'react-icons/fa';
import { serverSignOut } from '@/auth/authenticate';

export default function LogoutButton() {
  return (
    <button
      onClick={() => serverSignOut()}
      className="flex items-center px-6 py-3 text-base font-medium
        text-red-600 hover:text-red-700
        dark:text-red-500 dark:hover:text-red-400
        hover:bg-red-50 dark:hover:bg-gray-800
        transition-all duration-200 rounded-md mx-2"
    >
      <FaSignOutAlt className="mr-4" />
      Logout
    </button>
  );
} 