# 🧩 Composants UI - Guide Complet

> Tous les composants essentiels pour construire des interfaces modernes

## 📋 Index des Composants

### ✅ Implémentés
- [Button](#button) - Boutons avec variantes
- [ThemeToggle](#themetoggle) - Toggle mode sombre/clair

### 🚧 À Implémenter
- [Input](#input) - Champs de saisie
- [Select](#select) - Sélecteurs dropdown
- [Modal](#modal) - Fenêtres modales
- [Tooltip](#tooltip) - Info-bulles
- [Badge](#badge) - Étiquettes et statuts
- [Card](#card) - Cartes modulaires
- [Tabs](#tabs) - Onglets navigables
- [Alert](#alert) - Messages d'alerte

---

## ✅ Composants Implémentés

### Button

Bouton polyvalent avec variantes, tailles et états.

**Fichier** : `components/ui/button.tsx`

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// Utilisation
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Action Principale
</Button>

<Button variant="secondary" size="lg" isLoading>
  Chargement...
</Button>

<Button variant="destructive" size="sm">
  Supprimer
</Button>

<Button variant="ghost">
  Action Discrète
</Button>
```

**Styles générés** :
- `primary` : Bouton principal avec couleur primaire
- `secondary` : Bouton secondaire avec bordure
- `ghost` : Bouton transparent
- `destructive` : Bouton de suppression rouge

### ThemeToggle

Toggle sophistiqué pour basculer entre les modes clair et sombre.

**Fichier** : `components/theme-toggle.tsx`

```tsx
import { ThemeToggle } from '@/components/theme-toggle';

// Utilisation simple
<ThemeToggle />
```

**Fonctionnalités** :
- Animation des icônes (soleil/lune)
- Effet de glow au survol
- Ripple effect au clic
- Gestion SSR hydration

---

## 🚧 Composants à Implémenter

### Input

Champs de saisie avec validation et états.

**Créer** : `components/ui/input.tsx`

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ 
  label, 
  error, 
  helperText, 
  className, 
  ...props 
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <input 
        className={cn(
          "w-full rounded-xl border px-4 py-3 text-body transition-colors focus:outline-none",
          error 
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20" 
            : "border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
          "bg-white dark:bg-neutral-900",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>
      )}
    </div>
  );
}

// Utilisation
<Input 
  label="Email"
  type="email"
  placeholder="votre@email.com"
  helperText="Nous ne partagerons pas votre email"
/>

<Input 
  label="Mot de passe"
  type="password"
  error="Le mot de passe est requis"
/>
```

### Select

Sélecteur dropdown natif stylisé.

**Créer** : `components/ui/select.tsx`

```tsx
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export function Select({ 
  label, 
  error, 
  options, 
  className, 
  ...props 
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select 
          className={cn(
            "w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-body transition-colors focus:outline-none",
            error 
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20" 
              : "border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
            "bg-white dark:bg-neutral-900",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
    </div>
  );
}

// Utilisation
<Select 
  label="Pays"
  options={[
    { value: '', label: 'Sélectionnez un pays' },
    { value: 'fr', label: 'France' },
    { value: 'be', label: 'Belgique' },
    { value: 'ch', label: 'Suisse' },
  ]}
/>
```

### Modal

Fenêtre modale avec overlay et animations.

**Créer** : `components/ui/modal.tsx`

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 dark:bg-black/70 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative w-full rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl animate-scale-in",
        sizes[size]
      )}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-h2 font-semibold text-neutral-900 dark:text-neutral-50">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Utilisation
const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Confirmer l'action"
  size="md"
>
  <div className="space-y-4">
    <p className="text-body text-neutral-600 dark:text-neutral-400">
      Êtes-vous sûr de vouloir supprimer cet élément ?
    </p>
    <div className="flex gap-3 justify-end">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Annuler
      </Button>
      <Button variant="destructive">
        Supprimer
      </Button>
    </div>
  </div>
</Modal>
```

### Tooltip

Info-bulle contextuelle avec positionnement automatique.

**Créer** : `components/ui/tooltip.tsx`

```tsx
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  delay = 500 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={cn(
          "absolute z-50 px-3 py-2 text-sm text-white bg-neutral-900 dark:bg-neutral-700 rounded-lg shadow-lg animate-fade-in whitespace-nowrap",
          positions[position]
        )}>
          {content}
          {/* Arrow */}
          <div className={cn(
            "absolute w-2 h-2 bg-neutral-900 dark:bg-neutral-700 rotate-45",
            position === 'top' && "top-full left-1/2 -translate-x-1/2 -mt-1",
            position === 'bottom' && "bottom-full left-1/2 -translate-x-1/2 -mb-1",
            position === 'left' && "left-full top-1/2 -translate-y-1/2 -ml-1",
            position === 'right' && "right-full top-1/2 -translate-y-1/2 -mr-1"
          )} />
        </div>
      )}
    </div>
  );
}

// Utilisation
<Tooltip content="Ceci est une info-bulle" position="top">
  <Button>Survolez-moi</Button>
</Tooltip>
```

### Badge

Étiquettes pour statuts, catégories et notifications.

**Créer** : `components/ui/badge.tsx`

```tsx
interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Badge({ 
  variant = 'neutral', 
  size = 'md', 
  children 
}: BadgeProps) {
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
    <span className={cn(
      "inline-flex items-center rounded-full font-medium border",
      variants[variant],
      sizes[size]
    )}>
      {children}
    </span>
  );
}

// Utilisation
<Badge variant="success">✓ Actif</Badge>
<Badge variant="warning">⚠ En attente</Badge>
<Badge variant="danger">✕ Erreur</Badge>
<Badge variant="info" size="lg">ℹ Information</Badge>
```

### Card

Système de cartes modulaire avec header, body et footer.

**Créer** : `components/ui/card.tsx`

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  const variants = {
    default: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm',
    glass: 'glass border shadow-lg',
    elevated: 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg card-hover',
  };

  return (
    <div 
      className={cn("rounded-2xl", variants[variant], className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div 
      className={cn("p-6 border-b border-neutral-200 dark:border-neutral-800", className)}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardBodyProps) {
  return (
    <div 
      className={cn("p-6", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div 
      className={cn("p-6 border-t border-neutral-200 dark:border-neutral-800", className)}
      {...props}
    />
  );
}

// Utilisation
<Card variant="elevated">
  <CardHeader>
    <h3 className="text-h2 font-semibold">Titre de la carte</h3>
  </CardHeader>
  <CardBody>
    <p className="text-body text-neutral-600 dark:text-neutral-400">
      Contenu principal de la carte.
    </p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

### Tabs

Système d'onglets navigables avec contenu dynamique.

**Créer** : `components/ui/tabs.tsx`

```tsx
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="space-y-4">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex space-x-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 shadow-sm" 
          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const { activeTab } = context;
  
  if (activeTab !== value) return null;

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}

// Utilisation
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aperçu</TabsTrigger>
    <TabsTrigger value="tab2">Détails</TabsTrigger>
    <TabsTrigger value="tab3">Paramètres</TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    <Card>
      <CardBody>
        <p>Contenu de l'aperçu</p>
      </CardBody>
    </Card>
  </TabsContent>
  
  <TabsContent value="tab2">
    <Card>
      <CardBody>
        <p>Détails complets</p>
      </CardBody>
    </Card>
  </TabsContent>
  
  <TabsContent value="tab3">
    <Card>
      <CardBody>
        <p>Paramètres de configuration</p>
      </CardBody>
    </Card>
  </TabsContent>
</Tabs>
```

### Alert

Messages d'alerte avec variantes et actions.

**Créer** : `components/ui/alert.tsx`

```tsx
interface AlertProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Alert({ 
  variant = 'info', 
  title, 
  children, 
  onClose 
}: AlertProps) {
  const variants = {
    success: {
      container: 'bg-success/10 border-success/20 text-success',
      icon: CheckCircle,
    },
    warning: {
      container: 'bg-warning/10 border-warning/20 text-warning',
      icon: AlertTriangle,
    },
    danger: {
      container: 'bg-danger/10 border-danger/20 text-danger',
      icon: XCircle,
    },
    info: {
      container: 'bg-info/10 border-info/20 text-info',
      icon: Info,
    },
  };

  const { container, icon: Icon } = variants[variant];

  return (
    <div className={cn(
      "rounded-xl border p-4 flex gap-3",
      container
    )}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1 space-y-1">
        {title && (
          <h4 className="font-medium">{title}</h4>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Fermer l'alerte"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Utilisation
<Alert variant="success" title="Succès">
  Votre action a été effectuée avec succès.
</Alert>

<Alert variant="warning" onClose={() => setShowAlert(false)}>
  Attention, cette action ne peut pas être annulée.
</Alert>

<Alert variant="danger" title="Erreur">
  Une erreur est survenue lors du traitement.
</Alert>
```

---

## 📦 Export Centralisé

**Mettre à jour** : `components/ui/index.ts`

```typescript
// Composants implémentés
export { Button } from './button';
export type { ButtonProps } from './button';

// Composants à ajouter
export { Input } from './input';
export { Select } from './select';
export { Modal } from './modal';
export { Tooltip } from './tooltip';
export { Badge } from './badge';
export { Card, CardHeader, CardBody, CardFooter } from './card';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { Alert } from './alert';

// Types
export type { InputProps } from './input';
export type { SelectProps } from './select';
export type { ModalProps } from './modal';
export type { TooltipProps } from './tooltip';
export type { BadgeProps } from './badge';
export type { CardProps } from './card';
export type { AlertProps } from './alert';
```

---

## 🎯 Prochaines Étapes

1. **Implementer les composants manquants** un par un
2. **Tester l'accessibilité** de chaque composant
3. **Ajouter des stories Storybook** (optionnel)
4. **Créer des composants composés** (ex: SearchBox, DataTable)
5. **Optimiser les performances** avec React.memo si nécessaire

---

Cette architecture modulaire permet d'ajouter progressivement les composants selon les besoins du projet, tout en maintenant la cohérence du design system.