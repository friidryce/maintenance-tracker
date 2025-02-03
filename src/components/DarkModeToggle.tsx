'use client';

import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from system preference if no saved preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemTheme ? 'dark' : 'light');
    setIsDark(theme === 'dark');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center px-6 py-3 text-base font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200 mx-2"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative inline-flex items-center cursor-pointer">
        <div 
          className={`
            w-14 h-7 rounded-full transition-colors duration-200 ease-in-out
            ${isDark ? 'bg-blue-600' : 'bg-gray-200'}
          `}
        >
          <div 
            className={`
              absolute top-1 left-1 w-5 h-5 rounded-full transition-transform duration-200 ease-in-out
              ${isDark ? 'translate-x-7 bg-white' : 'translate-x-0 bg-white'}
              flex items-center justify-center text-xs
            `}
          >
            {isDark ? (
              <FaMoon className="text-blue-600" size={12} />
            ) : (
              <FaSun className="text-yellow-500" size={12} />
            )}
          </div>
        </div>
        <span className="ml-3">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>
    </button>
  );
} 