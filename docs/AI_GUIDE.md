# 🤖 Guide IA - Design System Moderne

> Documentation optimisée pour la génération automatique d'interfaces cohérentes

## 🎯 Objectif

Ce guide permet à toute IA de créer des interfaces modernes, épurées et accessibles en respectant exactement les conventions du design system.

---

## 🔧 Configuration Essentielle

### Couleurs (Palette Exacte)

```
PRIMARY: #FF6A3D (bg-primary, text-primary, border-primary)
NEUTRALS: 
  - Light mode: neutral-50 (#FAFBFC) → neutral-900 (#141923)
  - Dark mode: neutral-950 (#0D1117) → neutral-50 (#FAFBFC)
SÉMANTIQUES:
  - Success: #10B981 (bg-success)
  - Warning: #F59E0B (bg-warning)  
  - Danger: #EF4444 (bg-danger)
  - Info: #3B82F6 (bg-info)
```

### Typographie (Classes Exactes)

```
TITRES:
  - text-display (30px, semibold) : titres de page principaux
  - text-h1 (24px, semibold) : titres de sections
  - text-h2 (20px, semibold) : sous-titres

CORPS:
  - text-body-lg (16px) : contenu important
  - text-body (14px) : contenu standard

CODE:
  - font-mono : pour tout le code inline et blocs
```

### Layout (Structure Responsive)

```
CONTAINER: "container mx-auto px-6"
GRILLES: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
ESPACEMENT: space-y-8, space-y-6, space-y-4
BREAKPOINTS: sm: md: lg: xl: 2xl:
```

---

## 🎨 Patterns Obligatoires

### Header avec Glassmorphisme

```tsx
<header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
  <div className="container mx-auto px-6 py-4 flex items-center justify-between">
    <h1 className="text-h1 font-semibold text-neutral-900 dark:text-neutral-50">
      Titre App
    </h1>
    <ThemeToggle />
  </div>
</header>
```

### Structure de Page Standard

```tsx
<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
  {/* Header */}
  
  <main className="container mx-auto px-6 py-12">
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 animate-fade-in">
        <h2 className="text-display font-semibold text-neutral-900 dark:text-neutral-50">
          Titre Principal
        </h2>
        <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Description engageante
        </p>
      </div>

      {/* Contenu */}
      
    </div>
  </main>
</div>
```

### Grille de Cartes avec Animations

```tsx
<div className="grid md:grid-cols-3 gap-6">
  {items.map((item, i) => (
    <div 
      key={item.id}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover animate-slide-up"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      {/* Icône */}
      <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      
      {/* Contenu */}
      <h3 className="text-h2 font-semibold mb-2">{item.title}</h3>
      <p className="text-body text-neutral-600 dark:text-neutral-400">
        {item.description}
      </p>
    </div>
  ))}
</div>
```

---

## 🧩 Composants Standards

### Boutons (Utilisations Exactes)

```tsx
{/* Primary - Actions principales */}
<Button variant="primary" className="interactive focus-ring">
  Action Principale
</Button>

{/* Secondary - Actions secondaires */}  
<Button variant="secondary">
  Action Secondaire
</Button>

{/* Ghost - Actions discrètes */}
<Button variant="ghost">
  Action Discrète
</Button>

{/* Destructive - Suppressions */}
<Button variant="destructive">
  Supprimer
</Button>
```

### Formulaires (Pattern Standard)

```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
      Libellé du champ
    </label>
    <input 
      className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-body focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors"
      placeholder="Placeholder"
    />
    <p className="text-sm text-neutral-500 dark:text-neutral-400">
      Texte d'aide
    </p>
  </div>
  
  <div className="flex gap-4">
    <Button variant="primary" className="flex-1">
      Valider
    </Button>
    <Button variant="secondary">
      Annuler
    </Button>
  </div>
</form>
```

### Cards (Types Standards)

```tsx
{/* Card Standard */}
<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
  Contenu standard
</div>

{/* Card Interactive */}
<div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover">
  Contenu avec hover
</div>

{/* Card Glassmorphisme */}
<div className="glass rounded-2xl border p-6 shadow-lg">
  Contenu avec effet verre
</div>
```

---

## ⚡ Animations (Classes Obligatoires)

### Entrées de Page

```tsx
{/* Fade in simple */}
<div className="animate-fade-in">

{/* Slide up depuis le bas */}
<div className="animate-slide-up">

{/* Scale in avec zoom */}
<div className="animate-scale-in">

{/* Avec délai pour stagger */}
<div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
```

### Interactivité

```tsx
{/* Boutons et éléments cliquables */}
<button className="interactive focus-ring">

{/* Cards avec survol */}
<div className="card-hover">

{/* Loading skeletons */}
<div className="skeleton h-4 w-32 rounded">
```

---

## 🌗 Mode Sombre (Conventions)

### Backgrounds

```tsx
{/* Page principale */}
className="bg-neutral-50 dark:bg-neutral-950"

{/* Surfaces (cards, modals) */}
className="bg-white dark:bg-neutral-900"

{/* Surfaces élevées */}
className="bg-white dark:bg-neutral-850"
```

### Bordures

```tsx
{/* Bordures standards */}
className="border border-neutral-200 dark:border-neutral-800"

{/* Bordures subtiles */}
className="border border-neutral-200/50 dark:border-neutral-800/50"
```

### Textes

```tsx
{/* Texte principal */}
className="text-neutral-900 dark:text-neutral-50"

{/* Texte secondaire */}
className="text-neutral-600 dark:text-neutral-400"

{/* Texte discret */}
className="text-neutral-500 dark:text-neutral-500"
```

---

## 🎨 Couleurs Sémantiques (Utilisations)

### Messages de Statut

```tsx
{/* Succès */}
<div className="bg-success/10 text-success border border-success/20 rounded-xl p-4">
  ✓ Opération réussie
</div>

{/* Avertissement */}
<div className="bg-warning/10 text-warning border border-warning/20 rounded-xl p-4">
  ⚠ Attention requise
</div>

{/* Erreur */}
<div className="bg-danger/10 text-danger border border-danger/20 rounded-xl p-4">
  ✕ Erreur détectée
</div>

{/* Information */}
<div className="bg-info/10 text-info border border-info/20 rounded-xl p-4">
  ℹ Information importante
</div>
```

### Badges de Statut

```tsx
<span className="bg-success/10 text-success border border-success/20 rounded-full px-3 py-1 text-sm font-medium">
  Actif
</span>

<span className="bg-warning/10 text-warning border border-warning/20 rounded-full px-3 py-1 text-sm font-medium">
  En attente
</span>
```

---

## 📱 Responsive (Patterns Obligatoires)

### Grilles Adaptatives

```tsx
{/* 3 colonnes responsive */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* Auto-fit pour cartes */}
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

{/* Layout sidebar */}
<div className="grid lg:grid-cols-[250px_1fr] gap-8">
```

### Espacement Responsive

```tsx
{/* Padding adaptatif */}
className="px-4 sm:px-6 lg:px-8"

{/* Container avec max-width */}
className="container mx-auto px-6"

{/* Espacement vertical */}
className="space-y-4 sm:space-y-6 lg:space-y-8"
```

---

## ♿ Accessibilité (Règles Obligatoires)

### Focus et Navigation

```tsx
{/* Focus ring sur tous les interactifs */}
className="focus-ring"

{/* Labels explicites */}
<label htmlFor="email">Email</label>
<input id="email" />

{/* ARIA pour icônes seules */}
<button aria-label="Fermer">
  <X className="w-5 h-5" />
</button>
```

### Contrastes Respectés

```tsx
{/* ✅ Textes avec bon contraste */}
text-neutral-900 dark:text-neutral-50  // Texte principal
text-neutral-600 dark:text-neutral-400 // Texte secondaire

{/* ❌ À éviter - contraste insuffisant */}
text-neutral-400  // Trop clair
```

---

## 📋 Checklist Qualité

Avant de générer une interface, vérifier :

### ✅ Structure
- [ ] Header avec glassmorphisme et ThemeToggle
- [ ] Container avec `container mx-auto px-6`  
- [ ] Hiérarchie typographique respectée
- [ ] Grilles responsive utilisées

### ✅ Animations
- [ ] `animate-fade-in` sur le hero
- [ ] `animate-slide-up` avec délais sur les cartes
- [ ] `interactive` sur tous les boutons
- [ ] `card-hover` sur les cartes cliquables

### ✅ Mode Sombre
- [ ] Tous les backgrounds ont `dark:`
- [ ] Toutes les bordures ont `dark:`
- [ ] Tous les textes ont `dark:`
- [ ] Glassmorphisme adapté au mode sombre

### ✅ Accessibilité
- [ ] `focus-ring` sur tous les interactifs
- [ ] Labels sur tous les inputs
- [ ] `aria-label` sur les icônes seules
- [ ] Contrastes suffisants

### ✅ Responsive
- [ ] Grilles responsive avec breakpoints
- [ ] Padding adaptatif
- [ ] Texte lisible sur mobile
- [ ] Navigation tactile optimisée

---

## 🚀 Exemple Complet

```tsx
export default function ModernPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header obligatoire */}
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-h1 font-semibold text-neutral-900 dark:text-neutral-50">
            Mon Application
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero obligatoire */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-display font-semibold text-neutral-900 dark:text-neutral-50">
              Titre Engageant
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Description claire et concise de la page.
            </p>
          </div>

          {/* Contenu principal */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, i) => (
              <div 
                key={item}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm card-hover animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-600 dark:bg-primary-400 rounded"></div>
                </div>
                <h3 className="text-h2 font-semibold mb-2">
                  Fonctionnalité {item}
                </h3>
                <p className="text-body text-neutral-600 dark:text-neutral-400">
                  Description de la fonctionnalité.
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-4">
            <Button variant="primary" className="mr-4">
              Action Principale
            </Button>
            <Button variant="secondary">
              Action Secondaire
            </Button>
          </div>
          
        </div>
      </main>
    </div>
  );
}
```

---

🎯 **En suivant exactement ces conventions, toute IA peut générer des interfaces cohérentes, modernes et accessibles qui respectent parfaitement le design system.**