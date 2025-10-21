# Modern Design System - Next.js Template

Next.js template with comprehensive design system, 15+ components, and mobile-first responsive design.

## ✅ Complete Design System

### 🎨 Features
- ✅ 15+ Production-ready components
- ✅ Custom color palette (Primary #FF6A3D, Neutral, Semantic)
- ✅ Light & Dark mode with automatic switch
- ✅ Google Fonts (Inter & JetBrains Mono)
- ✅ Smooth animations with CSS custom properties
- ✅ Lucide React icons
- ✅ Glassmorphism effects
- ✅ Advanced interactive components
- ✅ Mobile-first responsive design
- ✅ Full accessibility compliance
- ✅ TypeScript support
- ✅ Tailwind CSS v4

### 📦 Dependencies
```json
{
  "framer-motion": "^latest",
  "lucide-react": "^latest",
  "next-themes": "^latest"
}
```

## 🧩 Available Components

### ✅ Form Components
- **Input** - Advanced input with validation, icons, and helper text
- **Select** - Searchable dropdown with keyboard navigation
- **Button** - Multi-variant buttons with loading states

### ✅ Layout Components  
- **Modal** - Accessible dialog with focus management
- **Tabs** - Keyboard-navigable tabs with smooth animations
- **Card** - Glassmorphism containers with hover effects
- **Separator** - Content dividers

### ✅ Data Display
- **DataTable** - Advanced table with sorting, filtering, pagination
- **Badge** - Status indicators with variants and dot option
- **Tooltip** - Positioned tooltips with auto-placement

### ✅ Feedback Components
- **Alert** - Dismissible alerts with multiple variants
- **Toast** - Global notification system with queue management

### ✅ Navigation
- **MobileMenu** - Slide-in mobile navigation
- **ThemeToggle** - Dark/light mode switcher

## 🎨 Design System Features

### Modern Aesthetics
- **Glassmorphism** effects with backdrop blur
- **Smooth animations** with CSS custom properties
- **Gradient backgrounds** and subtle shadows
- **Rounded corners** and modern spacing

### Accessibility First
- **ARIA compliance** for all interactive elements
- **Keyboard navigation** support
- **Focus management** and restoration
- **Screen reader** compatibility
- **Color contrast** compliance

### Mobile-Optimized
- **Touch-friendly** interfaces
- **Responsive breakpoints**
- **Mobile-specific** components
- **Adaptive layouts**

### Developer Experience
- **TypeScript** support with strict typing
- **IntelliSense** integration
- **Consistent API** across components
- **Comprehensive documentation**

## 🚀 Getting Started

```bash
npm run dev
```

Open [http://localhost:3000/design-system](http://localhost:3000/design-system) to see the complete design system demo.

## 🎨 Quick Examples

### Component Usage
```tsx
import { Input, Button, Modal, DataTable, Toast } from "@/components/ui";

// Advanced form with validation
<Input
  label="Email"
  type="email"
  icon={<Mail />}
  variant="success"
  helperText="Valid email format"
/>

// Data table with actions
<DataTable
  data={users}
  columns={columns}
  searchable
  selectable
  actions={(row) => <Button size="sm">Edit</Button>}
/>

// Toast notifications
const { addToast } = useToast();
addToast({ variant: "success", title: "Saved!" });
```

### Colors
```tsx
<div className="bg-primary text-white">Primary</div>
<div className="bg-success">Success</div>
<div className="bg-warning">Warning</div>
<div className="bg-danger">Danger</div>
```

### Cards
```tsx
// Card standard
<div className="rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm">
  Content
</div>

// Glassmorphism card
<div className="glass rounded-2xl border p-6 shadow-lg">
  Content
</div>
```

### Buttons
```tsx
<button className="inline-flex items-center rounded-xl px-4 py-2 bg-primary text-white hover:opacity-90 interactive focus-ring">
  Primary
</button>
```

### Dark Mode Toggle
```tsx
import { ThemeToggle } from '@/components/theme-toggle';

<ThemeToggle />
```

## 📖 Documentation

- `docs/README.md` - Complete design system specifications
- `docs/QUICK_REFERENCE.md` - Usage guide and examples

## 🌈 Palette

- **Primary**: `#FF6A3D` (Orange, main accent)
- **Success**: `#16A34A` (Green)
- **Warning**: `#D97706` (Dark orange)
- **Danger**: `#DC2626` (Red)
- **Info**: `#2563EB` (Blue)

## 📱 Structure

```
web-app/
├── app/
│   ├── globals.css          # Styles + theme
│   ├── layout.tsx            # Layout + fonts
│   ├── providers.tsx         # ThemeProvider
│   └── design-system/page.tsx # Demo
├── components/
│   └── theme-toggle.tsx      # Dark mode toggle
└── tailwind.config.ts        # Tailwind config
```

## Deploy on Vercel

```bash
npm run build
```

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
