import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/init';
import { getCurrentUser } from '@/lib/auth/session';
import type { Client } from '@/lib/db/schema';

// GET /api/clients - Get all clients
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const db = getDatabase();

    let query = `
      SELECT
        c.*,
        COUNT(p.id) as projectCount
      FROM clients c
      LEFT JOIN projects p ON c.id = p.clientId
      WHERE 1=1
    `;

    const params: any[] = [];

    // Filter by search
    if (search) {
      query += ` AND (c.name LIKE ? OR c.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Filter by status
    if (status === 'active') {
      query += ` AND c.isActive = 1`;
    } else if (status === 'inactive') {
      query += ` AND c.isActive = 0`;
    }

    query += ` GROUP BY c.id ORDER BY c.createdAt DESC`;

    const clients = db.prepare(query).all(...params);

    db.close();

    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error('Get clients error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST /api/clients - Create new client
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Only admins can create clients
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, isActive = true } = body;

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

    const clientId = crypto.randomUUID();
    const now = new Date().toISOString();

    const client: Client = {
      id: clientId,
      name,
      description,
      isActive,
      createdAt: now,
    };

    db.prepare(`
      INSERT INTO clients (id, name, description, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `).run(client.id, client.name, client.description, client.isActive ? 1 : 0, client.createdAt);

    db.close();

    return NextResponse.json({ success: true, client }, { status: 201 });
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
