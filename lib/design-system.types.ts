/**
 * Modern Design System - TypeScript Type Definitions
 */

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Color Variants
export type ColorVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

// Button Variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Card Variants
export type CardVariant = 'default' | 'glass' | 'elevated';

// Message Roles
export type MessageRole = 'user' | 'assistant' | 'system';

// Component Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
}

// Design Tokens
export const DesignTokens = {
  colors: {
    primary: {
      DEFAULT: '#FF6A3D',
      50: '#FFF0EC',
      100: '#FFD9CC',
      200: '#FFB199',
      300: '#FF926F',
      400: '#FF7B54',
      500: '#FF6A3D',
      600: '#E0552B',
      700: '#B94322',
      800: '#8F341B',
      900: '#732A16',
    },
    neutral: {
      50: '#FFFFFF',
      200: '#EDF1F7',
      300: '#D5DBE7',
      500: '#8A93A6',
      700: '#3A4357',
      800: '#2E3648',
      850: '#222939',
      900: '#1A2030',
      950: '#0B0F19',
    },
    semantic: {
      success: '#16A34A',
      warning: '#D97706',
      danger: '#DC2626',
      info: '#2563EB',
    },
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    '2xl': '2rem', // 32px
  },
  radius: {
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.25rem', // 20px
  },
  typography: {
    display: {
      fontSize: '1.875rem', // 30px
      lineHeight: '2.25rem', // 36px
      fontWeight: '600',
    },
    h1: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
      fontWeight: '600',
    },
    h2: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
      fontWeight: '600',
    },
    body: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.375rem', // 22px
      fontWeight: '400',
    },
    bodyLg: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      fontWeight: '400',
    },
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '250ms',
    },
    easing: {
      default: 'ease-out',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
    },
  },
} as const;

// Utility Types
export type DesignToken = typeof DesignTokens;
export type ColorPalette = typeof DesignTokens.colors;
export type SpacingScale = typeof DesignTokens.spacing;
export type RadiusScale = typeof DesignTokens.radius;
