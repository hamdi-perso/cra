# ⚡ Installation Express - Design System Moderne

> Installation en 5 minutes pour intégrer ce design system dans votre projet Next.js

## 🚀 Installation Rapide

### 1. Prérequis
- Next.js 13+ avec App Router
- Tailwind CSS v4
- Node.js 18+

### 2. Installation des dépendances
```bash
npm install lucide-react next-themes clsx tailwind-merge
npm install -D @types/node
```

### 3. Copier les fichiers de configuration

#### `tailwind.config.ts`
```typescript
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
        'display': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'h1': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'h2': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.375rem' }],
        'body-lg': ['1rem', { lineHeight: '1.5rem' }],
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

#### `app/globals.css`
Copiez le contenu complet depuis `web-app/app/globals.css` du repository.

#### `app/providers.tsx`
```tsx
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

#### `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4. Mettre à jour le layout principal

#### `app/layout.tsx`
```tsx
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Mon App Moderne',
  description: 'Application avec design system moderne',
};

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

### 5. Créer les composants de base

#### `components/theme-toggle.tsx`
Copiez le contenu depuis `web-app/components/theme-toggle.tsx`.

#### `components/ui/button.tsx`
Copiez le contenu depuis `web-app/components/ui/button.tsx`.

#### `components/ui/index.ts`
```typescript
export { Button } from './button';
export type { ButtonProps } from './button';
```

### 6. Page de test

#### `app/page.tsx`
```tsx
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-h1 font-semibold text-neutral-900 dark:text-neutral-50">
            Mon App
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Contenu */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-display font-semibold text-neutral-900 dark:text-neutral-50">
              Design System Intégré !
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Votre application utilise maintenant un design system moderne et accessible.
            </p>
          </div>

          {/* Démonstration */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm animate-scale-in">
            <h3 className="text-h2 font-semibold mb-4">Composants Disponibles</h3>
            
            <div className="space-y-6">
              {/* Boutons */}
              <div className="space-y-3">
                <h4 className="text-body font-medium text-neutral-700 dark:text-neutral-300">Boutons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              {/* Palette */}
              <div className="space-y-3">
                <h4 className="text-body font-medium text-neutral-700 dark:text-neutral-300">Couleurs</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-primary shadow-lg"></div>
                    <p className="text-sm text-center">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-success shadow-lg"></div>
                    <p className="text-sm text-center">Success</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-warning shadow-lg"></div>
                    <p className="text-sm text-center">Warning</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-danger shadow-lg"></div>
                    <p className="text-sm text-center">Danger</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

### 7. Configuration TypeScript (optionnel)

#### `global.d.ts`
```typescript
declare module '*.css' {
  const content: string;
  export default content;
}
```

---

## ✅ Vérification

Après installation, vous devriez avoir :

- ✅ **Mode sombre** fonctionnel avec le toggle
- ✅ **Typographie** cohérente (Inter + JetBrains Mono)
- ✅ **Animations** fluides au chargement
- ✅ **Boutons** avec toutes les variantes
- ✅ **Couleurs** de la palette accessible
- ✅ **Responsive** adaptatif
- ✅ **Glassmorphisme** sur le header

---

## 🔄 Commandes de développement

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Vérifier les types TypeScript
npm run type-check

# Linter (si configuré)
npm run lint
```

---

## 📱 Test sur appareils

1. **Desktop** : Testez le mode sombre/clair
2. **Mobile** : Vérifiez la responsivité
3. **Tablette** : Contrôlez les breakpoints
4. **Clavier** : Navigation avec Tab

---

## 🆘 Dépannage

### Problème : Mode sombre ne fonctionne pas
**Solution** : Vérifiez que `suppressHydrationWarning` est présent dans `<html>`.

### Problème : Fonts ne se chargent pas
**Solution** : Assurez-vous que les variables CSS sont correctement définies dans `layout.tsx`.

### Problème : Animations ne marchent pas
**Solution** : Vérifiez que `globals.css` contient toutes les keyframes.

### Problème : Couleurs incorrectes
**Solution** : Contrôlez que `tailwind.config.ts` est identique à la configuration fournie.

---

## 📚 Étapes suivantes

1. **Lisez la documentation complète** : `README.md`
2. **Ajoutez plus de composants** : Input, Modal, etc.
3. **Personnalisez les couleurs** selon votre marque
4. **Configurez ESLint** et Prettier
5. **Ajoutez des tests** si nécessaire

---

🎉 **Félicitations !** Votre design system moderne est maintenant opérationnel.