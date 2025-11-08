import Link from 'next/link';
import { CreatePostForm } from './CreatePostForm';

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Posts
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Create New Post</h1>

        <div className="max-w-3xl">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
}
