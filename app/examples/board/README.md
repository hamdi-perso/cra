# Page Board - Layout Principal

## 🎯 Description

La page `/board` est un layout d'application complet qui démontre l'utilisation de tous les composants de layout du design system. Elle présente une structure professionnelle avec :

- **Header (AppBar)** : Barre de navigation supérieure avec recherche, notifications et menu
- **Sidebar** : Barre latérale de navigation responsive avec collapse/expand
- **Panel Redimensionnable** : Séparation redimensionnable entre sidebar et contenu (desktop uniquement)
- **Centre** : Zone de contenu principal avec tableau de bord interactif
- **Bottom Bar** : Pied de page avec mentions légales et liens sociaux

## 🏗️ Architecture

```
/app/board/
├── page.tsx                    # Page principale avec layout complet
├── components/
│   ├── board-content.tsx       # Contenu du tableau de bord
│   └── index.ts                # Export des composants
└── README.md                   # Cette documentation
```

## 📦 Composants Utilisés

### Layout Components (`/components/layout/`)

- **AppBar** : Header avec navigation et actions
- **Sidebar** : Navigation latérale avec items configurables
- **ResizablePanel** : Gestionnaire de panels redimensionnables
- **CenterPanel** : Container pour le contenu principal
- **BottomBar** : Footer avec informations légales

### UI Components (`/components/ui/`)

- Card, Button, Badge, DataTable, Alert, etc.

## 🎨 Fonctionnalités

### 1. AppBar (Header)
- Logo et titre de l'application
- Barre de recherche (desktop)
- Notifications avec badge
- Menu utilisateur
- Toggle de thème (clair/sombre)
- Bouton menu pour mobile

### 2. Sidebar
- Navigation avec icônes
- Items actifs avec highlight
- Badges sur les items (notifications)
- Collapse/Expand sur desktop
- Overlay sur mobile
- Smooth animations

### 3. Panel Redimensionnable
- Drag & drop pour redimensionner (desktop uniquement)
- Limites min/max configurables (200px - 400px par défaut)
- Indicateur visuel lors du resize
- Désactivé sur mobile (sidebar en overlay)

### 4. Contenu Central
- Titre et sous-titre configurables
- Zone de contenu scrollable
- Dashboard avec statistiques
- Tableau d'activités récentes
- Actions rapides

### 5. Bottom Bar
- Informations de l'application
- Liens légaux (confidentialité, CGU, mentions légales)
- Liens sociaux (GitHub, Twitter, Email)
- Copyright dynamique

## 🚀 Utilisation

### Accéder à la page

```bash
# En développement
npm run dev

# Puis ouvrir
http://localhost:3000/board
```

### Personnaliser le contenu

```tsx
import { BoardContent } from './components/board-content';

// Modifier le contenu du tableau de bord
export function BoardContent() {
  return (
    <div className="space-y-6">
      {/* Votre contenu personnalisé */}
    </div>
  );
}
```

### Configurer la Sidebar

```tsx
const customItems = [
  { 
    id: 'home', 
    label: 'Accueil', 
    icon: <Home className="h-5 w-5" />, 
    href: '/' 
  },
  // ... autres items
];

<Sidebar items={customItems} />
```

### Ajuster les limites de redimensionnement

```tsx
<ResizablePanel
  defaultLeftWidth={256}    // Largeur par défaut (px)
  minLeftWidth={200}        // Largeur minimale (px)
  maxLeftWidth={400}        // Largeur maximale (px)
  leftPanel={<Sidebar />}
  rightPanel={<CenterPanel />}
/>
```

## 📱 Responsive Design

### Mobile (< 1024px)
- Sidebar en overlay avec backdrop
- Panel de redimensionnement désactivé
- Barre de recherche réduite à une icône
- Layout simplifié

### Desktop (≥ 1024px)
- Sidebar fixe avec collapse/expand
- Panel redimensionnable par drag & drop
- Barre de recherche complète
- Layout complet

## 🎨 Personnalisation

### Modifier le thème des couleurs

Les composants utilisent les classes Tailwind du design system :
- `primary-*` : Couleur principale
- `neutral-*` : Couleurs neutres
- `dark:` : Variantes pour le mode sombre

### Animations

Toutes les animations sont définies dans `globals.css` :
- `animate-fade-in` : Apparition en fondu
- `animate-slide-up` : Glissement vers le haut
- `animate-scale-in` : Zoom d'apparition
- `animate-pulse-glow` : Effet de lueur pulsante

## 🔧 Dépendances

- **Next.js 14+** : Framework React
- **React 18+** : Bibliothèque UI
- **Tailwind CSS** : Styling
- **Lucide React** : Icônes
- **Composants UI** : Design system personnalisé

## 📝 Notes Techniques

### Séparation des Préoccupations

Chaque composant est dans son propre fichier :
- Layout : Structure et mise en page
- Contenu : Données et logique métier
- UI : Composants réutilisables

### Performance

- Utilisation de `'use client'` uniquement où nécessaire
- Lazy loading des composants lourds
- Optimisation des re-renders avec `useCallback` et `useMemo`

### Accessibilité

- ARIA labels sur tous les boutons interactifs
- Navigation au clavier
- Contraste suffisant pour WCAG AA
- Indicateurs visuels de focus

## 🐛 Problèmes Connus

Les erreurs TypeScript affichées sont normales et se résolvent à l'exécution (problèmes d'hydratation Next.js).

## 📚 Ressources

- [Documentation complète](/docs/INDEX.md)
- [Guide des composants](/docs/COMPONENTS.md)
- [Guide de customisation](/docs/CUSTOMIZATION.md)
