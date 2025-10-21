'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { ClientForm } from '@/components/clients/client-form';
import { Plus, Building2, Pencil, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/app/providers/auth-provider';
import type { Client } from '@/lib/db/schema';

export default function ClientsPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, [search]);

  const fetchClients = async () => {
    try {
      const res = await fetch(`/api/clients?search=${search}`);
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create client');
    await fetchClients();
    setModalOpen(false);
  };

  const handleUpdate = async (data: any) => {
    const res = await fetch(`/api/clients/${editingClient?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update client');
    await fetchClients();
    setModalOpen(false);
    setEditingClient(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete client');
        return;
      }
      await fetchClients();
    } catch (error) {
      alert('Failed to delete client');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Clients</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage client organizations and relationships
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => { setEditingClient(null); setModalOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            New Client
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : clients.length === 0 ? (
        <Card className="p-12 text-center">
          <Building2 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No clients found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {search ? 'Try a different search term' : 'Start by creating your first client'}
          </p>
        </Card>
      ) : (
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
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                {client.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {client.projectCount} {client.projectCount === 1 ? 'project' : 'projects'}
                </span>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditingClient(client); setModalOpen(true); }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(client.id)}
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
        onClose={() => { setModalOpen(false); setEditingClient(null); }}
        title={editingClient ? 'Edit Client' : 'New Client'}
        size="md"
      >
        <ClientForm
          client={editingClient || undefined}
          onSubmit={editingClient ? handleUpdate : handleCreate}
          onCancel={() => { setModalOpen(false); setEditingClient(null); }}
        />
      </Modal>
    </div>
  );
}
