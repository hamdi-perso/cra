import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6A3D',
          50: '#FFF5F2',
          100: '#FFE6DD',
          200: '#FFCCBB',
          300: '#FFA888',
          400: '#FF8866',
          500: '#FF6A3D',
          600: '#F04E1F',
          700: '#CC3B14',
          800: '#A32F10',
          900: '#7A240C',
        },
        neutral: {
          50: '#FAFBFC',
          100: '#F4F6F8',
          200: '#E8ECF0',
          300: '#D1D8E0',
          400: '#A9B4C2',
          500: '#7E8B9A',
          600: '#5A6675',
          700: '#3D4857',
          800: '#252D3A',
          850: '#1C2230',
          900: '#141923',
          950: '#0D1117',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }], // 30/36
        'h1': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }], // 24/32
        'h2': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }], // 20/28
        'body': ['0.875rem', { lineHeight: '1.375rem', fontWeight: '400' }], // 14/22
        'body-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 16/24
      },
      spacing: {
        '4.5': '1.125rem', // 18px
      },
      borderRadius: {
        'xl': '1rem', // 16px
        '2xl': '1.25rem', // 20px
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-out': 'fadeOut 150ms cubic-bezier(0.4, 0, 1, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 200ms cubic-bezier(0.4, 0, 1, 1)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(8px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '-1000px 0', opacity: '0.6' },
          '50%': { backgroundPosition: '0px 0', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
