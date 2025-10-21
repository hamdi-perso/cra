'use client';

import { useState } from 'react';
import { AppBar } from '@/components/examples/layout/app-bar';
import { Sidebar, SidebarItem } from '@/components/examples/layout/sidebar';
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  Users,
  LogOut
} from 'lucide-react';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const navigationItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/'
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: <Calendar className="h-5 w-5" />,
    href: '/activities'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Briefcase className="h-5 w-5" />,
    href: '/projects'
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: <Users className="h-5 w-5" />,
    href: '/clients'
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <LogOut className="h-5 w-5" />,
    href: '/login'
  },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* AppBar */}
      <AppBar
        title="CRA App"
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        showSearch={false}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar
            isOpen={true}
            items={navigationItems}
          />
        </div>

        {/* Mobile Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          items={navigationItems}
          className="lg:hidden"
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-neutral-50 dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
  );
}
