import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';

export default function ActivitiesPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Activities
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage your daily activities and time tracking
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Activity
        </Button>
      </div>

      {/* Empty State */}
      <Card className="p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
            <Calendar className="h-12 w-12 text-neutral-400" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            No activities yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
            Start tracking your time by creating your first activity. You can log work done on projects and submit them for approval.
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Activity
          </Button>
        </div>
      </Card>
    </div>
  );
}
