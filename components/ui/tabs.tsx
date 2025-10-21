/**
 * Modern Design System - Tabs Component
 * Accessible tab navigation with keyboard support
 */

'use client';

import { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: 'default' | 'pills' | 'underline';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

export interface TabsProps {
  defaultValue: string;
  variant?: 'default' | 'pills' | 'underline';
  children: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
}

export function Tabs({ 
  defaultValue, 
  variant = 'default', 
  children, 
  className,
  onChange 
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ 
      activeTab, 
      setActiveTab: handleTabChange, 
      variant 
    }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  const { variant } = useTabsContext();

  return (
    <div
      role="tablist"
      className={cn(
        "flex",
        variant === 'default' && "border-b border-neutral-200 dark:border-neutral-800",
        variant === 'pills' && "p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl",
        variant === 'underline' && "border-b border-neutral-200 dark:border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabsTrigger({ 
  value, 
  children, 
  className, 
  disabled = false 
}: TabsTriggerProps) {
  const { activeTab, setActiveTab, variant } = useTabsContext();
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative px-4 py-2 text-body font-medium transition-all duration-200",
        "focus:outline-none focus-ring disabled:opacity-50 disabled:cursor-not-allowed",
        
        // Default variant
        variant === 'default' && [
          "border-b-2 -mb-px",
          isActive 
            ? "border-primary-500 text-primary-600 dark:text-primary-400" 
            : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
        ],
        
        // Pills variant
        variant === 'pills' && [
          "rounded-lg",
          isActive 
            ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm" 
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
        ],
        
        // Underline variant
        variant === 'underline' && [
          "relative",
          isActive 
            ? "text-primary-600 dark:text-primary-400" 
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
        ],
        
        className
      )}
    >
      {children}
      
      {/* Underline indicator */}
      {variant === 'underline' && isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
      )}
    </button>
  );
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      className={cn("mt-4 animate-fade-in", className)}
    >
      {children}
    </div>
  );
}