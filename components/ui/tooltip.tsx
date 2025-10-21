/**
 * Modern Design System - Tooltip Component
 * Accessible tooltip with various positions
 */

'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Tooltip({
  content,
  position = 'top',
  delay = 200,
  children,
  disabled = false,
  className
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-neutral-900 dark:border-t-neutral-100',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-neutral-900 dark:border-b-neutral-100',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-neutral-900 dark:border-l-neutral-100',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-neutral-900 dark:border-r-neutral-100'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      {isVisible && !disabled && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-2 text-sm font-medium text-white",
            "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900",
            "rounded-lg shadow-lg whitespace-nowrap",
            "animate-fade-in pointer-events-none",
            positionClasses[position],
            className
          )}
        >
          {content}
          
          {/* Arrow */}
          <div 
            className={cn(
              "absolute w-0 h-0 border-4",
              arrowClasses[position]
            )} 
          />
        </div>
      )}
    </div>
  );
}