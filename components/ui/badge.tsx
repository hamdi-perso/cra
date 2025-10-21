/**
 * Modern Design System - Badge Component
 * Status badges with various styles and colors
 */

import { cn } from '@/lib/utils';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ 
  variant = 'default', 
  size = 'md', 
  children, 
  className,
  dot = false 
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        "transition-colors duration-200",
        
        // Sizes
        size === 'sm' && "px-2 py-0.5 text-xs",
        size === 'md' && "px-2.5 py-1 text-sm",
        size === 'lg' && "px-3 py-1.5 text-body",
        
        // Variants
        variant === 'default' && "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
        variant === 'primary' && "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300",
        variant === 'success' && "bg-success/10 text-success dark:bg-success/20",
        variant === 'warning' && "bg-warning/10 text-warning dark:bg-warning/20",
        variant === 'danger' && "bg-danger/10 text-danger dark:bg-danger/20",
        variant === 'info' && "bg-info/10 text-info dark:bg-info/20",
        variant === 'outline' && "border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300",
        
        className
      )}
    >
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          variant === 'default' && "bg-neutral-400",
          variant === 'primary' && "bg-primary-500",
          variant === 'success' && "bg-success",
          variant === 'warning' && "bg-warning",
          variant === 'danger' && "bg-danger",
          variant === 'info' && "bg-info",
          variant === 'outline' && "bg-neutral-400"
        )} />
      )}
      {children}
    </span>
  );
}

// Predefined status badges
export function StatusBadge({ 
  status, 
  size = 'md' 
}: { 
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed'; 
  size?: 'sm' | 'md' | 'lg';
}) {
  const config = {
    active: { variant: 'success' as const, label: 'Active', dot: true },
    inactive: { variant: 'default' as const, label: 'Inactive', dot: true },
    pending: { variant: 'warning' as const, label: 'Pending', dot: true },
    completed: { variant: 'success' as const, label: 'Completed', dot: false },
    failed: { variant: 'danger' as const, label: 'Failed', dot: true }
  };

  const { variant, label, dot } = config[status];

  return (
    <Badge variant={variant} size={size} dot={dot}>
      {label}
    </Badge>
  );
}