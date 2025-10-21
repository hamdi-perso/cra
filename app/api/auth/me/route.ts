import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { getDatabase } from '@/lib/db/init';
import type { User } from '@/lib/db/schema';

export async function GET() {
  try {
    // Get current user from session
    const session = await getCurrentUser();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch full user data from database
    const db = getDatabase();
    const user = db
      .prepare('SELECT * FROM users WHERE id = ?')
      .get(session.userId) as User | undefined;

    db.close();

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    );
  }
}
