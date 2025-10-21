import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register'];

// API routes that don't require authentication
const publicApiRoutes = ['/api/auth/login', '/api/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname) || publicApiRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow DB initialization routes
  if (pathname.startsWith('/api/db/')) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get('auth_token')?.value;

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify token
  const payload = verifyToken(token);

  if (!payload) {
    // Token is invalid or expired
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  const { role } = payload;

  // Clients and Projects routes are admin-only
  if ((pathname === '/clients' || pathname === '/projects') && role !== 'admin') {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }
    // Redirect to dashboard instead of showing 403 page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|examples).*)',
  ],
};
