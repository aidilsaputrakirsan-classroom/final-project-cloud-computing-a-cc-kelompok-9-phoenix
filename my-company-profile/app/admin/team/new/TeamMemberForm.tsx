'use client';

import { createTeamMember } from '../actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
        pending
          ? 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
      }`}
    >
      {pending ? 'Adding...' : 'Add Team Member'}
    </button>
  );
}

export function TeamMemberForm() {
  const [state, formAction] = useFormState(createTeamMember, null);

  return (
    <form action={formAction} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">
      {state?.error && (
        <div className="mb-6 bg-red-50 border border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
          <strong className="font-semibold">Error:</strong> {state.error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Name <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Position <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            required
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="CEO"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="avatar" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Avatar <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">(emoji)</span>
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            defaultValue="👤"
            maxLength={2}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-3xl"
            placeholder="👤"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Use emoji like: 👨‍💼 👩‍💻 👨‍💻 👩‍🎨 👤
          </p>
        </div>

        <div>
          <label htmlFor="display_order" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Display Order
          </label>
          <input
            type="number"
            id="display_order"
            name="display_order"
            defaultValue={0}
            min={0}
            className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Lower numbers appear first
          </p>
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="bio" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Bio <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">(optional)</span>
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
          placeholder="Brief description about this team member..."
        />
      </div>

      <div className="flex gap-3">
        <SubmitButton />
      </div>
    </form>
  );
}
