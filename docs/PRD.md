# 🧾 PRD — CRA App (Activity Report System)

## 🎯 Vision & Goal

Build an application that allows employees to **log, validate, and export their activity reports** effortlessly, assisted by **AI automation** (text, voice, or calendar import).
Goal: **reduce time spent** filling reports while **improving accuracy and consistency**.

---

## 👤 Target Users

* **Employee** — records daily activities, edits, submits monthly reports.
* **Manager** — reviews, comments, approves, or rejects reports.
* **Admin** — manages users, clients, projects, and exports.

---

## ⚙️ Core Features (v1)

1. **AI-assisted Activity Capture**

   * Voice/text input → AI fills activities, durations, and projects.
   * Detects duplicates and inconsistencies; auto-suggests corrections.

2. **Time & Project Management**

   * Calendar view (day, week, month).
   * Link activities to clients/projects.
   * Recurrent task templates.

3. **Validation Workflow**

   * Employees submit reports for approval.
   * Managers review, comment, approve/reject.
   * Lock approved periods with audit logs.

4. **Reports & Exports**

   * Dashboard (hours per project/client/week).
   * Export monthly CRA in PDF or Excel.
   * Summary charts and key indicators.

5. **Authentication & Roles**

   * Secure login/register with JWT.
   * Role-based access (employee, manager, admin).

6. **External Integrations (v1)**

   * Google Calendar import (read-only).
   * Slack / email notifications.

---

## 🧩 Tech Stack

* **Framework**: Next.js 15 (App Router, Turbopack)
* **Language**: TypeScript (strict mode)
* **Database**: SQLite (dev) → PostgreSQL (prod)
* **UI**: Tailwind CSS v4 + shadcn/ui components
* **Auth**: bcrypt (passwords), jsonwebtoken (JWT)
* **AI endpoints**: `/api/ai/draft`, `/api/ai/analyze`, `/api/ai/normalize`
* **Documentation**: Markdown files under `/docs/`

---

## 🧠 AI Conduct & Workflow (AuthPlayground rules)

### 🔁 7 Mandatory Steps

1. **Propose a solution or implementation.**
2. **Wait for validation.** and then create/update @docs/tasks/phase-X_PLAN.md
3. **Implement** (no tests, no lint). and then create/update docs/tasks/phase-X_MANUAL_TESTS.md
4. **Wait for validation again.** and then create/update docs/tasks/phase-X_RELEASE.md
5. **Update** `docs/TASKS.md`.
6. **Propose commit message** (never execute).

### 🧩 Development Standards

* Modular, reusable, self-documented code.
* All in **English** (code, comments, commits, docs).
* No `any` — TypeScript strict mode.
* Small, single-responsibility components.
* Never commit or push automatically — always **propose the git command**.

### 📁 Standard Files

* `docs/tasks/phase-X_PLAN.md` — detailed plan.
* `docs/tasks/phase-X_MANUAL_TESTS.md` — manual test steps.
* `docs/tasks/phase-X_RELEASE.md` — release notes.
* `docs/PRD.md` — product requirements (this file).
* `CLAUD.md` — AI workflow and conventions.

---

## 🧱 Project Structure

```
src/
 ├─ app/
 │   ├─ dashboard/
 │   ├─ activities/
 │   ├─ auth/
 │   └─ api/
 ├─ lib/
 │   ├─ db/
 │   │   └─ init.ts
 │   └─ api/
 │       └─ response.ts
docs/
 ├─ PRD.md
 ├─ TASKS.md
 └─ tasks/
data/
 └─ cra.db
```

---

## 🚀 Development Phases (10 total)

| Phase  | Objective                                                                 |
| ------ | ------------------------------------------------------------------------- |
| **1**  | Project setup: navigation, pages, design system, database with seed data. |
| **2**  | Authentication & RBAC (JWT, middleware).                                  |
| **3**  | Client and project catalogs.                                              |
| **4**  | Activity CRUD + AI draft generation.                                      |
| **5**  | Monthly period management & submission.                                   |
| **6**  | Manager review & approval workflow.                                       |
| **7**  | AI anomaly detection and normalization.                                   |
| **8**  | Google Calendar integration (read-only).                                  |
| **9**  | Reports & exports (PDF, Excel, dashboard).                                |
| **10** | Quality assurance, performance, and final polishing.                      |

Each phase produces `PLAN`, `MANUAL_TESTS`, and `RELEASE` docs, following the **7-step AI workflow**.

---

## ✅ Acceptance Criteria

* Activities can be created, edited, deleted, and submitted.
* Managers can comment and approve periods.
* AI can auto-draft title, duration, and project for each day.
* PDF/Excel exports match the monthly grid with totals.

---

## ⚠️ Risks & Mitigations

* **AI errors** → undo button for suggestions.
* **User friction** → recurring templates and calendar import.
* **Security** → bcrypt hash, JWT refresh, audit logs, strict RBAC.

---

Would you like me to now generate **Phase 1 — Foundations** (with `PLAN.md`, `MANUAL_TESTS.md`, and `RELEASE.md`) following this exact format and workflow?
