'use client';

import { createPost } from '../actions';
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
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  );
}

export function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, null);

  return (
    <form action={formAction} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-200 dark:border-gray-700">
      {state?.error && (
        <div className="mb-6 bg-red-50 border border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
          <strong className="font-semibold">Error:</strong> {state.error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Title <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter post title"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="body" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Body <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">(optional)</span>
        </label>
        <textarea
          id="body"
          name="body"
          rows={8}
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
          placeholder="Enter post content"
        />
      </div>

      <div className="flex gap-3">
        <SubmitButton />
      </div>
    </form>
  );
}
