import Link from 'next/link';
import { CreatePostForm } from './CreatePostForm';

export default function NewPostPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <Link
          href="/admin/posts"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Posts
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <div className="max-w-2xl">
        <CreatePostForm />
      </div>
    </div>
  );
}
