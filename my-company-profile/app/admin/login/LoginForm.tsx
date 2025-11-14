'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
        pending
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 shadow-lg'
      }`}
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, null);

  return (
    <form action={formAction} className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700">
      {state?.error && (
        <div className="mb-6 bg-red-50 border border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
          <strong className="font-semibold">Error:</strong> {state.error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          autoComplete="username"
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your password"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
