/**
 * Modern Design System - Select Component
 * Custom dropdown select with search functionality
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export function Select({
  options,
  value,
  placeholder = "Select an option...",
  label,
  helperText,
  errorMessage,
  searchable = false,
  disabled = false,
  className,
  onChange
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const hasError = !!errorMessage;

  const selectedOption = options.find(option => option.value === value);
  
  const filteredOptions = searchable
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      
      <div ref={selectRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "w-full rounded-xl border px-4 py-3 text-left text-body",
            "flex items-center justify-between transition-all duration-200",
            "focus:outline-none focus:ring-2",
            
            // States
            disabled && "opacity-50 cursor-not-allowed",
            hasError && [
              "border-danger bg-danger/5 text-danger focus:border-danger focus:ring-danger/20"
            ],
            !hasError && [
              "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900",
              "text-neutral-900 dark:text-neutral-50 focus:border-primary-500 focus:ring-primary-500/20"
            ]
          )}
        >
          <span className={cn(
            !selectedOption && "text-neutral-400 dark:text-neutral-500"
          )}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden animate-scale-in">
              {searchable && (
                <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-body focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>
              )}
              
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-body text-neutral-500 dark:text-neutral-400">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      className={cn(
                        "w-full px-4 py-3 text-left text-body transition-colors",
                        "flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        value === option.value && "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      )}
                    >
                      <span>{option.label}</span>
                      {value === option.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
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