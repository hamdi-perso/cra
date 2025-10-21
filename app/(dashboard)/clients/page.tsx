import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building2 } from 'lucide-react';

export default function ClientsPage() {
  const clients = [
    {
      id: '1',
      name: 'Acme Corporation',
      description: 'Leading technology company',
      projectCount: 2,
      isActive: true
    },
    {
      id: '2',
      name: 'Global Solutions Inc',
      description: 'International consulting firm',
      projectCount: 2,
      isActive: true
    },
    {
      id: '3',
      name: 'Tech Innovators',
      description: 'Startup incubator and accelerator',
      projectCount: 1,
      isActive: true
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Clients
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage client organizations and relationships
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Client
        </Button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
                <Building2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <Badge variant={client.isActive ? 'default' : 'secondary'}>
                {client.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {client.name}
            </h3>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {client.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {client.projectCount} {client.projectCount === 1 ? 'project' : 'projects'}
              </span>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
