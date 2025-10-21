# 🎨 Universal Modern Design System

> Un design system moderne, épuré et accessible pour tous vos projets Next.js + Tailwind CSS

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Installation rapide](#installation-rapide)
3. [Configuration](#configuration)
4. [Système de couleurs](#système-de-couleurs)
5. [Typographie](#typographie)
6. [Composants](#composants)
7. [Animations](#animations)
8. [Layout & Responsive](#layout--responsive)
9. [Mode sombre](#mode-sombre)
10. [Accessibilité](#accessibilité)
11. [Patterns d'utilisation](#patterns-dutilisation)
12. [Personnalisation](#personnalisation)

---

## Vue d'ensemble

Ce design system moderne offre :

- **🎨 Design épuré** : Interface minimaliste avec glassmorphisme subtil
- **🌗 Mode sombre premium** : Thème sombre professionnel inspiré de GitHub
- **⚡ Animations fluides** : Micro-interactions naturelles et performantes
- **📱 100% Responsive** : Adaptatif sur tous les écrans
- **♿ Accessibilité native** : Conforme WCAG 2.1 AA par défaut
- **🔧 Modulaire** : Composants réutilisables et personnalisables
- **🚀 Prêt pour l'IA** : Documentation optimisée pour la génération automatique

---

## Installation rapide

### Prérequis
- **Next.js 13+** avec App Router
- **Tailwind CSS v4**
- **TypeScript** (recommandé)

### 1. Installation des dépendances
```bash
npm install lucide-react next-themes clsx tailwind-merge
```

### 2. Configuration rapide
Copiez les fichiers de configuration depuis ce repository :
- `tailwind.config.ts`
- `app/globals.css`
- `app/providers.tsx`
- `components/theme-toggle.tsx`

### 3. Mise à jour du layout
```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## Configuration

### Tailwind Config (tel qu'implémenté)

```typescript
// tailwind.config.ts
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
        'body': ['0.875rem', { lineHeight: '1.375rem' }], // 14/22
        'body-lg': ['1rem', { lineHeight: '1.5rem' }], // 16/24
      },
      animation: {
        'fade-in': 'fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-out': 'fade-out 150ms cubic-bezier(0.4, 0, 1, 1)',
        'slide-up': 'slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slide-down 200ms cubic-bezier(0.4, 0, 1, 1)',
        'scale-in': 'scale-in 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Provider de thème

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

---

## Système de couleurs

### Palette Principale (Implémentée)

| Couleur | Hex | Classe Tailwind | Usage |
|---------|-----|-----------------|--------|
| **Primary 500** | `#FF6A3D` | `bg-primary` | Actions principales, liens |
| **Primary 600** | `#F04E1F` | `bg-primary-600` | Hover des actions principales |
| **Neutral 50** | `#FAFBFC` | `bg-neutral-50` | Background principal (light) |
| **Neutral 950** | `#0D1117` | `bg-neutral-950` | Background principal (dark) |
| **Success** | `#10B981` | `bg-success` | Messages de succès |
| **Warning** | `#F59E0B` | `bg-warning` | Avertissements |
| **Danger** | `#EF4444` | `bg-danger` | Erreurs, suppressions |
| **Info** | `#3B82F6` | `bg-info` | Informations |

### Échelle des Neutrals

| Nuance | Light Mode | Dark Mode | Usage |
|--------|------------|-----------|--------|
| **50** | Background principal | - | Arrière-plan global |
| **100-200** | Surfaces secondaires | - | Cards, sidebars |
| **300-400** | Bordures, texte secondaire | - | Délimiteurs |
| **500-600** | Texte principal | Texte secondaire | Contenu lisible |
| **700-800** | - | Bordures | Délimiteurs sombres |
| **850-900** | - | Surfaces | Cards, modals |
| **950** | - | Background principal | Arrière-plan global |

### Exemples d'utilisation

```tsx
// Bouton principal
<button className="bg-primary text-white hover:bg-primary-600 rounded-2xl px-6 py-3">
  Action principale
</button>

// Surface avec mode sombre
<div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
  Contenu de la carte
</div>

// Badge de statut
<span className="bg-success/10 text-success border border-success/20 rounded-full px-3 py-1 text-sm">
  ✓ Succès
</span>
```

---

## Typographie

### Échelle Typographique (Implémentée)

| Classe | Taille | Line Height | Font Weight | Usage |
|--------|---------|-------------|-------------|--------|
| `text-display` | 30px | 36px | 600 (Semibold) | Titres de page principaux |
| `text-h1` | 24px | 32px | 600 (Semibold) | Titres de sections |
| `text-h2` | 20px | 28px | 600 (Semibold) | Sous-titres |
| `text-body-lg` | 16px | 24px | 400 (Regular) | Corps de texte important |
| `text-body` | 14px | 22px | 400 (Regular) | Corps de texte standard |

### Familles de Polices

- **Sans-serif** : `font-sans` → Inter (principale)
- **Monospace** : `font-mono` → JetBrains Mono (code)

### Exemples

```tsx
{/* Hiérarchie typographique */}
<h1 className="text-display font-semibold text-neutral-900 dark:text-neutral-50">
  Titre Principal
</h1>

<h2 className="text-h1 font-semibold text-neutral-800 dark:text-neutral-100">
  Titre de Section
</h2>

<h3 className="text-h2 font-semibold text-neutral-700 dark:text-neutral-200">
  Sous-titre
</h3>

<p className="text-body-lg text-neutral-600 dark:text-neutral-400">
  Paragraphe important avec une taille légèrement plus grande.
</p>

<p className="text-body text-neutral-600 dark:text-neutral-400">
  Texte de corps standard pour la lecture continue.
</p>

<code className="font-mono text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
  console.log('Code inline')
</code>
```

---

## Composants

### Button (Implémenté)

Composant bouton avec variantes et états de chargement :

```tsx
// Interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// Exemples d'utilisation
<Button variant="primary" size="md">
  Action Principale
</Button>

<Button variant="secondary" size="lg">
  Action Secondaire
</Button>

<Button variant="destructive" isLoading>
  Suppression...
</Button>

<Button variant="ghost">
  Action Discrète
</Button>
```

**Styles générés** :
- **Primary** : `bg-primary text-white hover:opacity-90`
- **Secondary** : `bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700`
- **Ghost** : `text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800`
- **Destructive** : `bg-danger text-white hover:bg-red-700`

### ThemeToggle (Implémenté)

Bouton sophistiqué pour basculer entre les thèmes :

```tsx
import { ThemeToggle } from '@/components/theme-toggle';

// Utilisation
<ThemeToggle />
```

**Fonctionnalités** :
- Animation de rotation des icônes
- Effet de glow au survol
- Ripple effect au clic
- Gestion de l'hydration SSR

### Cards

Système de cartes modulaire avec plusieurs variantes :

```tsx
// Card standard
<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
  <h3 className="text-h2 font-semibold mb-2">Titre de la carte</h3>
  <p className="text-body text-neutral-600 dark:text-neutral-400">
    Contenu de la carte avec description.
  </p>
</div>

// Card avec glassmorphisme
<div className="glass rounded-2xl border p-6 shadow-lg">
  <h3 className="text-h2 font-semibold mb-2">Carte Glassmorphisme</h3>
  <p className="text-body text-neutral-600 dark:text-neutral-400">
    Effet de verre moderne pour les overlays.
  </p>
</div>

// Card interactive
<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover">
  <h3 className="text-h2 font-semibold mb-2">Carte Interactive</h3>
  <p className="text-body text-neutral-600 dark:text-neutral-400">
    Effets de survol avec élévation.
  </p>
</div>
```

---

## Animations

### Animations d'Entrée (Implémentées)

| Classe | Durée | Easing | Usage |
|--------|-------|--------|--------|
| `animate-fade-in` | 200ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Apparition simple |
| `animate-slide-up` | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Entrée depuis le bas |
| `animate-scale-in` | 200ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Apparition avec zoom |
| `animate-shimmer` | 2s | `ease-in-out infinite` | Loading skeletons |
| `animate-pulse-glow` | 2s | `cubic-bezier(0.4, 0, 0.6, 1) infinite` | Effet lumineux |

### Classes Utilitaires (Implémentées)

```tsx
// Interactivité moderne
<button className="interactive focus-ring">
  // → hover: translateY(-2px), active: scale(0.98)
</button>

// Carte avec survol
<div className="card-hover">
  // → hover: translateY(-4px) + shadow increase
</div>

// Loading skeleton
<div className="skeleton h-4 w-32 rounded">
  // → Animation shimmer automatique
</div>

// Glassmorphisme
<div className="glass">
  // → backdrop-blur + background semi-transparent
</div>
```

### Animations Décalées

```tsx
// Stagger effect pour les listes
<div className="grid md:grid-cols-3 gap-6">
  {items.map((item, i) => (
    <div 
      key={item.id}
      className="animate-slide-up"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      {item.content}
    </div>
  ))}
</div>
```

---

## Layout & Responsive

### Container et Espacement

```tsx
// Container responsive
<div className="container mx-auto px-6">
  Contenu centré avec padding adaptatif
</div>

// Espacement vertical
<div className="space-y-8">
  <section>Section 1</section>
  <section>Section 2</section>
</div>
```

### Grilles Responsives

```tsx
// Grille adaptative
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Grille auto-fit pour cartes
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  <div>Carte flexible</div>
</div>

// Layout avec sidebar
<div className="grid lg:grid-cols-[250px_1fr] gap-8">
  <aside>Sidebar</aside>
  <main>Contenu principal</main>
</div>
```

### Breakpoints Tailwind

| Breakpoint | Taille | Contexte |
|------------|---------|----------|
| `sm:` | 640px+ | Mobile large / Tablette portrait |
| `md:` | 768px+ | Tablette paysage |
| `lg:` | 1024px+ | Desktop |
| `xl:` | 1280px+ | Large desktop |
| `2xl:` | 1536px+ | Extra large screens |

---

## Mode sombre

### Implémentation (Tel qu'utilisé)

Le mode sombre utilise la classe `dark:` de Tailwind avec `next-themes` :

```tsx
// Toggle automatique
<div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
  Contenu qui s'adapte automatiquement
</div>

// Bordures adaptatives
<div className="border border-neutral-200 dark:border-neutral-800">
  Bordures qui s'ajustent
</div>
```

### Hook useTheme

```tsx
'use client';
import { useTheme } from 'next-themes';

function MonComposant() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Basculer : {theme}
    </button>
  );
}
```

### Couleurs Spécifiques au Mode Sombre

| Element | Light | Dark |
|---------|-------|------|
| **Background** | `neutral-50` | `neutral-950` |
| **Surface** | `white` | `neutral-900` |
| **Surface élevée** | `white` | `neutral-850` |
| **Bordures** | `neutral-200` | `neutral-800` |
| **Texte principal** | `neutral-900` | `neutral-50` |
| **Texte secondaire** | `neutral-600` | `neutral-400` |

---

## Accessibilité

### Focus Visible (Implémenté)

```tsx
// Focus ring automatique
<button className="focus-ring">
  Indicateur de focus visible au clavier
</button>

// Focus ring personnalisé
<input className="focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" />
```

### Contraste des Couleurs

Tous les textes respectent un ratio de contraste minimum de 4.5:1 :

```tsx
// ✅ Texte principal - Excellent contraste
<p className="text-neutral-900 dark:text-neutral-50">
  Texte parfaitement lisible
</p>

// ✅ Texte secondaire - Bon contraste
<p className="text-neutral-600 dark:text-neutral-400">
  Texte secondaire lisible
</p>

// ⚠️ À éviter - Contraste insuffisant
<p className="text-neutral-400 dark:text-neutral-600">
  Texte difficile à lire
</p>
```

### ARIA et Labels

```tsx
// Labels explicites
<label htmlFor="email" className="block text-sm font-medium mb-2">
  Adresse e-mail
</label>
<input id="email" type="email" />

// ARIA pour les icônes
<button aria-label="Fermer le modal" className="p-2">
  <X className="w-5 h-5" />
</button>

// États ARIA
<button 
  aria-expanded={isOpen} 
  aria-controls="menu"
  aria-haspopup="true"
>
  Menu {isOpen ? '▼' : '▶'}
</button>
```

### Navigation Clavier

- **Tab** : Navigation séquentielle
- **Escape** : Fermeture des modals/dropdowns
- **Enter/Space** : Activation des boutons
- **Flèches** : Navigation dans les menus

---

## Patterns d'utilisation

### Page Type avec Header

```tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header avec glassmorphisme */}
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-h1 font-semibold">Mon Application</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-display font-semibold text-neutral-900 dark:text-neutral-50">
              Bienvenue
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Une interface moderne et accessible.
            </p>
          </div>

          {/* Grille de cartes */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={feature.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-h2 font-semibold mb-2">{feature.title}</h3>
                <p className="text-body text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
```

### Formulaire avec Validation

```tsx
function ContactForm() {
  return (
    <form className="space-y-6">
      {/* Champ email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Adresse e-mail
        </label>
        <input 
          id="email"
          type="email"
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-body focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
          placeholder="votre@email.com"
        />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Nous ne partagerons jamais votre email.
        </p>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Message
        </label>
        <textarea 
          id="message"
          rows={4}
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-body focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors resize-none"
          placeholder="Votre message..."
        />
      </div>

      {/* Boutons */}
      <div className="flex gap-4">
        <Button variant="primary" className="flex-1">
          Envoyer le message
        </Button>
        <Button variant="secondary" type="button">
          Annuler
        </Button>
      </div>
    </form>
  );
}
```

---

## Personnalisation

### Modifier les Couleurs Principales

1. **Dans `tailwind.config.ts`** :
```typescript
colors: {
  primary: {
    DEFAULT: '#YOUR_BRAND_COLOR',
    50: '#...',   // Générez les nuances avec un outil
    100: '#...',  // comme https://uicolors.app
    // ... autres nuances
    900: '#...',
  }
}
```

2. **Dans `globals.css`** :
```css
--color-primary-500: #YOUR_BRAND_COLOR;
/* Mettez à jour les autres variables si nécessaire */
```

### Ajouter de Nouvelles Animations

```typescript
// tailwind.config.ts
animation: {
  'bounce-slow': 'bounce 2s infinite',
  'spin-slow': 'spin 3s linear infinite',
}

// globals.css  
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
```

### Créer de Nouveaux Composants

```tsx
// components/ui/badge.tsx
interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Badge({ variant = 'neutral', size = 'md', children }: BadgeProps) {
  const variants = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-info/10 text-info border-info/20',
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-body',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
```

---

## 🤖 Guide pour l'IA

### Prompt Recommandé

```
Tu utilises ce design system moderne :

COULEURS :
- Primary: #FF6A3D (bg-primary, text-primary)
- Neutrals: neutral-50 à neutral-950 (du plus clair au plus sombre)
- Sémantiques: success (#10B981), warning (#F59E0B), danger (#EF4444), info (#3B82F6)

TYPOGRAPHIE :
- text-display (30px, semibold) : titres principaux
- text-h1 (24px, semibold) : sections
- text-h2 (20px, semibold) : sous-sections  
- text-body-lg (16px) / text-body (14px) : contenu
- font-mono : code

COMPOSANTS :
- Boutons: rounded-2xl, variants primary/secondary/ghost/destructive, classe "interactive focus-ring"
- Cards: rounded-2xl, border, bg-white dark:bg-neutral-900, classe "card-hover" pour interactivité
- Inputs: rounded-xl, border, focus:ring-2 focus:ring-primary-500/20

LAYOUT :
- Container: "container mx-auto px-6"
- Grilles: grid avec responsive md:grid-cols-X lg:grid-cols-Y
- Espacement: space-y-8, gap-6

ANIMATIONS :
- Entrée: animate-fade-in, animate-slide-up, animate-scale-in
- Décalage: style={{ animationDelay: `${i * 100}ms` }}
- Interactivité: "interactive" (hover transform), "card-hover"
- Loading: "skeleton h-X w-Y rounded"

DARK MODE :
- Automatique avec dark: prefix
- Backgrounds: neutral-50 → dark:neutral-950
- Surfaces: white → dark:neutral-900
- Borders: neutral-200 → dark:neutral-800
- Texte: neutral-900 → dark:neutral-50

GLASSMORPHISME :
- Classe "glass" pour overlays et headers
- Usage: headers sticky, modals, tooltips

Crée une interface moderne, épurée et accessible en respectant exactement ces conventions.
```

### Structures Recommandées

L'IA peut s'appuyer sur ces patterns éprouvés :

1. **Header sticky** avec glassmorphisme
2. **Hero section** avec animations décalées
3. **Grilles de cartes** responsives
4. **Formulaires** avec validation visuelle
5. **Modals** avec overlay backdrop-blur
6. **Navigation** avec états actifs
7. **Dashboards** avec metrics cards

---

Cette documentation complète permet de créer des interfaces cohérentes et modernes, que ce soit par des développeurs ou des IA. Elle respecte exactement l'implémentation existante tout en restant agnostique et réutilisable.