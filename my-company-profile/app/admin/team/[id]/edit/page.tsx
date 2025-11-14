import { createServerClient } from '@/lib/supabaseServer';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { EditTeamMemberForm } from './EditTeamMemberForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTeamMember(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

export default async function EditTeamMemberPage({ params }: PageProps) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const { data: member, error } = await getTeamMember(id);

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-8">
          <div className="bg-red-50 border border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
            <strong className="font-semibold">Error:</strong> Team member not found
          </div>
          <Link
            href="/admin/team"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Team
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Edit Team Member</h1>

        <div className="max-w-3xl">
          <EditTeamMemberForm member={member} />
        </div>
      </div>
    </div>
  );
}
