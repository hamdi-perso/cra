/**
 * Modern Design System - Mobile Menu Component
 * Responsive mobile navigation with slide-in animation
 */

'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Home, User, Settings, Bell } from 'lucide-react';

export interface MobileMenuProps {
  items?: MobileMenuItemProps[];
  className?: string;
}

export interface MobileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  active?: boolean;
}

const defaultItems: MobileMenuItemProps[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: '/', active: true },
  { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/profile' },
  { icon: <Bell className="w-5 h-5" />, label: 'Notifications', href: '/notifications', badge: 3 },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/settings' },
];

export function MobileMenu({ items = defaultItems, className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (item: MobileMenuItemProps) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className={cn(
          "md:hidden p-2 rounded-xl transition-colors",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring",
          className
        )}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-h2 font-semibold text-neutral-900 dark:text-neutral-50">
                Menu
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Navigation Items */}
            <nav className="p-6">
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring",
                          item.active && "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        )}
                      >
                        <span className={cn(
                          "flex-shrink-0",
                          item.active ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400"
                        )}>
                          {item.icon}
                        </span>
                        <span className="flex-1 text-body font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full bg-danger text-white">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-ring",
                          item.active && "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        )}
                      >
                        <span className={cn(
                          "flex-shrink-0",
                          item.active ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400"
                        )}>
                          {item.icon}
                        </span>
                        <span className="flex-1 text-body font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full bg-danger text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                Modern Design System v2.0
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Touch-friendly mobile navigation bar
export interface MobileNavBarProps {
  items: MobileMenuItemProps[];
  className?: string;
}

export function MobileNavBar({ items, className }: MobileNavBarProps) {
  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-40 md:hidden",
      "bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800",
      "safe-area-pb", // For devices with notches
      className
    )}>
      <div className="flex items-center">
        {items.map((item, index) => (
          <div key={index} className="flex-1">
            {item.href ? (
              <a
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 transition-all duration-200",
                  "hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95",
                  item.active && "text-primary-600 dark:text-primary-400"
                )}
              >
                <div className="relative">
                  <span className={cn(
                    "block",
                    item.active ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400"
                  )}>
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium truncate max-w-full">
                  {item.label}
                </span>
              </a>
            ) : (
              <button
                onClick={item.onClick}
                className={cn(
                  "w-full flex flex-col items-center gap-1 p-3 transition-all duration-200",
                  "hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95",
                  item.active && "text-primary-600 dark:text-primary-400"
                )}
              >
                <div className="relative">
                  <span className={cn(
                    "block",
                    item.active ? "text-primary-600 dark:text-primary-400" : "text-neutral-500 dark:text-neutral-400"
                  )}>
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium truncate max-w-full">
                  {item.label}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}