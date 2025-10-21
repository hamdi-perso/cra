# 🏗️ Composants Layout - Documentation

## 📋 Vue d'Ensemble

Les composants layout fournissent une structure complète pour construire des applications professionnelles avec une navigation, un contenu redimensionnable et un pied de page informatif.

## 📦 Composants Disponibles

### 1. AppBar (Header)

Barre de navigation supérieure avec toutes les fonctionnalités essentielles.

**Fichier** : `components/layout/app-bar.tsx`

```tsx
import { AppBar } from '@/components/layout';

<AppBar 
  title="Mon Application"
  onMenuClick={() => setMenuOpen(!menuOpen)}
  showSearch={true}
/>
```

**Props** :
- `title?: string` - Titre affiché dans l'AppBar (défaut: "Application")
- `onMenuClick?: () => void` - Callback pour le bouton menu (mobile)
- `showSearch?: boolean` - Afficher la barre de recherche (défaut: true)

**Fonctionnalités** :
- Logo avec effet de glow animé
- Badge de version
- Barre de recherche (desktop) / Icône (mobile)
- Bouton notifications avec badge
- Menu utilisateur
- Toggle de thème (clair/sombre)
- Bouton hamburger (mobile uniquement)

---

### 2. Sidebar

Navigation latérale responsive avec collapse/expand.

**Fichier** : `components/layout/sidebar.tsx`

```tsx
import { Sidebar, type SidebarItem } from '@/components/layout';

const items: SidebarItem[] = [
  { 
    id: 'home', 
    label: 'Accueil', 
    icon: <Home className="h-5 w-5" />, 
    href: '/',
    badge: 5  // Optionnel
  },
  // ... autres items
];

<Sidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  items={items}
/>
```

**Props** :
- `isOpen: boolean` - État d'ouverture de la sidebar
- `onClose?: () => void` - Callback de fermeture (mobile)
- `items?: SidebarItem[]` - Liste des items de navigation
- `className?: string` - Classes CSS additionnelles

**Type `SidebarItem`** :
```tsx
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string | number;  // Badge de notification
  onClick?: () => void;
}
```

**Fonctionnalités** :
- Items de navigation avec icônes
- Highlight de l'item actif
- Badges de notification sur les items
- Collapse/Expand (desktop uniquement)
- Overlay avec backdrop (mobile)
- Footer avec informations
- Animations smooth

**Responsive** :
- **Mobile** : Overlay full-screen avec backdrop
- **Desktop** : Fixed, avec bouton collapse/expand

---

### 3. ResizablePanel

Gestionnaire de panels avec séparation redimensionnable.

**Fichier** : `components/layout/resizable-panel.tsx`

```tsx
import { ResizablePanel } from '@/components/layout';

<ResizablePanel
  leftPanel={<Sidebar />}
  rightPanel={<CenterPanel />}
  defaultLeftWidth={256}
  minLeftWidth={200}
  maxLeftWidth={400}
/>
```

**Props** :
- `leftPanel: React.ReactNode` - Contenu du panel gauche
- `rightPanel: React.ReactNode` - Contenu du panel droit
- `defaultLeftWidth?: number` - Largeur par défaut (défaut: 256px)
- `minLeftWidth?: number` - Largeur minimale (défaut: 200px)
- `maxLeftWidth?: number` - Largeur maximale (défaut: 400px)
- `className?: string` - Classes CSS additionnelles

**Fonctionnalités** :
- Drag & drop pour redimensionner (desktop)
- Indicateur visuel lors du resize
- Limites min/max configurables
- Curseur adaptatif
- Prevention de la sélection de texte pendant le resize
- **Desktop uniquement** : Sur mobile, le panel gauche est masqué

**Comportement** :
1. Hover sur la séparation → indication visuelle
2. Click & drag → resize avec feedback visuel
3. Release → fixation de la nouvelle taille

---

### 4. CenterPanel

Container pour le contenu principal avec header optionnel.

**Fichier** : `components/layout/center-panel.tsx`

```tsx
import { CenterPanel } from '@/components/layout';

<CenterPanel
  title="Tableau de bord"
  subtitle="Vue d'ensemble de vos activités"
>
  {/* Votre contenu */}
</CenterPanel>
```

**Props** :
- `children: React.ReactNode` - Contenu du panel
- `title?: string` - Titre du panel (optionnel)
- `subtitle?: string` - Sous-titre (optionnel)
- `className?: string` - Classes CSS additionnelles

**Structure** :
- Header avec titre/sous-titre (si fournis)
- Zone de contenu scrollable avec padding
- Background adaptatif (mode clair/sombre)

---

### 5. BottomBar (Footer)

Pied de page avec informations légales et liens sociaux.

**Fichier** : `components/layout/bottom-bar.tsx`

```tsx
import { BottomBar } from '@/components/layout';

<BottomBar
  appName="Mon Application"
  version="v1.0"
  showSocial={true}
/>
```

**Props** :
- `appName?: string` - Nom de l'application (défaut: "Design System")
- `version?: string` - Version (défaut: "v1.0")
- `showSocial?: boolean` - Afficher les liens sociaux (défaut: true)
- `className?: string` - Classes CSS additionnelles

**Sections** :
1. **Gauche** : Nom de l'app, version, copyright
2. **Centre** : Liens légaux (Confidentialité, CGU, Mentions légales)
3. **Droite** : Liens sociaux (GitHub, Twitter, Email)

**Responsive** :
- Desktop : Disposition horizontale en 3 colonnes
- Mobile : Disposition verticale empilée

---

## 🎨 Exemple Complet : Page Board

Voici comment assembler tous les composants pour créer une page complète :

**Fichier** : `app/board/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Sidebar, 
  ResizablePanel, 
  CenterPanel, 
  BottomBar 
} from '@/components/layout';

export default function BoardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <AppBar 
        title="Tableau de bord"
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        showSearch
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar (overlay) */}
        <div className="lg:hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Desktop Layout with Resizable Panels */}
        <ResizablePanel
          leftPanel={
            <Sidebar
              isOpen={true}
              onClose={() => setIsSidebarOpen(false)}
            />
          }
          rightPanel={
            <CenterPanel
              title="Bienvenue"
              subtitle="Votre tableau de bord"
            >
              {/* Votre contenu ici */}
            </CenterPanel>
          }
        />
      </div>

      {/* Footer */}
      <BottomBar 
        appName="Mon Application"
        version="v1.0"
        showSocial
      />
    </div>
  );
}
```

## 📱 Comportement Responsive

### Mobile (< 1024px)
```
┌─────────────────────┐
│      AppBar         │ ← Sticky top
├─────────────────────┤
│                     │
│   Center Panel      │ ← Full width
│   (scrollable)      │
│                     │
├─────────────────────┤
│    Bottom Bar       │ ← Sticky bottom
└─────────────────────┘

Sidebar → Overlay avec backdrop
```

### Desktop (≥ 1024px)
```
┌─────────────────────────────────────┐
│            AppBar                   │ ← Sticky top
├──────────┬─┬────────────────────────┤
│          │ │                        │
│ Sidebar  │▓│   Center Panel         │
│          │▓│   (scrollable)         │
│          │ │                        │
│ (fixed)  │ │                        │
├──────────┴─┴────────────────────────┤
│          Bottom Bar                 │ ← Sticky bottom
└─────────────────────────────────────┘

▓ = Resizable handle (drag to resize)
```

## 🎯 Use Cases

### 1. Application Dashboard
```tsx
<AppBar title="Dashboard" />
<Sidebar items={navigationItems} />
<CenterPanel>
  <StatisticsGrid />
  <Charts />
  <RecentActivity />
</CenterPanel>
<BottomBar />
```

### 2. Admin Panel
```tsx
<AppBar title="Admin" showSearch={true} />
<Sidebar items={adminNavItems} />
<ResizablePanel
  leftPanel={<Sidebar />}
  rightPanel={
    <CenterPanel title="Gestion">
      <AdminContent />
    </CenterPanel>
  }
/>
<BottomBar showSocial={false} />
```

### 3. Documentation Site
```tsx
<AppBar title="Docs" />
<Sidebar items={docsSections} />
<CenterPanel>
  <ArticleContent />
</CenterPanel>
<BottomBar appName="Documentation" />
```

## 🎨 Personnalisation

### Thème

Tous les composants respectent le système de thème (clair/sombre) :

```css
/* Mode clair */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

/* Mode sombre (automatique avec dark:) */
dark:bg-neutral-900
dark:text-neutral-100
dark:border-neutral-800
```

### Animations

Les animations sont définies dans `globals.css` :

```css
.animate-fade-in { /* ... */ }
.animate-slide-up { /* ... */ }
.animate-scale-in { /* ... */ }
.animate-pulse-glow { /* ... */ }
```

### Couleurs

Utilisez les classes Tailwind du design system :
- `primary-*` : Couleur principale (500, 600, etc.)
- `neutral-*` : Couleurs neutres (50 à 950)
- Classes adaptatives : `hover:`, `dark:`, `focus:`

## 🔧 Configuration

### Largeurs par défaut

```tsx
// Sidebar
const DEFAULT_SIDEBAR_WIDTH = 256; // w-64 in Tailwind

// ResizablePanel
const DEFAULT_LEFT_WIDTH = 256;
const MIN_LEFT_WIDTH = 200;
const MAX_LEFT_WIDTH = 400;
```

### Breakpoints

```tsx
// Mobile sidebar
className="lg:hidden"  // Masqué sur desktop

// Desktop sidebar
className="hidden lg:block"  // Masqué sur mobile
```

## ⚡ Performance

### Optimisations appliquées

1. **React.memo** : Éviter les re-renders inutiles
2. **useCallback** : Mémorisation des fonctions
3. **Lazy loading** : Composants lourds chargés à la demande
4. **CSS Modules** : Styles scopés et optimisés
5. **Animations CSS** : Plus performantes que JavaScript

### Best Practices

```tsx
// ✅ Bon
const handleClick = useCallback(() => {
  // Logic
}, [dependencies]);

// ❌ Éviter
const handleClick = () => {
  // Logic créée à chaque render
};
```

## ♿ Accessibilité

Tous les composants respectent les standards d'accessibilité :

- ✅ ARIA labels sur les boutons interactifs
- ✅ Navigation au clavier (Tab, Enter, Escape)
- ✅ Contraste WCAG AA minimum
- ✅ Focus indicators visibles
- ✅ Screen reader friendly

```tsx
<Button
  aria-label="Toggle menu"
  onClick={onMenuClick}
>
  <Menu />
</Button>
```

## 📚 Ressources

- [Page Board complète](/app/board/page.tsx)
- [Contenu du Board](/app/board/components/board-content.tsx)
- [Index des composants UI](/components/ui/index.ts)
- [Documentation générale](/docs/README.md)

## 🐛 Troubleshooting

### La sidebar ne s'affiche pas sur mobile
Vérifiez que vous avez bien deux instances de Sidebar :
```tsx
{/* Mobile */}
<div className="lg:hidden">
  <Sidebar isOpen={isSidebarOpen} />
</div>

{/* Desktop (dans ResizablePanel) */}
<ResizablePanel leftPanel={<Sidebar isOpen={true} />} />
```

### Le resize ne fonctionne pas
Le resize est **desktop uniquement** (≥ 1024px). Sur mobile, la sidebar est en overlay.

### Les animations ne fonctionnent pas
Assurez-vous que `globals.css` est bien importé dans `app/layout.tsx`.

## 📝 Changelog

### v1.0 (16 octobre 2025)
- ✨ Création initiale des composants layout
- ✨ AppBar avec recherche et notifications
- ✨ Sidebar responsive avec collapse
- ✨ ResizablePanel avec drag & drop
- ✨ CenterPanel avec header optionnel
- ✨ BottomBar avec liens légaux
- ✨ Page Board complète en exemple
- 📱 Support mobile complet
- ♿ Accessibilité WCAG AA
