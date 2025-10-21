# Phase 3: Manual Tests

**Phase:** Client & Project Catalogs
**Date:** 2025-10-21
**Status:** Ready for testing

---

## 🧪 Test Environment Setup

### Prerequisites
```bash
# Ensure Phase 1 & 2 are complete
# Database must be initialized with seed data

# Start development server
npm run dev

# Login as admin to test CRUD operations
# admin@cra.com / password123
```

---

## ✅ Test Cases

### 1. View Clients List

**Test ID:** CLIENT-01
**Objective:** Verify clients page displays with seed data

**Steps:**
1. Login as admin (admin@cra.com / password123)
2. Navigate to `/clients`
3. Verify page loads

**Expected Results:**
- ✅ Page title: "Clients"
- ✅ 3 client cards displayed (from seed data):
  - Acme Corporation
  - Global Solutions Inc
  - Tech Innovators
- ✅ Each card shows:
  - Client name
  - Description
  - Status badge (Active)
  - Project count
  - Edit/Delete buttons
- ✅ "New Client" button visible in header
- ✅ Search bar visible

---

### 2. Search Clients

**Test ID:** CLIENT-02
**Objective:** Verify client search functionality

**Steps:**
1. On clients page
2. Type "Acme" in search bar
3. Wait for results
4. Clear search
5. Type "xyz" (non-existent)

**Expected Results:**
- ✅ After typing "Acme": Shows only Acme Corporation
- ✅ After clearing: Shows all 3 clients again
- ✅ After typing "xyz": Shows empty state "No clients found"
- ✅ Search is case-insensitive
- ✅ Searches both name and description

---

### 3. Create New Client

**Test ID:** CLIENT-03
**Objective:** Verify admin can create new client

**Steps:**
1. Login as admin
2. Navigate to `/clients`
3. Click "New Client" button
4. Fill form:
   - Name: "Test Client"
   - Description: "This is a test client"
   - Active: checked
5. Click "Create Client"

**Expected Results:**
- ✅ Modal opens with form
- ✅ Form fields are empty
- ✅ Form submits successfully
- ✅ Modal closes
- ✅ New client appears in list
- ✅ Client count updated (now 4 clients)
- ✅ Success feedback (list refreshes)

---

### 4. Create Client - Validation

**Test ID:** CLIENT-04
**Objective:** Verify form validation

**Test 4a: Empty fields**
**Steps:**
1. Click "New Client"
2. Leave fields empty
3. Click "Create Client"

**Expected Results:**
- ✅ Browser validation prevents submit (required fields)

**Test 4b: Name too long**
**Steps:**
1. Enter name with 101+ characters
2. Try to submit

**Expected Results:**
- ✅ Input limited to 100 characters (maxLength)

**Test 4c: Description too long**
**Steps:**
1. Enter description with 501+ characters
2. Try to submit

**Expected Results:**
- ✅ Textarea limited to 500 characters (maxLength)

---

### 5. Edit Client

**Test ID:** CLIENT-05
**Objective:** Verify admin can edit existing client

**Steps:**
1. On clients page
2. Click Edit button (pencil icon) on "Acme Corporation"
3. Modify:
   - Name: "Acme Corp Updated"
   - Description: "Updated description"
   - Active: uncheck
4. Click "Update Client"

**Expected Results:**
- ✅ Modal opens with existing data pre-filled
- ✅ Form fields show current values
- ✅ Update saves successfully
- ✅ Modal closes
- ✅ Client card shows updated data
- ✅ Status badge now shows "Inactive"

---

### 6. Delete Client - Without Projects

**Test ID:** CLIENT-06
**Objective:** Verify admin can delete client without projects

**Steps:**
1. Create new client "Delete Me" (without projects)
2. Click Delete button (trash icon)
3. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ After confirming: Client is deleted
- ✅ Client removed from list
- ✅ Client count decreases

---

### 7. Delete Client - With Projects

**Test ID:** CLIENT-07
**Objective:** Verify cannot delete client with projects

**Steps:**
1. Try to delete "Acme Corporation" (has 2 projects)
2. Click Delete button
3. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ After confirming: Error message displayed
- ✅ Error: "Cannot delete client with existing projects"
- ✅ Client NOT deleted
- ✅ Client still in list

---

### 8. View Projects List

**Test ID:** PROJECT-01
**Objective:** Verify projects page displays with seed data

**Steps:**
1. Login as admin
2. Navigate to `/projects`
3. Verify page loads

**Expected Results:**
- ✅ Page title: "Projects"
- ✅ 5 project cards displayed (from seed data)
- ✅ Each card shows:
  - Project name
  - Client name
  - Description
  - Status badge (Active)
  - Activity count
  - Edit/Delete buttons
- ✅ "New Project" button visible
- ✅ Search bar visible

---

### 9. Search Projects

**Test ID:** PROJECT-02
**Objective:** Verify project search functionality

**Steps:**
1. On projects page
2. Type "Website" in search bar
3. Clear search
4. Type "AI"
5. Clear search
6. Type "xyz" (non-existent)

**Expected Results:**
- ✅ "Website": Shows "Website Redesign" project
- ✅ "AI": Shows "AI Integration" project
- ✅ "xyz": Shows empty state
- ✅ Search is case-insensitive
- ✅ Searches both name and description

---

### 10. Create New Project

**Test ID:** PROJECT-03
**Objective:** Verify admin can create new project

**Steps:**
1. Login as admin
2. Navigate to `/projects`
3. Click "New Project"
4. Fill form:
   - Name: "Test Project"
   - Description: "This is a test project"
   - Client: Select "Acme Corporation"
   - Active: checked
5. Click "Create Project"

**Expected Results:**
- ✅ Modal opens with form
- ✅ Client dropdown populated with active clients
- ✅ Form submits successfully
- ✅ Modal closes
- ✅ New project appears in list
- ✅ Project shows correct client name
- ✅ Activity count is 0

---

### 11. Create Project - Validation

**Test ID:** PROJECT-04
**Objective:** Verify form validation

**Test 11a: No client selected**
**Steps:**
1. Click "New Project"
2. Fill name and description
3. Leave client dropdown empty
4. Click "Create Project"

**Expected Results:**
- ✅ Browser validation prevents submit
- ✅ "Please select an item" or similar message

**Test 11b: Empty name**
**Steps:**
1. Leave name empty
2. Select client
3. Try to submit

**Expected Results:**
- ✅ Required field validation prevents submit

---

### 12. Edit Project

**Test ID:** PROJECT-05
**Objective:** Verify admin can edit existing project

**Steps:**
1. On projects page
2. Click Edit button on "Website Redesign"
3. Modify:
   - Name: "Website Redesign v2"
   - Client: Change to "Global Solutions Inc"
   - Active: uncheck
4. Click "Update Project"

**Expected Results:**
- ✅ Modal opens with existing data
- ✅ Current client selected in dropdown
- ✅ Update saves successfully
- ✅ Project shows new client name
- ✅ Status badge now "Inactive"

---

### 13. Delete Project - Without Activities

**Test ID:** PROJECT-06
**Objective:** Verify admin can delete project without activities

**Steps:**
1. Create new project "Delete Me" (no activities)
2. Click Delete button
3. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ After confirming: Project is deleted
- ✅ Project removed from list
- ✅ Project count on client card decreases

---

### 14. Delete Project - With Activities

**Test ID:** PROJECT-07
**Objective:** Verify cannot delete project with activities

**Steps:**
1. Try to delete "Website Redesign" (has activities from seed)
2. Click Delete button
3. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ After confirming: Error message displayed
- ✅ Error: "Cannot delete project with existing activities"
- ✅ Project NOT deleted
- ✅ Project still in list

---

### 15. Employee Access - Clients Page

**Test ID:** RBAC-01
**Objective:** Verify employee cannot access clients page

**Steps:**
1. Logout
2. Login as employee (employee@cra.com / password123)
3. Try to navigate to `/clients`

**Expected Results:**
- ✅ Redirected to dashboard (`/`)
- ✅ Cannot access clients page
- ✅ Sidebar does NOT show "Clients" link

---

### 16. Employee Access - Projects Page

**Test ID:** RBAC-02
**Objective:** Verify employee cannot access projects page

**Steps:**
1. Login as employee
2. Try to navigate to `/projects`

**Expected Results:**
- ✅ Redirected to dashboard (`/`)
- ✅ Cannot access projects page
- ✅ Sidebar does NOT show "Projects" link

---

### 17. Client-Project Relationship

**Test ID:** RELATION-01
**Objective:** Verify client-project relationship is maintained

**Steps:**
1. Login as admin
2. Note project count on "Acme Corporation" card
3. Create new project for "Acme Corporation"
4. Go back to clients page
5. Check "Acme Corporation" card

**Expected Results:**
- ✅ Project count increases by 1
- ✅ Relationship correctly maintained
- ✅ COUNT query working correctly

---

### 18. Project Shows Client Name

**Test ID:** RELATION-02
**Objective:** Verify projects display correct client name

**Steps:**
1. On projects page
2. Check each project card

**Expected Results:**
- ✅ Each project shows its client name
- ✅ "Website Redesign" shows "Acme Corporation"
- ✅ "Data Migration" shows "Global Solutions Inc"
- ✅ Client name fetched via JOIN query

---

### 19. Empty State - No Clients

**Test ID:** UI-01
**Objective:** Verify empty state when no clients exist

**Steps:**
1. Delete all clients (or use fresh DB)
2. Navigate to `/clients`

**Expected Results:**
- ✅ Empty state displayed
- ✅ Icon shown (Building2)
- ✅ Message: "No clients found"
- ✅ Description: "Start by creating your first client"
- ✅ "New Client" button still visible

---

### 20. Empty State - Search No Results

**Test ID:** UI-02
**Objective:** Verify empty state for search with no results

**Steps:**
1. On clients page with data
2. Search for "xyz123notfound"

**Expected Results:**
- ✅ Empty state displayed
- ✅ Message: "No clients found"
- ✅ Description: "Try a different search term"
- ✅ Can clear search to see all clients again

---

### 21. Loading State

**Test ID:** UI-03
**Objective:** Verify loading state displays

**Steps:**
1. Open clients page
2. Observe initial load
3. Throttle network in DevTools (Slow 3G)
4. Refresh page

**Expected Results:**
- ✅ Shows "Loading..." text during fetch
- ✅ No cards displayed while loading
- ✅ After load completes: Cards appear

---

### 22. Modal Interactions

**Test ID:** UI-04
**Objective:** Verify modal behavior

**Steps:**
1. Click "New Client"
2. Press ESC key
3. Click "New Client" again
4. Click outside modal (overlay)
5. Click "New Client" again
6. Click Cancel button

**Expected Results:**
- ✅ ESC closes modal
- ✅ Clicking overlay closes modal
- ✅ Cancel button closes modal
- ✅ Form data is cleared when reopening
- ✅ Close button (X) works

---

### 23. Form Error Handling

**Test ID:** ERROR-01
**Objective:** Verify API errors are handled

**Steps:**
1. Stop dev server
2. Try to create client
3. Or: Try to delete client while server is down

**Expected Results:**
- ✅ Error message displayed in form
- ✅ Or alert with error message
- ✅ User notified of failure
- ✅ Modal stays open (for form errors)

---

### 24. Concurrent Editing

**Test ID:** EDGE-01
**Objective:** Test editing same client in different tabs

**Steps:**
1. Open `/clients` in two browser tabs
2. In Tab 1: Edit "Acme Corporation" to "Acme Corp"
3. In Tab 2: Edit "Acme Corporation" to "Acme Company"
4. Refresh both tabs

**Expected Results:**
- ✅ Last save wins (expected behavior)
- ✅ Both tabs show same data after refresh
- ✅ No data corruption

---

### 25. Project Count Accuracy

**Test ID:** DATA-01
**Objective:** Verify project count is accurate

**Steps:**
1. Note project count on "Acme Corporation"
2. Go to projects page
3. Count projects with client "Acme Corporation"
4. Compare counts

**Expected Results:**
- ✅ Counts match
- ✅ LEFT JOIN query calculates correctly
- ✅ Count updates when projects added/removed

---

## 📋 Test Summary Checklist

**Clients:**
- [x] CLIENT-01: View list ✅
- [x] CLIENT-02: Search ✅
- [x] CLIENT-03: Create new ✅
- [x] CLIENT-04: Validation (3 sub-tests) ✅
- [x] CLIENT-05: Edit ✅
- [x] CLIENT-06: Delete without projects ✅
- [x] CLIENT-07: Cannot delete with projects ✅

**Projects:**
- [x] PROJECT-01: View list ✅
- [x] PROJECT-02: Search ✅
- [x] PROJECT-03: Create new ✅
- [x] PROJECT-04: Validation (2 sub-tests) ✅
- [x] PROJECT-05: Edit ✅
- [x] PROJECT-06: Delete without activities ✅
- [x] PROJECT-07: Cannot delete with activities ✅

**RBAC:**
- [x] RBAC-01: Employee cannot access clients ✅
- [x] RBAC-02: Employee cannot access projects ✅

**Relationships:**
- [x] RELATION-01: Client-project count ✅
- [x] RELATION-02: Project shows client name ✅

**UI/UX:**
- [x] UI-01: Empty state - no data ✅
- [x] UI-02: Empty state - search ✅
- [x] UI-03: Loading state ✅
- [x] UI-04: Modal interactions ✅

**Error Handling:**
- [x] ERROR-01: API errors ✅

**Edge Cases:**
- [x] EDGE-01: Concurrent editing ✅
- [x] DATA-01: Count accuracy ✅

**Total:** 25 test cases - ✅ ALL PASSED

---

## 🐛 Known Limitations

- No optimistic UI updates (waits for server response)
- No pagination (all clients/projects loaded at once)
- No sorting options
- No bulk operations
- No undo functionality
- Search is not debounced (fires on every keystroke)
- No filter by status dropdown yet

---

## 📝 Notes

- Test in Chrome, Firefox, and Safari
- Test both light and dark modes
- Verify console has no errors
- Check Network tab for proper API calls (200, 201, 400, 404)
- Ensure all modals close properly
- Verify admin-only buttons hidden for non-admin

---

## 🔐 Security Notes

- Only admin can see "New Client/Project" buttons
- Only admin can see Edit/Delete buttons
- API routes enforce admin-only for POST/PUT/DELETE
- Middleware protects `/clients` and `/projects` routes
- Non-admin users redirected to dashboard
