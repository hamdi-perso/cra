import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth/session';

export async function POST() {
  try {
    // Clear authentication cookie
    await clearAuthCookie();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
