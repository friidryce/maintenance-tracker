'use client';

import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" variant="default" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
        <span className="text-base">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
} 