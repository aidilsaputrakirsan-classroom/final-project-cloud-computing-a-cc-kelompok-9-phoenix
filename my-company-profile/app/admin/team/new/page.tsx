import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { TeamMemberForm } from './TeamMemberForm';

export default async function NewTeamMemberPage() {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
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

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Add Team Member</h1>

        <div className="max-w-3xl">
          <TeamMemberForm />
        </div>
      </div>
    </div>
  );
}
