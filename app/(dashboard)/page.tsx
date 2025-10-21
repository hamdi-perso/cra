import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
          Welcome back! Here's an overview of your activity reports.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Hours This Week
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                24.5h
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
              <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Activities
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                10
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Approved
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                4
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Pending
              </p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                3
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {[
            {
              title: 'Frontend component development',
              project: 'Website Redesign',
              date: '2025-10-21',
              duration: '6h',
              status: 'draft'
            },
            {
              title: 'Security vulnerability scanning',
              project: 'Security Audit',
              date: '2025-10-21',
              duration: '1.5h',
              status: 'draft'
            },
            {
              title: 'Data mapping documentation',
              project: 'Data Migration',
              date: '2025-10-20',
              duration: '3.5h',
              status: 'draft'
            }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl"
            >
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  {activity.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {activity.project} • {activity.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {activity.duration}
                </span>
                <Badge variant={activity.status === 'draft' ? 'secondary' : 'default'}>
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
