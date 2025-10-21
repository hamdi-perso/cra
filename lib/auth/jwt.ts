/**
 * JWT Token Management
 * Handles token generation and verification
 * Uses 'jose' library for Edge Runtime compatibility
 */

import { SignJWT, jwtVerify } from 'jose';
import type { User } from '../db/schema';

// Secret key for JWT signing (should be in env variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

// Convert secret to Uint8Array for jose
const secret = new TextEncoder().encode(JWT_SECRET);

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate JWT token for a user
 */
export async function generateToken(user: User): Promise<string> {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret);
}

/**
 * Verify and decode JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    // Token is invalid or expired
    console.error('❌ JWT verification error:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload as JWTPayload;
  } catch {
    return null;
  }
}
