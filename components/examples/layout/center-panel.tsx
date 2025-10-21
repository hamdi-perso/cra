'use client';

import { cn } from '@/lib/utils';

export interface CenterPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function CenterPanel({ 
  children, 
  className,
  title,
  subtitle
}: CenterPanelProps) {
  return (
    <div className={cn(
      'flex flex-col h-full',
      'bg-neutral-50 dark:bg-neutral-900',
      className
    )}>
      {/* Panel Header (optional) */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          {title && (
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Panel Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
