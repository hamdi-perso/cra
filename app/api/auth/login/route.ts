import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDatabase } from '@/lib/db/init';
import { verifyPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import type { User } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Find user by email
    const user = db
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(email) as User | undefined;

    if (!user) {
      db.close();
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      db.close();
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    db.close();

    // Generate JWT token
    const token = await generateToken(user);

    console.log('🔑 Generated token (first 50 chars):', token.substring(0, 50));

    // Set auth cookie BEFORE creating response (Next.js 15 requirement)
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    console.log('✅ Login successful, cookie set for user:', user.email);

    // Return user data (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
