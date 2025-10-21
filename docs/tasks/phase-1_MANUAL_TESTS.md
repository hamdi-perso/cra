# Phase 1: Manual Tests

**Phase:** Project Foundations & Setup
**Date:** 2025-10-21
**Status:** Ready for testing

---

## 🧪 Test Environment Setup

### Prerequisites
```bash
# Install dependencies
npm install

# Create data directory
mkdir -p data
```

### Database Initialization
**Important:** Server must be running (`npm run dev`) before initializing database

```bash
# Setup database (init + seed) - in a new terminal
npm run db:setup

# OR run separately:
npm run db:init  # Initialize tables
npm run db:seed  # Populate with data

# OR use curl directly:
curl -X POST http://localhost:3000/api/db/init
curl -X POST http://localhost:3000/api/db/seed
```

---

## ✅ Test Cases

### 1. Database Initialization

**Test ID:** DB-01
**Objective:** Verify database tables are created correctly

**Steps:**
1. Delete existing database: `rm -f data/cra.db`
2. Run initialization script: `npm run db:init` OR call API `POST /api/db/init`
3. Check that `data/cra.db` file is created
4. Verify tables exist (use SQLite browser or CLI)

**Expected Results:**
- ✅ `cra.db` file created in `data/` folder
- ✅ Tables created: `users`, `clients`, `projects`, `activities`
- ✅ Indexes created on activities and projects
- ✅ Console shows "✅ Database initialized successfully"

---

### 2. Database Seeding

**Test ID:** DB-02
**Objective:** Verify seed data is populated correctly

**Steps:**
1. Initialize database (DB-01)
2. Run seed script: `npm run db:seed` OR call API `POST /api/db/seed`
3. Open database and verify data

**Expected Results:**
- ✅ 3 users created (employee, manager, admin)
- ✅ 3 clients created
- ✅ 5 projects created and linked to clients
- ✅ 10 activities created with various statuses
- ✅ Console shows:
  - "✅ Seeded X users"
  - "✅ Seeded X clients"
  - "✅ Seeded X projects"
  - "✅ Seeded X activities"
  - "🎉 Database seeded successfully!"

---

### 3. Navigation - Desktop View

**Test ID:** NAV-01
**Objective:** Verify navigation works on desktop

**Steps:**
1. Start dev server: `npm run dev`
2. Open browser at `http://localhost:3000`
3. Verify sidebar is visible on left
4. Click each navigation item:
   - Dashboard
   - Activities
   - Projects
   - Clients
   - Logout

**Expected Results:**
- ✅ Sidebar visible and fixed on desktop (≥1024px width)
- ✅ Navigation items highlighted when active
- ✅ Each page loads correctly
- ✅ AppBar shows "CRA App" title
- ✅ Theme toggle works (light/dark mode)

---

### 4. Navigation - Mobile View

**Test ID:** NAV-02
**Objective:** Verify navigation works on mobile

**Steps:**
1. Open browser at `http://localhost:3000`
2. Resize to mobile view (<1024px) or use DevTools mobile emulation
3. Click hamburger menu icon (top-left)
4. Verify sidebar opens from left
5. Click navigation items
6. Verify sidebar closes after selection

**Expected Results:**
- ✅ Sidebar hidden by default on mobile
- ✅ Hamburger menu visible in AppBar
- ✅ Sidebar slides in from left when menu clicked
- ✅ Dark overlay appears behind sidebar
- ✅ Sidebar closes when item clicked
- ✅ Sidebar closes when overlay clicked

---

### 5. Dashboard Page

**Test ID:** PAGE-01
**Objective:** Verify dashboard displays correctly

**Steps:**
1. Navigate to `/` (Dashboard)
2. Verify page content

**Expected Results:**
- ✅ Page title: "Dashboard"
- ✅ Subtitle: "Welcome back! Here's an overview..."
- ✅ 4 stat cards visible:
  - Hours This Week: 24.5h
  - Activities: 10
  - Approved: 4
  - Pending: 3
- ✅ "Recent Activities" section with 3 activities
- ✅ Each activity shows title, project, date, duration, status badge
- ✅ Page animates on load (fade-in)

---

### 6. Activities Page

**Test ID:** PAGE-02
**Objective:** Verify activities page displays empty state

**Steps:**
1. Navigate to `/activities`
2. Verify page content

**Expected Results:**
- ✅ Page title: "Activities"
- ✅ Subtitle: "Manage your daily activities..."
- ✅ "New Activity" button in header
- ✅ Empty state card with:
  - Calendar icon
  - "No activities yet" heading
  - Description text
  - "Create Your First Activity" button
- ✅ Page animates on load (fade-in)

---

### 7. Clients Page

**Test ID:** PAGE-03
**Objective:** Verify clients page displays grid of clients

**Steps:**
1. Navigate to `/clients`
2. Verify page content

**Expected Results:**
- ✅ Page title: "Clients"
- ✅ Subtitle: "Manage client organizations..."
- ✅ "New Client" button in header
- ✅ 3 client cards in grid layout:
  - Acme Corporation (2 projects)
  - Global Solutions Inc (2 projects)
  - Tech Innovators (1 project)
- ✅ Each card shows:
  - Building icon
  - Client name
  - Description
  - Active badge
  - Project count
  - "View Details" button
- ✅ Cards have hover effect (shadow)

---

### 8. Projects Page

**Test ID:** PAGE-04
**Objective:** Verify projects page displays grid of projects

**Steps:**
1. Navigate to `/projects`
2. Verify page content

**Expected Results:**
- ✅ Page title: "Projects"
- ✅ Subtitle: "View and manage all client projects"
- ✅ "New Project" button in header
- ✅ 5 project cards in grid layout:
  - Website Redesign (Acme Corporation)
  - Mobile App Development (Acme Corporation)
  - Data Migration (Global Solutions Inc)
  - Security Audit (Global Solutions Inc)
  - AI Integration (Tech Innovators)
- ✅ Each card shows:
  - Briefcase icon
  - Project name
  - Client name
  - Description
  - Active badge
  - Activity count
  - "View Activities" button
- ✅ Cards have hover effect (shadow)

---

### 9. Login Page

**Test ID:** PAGE-05
**Objective:** Verify login page displays correctly

**Steps:**
1. Navigate to `/login`
2. Verify page content

**Expected Results:**
- ✅ No AppBar or Sidebar visible
- ✅ Centered card layout
- ✅ "CRA App" title with gradient
- ✅ "Sign in to your account" subtitle
- ✅ Email input field
- ✅ Password input field
- ✅ "Remember me" checkbox
- ✅ "Forgot password?" link
- ✅ "Sign In" button with icon
- ✅ Demo credentials box showing:
  - employee@cra.com / password123
  - manager@cra.com / password123
  - admin@cra.com / password123
- ✅ "Don't have an account? Sign up" link
- ✅ Link to `/register` works

---

### 10. Register Page

**Test ID:** PAGE-06
**Objective:** Verify register page displays correctly

**Steps:**
1. Navigate to `/register`
2. Verify page content

**Expected Results:**
- ✅ No AppBar or Sidebar visible
- ✅ Centered card layout
- ✅ "CRA App" title with gradient
- ✅ "Create your account" subtitle
- ✅ Form fields:
  - First Name
  - Last Name
  - Email
  - Password
  - Confirm Password
- ✅ Terms of Service checkbox with links
- ✅ "Create Account" button with icon
- ✅ "Already have an account? Sign in" link
- ✅ Link to `/login` works

---

### 11. API Routes - Initialize

**Test ID:** API-01
**Objective:** Verify database initialization API works

**Steps:**
1. Delete database: `rm -f data/cra.db`
2. Call API: `curl -X POST http://localhost:3000/api/db/init`
3. Check response

**Expected Results:**
- ✅ Response status: 200
- ✅ Response body:
```json
{
  "success": true,
  "message": "Database initialized successfully"
}
```
- ✅ `data/cra.db` file created

---

### 12. API Routes - Seed

**Test ID:** API-02
**Objective:** Verify database seeding API works

**Steps:**
1. Initialize database first (API-01)
2. Call API: `curl -X POST http://localhost:3000/api/db/seed`
3. Check response

**Expected Results:**
- ✅ Response status: 200
- ✅ Response body:
```json
{
  "success": true,
  "message": "Database seeded successfully"
}
```
- ✅ Console shows seed messages

---

### 13. Responsive Design - Breakpoints

**Test ID:** RWD-01
**Objective:** Verify responsive design at different breakpoints

**Steps:**
1. Open dashboard page
2. Test at different widths:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1280px
   - Large: 1920px

**Expected Results:**
- ✅ **Mobile (375px):**
  - Sidebar hidden
  - Hamburger menu visible
  - Stats cards stacked (1 column)
  - Content readable and accessible
- ✅ **Tablet (768px):**
  - Stats cards in 2 columns
  - Content well spaced
- ✅ **Desktop (1280px):**
  - Sidebar visible and fixed
  - Stats cards in 4 columns
  - Full layout visible
- ✅ **Large (1920px):**
  - Layout centered
  - No excessive stretching

---

### 14. Dark Mode

**Test ID:** THEME-01
**Objective:** Verify dark mode works correctly

**Steps:**
1. Open any page
2. Click theme toggle in AppBar
3. Verify colors change
4. Navigate to different pages
5. Toggle back to light mode

**Expected Results:**
- ✅ Theme toggle button visible in AppBar
- ✅ Clicking toggles between light and dark mode
- ✅ All pages respect theme setting
- ✅ Colors are readable in both modes
- ✅ Cards, buttons, inputs styled correctly in both themes
- ✅ Theme preference persists across page navigation

---

### 15. TypeScript Types

**Test ID:** TYPE-01
**Objective:** Verify TypeScript types are correct and working

**Steps:**
1. Run TypeScript compiler: `npx tsc --noEmit`
2. Check for errors

**Expected Results:**
- ✅ No TypeScript compilation errors
- ✅ All imports resolve correctly
- ✅ Database schema types exported and usable

---

## 📋 Test Summary Checklist

- [ ] DB-01: Database Initialization
- [ ] DB-02: Database Seeding
- [ ] NAV-01: Navigation Desktop
- [ ] NAV-02: Navigation Mobile
- [ ] PAGE-01: Dashboard Page
- [ ] PAGE-02: Activities Page
- [ ] PAGE-03: Clients Page
- [ ] PAGE-04: Projects Page
- [ ] PAGE-05: Login Page
- [ ] PAGE-06: Register Page
- [ ] API-01: API Initialize
- [ ] API-02: API Seed
- [ ] RWD-01: Responsive Design
- [ ] THEME-01: Dark Mode
- [ ] TYPE-01: TypeScript Types

---

## 🐛 Known Issues / Limitations

- Navigation links are client-side only (no actual href navigation)
- No authentication enforcement (pages accessible without login)
- Data hardcoded in pages (not connected to database yet)
- Forms don't submit (no backend integration)
- Buttons are placeholders (no functionality)

---

## 📝 Notes

- All tests should be performed in Chrome, Firefox, and Safari
- Test both light and dark modes for each page
- Verify console has no errors during testing
- Database file should be created in `data/` directory at project root
