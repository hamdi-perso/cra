This project is a template to start with to build @docs/PRD.md

The folder /docs contains design system description, to help you clarify the design system files and folders, you can see file @docs/INDEX.md that contains a description of each file

## Code Quality Standards

**ALWAYS apply these principles:**
- Write **modular code** - split into reusable components/functions
- Write **understandable code** - clear naming, proper comments, self-documenting
- Write **EVERYTHING in English** - code, comments, documentation, commits (French only for discussions with user)
- Follow TypeScript best practices
- Keep components small and focused (Single Responsibility Principle)
- Use proper file structure and organization

## Always follow instruction
1. I give you a task
2. you give me your plan
3. i iterate/validate
4. you create file @docs/tasks/phase-X_PLAN.md and put iterated plan in it, you develop without tests or build or lint
5. Create file @docs/tasks/phase-X_MANUAL_TESTS.md contains all manual tests
6. I iterate/validate after tests, update if needed @docs/tasks/phase-X_PLAN.md @docs/tasks/phase-X_MANUAL_TESTS.md
7. Give me commit message and create file @docs/tasks/phase-X_RELEASE.md containing the description of the final release

**File naming convention:**
- Use `phase-X` (e.g., phase-1, phase-2) for documentation files
- X = phase number from @docs/TASKS.md
- Each phase has 3 files: `phase-X_PLAN.md`, `phase-X_MANUAL_TESTS.md`, `phase-X_RELEASE.md` 

Dont do a big thing alone, we will go step by step together. 