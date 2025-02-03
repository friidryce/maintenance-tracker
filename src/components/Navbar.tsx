import Link from 'next/link';
import { FaChartBar, FaTools, FaClipboardList } from 'react-icons/fa';
import { auth } from '@/auth';
import LogoutButton from './LogoutButton';
import DarkModeToggle from './DarkModeToggle';

export default async function Navbar() {
  const session = await auth();
  const navLinkClasses = `
    flex items-center px-6 py-3 text-base font-medium
    text-gray-700 hover:text-green-600 
    dark:text-gray-200 dark:hover:text-green-400
    hover:bg-green-50 dark:hover:bg-gray-800
    transition-all duration-200 rounded-md mx-2
  `;

  return (
    <nav className="w-64 bg-white dark:bg-gray-900 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-800">
      {/* Logo section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="block">
          <span className="text-xl font-bold text-green-600 dark:text-green-400 break-words leading-tight block">
            Maintenance Tracker
          </span>
          {session?.user?.id && (
            <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 block">
              Employee ID: {session.user.id}
            </span>
          )}
        </Link>
      </div>

      {/* Navigation items */}
      <div className="py-4 flex flex-col h-[calc(100%-88px)]">
        <div className="flex-1 space-y-1">
          <Link href="/dashboard" className={navLinkClasses}>
            <FaChartBar className="mr-4" />
            Dashboard
          </Link>

          <Link href="/equipment" className={navLinkClasses}>
            <FaTools className="mr-4" />
            Equipment
          </Link>

          <Link href="/maintenance-records" className={navLinkClasses}>
            <FaClipboardList className="mr-4" />
            Maintenance Records
          </Link>
        </div>

        {/* Theme toggle and logout */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
          <DarkModeToggle />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
} 