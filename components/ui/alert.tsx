/**
 * Modern Design System - Alert Component
 * Status alerts with icons and actions
 */

import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const alertIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle
};

export function Alert({
  variant = 'info',
  title,
  children,
  className,
  dismissible = false,
  onDismiss,
  icon,
  action
}: AlertProps) {
  const Icon = alertIcons[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-xl border p-4 transition-all duration-200",
        
        // Variants
        variant === 'info' && "border-info/20 bg-info/5 text-info dark:border-info/30 dark:bg-info/10",
        variant === 'success' && "border-success/20 bg-success/5 text-success dark:border-success/30 dark:bg-success/10", 
        variant === 'warning' && "border-warning/20 bg-warning/5 text-warning dark:border-warning/30 dark:bg-warning/10",
        variant === 'error' && "border-danger/20 bg-danger/5 text-danger dark:border-danger/30 dark:bg-danger/10",
        
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {icon || <Icon className="w-5 h-5" />}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-body font-semibold mb-1">
              {title}
            </h4>
          )}
          <div className={cn(
            "text-sm",
            title ? "text-current" : "text-current"
          )}>
            {children}
          </div>
          
          {/* Action */}
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
        
        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 focus-ring transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Alert variants as separate components
export function InfoAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert {...props} variant="info" />;
}

export function SuccessAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert {...props} variant="success" />;
}

export function WarningAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert {...props} variant="warning" />;
}

export function ErrorAlert(props: Omit<AlertProps, 'variant'>) {
  return <Alert {...props} variant="error" />;
}