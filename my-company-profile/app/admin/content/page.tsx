import { createServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { ContentForm } from './ContentForm';

async function getSiteContent() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('site_content')
    .select('*')
    .order('section_name');

  return data || [];
}

export default async function ContentManagement() {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const content = await getSiteContent();

  const sections = {
    hero: content.find(c => c.section_name === 'hero')?.content || null,
    about: content.find(c => c.section_name === 'about')?.content || null,
    services: content.find(c => c.section_name === 'services')?.content || null,
    contact: content.find(c => c.section_name === 'contact')?.content || null,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Website Content</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Update homepage sections - Changes will reflect immediately
          </p>
        </div>

        {/* Content Form */}
        <ContentForm sections={sections} />
      </div>
    </div>
  );
}
