/**
 * Modern Design System - Utility Classes Reference
 * 
 * This file lists all available custom utility classes
 * in the modern design system.
 */

// =============================================================================
// GLASSMORPHISM
// =============================================================================

/**
 * .glass
 * Applique un effet glassmorphisme avec backdrop-blur
 * Fonctionne en light et dark mode
 * 
 * Exemple:
 * <div className="glass rounded-2xl border p-6">...</div>
 */

// =============================================================================
// ANIMATIONS
// =============================================================================

/**
 * .animate-fade-in
 * Fade in rapide (150ms)
 */

/**
 * .animate-fade-out
 * Fade out (200ms)
 */

/**
 * .animate-slide-up
 * Slide up avec fade in (150ms)
 */

/**
 * .animate-slide-down
 * Slide down avec fade out (200ms)
 */

/**
 * .animate-scale-in
 * Scale in avec fade (150ms)
 */

/**
 * .animate-shimmer
 * Shimmer effect pour skeleton loaders (2s loop)
 */

// =============================================================================
// INTERACTIVE
// =============================================================================

/**
 * .interactive
 * Ajoute des effets hover/active scale
 * hover: scale(1.02)
 * active: scale(0.98)
 * transition: 150ms ease-out
 * 
 * Exemple:
 * <button className="interactive">Click me</button>
 */

/**
 * .focus-ring
 * Ajoute un focus ring visible avec la couleur primary
 * Ring: 2px solid primary/50
 * 
 * Exemple:
 * <button className="focus-ring">Accessible button</button>
 */

// =============================================================================
// LOADING STATES
// =============================================================================

/**
 * .skeleton
 * Skeleton loader avec shimmer animation
 * Adapté au light/dark mode
 * 
 * Exemple:
 * <div className="skeleton h-4 w-32 rounded"></div>
 */

// =============================================================================
// COLOR UTILITIES
// =============================================================================

/**
 * Classes de couleur personnalisées:
 * 
 * Primary:
 * - bg-primary, text-primary, border-primary
 * - bg-primary-{50,100,200,300,400,500,600,700,800,900}
 * 
 * Neutral:
 * - bg-neutral-{50,200,300,500,700,800,850,900,950}
 * - text-neutral-{...}
 * - border-neutral-{...}
 * 
 * Semantic:
 * - bg-success, text-success, border-success
 * - bg-warning, text-warning, border-warning
 * - bg-danger, text-danger, border-danger
 * - bg-info, text-info, border-info
 */

// =============================================================================
// TYPOGRAPHY
// =============================================================================

/**
 * .text-display
 * 30px/36px, Semibold
 * Pour les gros titres de page
 */

/**
 * .text-h1
 * 24px/32px, Semibold
 * Pour les titres principaux
 */

/**
 * .text-h2
 * 20px/28px, Semibold
 * Pour les sous-titres
 */

/**
 * .text-body
 * 14px/22px, Regular
 * Pour le texte standard
 */

/**
 * .text-body-lg
 * 16px/24px, Regular
 * Pour le texte légèrement plus grand
 */

/**
 * .font-sans
 * Inter font (variable: --font-inter)
 */

/**
 * .font-mono
 * JetBrains Mono font (variable: --font-jetbrains-mono)
 */

// =============================================================================
// LAYOUT UTILITIES
// =============================================================================

/**
 * Scrollbar personnalisée
 * Appliquée automatiquement sur tout le site
 * Adaptée au light/dark mode
 */

// =============================================================================
// RECETTES COMMUNES
// =============================================================================

/*
// Card standard
<div className="rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
  Content
</div>

// Card glassmorphisme
<div className="glass rounded-2xl border p-6 shadow-lg">
  Content
</div>

// Card interactive
<div className="rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition-shadow duration-150">
  Content
</div>

// Header sticky avec glassmorphisme
<header className="border-b border-neutral-300 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
  Content
</header>

// Button primary
<button className="inline-flex items-center rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90 interactive focus-ring transition-all duration-150">
  Click me
</button>

// Button secondary
<button className="inline-flex items-center rounded-xl px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 interactive focus-ring transition-all duration-150">
  Click me
</button>

// Button destructive
<button className="inline-flex items-center rounded-xl px-4 py-2 bg-danger text-white hover:bg-red-700 interactive focus-ring transition-all duration-150">
  Delete
</button>

// Button ghost
<button className="inline-flex items-center rounded-xl px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 interactive focus-ring transition-all duration-150">
  Click me
</button>

// Badge
<span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
  Badge
</span>

// Message bubble (assistant)
<div className="max-w-3xl rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 animate-fade-in">
  Message
</div>

// Message bubble (user)
<div className="max-w-3xl ml-auto rounded-2xl p-4 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700">
  Message
</div>

// Skeleton loader
<div className="space-y-3">
  <div className="skeleton h-4 w-full rounded"></div>
  <div className="skeleton h-4 w-3/4 rounded"></div>
  <div className="skeleton h-4 w-1/2 rounded"></div>
</div>

// Input field
<input className="w-full rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-neutral-950 dark:text-neutral-50 focus-ring" />
*/

export {};
