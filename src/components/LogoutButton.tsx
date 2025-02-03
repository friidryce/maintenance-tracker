'use client';

import { FaSignOutAlt } from 'react-icons/fa';
import { serverSignOut } from '@/auth/authenticate';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export default function LogoutButton() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => serverSignOut()}
        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
        size="lg"
        variant="default"
      >
        <FaSignOutAlt className="h-5 w-5" />
        <span className="text-base">Logout</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
} 