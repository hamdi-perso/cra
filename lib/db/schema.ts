/**
 * Database Schema Types
 * Defines all database models for the CRA application
 */

export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string; // hashed with bcrypt
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string; // ISO date string
}

export interface Client {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  isActive: boolean;
  createdAt: string;
}

export type ActivityStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface Activity {
  id: string;
  userId: string;
  projectId: string;
  title: string;
  description: string;
  date: string; // ISO date string (YYYY-MM-DD)
  duration: number; // in minutes
  status: ActivityStatus;
  createdAt: string;
  updatedAt: string;
}

// Joined types for UI
export interface ActivityWithDetails extends Activity {
  project?: Project;
  client?: Client;
  user?: User;
}

export interface ProjectWithClient extends Project {
  client?: Client;
}
