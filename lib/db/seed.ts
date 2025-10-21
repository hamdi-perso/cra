/**
 * Database Seed Data
 * Populates database with initial test data
 */

import { getDatabase } from './init';
import { hashPassword } from '../auth/password';
import type { User, Client, Project, Activity } from './schema';

function generateId(): string {
  return crypto.randomUUID();
}

function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

export async function seedDatabase() {
  const db = getDatabase();

  try {
    // Clear existing data
    db.exec('DELETE FROM activities');
    db.exec('DELETE FROM projects');
    db.exec('DELETE FROM clients');
    db.exec('DELETE FROM users');

    const now = getCurrentTimestamp();

    // Seed Users
    const users: Omit<User, 'password'>[] = [
      {
        id: generateId(),
        email: 'employee@cra.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'employee',
        createdAt: now,
      },
      {
        id: generateId(),
        email: 'manager@cra.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'manager',
        createdAt: now,
      },
      {
        id: generateId(),
        email: 'admin@cra.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: now,
      },
    ];

    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password, firstName, lastName, role, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    // Hash password for all users
    const hashedPassword = await hashPassword('password123');

    users.forEach((user) => {
      insertUser.run(user.id, user.email, hashedPassword, user.firstName, user.lastName, user.role, user.createdAt);
    });

    console.log(`✅ Seeded ${users.length} users`);

    // Seed Clients
    const clients: Client[] = [
      {
        id: generateId(),
        name: 'Acme Corporation',
        description: 'Leading technology company',
        isActive: true,
        createdAt: now,
      },
      {
        id: generateId(),
        name: 'Global Solutions Inc',
        description: 'International consulting firm',
        isActive: true,
        createdAt: now,
      },
      {
        id: generateId(),
        name: 'Tech Innovators',
        description: 'Startup incubator and accelerator',
        isActive: true,
        createdAt: now,
      },
    ];

    const insertClient = db.prepare(`
      INSERT INTO clients (id, name, description, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);

    clients.forEach((client) => {
      insertClient.run(client.id, client.name, client.description, client.isActive ? 1 : 0, client.createdAt);
    });

    console.log(`✅ Seeded ${clients.length} clients`);

    // Seed Projects
    const projects: Project[] = [
      {
        id: generateId(),
        name: 'Website Redesign',
        description: 'Complete overhaul of corporate website',
        clientId: clients[0].id,
        isActive: true,
        createdAt: now,
      },
      {
        id: generateId(),
        name: 'Mobile App Development',
        description: 'iOS and Android app development',
        clientId: clients[0].id,
        isActive: true,
        createdAt: now,
      },
      {
        id: generateId(),
        name: 'Data Migration',
        description: 'Legacy system to cloud migration',
        clientId: clients[1].id,
        isActive: true,
        createdAt: now,
      },
      {
        id: generateId(),
        name: 'Security Audit',
        description: 'Comprehensive security assessment',
        clientId: clients[1].id,
        isActive: true,
        createdAt: now,
      },
      {
        id: generateId(),
        name: 'AI Integration',
        description: 'Machine learning pipeline setup',
        clientId: clients[2].id,
        isActive: true,
        createdAt: now,
      },
    ];

    const insertProject = db.prepare(`
      INSERT INTO projects (id, name, description, clientId, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    projects.forEach((project) => {
      insertProject.run(project.id, project.name, project.description, project.clientId, project.isActive ? 1 : 0, project.createdAt);
    });

    console.log(`✅ Seeded ${projects.length} projects`);

    // Seed Activities
    const activities: Activity[] = [
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[0].id,
        title: 'Initial planning and requirements gathering',
        description: 'Met with stakeholders to discuss project scope',
        date: '2025-10-15',
        duration: 120, // 2 hours
        status: 'approved',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[0].id,
        title: 'Design mockups creation',
        description: 'Created initial wireframes and mockups',
        date: '2025-10-16',
        duration: 240, // 4 hours
        status: 'approved',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[1].id,
        title: 'Setup development environment',
        description: 'Configured React Native and dependencies',
        date: '2025-10-17',
        duration: 180, // 3 hours
        status: 'submitted',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[1].id,
        title: 'Implemented authentication flow',
        description: 'Built login and registration screens',
        date: '2025-10-18',
        duration: 300, // 5 hours
        status: 'submitted',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[2].id,
        title: 'Database schema analysis',
        description: 'Analyzed legacy database structure',
        date: '2025-10-19',
        duration: 150, // 2.5 hours
        status: 'draft',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[2].id,
        title: 'Data mapping documentation',
        description: 'Documented field mapping between old and new systems',
        date: '2025-10-20',
        duration: 210, // 3.5 hours
        status: 'draft',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[3].id,
        title: 'Security vulnerability scanning',
        description: 'Ran automated security scans on infrastructure',
        date: '2025-10-21',
        duration: 90, // 1.5 hours
        status: 'draft',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[4].id,
        title: 'ML model research',
        description: 'Researched suitable ML models for use case',
        date: '2025-10-14',
        duration: 180, // 3 hours
        status: 'approved',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[4].id,
        title: 'Training data preparation',
        description: 'Cleaned and formatted training dataset',
        date: '2025-10-15',
        duration: 240, // 4 hours
        status: 'approved',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: generateId(),
        userId: users[0].id,
        projectId: projects[0].id,
        title: 'Frontend component development',
        description: 'Implemented reusable UI components',
        date: '2025-10-21',
        duration: 360, // 6 hours
        status: 'draft',
        createdAt: now,
        updatedAt: now,
      },
    ];

    const insertActivity = db.prepare(`
      INSERT INTO activities (id, userId, projectId, title, description, date, duration, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    activities.forEach((activity) => {
      insertActivity.run(
        activity.id,
        activity.userId,
        activity.projectId,
        activity.title,
        activity.description,
        activity.date,
        activity.duration,
        activity.status,
        activity.createdAt,
        activity.updatedAt
      );
    });

    console.log(`✅ Seeded ${activities.length} activities`);
    console.log('🎉 Database seeded successfully!');

    db.close();
  } catch (error) {
    db.close();
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
