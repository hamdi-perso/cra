'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { ProjectForm } from '@/components/projects/project-form';
import { Plus, Briefcase, Pencil, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/app/providers/auth-provider';
import type { Project } from '@/lib/db/schema';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [search]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/projects?search=${search}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create project');
    await fetchProjects();
    setModalOpen(false);
  };

  const handleUpdate = async (data: any) => {
    const res = await fetch(`/api/projects/${editingProject?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update project');
    await fetchProjects();
    setModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete project');
        return;
      }
      await fetchProjects();
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Projects</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            View and manage all client projects
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => { setEditingProject(null); setModalOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center">
          <Briefcase className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {search ? 'Try a different search term' : 'Start by creating your first project'}
          </p>
        </Card>
      ) : (
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
                      {project.clientName}
                    </p>
                  </div>
                </div>
                <Badge variant={project.isActive ? 'default' : 'secondary'}>
                  {project.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {project.activityCount} {project.activityCount === 1 ? 'activity' : 'activities'}
                </span>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditingProject(project); setModalOpen(true); }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingProject(null); }}
        title={editingProject ? 'Edit Project' : 'New Project'}
        size="md"
      >
        <ProjectForm
          project={editingProject || undefined}
          onSubmit={editingProject ? handleUpdate : handleCreate}
          onCancel={() => { setModalOpen(false); setEditingProject(null); }}
        />
      </Modal>
    </div>
  );
}
