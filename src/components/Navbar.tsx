import Link from 'next/link';
import { FaChartBar, FaTools, FaClipboardList } from 'react-icons/fa';
import { auth } from '@/auth';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const session = await auth();
  const navLinkClasses = "flex items-center px-6 py-3 text-base font-medium text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-md mx-2";

  return (
    <nav className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg">
      {/* Logo section */}
      <div className="p-6 border-b">
        <Link href="/" className="block">
          <span className="text-xl font-bold text-green-600 break-words leading-tight block">
            Maintenance Tracker
          </span>
          {session?.user?.employeeId && (
            <span className="text-sm text-gray-600 mt-1 block">
              ID: {session.user.employeeId}
            </span>
          )}
        </Link>
      </div>

      {/* Navigation items */}
      <div className="py-4 flex flex-col h-[calc(100%-88px)]">
        <div className="flex-1">
          <Link href="/" className={navLinkClasses}>
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

        {/* Logout button */}
        <LogoutButton />
      </div>
    </nav>
  );
} 