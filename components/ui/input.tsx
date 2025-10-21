/**
 * Modern Design System - Input Component
 * Reusable Input component with variants and validation states
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'success' | 'error';
  label?: string;
  helperText?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', label, helperText, errorMessage, icon, ...props }, ref) => {
    const hasError = variant === 'error' || !!errorMessage;
    const hasSuccess = variant === 'success';

    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          
          <input
            className={cn(
              // Base styles
              "w-full rounded-xl border bg-white dark:bg-neutral-900 px-4 py-3 text-body",
              "transition-all duration-200 focus:outline-none focus:ring-2",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
              
              // Icon padding
              icon ? "pl-10" : "pl-4",
              
              // Variants
              hasError && [
                "border-danger text-danger focus:border-danger focus:ring-danger/20",
                "dark:border-danger dark:text-danger"
              ],
              hasSuccess && [
                "border-success text-success focus:border-success focus:ring-success/20",
                "dark:border-success dark:text-success"
              ],
              !hasError && !hasSuccess && [
                "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-50",
                "focus:border-primary-500 focus:ring-primary-500/20"
              ],
              
              className
            )}
            ref={ref}
            {...props}
          />
          
          {/* Status Icons */}
          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-danger">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          {hasSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
              <CheckCircle className="w-5 h-5" />
            </div>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || errorMessage) && (
          <p className={cn(
            "text-sm",
            hasError ? "text-danger" : "text-neutral-500 dark:text-neutral-400"
          )}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };