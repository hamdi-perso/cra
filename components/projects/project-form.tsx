'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Project, Client } from '@/lib/db/schema';

interface ProjectFormProps {
  project?: Project & { clientName?: string };
  onSubmit: (data: { name: string; description: string; clientId: string; isActive: boolean }) => Promise<void>;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    clientId: project?.clientId || '',
    isActive: project?.isActive ?? true,
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients?status=active');
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Name *
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Project name"
          maxLength={100}
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Project description"
          maxLength={500}
          rows={4}
          required
          disabled={loading}
          className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="clientId" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Client *
        </label>
        <select
          id="clientId"
          value={formData.clientId}
          onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          required
          disabled={loading}
          className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          disabled={loading}
          className="rounded border-neutral-300 dark:border-neutral-700"
        />
        <label htmlFor="isActive" className="text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
          Active
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
