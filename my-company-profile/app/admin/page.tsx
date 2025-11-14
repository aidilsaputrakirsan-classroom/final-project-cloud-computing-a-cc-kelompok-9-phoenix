import { createServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { LogoutButton } from './LogoutButton';

async function getStats() {
  const supabase = createServerClient();

  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    postsCount: postsCount || 0,
    recentPosts: recentPosts || []
  };
}

export default async function AdminDashboard() {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                PT. Digital Maju - Content Management
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                ← Back to Website
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Portfolio</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.postsCount}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Content Sections</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">4</p>
              </div>
              <div className="text-4xl">📄</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">Active</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/posts"
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 hover:border-gray-900 dark:hover:border-white transition-all hover:shadow-xl group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">📝</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Manage Portfolio
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Create, edit, and delete portfolio posts
                </p>
              </div>
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
              Open →
            </div>
          </Link>

          <Link
            href="/admin/content"
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 hover:border-gray-900 dark:hover:border-white transition-all hover:shadow-xl group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🎨</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Edit Website Content
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Update hero, about, services, and contact sections
                </p>
              </div>
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
              Open →
            </div>
          </Link>
        </div>

        {/* Recent Portfolio */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Portfolio</h2>
            <Link
              href="/admin/posts/new"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              + Add New
            </Link>
          </div>
          {stats.recentPosts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentPosts.map((post: any) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                      {post.body}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(post.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No portfolio items yet.</p>
              <Link
                href="/admin/posts/new"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Create your first portfolio item →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
