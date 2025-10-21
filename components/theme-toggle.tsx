'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex items-center justify-center rounded-2xl w-12 h-12 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="group relative inline-flex items-center justify-center rounded-2xl w-12 h-12 border-2 border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 shadow-lg hover:shadow-xl interactive focus-ring overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icons */}
      <div className="relative">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-500 animate-scale-in group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 animate-scale-in group-hover:-rotate-12 transition-transform duration-500" />
        )}
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-2xl bg-primary-500/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
    </button>
  );
}
