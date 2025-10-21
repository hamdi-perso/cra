# ⚡ Référence Rapide - Design System

> Aide-mémoire pour un développement rapide et cohérent

## 🎨 Couleurs Essentielles

```css
/* PRIMARY */
bg-primary          /* #FF6A3D - Actions principales */
bg-primary-600      /* #F04E1F - Hover des actions */

/* BACKGROUNDS */
bg-neutral-50 dark:bg-neutral-950    /* Page principale */
bg-white dark:bg-neutral-900         /* Surfaces/Cards */
bg-white dark:bg-neutral-850         /* Surfaces élevées */

/* BORDURES */
border-neutral-200 dark:border-neutral-800    /* Standard */
border-neutral-200/50 dark:border-neutral-800/50  /* Subtiles */

/* TEXTES */
text-neutral-900 dark:text-neutral-50     /* Principal */
text-neutral-600 dark:text-neutral-400    /* Secondaire */
text-neutral-500 dark:text-neutral-500    /* Discret */

/* SÉMANTIQUES */
bg-success/10 text-success border-success/20    /* Succès */
bg-warning/10 text-warning border-warning/20    /* Attention */
bg-danger/10 text-danger border-danger/20       /* Erreur */
bg-info/10 text-info border-info/20             /* Info */
```

## ✏️ Typographie

```css
/* TITRES */
text-display     /* 30px/36px, semibold - Titres principaux */
text-h1          /* 24px/32px, semibold - Sections */
text-h2          /* 20px/28px, semibold - Sous-sections */

/* CORPS */
text-body-lg     /* 16px/24px - Contenu important */
text-body        /* 14px/22px - Contenu standard */

/* FONTS */
font-sans        /* Inter - Texte principal */
font-mono        /* JetBrains Mono - Code */
```

## 🧩 Composants Rapides

### Boutons
```tsx
<Button variant="primary">Principal</Button>
<Button variant="secondary">Secondaire</Button>
<Button variant="ghost">Discret</Button>
<Button variant="destructive">Supprimer</Button>
```

### Cards
```tsx
{/* Standard */}
<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
  Contenu
</div>

{/* Interactive */}
<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover">
  Contenu avec hover
</div>

{/* Glassmorphisme */}
<div className="glass rounded-2xl border p-6 shadow-lg">
  Contenu avec effet verre
</div>
```

### Inputs
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
    Label
  </label>
  <input className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-body focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors" />
</div>
```

## ⚡ Animations

```css
/* ENTRÉES */
animate-fade-in      /* Apparition simple */
animate-slide-up     /* Glissement depuis le bas */
animate-scale-in     /* Zoom d'entrée */

/* INTERACTIVITÉ */
interactive          /* Hover: translateY(-2px), active: scale(0.98) */
card-hover          /* Hover: translateY(-4px) + shadow */
focus-ring          /* Focus visible accessible */

/* LOADING */
skeleton            /* Animation shimmer */
```

## 📱 Layout Responsive

```css
/* CONTAINER */
container mx-auto px-6    /* Container centré avec padding */

/* GRILLES */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6    /* 3 colonnes responsive */
grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6    /* Auto-fit */

/* ESPACEMENT */
space-y-8    /* Espacement vertical sections */
space-y-6    /* Espacement vertical cartes */
space-y-4    /* Espacement vertical éléments */
```

## 🌗 Mode Sombre

```tsx
{/* Toujours utiliser dark: pour le mode sombre */}
className="bg-neutral-50 dark:bg-neutral-950"
className="text-neutral-900 dark:text-neutral-50"
className="border-neutral-200 dark:border-neutral-800"
```

## ♿ Accessibilité

```tsx
{/* Focus obligatoire sur les interactifs */}
className="focus-ring"

{/* Labels explicites */}
<label htmlFor="email">Email</label>
<input id="email" />

{/* ARIA pour icônes seules */}
<button aria-label="Fermer">
  <X className="w-5 h-5" />
</button>
```

---

## 🔧 Patterns Courants

### Header Standard
```tsx
<header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
  <div className="container mx-auto px-6 py-4 flex items-center justify-between">
    <h1 className="text-h1 font-semibold text-neutral-900 dark:text-neutral-50">App</h1>
    <ThemeToggle />
  </div>
</header>
```

### Structure de Page
```tsx
<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
  {/* Header */}
  <main className="container mx-auto px-6 py-12">
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-display font-semibold text-neutral-900 dark:text-neutral-50">Titre</h2>
        <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">Description</p>
      </div>
      {/* Contenu */}
    </div>
  </main>
</div>
```

### Grille de Cartes
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {items.map((item, i) => (
    <div 
      key={item.id}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover animate-slide-up"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="text-h2 font-semibold mb-2">{item.title}</h3>
      <p className="text-body text-neutral-600 dark:text-neutral-400">{item.description}</p>
    </div>
  ))}
</div>
```

### Formulaire Standard
```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
    <input className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-body focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors" />
  </div>
  <div className="flex gap-4">
    <Button variant="primary" className="flex-1">Valider</Button>
    <Button variant="secondary">Annuler</Button>
  </div>
</form>
```

### Messages de Statut
```tsx
{/* Succès */}
<div className="bg-success/10 text-success border border-success/20 rounded-xl p-4">
  ✓ Opération réussie
</div>

{/* Erreur */}
<div className="bg-danger/10 text-danger border border-danger/20 rounded-xl p-4">
  ✕ Erreur détectée
</div>

{/* Avertissement */}
<div className="bg-warning/10 text-warning border border-warning/20 rounded-xl p-4">
  ⚠ Attention requise
</div>
```

### Badge de Statut
```tsx
<span className="bg-success/10 text-success border border-success/20 rounded-full px-3 py-1 text-sm font-medium">
  Actif
</span>
```

---

## 🎯 Checklist Express

### ✅ Nouvelle Page
- [ ] Header avec `glass` et `ThemeToggle`
- [ ] Container avec `container mx-auto px-6`
- [ ] Hero avec `animate-fade-in`
- [ ] Hiérarchie `text-display` → `text-h1` → `text-h2`
- [ ] Mode sombre sur tous les éléments

### ✅ Nouveau Composant
- [ ] Classes `focus-ring` sur les interactifs
- [ ] `dark:` sur backgrounds, borders, textes
- [ ] Animation d'entrée (`animate-*`)
- [ ] Responsive (`md:`, `lg:`)
- [ ] Props TypeScript

### ✅ Accessibilité
- [ ] Labels sur tous les inputs
- [ ] `aria-label` sur icônes seules
- [ ] Focus visible
- [ ] Contraste suffisant

---

## 🚀 Imports Essentiels

```tsx
// Composants UI
import { Button } from '@/components/ui';
import { ThemeToggle } from '@/components/theme-toggle';

// Utilitaires
import { cn } from '@/lib/utils';

// Icônes
import { Check, X, ChevronDown, Menu } from 'lucide-react';

// Hooks
import { useTheme } from 'next-themes';
```

---

💡 **Cette référence couvre 90% des cas d'usage courants. Gardez-la à portée de main pour un développement rapide et cohérent !**