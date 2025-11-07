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
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading posts: {error.message}
        </div>
      </div>
    );
  }

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          + Create New Post
        </Link>
      </div>

      {success === 'created' && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Post created successfully!
        </div>
      )}

      {posts && posts.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post: Post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
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
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {page} of {totalPages} ({count} total posts)
            </div>
            <div className="flex gap-2">
              {page > 1 ? (
                <Link
                  href={`/admin/posts?page=${page - 1}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                >
                  Previous
                </button>
              )}
              {page < totalPages ? (
                <Link
                  href={`/admin/posts?page=${page + 1}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No posts found.
        </div>
      )}
    </div>
  );
}
