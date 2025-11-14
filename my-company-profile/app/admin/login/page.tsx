import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';
import Link from 'next/link';

export default async function LoginPage() {
  // If already logged in, redirect to admin
  const session = await getSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🚀</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              PT. Digital Maju
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to access the admin panel
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to website
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
            <strong>Demo credentials:</strong><br />
            Username: <code className="font-mono">admin</code><br />
            Password: <code className="font-mono">12345678</code>
          </p>
        </div>
      </div>
    </div>
  );
}
