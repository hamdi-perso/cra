import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            CRA App
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Create your account
          </p>
        </div>

        {/* Register Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                required
              />
            </div>
          </div>

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
              placeholder="john.doe@company.com"
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

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded border-neutral-300 dark:border-neutral-700"
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer"
            >
              I agree to the{' '}
              <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full gap-2">
            <UserPlus className="h-4 w-4" />
            Create Account
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
          </span>
          <Link
            href="/login"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
