/**
 * Database Initialization
 * Creates SQLite database and tables
 */

import Database from 'better-sqlite3';
import { join } from 'path';

const DB_PATH = join(process.cwd(), 'data', 'cra.db');

export function getDatabase() {
  const db = new Database(DB_PATH);
  return db;
}

export function initDatabase() {
  const db = getDatabase();

  // Create Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('employee', 'manager', 'admin')),
      createdAt TEXT NOT NULL
    )
  `);

  // Create Clients table
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      isActive INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL
    )
  `);

  // Create Projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      clientId TEXT NOT NULL,
      isActive INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (clientId) REFERENCES clients(id)
    )
  `);

  // Create Activities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      projectId TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft', 'submitted', 'approved', 'rejected')),
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (projectId) REFERENCES projects(id)
    )
  `);

  // Create indexes for performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_activities_userId ON activities(userId);
    CREATE INDEX IF NOT EXISTS idx_activities_projectId ON activities(projectId);
    CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date);
    CREATE INDEX IF NOT EXISTS idx_projects_clientId ON projects(clientId);
  `);

  db.close();
  console.log('✅ Database initialized successfully');
}
