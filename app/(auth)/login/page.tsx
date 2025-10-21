import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            CRA App
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="employee@cra.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-neutral-300 dark:border-neutral-700"
              />
              <span className="text-neutral-600 dark:text-neutral-400">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Demo Credentials:
          </p>
          <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <li>• Employee: employee@cra.com / password123</li>
            <li>• Manager: manager@cra.com / password123</li>
            <li>• Admin: admin@cra.com / password123</li>
          </ul>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            Don't have an account?{' '}
          </span>
          <Link
            href="/register"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
