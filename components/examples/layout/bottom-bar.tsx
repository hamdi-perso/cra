'use client';

import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Mail } from 'lucide-react';

export interface BottomBarProps {
  appName?: string;
  version?: string;
  showSocial?: boolean;
  className?: string;
}

export function BottomBar({ 
  appName = 'Design System',
  version = 'v1.0',
  showSocial = true,
  className 
}: BottomBarProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`
      bg-white dark:bg-neutral-900 
      border-t border-neutral-200 dark:border-neutral-800
      ${className || ''}
    `}>
      <div className="px-4 py-3 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: App Info */}
          <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {appName} {version}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span>© {currentYear} All rights reserved</span>
          </div>

          {/* Center: Links */}
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="/legal/privacy"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="/legal/terms"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a 
              href="/legal/mentions"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              Legal Notice
            </a>
          </div>

          {/* Right: Social Links */}
          {showSocial && (
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
