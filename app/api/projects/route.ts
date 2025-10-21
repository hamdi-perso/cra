import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/init';
import { getCurrentUser } from '@/lib/auth/session';
import type { Project } from '@/lib/db/schema';

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const clientId = searchParams.get('clientId') || '';
    const status = searchParams.get('status') || 'all';

    const db = getDatabase();

    let query = `
      SELECT
        p.*,
        c.name as clientName,
        COUNT(a.id) as activityCount
      FROM projects p
      LEFT JOIN clients c ON p.clientId = c.id
      LEFT JOIN activities a ON p.id = a.projectId
      WHERE 1=1
    `;

    const params: any[] = [];

    if (search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (clientId) {
      query += ` AND p.clientId = ?`;
      params.push(clientId);
    }

    if (status === 'active') {
      query += ` AND p.isActive = 1`;
    } else if (status === 'inactive') {
      query += ` AND p.isActive = 0`;
    }

    query += ` GROUP BY p.id ORDER BY p.createdAt DESC`;

    const projects = db.prepare(query).all(...params);
    db.close();

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, clientId, isActive = true } = body;

    if (!name || !description || !clientId) {
      return NextResponse.json(
        { error: 'Name, description, and client are required' },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json({ error: 'Name must be 100 characters or less' }, { status: 400 });
    }

    if (description.length > 500) {
      return NextResponse.json({ error: 'Description must be 500 characters or less' }, { status: 400 });
    }

    const db = getDatabase();

    // Verify client exists
    const client = db.prepare('SELECT id FROM clients WHERE id = ?').get(clientId);
    if (!client) {
      db.close();
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const projectId = crypto.randomUUID();
    const now = new Date().toISOString();

    const project: Project = {
      id: projectId,
      name,
      description,
      clientId,
      isActive,
      createdAt: now,
    };

    db.prepare(`
      INSERT INTO projects (id, name, description, clientId, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(project.id, project.name, project.description, project.clientId, project.isActive ? 1 : 0, project.createdAt);

    db.close();

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
