'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText,
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string | number;
  onClick?: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  items?: SidebarItem[];
  className?: string;
}

const defaultItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" />, href: '/' },
  { id: 'board', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/board' },
  { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" />, href: '/users', badge: 12 },
  { id: 'reports', label: 'Reports', icon: <FileText className="h-5 w-5" />, href: '/reports' },
  { id: 'analytics', label: 'Analytics', icon: <PieChart className="h-5 w-5" />, href: '/analytics' },
  { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" />, href: '/settings' },
];

export function Sidebar({ 
  isOpen, 
  onClose, 
  items = defaultItems,
  className 
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState('board');

  const handleItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    if (item.onClick) {
      item.onClick();
    }
    // Close sidebar on mobile when item is clicked
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 truncate">
          Navigation
        </h2>
      </div>

      <Separator />

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              'hover:bg-neutral-100 dark:hover:bg-neutral-800',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              activeItem === item.id && [
                'bg-primary-500 text-white',
                'hover:bg-primary-600 dark:hover:bg-primary-600',
                'shadow-lg shadow-primary-500/30'
              ]
            )}
          >
            <span className={cn(
              'flex-shrink-0',
              activeItem !== item.id && 'text-neutral-600 dark:text-neutral-400'
            )}>
              {item.icon}
            </span>
            <span className="flex-1 text-left text-sm font-medium truncate">
              {item.label}
            </span>
            {item.badge && (
              <span className={cn(
                'px-2 py-0.5 text-xs font-semibold rounded-full',
                activeItem === item.id
                  ? 'bg-white/20 text-white'
                  : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
              )}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
          <p className="font-medium">Design System v1.0</p>
          <p>© 2025 All rights reserved</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50',
          'bg-white dark:bg-neutral-900',
          'border-r border-neutral-200 dark:border-neutral-800',
          'transition-all duration-300 ease-in-out',
          'flex flex-col h-full',
          // Desktop width - takes full container width
          'lg:w-full',
          // Mobile transform
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          // Mobile width
          'w-64',
          className
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
