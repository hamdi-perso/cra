'use client';

// This is the main page of the web app, it should show a link in the middle to the design-system page
export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-850">
      <div className="flex flex-col items-center gap-4">
        <a
          href="/examples/design-system"
          className="text-2xl font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          Go to Design System
        </a>
        <a
          href="/examples/board"
          className="text-2xl font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          Go to Board
        </a>
      </div>
    </div>  
  );
}
