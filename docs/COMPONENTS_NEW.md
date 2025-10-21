# Components Documentation

## Available Components

### Form Components

#### Input
Advanced input component with validation states, icons, and helper text.

**Features:**
- Multiple variants (default, success, error)
- Icon support
- Helper text and error messages
- Full accessibility with proper ARIA attributes
- TypeScript support

**Usage:**
```tsx
import { Input } from "@/components/ui/input";

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  icon={<Mail className="w-4 h-4" />}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  variant="success"
  helperText="Valid email format"
/>
```

#### Select
Searchable select component with keyboard navigation.

**Features:**
- Searchable options
- Keyboard navigation (arrow keys, Enter, Escape)
- Custom option rendering
- Loading states
- TypeScript support with generic types

**Usage:**
```tsx
import { Select } from "@/components/ui/select";

<Select
  label="Choose Option"
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  searchable
  placeholder="Search options..."
/>
```

### Layout Components

#### Modal
Accessible modal dialog with focus management.

**Features:**
- Focus trap and restoration
- Keyboard navigation (Escape to close)
- Multiple sizes (sm, md, lg, xl)
- Overlay with backdrop blur
- Smooth animations

**Usage:**
```tsx
import { Modal } from "@/components/ui/modal";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  description="Optional description"
  size="md"
>
  <div>Modal content</div>
</Modal>
```

#### Tabs
Keyboard-navigable tabs component.

**Features:**
- Keyboard navigation (arrow keys, Home, End)
- Controlled and uncontrolled modes
- Smooth indicator animations
- ARIA compliance

**Usage:**
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Data Display Components

#### DataTable
Advanced table with sorting, filtering, pagination, and selection.

**Features:**
- Column sorting (ascending/descending)
- Global search filtering
- Row selection (single/multiple)
- Pagination with size options
- Custom cell rendering
- Row actions
- Loading states
- Empty states

**Usage:**
```tsx
import { DataTable } from "@/components/ui/data-table";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "status", label: "Status" }
];

<DataTable
  data={users}
  columns={columns}
  searchable
  selectable
  actions={(row) => (
    <Button size="sm">Edit</Button>
  )}
/>
```

#### Badge
Status badges with variants and optional dot indicator.

**Features:**
- Multiple variants (primary, success, warning, danger, outline)
- Dot indicator option
- Size variants
- Custom colors support

**Usage:**
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="success" dot>
  Active
</Badge>
```

### Feedback Components

#### Alert
Dismissible alerts with multiple variants.

**Features:**
- Multiple variants (success, warning, error, info)
- Optional title and dismissal
- Icon integration
- Smooth animations

**Usage:**
```tsx
import { Alert } from "@/components/ui/alert";

<Alert
  variant="success"
  title="Success"
  dismissible
  onDismiss={() => {}}
>
  Operation completed successfully.
</Alert>
```

#### Toast
Global toast notification system.

**Features:**
- Multiple variants (success, error, warning, info)
- Auto-dismiss with customizable duration
- Queue management
- Positioned overlay
- Smooth slide animations

**Usage:**
```tsx
import { ToastProvider, useToast } from "@/components/ui/toast";

// Wrap your app with ToastProvider
<ToastProvider>
  <App />
</ToastProvider>

// Use in components
const { addToast } = useToast();

addToast({
  variant: "success",
  title: "Success",
  message: "Operation completed"
});
```

#### Tooltip
Positioned tooltips with multiple placement options.

**Features:**
- Four positions (top, bottom, left, right)
- Auto-positioning when near edges
- Smooth fade animations
- Accessible with proper ARIA attributes

**Usage:**
```tsx
import { Tooltip } from "@/components/ui/tooltip";

<Tooltip content="Helpful information" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

### Navigation Components

#### MobileMenu
Slide-in mobile navigation menu.

**Features:**
- Smooth slide animations
- Touch-friendly interface
- Backdrop overlay
- Keyboard navigation support
- Responsive design

**Usage:**
```tsx
import { MobileMenu } from "@/components/ui/mobile-menu";

<MobileMenu />
```

### Core Components

#### Button
Enhanced button component with multiple variants and sizes.

**Features:**
- Variants: primary, secondary, ghost, destructive
- Sizes: sm, md, lg
- Loading states
- Icon support
- Full accessibility

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="primary" size="md">
  Click me
</Button>
```

#### Card
Container component with glassmorphism effect.

**Features:**
- Glassmorphism background
- Hover animations
- Flexible content layout

**Usage:**
```tsx
import { Card } from "@/components/ui/card";

<Card>
  <div>Card content</div>
</Card>
```

#### Separator
Divider component for content separation.

**Usage:**
```tsx
import { Separator } from "@/components/ui/separator";

<Separator />
```

## Component Architecture

### TypeScript Support
All components are built with TypeScript and include:
- Strict type definitions
- Generic type support where applicable
- Proper interface exports
- IntelliSense support

### Accessibility
All components follow accessibility best practices:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

### Responsive Design
Components are built mobile-first:
- Touch-friendly interfaces
- Responsive breakpoints
- Adaptive layouts
- Mobile-specific components

### Animation System
Consistent animation system:
- CSS custom properties for timing
- Smooth transitions
- Performance-optimized animations
- Reduced motion support

## Integration Notes

1. All components use the `cn` utility for conditional classes
2. Icons are provided by `lucide-react`
3. Components integrate with the theme system
4. All components are exported from `@/components/ui`