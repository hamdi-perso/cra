# 🔧 Personnalisation & Migration

> Comment adapter ce design system à votre marque et migrer d'autres systèmes

## 📋 Table des Matières

1. [Personnalisation des couleurs](#personnalisation-des-couleurs)
2. [Personnalisation de la typographie](#personnalisation-de-la-typographie)
3. [Ajout d'animations personnalisées](#ajout-danimations-personnalisées)
4. [Migration depuis d'autres systèmes](#migration-depuis-dautres-systèmes)
5. [Création de thèmes](#création-de-thèmes)
6. [Optimisations performance](#optimisations-performance)

---

## 🎨 Personnalisation des Couleurs

### Changer la Couleur Primaire

**1. Générer une nouvelle palette**

Utilisez un outil comme [UI Colors](https://uicolors.app) pour générer une palette complète à partir de votre couleur de marque.

**2. Mettre à jour `tailwind.config.ts`**

```typescript
// Exemple : Passer du orange (#FF6A3D) au bleu (#3B82F6)
colors: {
  primary: {
    DEFAULT: '#3B82F6',  // Votre nouvelle couleur
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',      // Couleur principale
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // Garder les neutrals et sémantiques
}
```

**3. Mettre à jour `globals.css`**

```css
/* Mettre à jour les variables CSS */
--color-primary-50: #EFF6FF;
--color-primary-100: #DBEAFE;
--color-primary-200: #BFDBFE;
--color-primary-300: #93C5FD;
--color-primary-400: #60A5FA;
--color-primary-500: #3B82F6;
--color-primary-600: #2563EB;
--color-primary-700: #1D4ED8;
--color-primary-800: #1E40AF;
--color-primary-900: #1E3A8A;
```

### Créer des Couleurs Secondaires

```typescript
// tailwind.config.ts
colors: {
  primary: { /* ... */ },
  secondary: {
    DEFAULT: '#10B981',  // Nouvelle couleur secondaire
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  // ...
}
```

### Couleurs Sémantiques Personnalisées

```typescript
// Pour une app fintech
colors: {
  // ...
  success: '#00C851',    // Vert plus vif
  warning: '#FF8800',    // Orange plus saturé  
  danger: '#FF4444',     // Rouge plus doux
  info: '#33B5E5',       // Bleu plus clair
  // Couleurs métier
  profit: '#00C851',
  loss: '#FF4444',
  neutral: '#6C757D',
}
```

---

## ✏️ Personnalisation de la Typographie

### Changer les Polices

**1. Installer de nouvelles polices Google Fonts**

```tsx
// app/layout.tsx
import { Poppins, Source_Code_Pro } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});
```

**2. Mettre à jour la configuration**

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-source-code-pro)', 'ui-monospace', 'monospace'],
},
```

### Ajuster l'Échelle Typographique

```typescript
// tailwind.config.ts - Échelle plus généreuse
fontSize: {
  'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],    // 40px
  'h1': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],          // 32px
  'h2': ['1.5rem', { lineHeight: '1.33', fontWeight: '600' }],        // 24px
  'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],        // 20px
  'body-xl': ['1.125rem', { lineHeight: '1.55' }],                    // 18px
  'body-lg': ['1rem', { lineHeight: '1.5' }],                         // 16px
  'body': ['0.875rem', { lineHeight: '1.57' }],                       // 14px
  'body-sm': ['0.75rem', { lineHeight: '1.5' }],                      // 12px
},
```

### Typographie pour Différents Contextes

```typescript
// Pour une app éditoriale
fontSize: {
  'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],       // Titres héros
  'article': ['1.125rem', { lineHeight: '1.7' }],                     // Corps d'article
  'caption': ['0.875rem', { lineHeight: '1.4', fontStyle: 'italic' }], // Légendes
},

// Pour une app technique
fontSize: {
  'code-lg': ['1rem', { lineHeight: '1.5', fontFamily: 'mono' }],
  'code': ['0.875rem', { lineHeight: '1.4', fontFamily: 'mono' }],
  'code-sm': ['0.75rem', { lineHeight: '1.3', fontFamily: 'mono' }],
},
```

---

## ⚡ Ajout d'Animations Personnalisées

### Nouvelles Animations d'Entrée

```typescript
// tailwind.config.ts
animation: {
  // Animations existantes
  'fade-in': 'fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  // Nouvelles animations
  'slide-in-right': 'slide-in-right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  'zoom-in': 'zoom-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  'flip-in': 'flip-in 400ms cubic-bezier(0.4, 0, 0.2, 1)',
  'bounce-in': 'bounce-in 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
},
```

```css
/* globals.css - Nouvelles keyframes */
@keyframes slide-in-right {
  from { 
    opacity: 0;
    transform: translateX(100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoom-in {
  from { 
    opacity: 0;
    transform: scale(0.8);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes flip-in {
  from { 
    opacity: 0;
    transform: perspective(400px) rotateY(90deg);
  }
  to { 
    opacity: 1;
    transform: perspective(400px) rotateY(0deg);
  }
}

@keyframes bounce-in {
  from { 
    opacity: 0;
    transform: scale(0.3);
  }
  50% { 
    opacity: 1;
    transform: scale(1.05);
  }
  70% { 
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}
```

### Animations Métier

```css
/* Pour une app e-commerce */
@keyframes add-to-cart {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes price-highlight {
  0% { background-color: transparent; }
  50% { background-color: rgba(16, 185, 129, 0.2); }
  100% { background-color: transparent; }
}

/* Pour une app de données */
@keyframes data-update {
  0% { opacity: 1; }
  50% { opacity: 0.5; background-color: rgba(59, 130, 246, 0.1); }
  100% { opacity: 1; background-color: transparent; }
}
```

---

## 🔄 Migration depuis d'autres Systèmes

### Depuis Material-UI

**Mapping des composants**

| Material-UI | Design System | Notes |
|-------------|---------------|-------|
| `Button` | `Button` | Mapper les variants |
| `Card` | `Card` | Utiliser le système modulaire |
| `TextField` | `Input` | Créer le composant Input |
| `Typography` | Classes `text-*` | Utiliser les classes Tailwind |
| `AppBar` | Header avec `glass` | Utiliser glassmorphisme |

**Script de migration**

```bash
# Rechercher et remplacer les imports
find . -name "*.tsx" -exec sed -i 's/@mui\/material\/Button/\@\/components\/ui\/Button/g' {} \;
find . -name "*.tsx" -exec sed -i 's/import { Button }/import { Button }/g' {} \;

# Remplacer les props communes
find . -name "*.tsx" -exec sed -i 's/variant="contained"/variant="primary"/g' {} \;
find . -name "*.tsx" -exec sed -i 's/variant="outlined"/variant="secondary"/g' {} \;
```

### Depuis Bootstrap

**Classes communes**

| Bootstrap | Design System | Exemple |
|-----------|---------------|---------|
| `.btn-primary` | `Button variant="primary"` | Composant React |
| `.card` | Classe `rounded-2xl border...` | Cards modernes |
| `.container` | `container mx-auto px-6` | Container responsive |
| `.row` | `grid` | Grilles CSS Grid |
| `.col-*` | `grid-cols-*` | Colonnes responsives |

### Depuis Tailwind UI

La migration est généralement simple car les deux utilisent Tailwind :

1. **Mettre à jour les couleurs** selon la nouvelle palette
2. **Remplacer les classes** par les nouvelles conventions
3. **Ajouter les animations** manquantes
4. **Utiliser les composants** React à la place des classes

---

## 🎨 Création de Thèmes

### Thème Sombre Personnalisé

```css
/* globals.css */
.theme-dark-blue {
  --background: #0F172A;           /* Slate 900 */
  --surface: #1E293B;             /* Slate 800 */
  --surface-elevated: #334155;     /* Slate 700 */
  --border: #475569;              /* Slate 600 */
  --foreground: #F1F5F9;          /* Slate 100 */
}

.theme-dark-green {
  --background: #052E16;           /* Green 950 */
  --surface: #14532D;             /* Green 900 */
  --surface-elevated: #166534;     /* Green 800 */
  --border: #15803D;              /* Green 700 */
  --foreground: #F0FDF4;          /* Green 50 */
}
```

### Thèmes Métier

```css
/* Thème Fintech */
.theme-fintech {
  --primary: #0052CC;              /* Bleu financier */
  --success: #00875A;             /* Vert profit */
  --danger: #DE350B;              /* Rouge perte */
  --warning: #FF8B00;             /* Orange alerte */
  --background: #FAFBFC;
  --surface: #FFFFFF;
}

/* Thème Santé */
.theme-health {
  --primary: #2684FF;              /* Bleu médical */
  --success: #36B37E;             /* Vert santé */
  --danger: #FF5630;              /* Rouge urgence */
  --warning: #FFAB00;             /* Orange précaution */
  --info: #00B8D9;                /* Bleu info */
}
```

### Sélecteur de Thème

```tsx
// components/theme-selector.tsx
'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

const themes = [
  { id: 'light', name: 'Clair', class: '' },
  { id: 'dark', name: 'Sombre', class: 'dark' },
  { id: 'dark-blue', name: 'Nuit Bleue', class: 'dark theme-dark-blue' },
  { id: 'fintech', name: 'Fintech', class: 'theme-fintech' },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            theme === t.id 
              ? "bg-primary text-white" 
              : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          )}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
```

---

## 🚀 Optimisations Performance

### Chargement Lazy des Composants

```tsx
// Lazy loading pour gros composants
import { lazy, Suspense } from 'react';

const Modal = lazy(() => import('@/components/ui/modal'));
const DataTable = lazy(() => import('@/components/data-table'));

function App() {
  return (
    <Suspense fallback={<div className="skeleton h-64 w-full rounded-2xl" />}>
      <Modal />
    </Suspense>
  );
}
```

### Optimisation Tailwind

```javascript
// tailwind.config.ts
module.exports = {
  content: [
    // Être spécifique pour réduire la taille du CSS
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Purger les classes inutilisées
  safelist: [
    // Classes dynamiques à préserver
    'animate-slide-up',
    'animate-fade-in',
    {
      pattern: /bg-(primary|success|warning|danger|info)-(50|100|500|600)/,
    },
  ],
};
```

### Optimisation des Fonts

```tsx
// app/layout.tsx
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  // Charger seulement les poids utilisés
  weight: ['400', '500', '600'],
});
```

### CSS-in-JS vs Tailwind

```tsx
// ❌ Éviter le CSS-in-JS dynamique
const Button = ({ color }) => (
  <button style={{ backgroundColor: color }}>
    Bouton
  </button>
);

// ✅ Utiliser les classes Tailwind
const Button = ({ variant }) => (
  <button className={variants[variant]}>
    Bouton
  </button>
);
```

---

## 📦 Build et Déploiement

### Configuration Next.js Optimisée

```javascript
// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Compression
  compress: true,
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Script de Build

```json
{
  "scripts": {
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "build:production": "NODE_ENV=production next build && next export",
    "lighthouse": "lhci autorun"
  }
}
```

---

## 🔍 Audit et Maintenance

### Checklist de Mise à Jour

```bash
# Vérifier les dépendances
npm audit
npm outdated

# Analyser le bundle
npm run build:analyze

# Tests de performance
npm run lighthouse

# Tests d'accessibilité
npx @axe-core/cli http://localhost:3000
```

### Scripts de Maintenance

```bash
#!/bin/bash
# scripts/update-design-system.sh

echo "🔄 Mise à jour du design system..."

# Vérifier la cohérence des couleurs
echo "🎨 Vérification des couleurs..."
grep -r "bg-primary" components/ | wc -l

# Vérifier l'utilisation des animations
echo "⚡ Vérification des animations..."
grep -r "animate-" components/ | wc -l

# Vérifier l'accessibilité
echo "♿ Vérification de l'accessibilité..."
grep -r "focus-ring" components/ | wc -l

echo "✅ Audit terminé"
```

---

Cette approche modulaire permet d'adapter progressivement le design system selon les besoins spécifiques de chaque projet, tout en maintenant la cohérence et les performances.