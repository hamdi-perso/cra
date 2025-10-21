import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/init';
import { getCurrentUser } from '@/lib/auth/session';
import type { Client } from '@/lib/db/schema';

// GET /api/clients/[id] - Get single client
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const db = getDatabase();

    const client = db.prepare(`
      SELECT c.*, COUNT(p.id) as projectCount
      FROM clients c
      LEFT JOIN projects p ON c.id = p.clientId
      WHERE c.id = ?
      GROUP BY c.id
    `).get(id);

    if (!client) {
      db.close();
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Get related projects
    const projects = db.prepare(`
      SELECT * FROM projects WHERE clientId = ?
    `).all(id);

    db.close();

    return NextResponse.json({ success: true, client: { ...client, projects } });
  } catch (error) {
    console.error('Get client error:', error);
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
  }
}

// PUT /api/clients/[id] - Update client
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, isActive } = body;

    // Validation
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be 100 characters or less' },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        { error: 'Description must be 500 characters or less' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Check if client exists
    const existing = db.prepare('SELECT id FROM clients WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Update client
    db.prepare(`
      UPDATE clients
      SET name = ?, description = ?, isActive = ?
      WHERE id = ?
    `).run(name, description, isActive ? 1 : 0, id);

    // Fetch updated client
    const updated = db.prepare('SELECT * FROM clients WHERE id = ?').get(id);

    db.close();

    return NextResponse.json({ success: true, client: updated });
  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

// DELETE /api/clients/[id] - Delete client
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const db = getDatabase();

    // Check if client has projects
    const projectCount = db.prepare(
      'SELECT COUNT(*) as count FROM projects WHERE clientId = ?'
    ).get(id) as { count: number };

    if (projectCount.count > 0) {
      db.close();
      return NextResponse.json(
        { error: 'Cannot delete client with existing projects' },
        { status: 400 }
      );
    }

    // Check if client exists
    const existing = db.prepare('SELECT id FROM clients WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Delete client
    db.prepare('DELETE FROM clients WHERE id = ?').run(id);

    db.close();

    return NextResponse.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
  }
}
