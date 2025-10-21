'use client';

import { useState } from 'react';
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Button, Input, Select, Modal, Badge, Tooltip, Tabs, TabsList, TabsTrigger, TabsContent,
  Alert, MobileMenu, DataTable, ToastProvider, useToast, Card, Separator 
} from "@/components/ui";
import { 
  Mail, 
  User, 
  Eye, 
  Edit, 
  Trash2
} from "lucide-react";

// Sample data for DataTable
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'pending' },
];

const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

function DemoContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const { addToast } = useToast();

  const tableColumns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'role', title: 'Role', sortable: true },
    { 
      key: 'status', 
      title: 'Status', 
      render: (value: unknown) => (
        <Badge 
          variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'default'}
          dot
        >
          {String(value)}
        </Badge>
      )
    },
  ];

  const handleToast = (variant: 'success' | 'error' | 'warning' | 'info') => {
    addToast({
      variant,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} notification message.`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-850 transition-colors duration-500">
      {/* Header with glassmorphism */}
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 animate-slide-up">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-xl opacity-30 rounded-full animate-pulse-glow"></div>
              <h1 className="text-h1 font-bold gradient-text relative">
                Design System
              </h1>
            </div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 animate-fade-in">
              v1.0
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content with animations */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-display font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Modern Design System
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A clean design system with smooth animations, elegant dark mode and modern components
            </p>
          </div>

          {/* Welcome Card with glassmorphism */}
          <div className="glass rounded-3xl p-8 shadow-2xl card-hover animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-h2 font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  Modern Design System
                </h3>
                <p className="text-body-lg text-neutral-600 dark:text-neutral-400">
                  Your design system is now configured with a modern theme, smooth animations and a carefully chosen color palette.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MobileMenu />
                <Tooltip content="Mobile-friendly navigation">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Components Showcase with Tabs */}
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Tabs defaultValue="forms" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="forms">Forms</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              {/* Forms Tab */}
              <TabsContent value="forms" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Input Components */}
                  <div className="space-y-4">
                    <h3 className="text-h2 font-semibold">Input Components</h3>
                    
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      icon={<Mail className="w-4 h-4" />}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      variant="success"
                      helperText="Password is strong"
                    />
                    
                    <Input
                      label="Invalid Input"
                      placeholder="This field has an error"
                      variant="error"
                      errorMessage="This field is required"
                    />
                  </div>

                  {/* Select & Other Controls */}
                  <div className="space-y-4">
                    <h3 className="text-h2 font-semibold">Select & Controls</h3>
                    
                    <Select
                      label="Choose Option"
                      options={selectOptions}
                      value={selectValue}
                      onChange={setSelectValue}
                      searchable
                    />
                    
                    <div className="space-y-3">
                      <h4 className="text-body font-medium">Buttons</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                          Open Modal
                        </Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Data Tab */}
              <TabsContent value="data" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-h2 font-semibold">Data Table</h3>
                  <DataTable
                    data={sampleData}
                    columns={tableColumns}
                    searchable
                    selectable
                    actions={() => (
                      <div className="flex items-center gap-1">
                        <Tooltip content="View">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Edit">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete">
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </Tooltip>
                      </div>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Feedback Tab */}
              <TabsContent value="feedback" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Alerts */}
                  <div className="space-y-4">
                    <h3 className="text-h2 font-semibold">Alerts</h3>
                    
                    <Alert variant="success" title="Success">
                      Your action was completed successfully.
                    </Alert>
                    
                    <Alert variant="warning" title="Warning">
                      Please review your input before proceeding.
                    </Alert>
                    
                    <Alert variant="error" title="Error" dismissible onDismiss={() => {}}>
                      Something went wrong. Please try again.
                    </Alert>
                    
                    <Alert variant="info">
                      This is an informational message without a title.
                    </Alert>
                  </div>

                  {/* Badges & Toasts */}
                  <div className="space-y-4">
                    <h3 className="text-h2 font-semibold">Badges & Notifications</h3>
                    
                    <div className="space-y-3">
                      <h4 className="text-body font-medium">Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="success" dot>Active</Badge>
                        <Badge variant="warning">Pending</Badge>
                        <Badge variant="danger">Error</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-body font-medium">Toast Notifications</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => handleToast('success')}>Success Toast</Button>
                        <Button size="sm" onClick={() => handleToast('error')}>Error Toast</Button>
                        <Button size="sm" onClick={() => handleToast('warning')}>Warning Toast</Button>
                        <Button size="sm" onClick={() => handleToast('info')}>Info Toast</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Navigation Tab */}
              <TabsContent value="navigation" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-h2 font-semibold">Mobile Navigation</h3>
                  <p className="text-body text-neutral-600 dark:text-neutral-400">
                    Try the mobile menu (visible on small screens) and the bottom navigation bar below.
                  </p>
                  
                  {/* Mobile Navigation Preview */}
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-900">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-body font-medium">Mobile Navigation Components</h4>
                      <MobileMenu />
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      The mobile menu slides in from the right and includes touch-friendly navigation items.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Layout Tab */}
              <TabsContent value="layout" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Modal Example */}
                  <div className="space-y-4">
                    <h3 className="text-h2 font-semibold">Modal Dialog</h3>
                    <p className="text-body text-neutral-600 dark:text-neutral-400">
                      Click the button below to see the modal in action.
                    </p>
                    <Button onClick={() => setIsModalOpen(true)}>
                      Open Modal Example
                    </Button>
                  </div>

                  {/* Tooltips Example */}
                  <div className="space-y-4">
                    <h3 className="text-h2 font-semibold">Tooltips</h3>
                    <p className="text-body text-neutral-600 dark:text-neutral-400">
                      Hover over the buttons below to see tooltips in different positions.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Tooltip content="Tooltip on top" position="top">
                        <Button variant="secondary" size="sm">Top</Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on bottom" position="bottom">
                        <Button variant="secondary" size="sm">Bottom</Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on left" position="left">
                        <Button variant="secondary" size="sm">Left</Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on right" position="right">
                        <Button variant="secondary" size="sm">Right</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* Card and Separator Examples */}
                <div className="space-y-6">
                  <h3 className="text-h2 font-semibold">Cards & Separators</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="text-body font-semibold mb-2">Standard Card</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        This is a standard card component with glassmorphism effects.
                      </p>
                      <Separator className="my-4" />
                      <div className="flex items-center gap-2">
                        <Badge variant="primary">Featured</Badge>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="text-body font-semibold mb-2">Interactive Card</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        Cards can contain any content and integrate with other components.
                      </p>
                      <Separator className="my-4" />
                      <div className="space-y-3">
                        <Button variant="primary" size="sm" className="w-full">
                          Card Action
                        </Button>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-500">Status:</span>
                          <Badge variant="success" dot>Ready</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        description="This is a demonstration of the modal component."
        size="md"
      >
        <div className="space-y-4">
          <p className="text-body">
            This modal demonstrates the overlay, animations, and accessibility features 
            including focus management and keyboard navigation.
          </p>
          
          <Input
            label="Modal Input"
            placeholder="Try typing here..."
          />
          
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-body text-neutral-500 dark:text-neutral-400">
            Modern Design System • Clean & Accessible
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <DemoContent />
    </ToastProvider>
  );
}
