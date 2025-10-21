'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, Bell, Search, User } from 'lucide-react';

export interface AppBarProps {
  onMenuClick?: () => void;
  title?: string;
  showSearch?: boolean;
}

export function AppBar({ 
  onMenuClick, 
  title = 'Application', 
  showSearch = true 
}: AppBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Section: Menu + Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-primary-500 blur-xl opacity-30 rounded-full animate-pulse-glow"></div>
              <h1 className="text-xl md:text-2xl font-bold gradient-text relative">
                {title}
              </h1>
            </div>
            <span className="hidden md:inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
              v1.0
            </span>
          </div>
        </div>

        {/* Center Section: Search (Desktop) */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div
              className={`
                relative w-full transition-all duration-300
                ${searchFocused ? 'scale-105' : 'scale-100'}
              `}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="
                  w-full pl-10 pr-4 py-2 
                  bg-neutral-100 dark:bg-neutral-800 
                  border border-neutral-200 dark:border-neutral-700
                  rounded-xl
                  text-sm
                  placeholder:text-neutral-400
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  transition-all duration-200
                "
              />
            </div>
          </div>
        )}

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2">
          {/* Search Icon (Mobile) */}
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            aria-label="User menu"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
