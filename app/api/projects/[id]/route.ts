import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/init';
import { getCurrentUser } from '@/lib/auth/session';

// GET /api/projects/[id]
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

    const project = db.prepare(`
      SELECT p.*, c.name as clientName, COUNT(a.id) as activityCount
      FROM projects p
      LEFT JOIN clients c ON p.clientId = c.id
      LEFT JOIN activities a ON p.id = a.projectId
      WHERE p.id = ?
      GROUP BY p.id
    `).get(id);

    if (!project) {
      db.close();
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    db.close();
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT /api/projects/[id]
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
    const { name, description, clientId, isActive } = body;

    if (!name || !description || !clientId) {
      return NextResponse.json(
        { error: 'Name, description, and client are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    const existing = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    db.prepare(`
      UPDATE projects
      SET name = ?, description = ?, clientId = ?, isActive = ?
      WHERE id = ?
    `).run(name, description, clientId, isActive ? 1 : 0, id);

    const updated = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    db.close();

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
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

    const activityCount = db.prepare(
      'SELECT COUNT(*) as count FROM activities WHERE projectId = ?'
    ).get(id) as { count: number };

    if (activityCount.count > 0) {
      db.close();
      return NextResponse.json(
        { error: 'Cannot delete project with existing activities' },
        { status: 400 }
      );
    }

    const existing = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    if (!existing) {
      db.close();
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    db.close();

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
