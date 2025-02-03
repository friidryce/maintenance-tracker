'use client';

import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check if dark mode is already active
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);

      // Set up system preference listener
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const shouldBeDark = localStorage.getItem('theme') === 'dark' || 
          (!localStorage.getItem('theme') && e.matches);
        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" variant="default" onClick={toggleDarkMode}>
        {isDark ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
        <span className="text-base">{isDark ? 'Light' : 'Dark'} Mode</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
} 