import { createServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
}

interface PageProps {
  searchParams: Promise<{ page?: string; success?: string }>;
}

export default async function AdminPostsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const success = params.success;
  const limit = 10;
  const offset = (page - 1) * limit;

  const supabase = createServerClient();

  const { data: posts, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-8">
          <div className="bg-red-50 border border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
            <strong className="font-semibold">Error:</strong> {error.message}
          </div>
        </div>
      </div>
    );
  }

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Posts</h1>
          <Link
            href="/admin/posts/new"
            className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors shadow-sm"
          >
            + Create New Post
          </Link>
        </div>

        {success === 'created' && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
            <strong className="font-semibold">Success!</strong> Post created successfully.
          </div>
        )}

        {posts && posts.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {posts.map((post: Post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Page {page} of {totalPages} <span className="text-gray-500 dark:text-gray-400">({count} total posts)</span>
            </div>
            <div className="flex gap-3">
              {page > 1 ? (
                <Link
                  href={`/admin/posts?page=${page - 1}`}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors shadow-sm"
                >
                  ← Previous
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 font-medium rounded-lg cursor-not-allowed"
                >
                  ← Previous
                </button>
              )}
              {page < totalPages ? (
                <Link
                  href={`/admin/posts?page=${page + 1}`}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors shadow-sm"
                >
                  Next →
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-500 font-medium rounded-lg cursor-not-allowed"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200 px-6 py-4 rounded-lg">
          <p className="font-medium">No posts found.</p>
          <p className="text-sm mt-1">Create your first post to get started.</p>
        </div>
      )}
      </div>
    </div>
  );
}
