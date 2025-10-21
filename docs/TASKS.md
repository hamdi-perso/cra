# 📋 CRA App - Tasks

**Project:** Activity Report System (CRA) - AI-assisted time tracking and validation
**Stack:** Next.js 15, TypeScript, Tailwind CSS v4, SQLite → PostgreSQL
**Roles:** Employee (logs activities), Manager (approves), Admin (manages)

---

## Phase 1: Project Foundations & Setup
- [ ] Next.js 15 project structure
- [ ] Navigation system (AppBar, Sidebar)
- [ ] Basic page layouts (Dashboard, Activities, Auth)
- [ ] Database initialization with seed data
- [ ] User/Client/Project/Activity models

## Phase 2: Authentication & RBAC
- [ ] JWT authentication system
- [ ] Login/Register pages
- [ ] Auth middleware
- [ ] Role-based access control (Employee, Manager, Admin)

## Phase 3: Client & Project Catalogs
- [ ] Client CRUD operations
- [ ] Project CRUD operations
- [ ] Client-Project relationships
- [ ] List/Grid views with search & filters

## Phase 4: Activity CRUD + AI Draft
- [ ] Activity CRUD operations
- [ ] Calendar view (day, week, month)
- [ ] AI draft generation endpoint `/api/ai/draft`
- [ ] Voice/text input processing
- [ ] Activity templates (recurring tasks)

## Phase 5: Monthly Period Management
- [ ] Monthly period model
- [ ] Period status (draft, submitted, approved, rejected)
- [ ] Submit period for approval
- [ ] Period overview dashboard

## Phase 6: Manager Review & Approval
- [ ] Manager dashboard
- [ ] Review interface
- [ ] Comment system
- [ ] Approve/Reject actions
- [ ] Email/Slack notifications

## Phase 7: AI Anomaly Detection
- [ ] `/api/ai/analyze` endpoint
- [ ] `/api/ai/normalize` endpoint
- [ ] Duplicate detection
- [ ] Inconsistency detection
- [ ] Auto-suggest corrections

## Phase 8: Google Calendar Integration
- [ ] Google OAuth integration
- [ ] Calendar import interface
- [ ] Map calendar events to activities
- [ ] Auto-draft from calendar events

## Phase 9: Reports & Exports
- [ ] Dashboard with charts
- [ ] Key indicators
- [ ] PDF export
- [ ] Excel export

## Phase 10: Quality Assurance & Final Polish
- [ ] Full test suite
- [ ] Performance optimization
- [ ] Security audit
- [ ] Migration SQLite → PostgreSQL
