import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Briefcase } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of corporate website',
      client: 'Acme Corporation',
      activityCount: 3,
      isActive: true
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'iOS and Android app development',
      client: 'Acme Corporation',
      activityCount: 2,
      isActive: true
    },
    {
      id: '3',
      name: 'Data Migration',
      description: 'Legacy system to cloud migration',
      client: 'Global Solutions Inc',
      activityCount: 2,
      isActive: true
    },
    {
      id: '4',
      name: 'Security Audit',
      description: 'Comprehensive security assessment',
      client: 'Global Solutions Inc',
      activityCount: 1,
      isActive: true
    },
    {
      id: '5',
      name: 'AI Integration',
      description: 'Machine learning pipeline setup',
      client: 'Tech Innovators',
      activityCount: 2,
      isActive: true
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Projects
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            View and manage all client projects
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl flex-shrink-0">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1 truncate">
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {project.client}
                  </p>
                </div>
              </div>
              <Badge variant={project.isActive ? 'default' : 'secondary'}>
                {project.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              {project.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {project.activityCount} {project.activityCount === 1 ? 'activity' : 'activities'}
              </span>
              <Button variant="ghost" size="sm">
                View Activities
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
