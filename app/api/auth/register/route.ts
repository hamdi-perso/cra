import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDatabase } from '@/lib/db/init';
import { hashPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import type { User } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Check if user already exists
    const existingUser = db
      .prepare('SELECT id FROM users WHERE email = ?')
      .get(email);

    if (existingUser) {
      db.close();
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user (default role: employee)
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();

    const user: User = {
      id: userId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'employee',
      createdAt: now,
    };

    db.prepare(`
      INSERT INTO users (id, email, password, firstName, lastName, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      user.id,
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.role,
      user.createdAt
    );

    db.close();

    // Generate JWT token
    const token = await generateToken(user);

    // Set auth cookie BEFORE creating response (Next.js 15 requirement)
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    console.log('✅ Registration successful, cookie set for user:', user.email);

    // Return user data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
