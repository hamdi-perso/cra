'use client';

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Button,
  Badge,
  DataTable,
  Alert
} from '@/components/ui';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Activity,
  ArrowUpRight
} from 'lucide-react';

// Sample data for stats
const stats = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    trend: 'up',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: 2,
    title: 'Active Users',
    value: '2,350',
    change: '+15.3%',
    trend: 'up',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 3,
    title: 'Orders',
    value: '1,523',
    change: '+8.2%',
    trend: 'up',
    icon: <ShoppingCart className="h-5 w-5" />
  },
  {
    id: 4,
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+2.4%',
    trend: 'up',
    icon: <TrendingUp className="h-5 w-5" />
  }
];

// Sample data for recent activity
const recentActivity = [
  { id: 1, user: 'Marie Dubois', action: 'Created a new project', time: '5 min ago', status: 'success' },
  { id: 2, user: 'Jean Martin', action: 'Modified the document', time: '15 min ago', status: 'warning' },
  { id: 3, user: 'Sophie Bernard', action: 'Added a comment', time: '1h ago', status: 'info' },
  { id: 4, user: 'Pierre Lefebvre', action: 'Completed the task', time: '2h ago', status: 'success' },
];

export function BoardContent() {
  const activityColumns = [
    { key: 'user', title: 'User', sortable: true },
    { key: 'action', title: 'Action', sortable: false },
    { key: 'time', title: 'Date', sortable: true },
    {
      key: 'status',
      title: 'Status',
      render: (value: unknown) => (
        <Badge
          variant={
            value === 'success' ? 'success' :
            value === 'warning' ? 'warning' :
            'default'
          }
          dot
        >
          {String(value)}
        </Badge>
      )
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Alert */}
      <Alert variant="info">
        <Activity className="h-4 w-4" />
        <div>
          <h4 className="font-semibold">Welcome to your dashboard!</h4>
          <p className="text-sm mt-1">
            Here&apos;s an overview of your key metrics and recent activities.
          </p>
        </div>
      </Alert>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.id}
            className="card-hover animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">
                      {stat.change}
                    </span>
                    <span className="text-sm text-neutral-500">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions from your team
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={recentActivity}
            columns={activityColumns}
            searchable
            searchPlaceholder="Search activity..."
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="animate-slide-up" style={{ animationDelay: '500ms' }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Shortcuts to your most frequent actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="secondary" className="justify-start h-auto py-4">
              <div className="text-left">
                <p className="font-semibold">New Project</p>
                <p className="text-xs text-neutral-500 mt-1">Create a new project</p>
              </div>
            </Button>
            <Button variant="secondary" className="justify-start h-auto py-4">
              <div className="text-left">
                <p className="font-semibold">Invite Member</p>
                <p className="text-xs text-neutral-500 mt-1">Add to your team</p>
              </div>
            </Button>
            <Button variant="secondary" className="justify-start h-auto py-4">
              <div className="text-left">
                <p className="font-semibold">Generate Report</p>
                <p className="text-xs text-neutral-500 mt-1">Create a detailed report</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
