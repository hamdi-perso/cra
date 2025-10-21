# Phase 2: Manual Tests

**Phase:** Authentication & RBAC
**Date:** 2025-10-21
**Status:** Ready for testing

---

## 🧪 Test Environment Setup

### Prerequisites
```bash
# Ensure Phase 1 is complete
# Database must be initialized and seeded

# Delete old database to get hashed passwords
rm -f data/cra.db

# Start development server
npm run dev

# In another terminal, initialize database with hashed passwords
npm run db:setup
```

---

## ✅ Test Cases

### 1. User Registration

**Test ID:** AUTH-01
**Objective:** Verify user can register with valid credentials

**Steps:**
1. Navigate to `/register`
2. Fill in form:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "test@example.com"
   - Password: "test123"
   - Confirm Password: "test123"
3. Check "I agree to terms" checkbox
4. Click "Create Account"

**Expected Results:**
- ✅ Form shows loading state ("Creating account...")
- ✅ User is created in database with hashed password
- ✅ User is automatically logged in
- ✅ Redirected to dashboard (`/`)
- ✅ AppBar shows "CRA App - Test User"
- ✅ Sidebar shows Dashboard, Activities, Logout (no Clients/Projects)

---

### 2. Registration Validation

**Test ID:** AUTH-02
**Objective:** Verify registration form validation

**Test 2a: Password too short**
**Steps:**
1. Navigate to `/register`
2. Enter password "12345" (5 chars)
3. Click "Create Account"

**Expected Results:**
- ✅ Error message: "Password must be at least 6 characters"
- ✅ User not created

**Test 2b: Passwords don't match**
**Steps:**
1. Enter password "password123"
2. Enter confirm password "different123"
3. Click "Create Account"

**Expected Results:**
- ✅ Error message: "Passwords do not match"
- ✅ User not created

**Test 2c: Duplicate email**
**Steps:**
1. Try to register with "employee@cra.com"
2. Click "Create Account"

**Expected Results:**
- ✅ Error message: "Email already registered"
- ✅ User not created

**Test 2d: Invalid email format**
**Steps:**
1. Enter email "notanemail"
2. Click "Create Account"

**Expected Results:**
- ✅ Error message: "Invalid email format"
- ✅ User not created

---

### 3. User Login - Employee

**Test ID:** AUTH-03
**Objective:** Verify employee can login and sees correct pages

**Steps:**
1. Navigate to `/login`
2. Enter email: "employee@cra.com"
3. Enter password: "password123"
4. Click "Sign In"

**Expected Results:**
- ✅ Form shows loading state ("Signing in...")
- ✅ User is logged in
- ✅ Redirected to dashboard (`/`)
- ✅ AppBar shows "CRA App - John Doe"
- ✅ Sidebar shows:
  - Dashboard ✅
  - Activities ✅
  - Logout ✅
- ✅ Sidebar does NOT show:
  - Projects ❌
  - Clients ❌

---

### 4. User Login - Admin

**Test ID:** AUTH-04
**Objective:** Verify admin can login and sees all pages

**Steps:**
1. Logout if logged in
2. Navigate to `/login`
3. Enter email: "admin@cra.com"
4. Enter password: "password123"
5. Click "Sign In"

**Expected Results:**
- ✅ User is logged in
- ✅ Redirected to dashboard
- ✅ AppBar shows "CRA App - Admin User"
- ✅ Sidebar shows:
  - Dashboard ✅
  - Activities ✅
  - Projects ✅
  - Clients ✅
  - Logout ✅

---

### 5. Login Validation

**Test ID:** AUTH-05
**Objective:** Verify login form validation

**Test 5a: Invalid credentials**
**Steps:**
1. Navigate to `/login`
2. Enter email: "employee@cra.com"
3. Enter password: "wrongpassword"
4. Click "Sign In"

**Expected Results:**
- ✅ Error message: "Invalid email or password"
- ✅ User not logged in
- ✅ Stays on login page

**Test 5b: Non-existent user**
**Steps:**
1. Enter email: "nonexistent@example.com"
2. Enter password: "password123"
3. Click "Sign In"

**Expected Results:**
- ✅ Error message: "Invalid email or password"
- ✅ User not logged in

---

### 6. Logout

**Test ID:** AUTH-06
**Objective:** Verify user can logout

**Steps:**
1. Login as any user
2. Click "Logout" in sidebar

**Expected Results:**
- ✅ User is logged out
- ✅ Auth cookie is cleared
- ✅ Redirected to `/login`
- ✅ Cannot access protected pages without logging in again

---

### 7. Protected Routes - Authenticated Access

**Test ID:** AUTH-07
**Objective:** Verify authenticated users can access protected routes

**Steps:**
1. Login as employee
2. Try to access:
   - `/` (Dashboard)
   - `/activities`

**Expected Results:**
- ✅ Dashboard loads successfully
- ✅ Activities page loads successfully
- ✅ No redirects

---

### 8. Protected Routes - Unauthenticated Access

**Test ID:** AUTH-08
**Objective:** Verify unauthenticated users cannot access protected routes

**Steps:**
1. Logout (or open incognito window)
2. Try to access:
   - `/` (Dashboard)
   - `/activities`
   - `/clients`
   - `/projects`

**Expected Results:**
- ✅ All routes redirect to `/login`
- ✅ Cannot access any protected page
- ✅ After redirect, can login and access pages

---

### 9. RBAC - Employee Cannot Access Admin Pages

**Test ID:** AUTH-09
**Objective:** Verify RBAC prevents employees from accessing admin pages

**Steps:**
1. Login as employee (employee@cra.com)
2. Try to access `/clients` directly in URL
3. Try to access `/projects` directly in URL

**Expected Results:**
- ✅ `/clients` redirects to dashboard (`/`)
- ✅ `/projects` redirects to dashboard (`/`)
- ✅ No error message shown (silent redirect)
- ✅ Sidebar does not show Clients/Projects links

---

### 10. RBAC - Admin Can Access All Pages

**Test ID:** AUTH-10
**Objective:** Verify admin has access to all pages

**Steps:**
1. Login as admin (admin@cra.com)
2. Access:
   - `/` (Dashboard)
   - `/activities`
   - `/clients`
   - `/projects`

**Expected Results:**
- ✅ All pages load successfully
- ✅ Sidebar shows all navigation items
- ✅ No redirects

---

### 11. Session Persistence

**Test ID:** AUTH-11
**Objective:** Verify session persists after page refresh

**Steps:**
1. Login as any user
2. Refresh the page (F5)
3. Navigate to different pages
4. Refresh again

**Expected Results:**
- ✅ User stays logged in after refresh
- ✅ User info still displayed in AppBar
- ✅ Sidebar items still filtered by role
- ✅ No redirect to login
- ✅ Session persists for 7 days (until cookie expires)

---

### 12. API Route Protection

**Test ID:** AUTH-12
**Objective:** Verify API routes require authentication

**Test 12a: Get current user (authenticated)**
**Steps:**
1. Login as any user
2. Call: `curl http://localhost:3000/api/auth/me`

**Expected Results:**
- ✅ Response status: 200
- ✅ Response contains user data (without password)

**Test 12b: Get current user (unauthenticated)**
**Steps:**
1. Logout
2. Call: `curl http://localhost:3000/api/auth/me`

**Expected Results:**
- ✅ Response status: 401
- ✅ Response: `{ "error": "Not authenticated" }`

---

### 13. Password Hashing

**Test ID:** AUTH-13
**Objective:** Verify passwords are hashed in database

**Steps:**
1. Register a new user
2. Open database: `sqlite3 data/cra.db`
3. Query: `SELECT email, password FROM users WHERE email = 'test@example.com';`

**Expected Results:**
- ✅ Password is NOT "password123" (plain text)
- ✅ Password is bcrypt hash (starts with `$2a$` or `$2b$`)
- ✅ Hash is 60 characters long

---

### 14. Token Expiration

**Test ID:** AUTH-14
**Objective:** Verify JWT token expires after 7 days

**Steps:**
1. Login as any user
2. Inspect cookie in browser DevTools
3. Check `auth_token` cookie properties

**Expected Results:**
- ✅ Cookie exists with name `auth_token`
- ✅ HttpOnly: true
- ✅ SameSite: Lax
- ✅ MaxAge: 604800 seconds (7 days)
- ✅ Secure: true (in production only)

---

### 15. Multiple Role Testing

**Test ID:** AUTH-15
**Objective:** Verify different roles see different navigation

**Steps:**
1. Login as employee → Note sidebar items → Logout
2. Login as manager → Note sidebar items → Logout
3. Login as admin → Note sidebar items → Logout

**Expected Results:**

**Employee:**
- ✅ Dashboard, Activities, Logout

**Manager:**
- ✅ Dashboard, Activities, Logout

**Admin:**
- ✅ Dashboard, Activities, Projects, Clients, Logout

---

### 16. Concurrent Sessions

**Test ID:** AUTH-16
**Objective:** Verify multiple tabs share session

**Steps:**
1. Login in Tab 1
2. Open Tab 2 to same app
3. Navigate in Tab 2
4. Logout in Tab 1
5. Try to navigate in Tab 2

**Expected Results:**
- ✅ Tab 2 shows user as logged in initially
- ✅ After logout in Tab 1, Tab 2 needs refresh to detect logout
- ✅ After refresh Tab 2, redirected to login

---

### 17. Register Then Login

**Test ID:** AUTH-17
**Objective:** Verify newly registered user can login

**Steps:**
1. Register new user: newuser@test.com / password123
2. Note that you're auto-logged in
3. Logout
4. Login again with same credentials

**Expected Results:**
- ✅ After registration, auto-logged in and redirected
- ✅ After logout, can login with registered credentials
- ✅ Password verification works correctly

---

### 18. Navigation After Login

**Test ID:** AUTH-18
**Objective:** Verify navigation works correctly after authentication

**Steps:**
1. Login as employee
2. Click "Activities" in sidebar
3. Click "Dashboard" in sidebar
4. Try to access `/clients` via URL
5. Use browser back button

**Expected Results:**
- ✅ Navigation between allowed pages works
- ✅ Trying to access `/clients` redirects to dashboard
- ✅ Browser back button works correctly
- ✅ No duplicate redirects

---

## 📋 Test Summary Checklist

- [ ] AUTH-01: User Registration
- [ ] AUTH-02: Registration Validation (4 sub-tests)
- [ ] AUTH-03: User Login - Employee
- [ ] AUTH-04: User Login - Admin
- [ ] AUTH-05: Login Validation (2 sub-tests)
- [ ] AUTH-06: Logout
- [ ] AUTH-07: Protected Routes - Authenticated
- [ ] AUTH-08: Protected Routes - Unauthenticated
- [ ] AUTH-09: RBAC - Employee Restrictions
- [ ] AUTH-10: RBAC - Admin Access
- [ ] AUTH-11: Session Persistence
- [ ] AUTH-12: API Route Protection (2 sub-tests)
- [ ] AUTH-13: Password Hashing
- [ ] AUTH-14: Token Expiration
- [ ] AUTH-15: Multiple Role Testing
- [ ] AUTH-16: Concurrent Sessions
- [ ] AUTH-17: Register Then Login
- [ ] AUTH-18: Navigation After Login

**Total:** 18 test cases (some with sub-tests)

---

## 🐛 Known Issues / Limitations

- Session expires after 7 days (as designed)
- No "Remember me" functionality implemented yet
- No "Forgot password" functionality (placeholder link)
- Manager role same permissions as employee (will differ in Phase 6)
- No profile page yet
- No password change functionality

---

## 📝 Notes

- Test in Chrome, Firefox, and Safari
- Test both light and dark modes
- Verify console has no errors
- Check Network tab for proper status codes (200, 401, 403)
- Passwords in database should NEVER be plain text
- Demo credentials remain the same: password123 for all users

---

## 🔐 Security Checklist

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens in HTTP-only cookies
- [ ] Protected routes redirect properly
- [ ] RBAC enforced on both client and server
- [ ] API returns 401 for unauthenticated
- [ ] API returns 403 for unauthorized (wrong role)
- [ ] No sensitive data in JWT payload
- [ ] Token expiration working correctly
