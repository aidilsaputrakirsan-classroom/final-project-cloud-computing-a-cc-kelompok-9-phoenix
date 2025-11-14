import { createServerClient } from '@/lib/supabaseServer';
import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { DeleteTeamButton } from './DeleteTeamButton';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  avatar: string;
  display_order: number;
  created_at: string;
}

interface PageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function AdminTeamPage({ searchParams }: PageProps) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const params = await searchParams;
  const success = params.success;

  const supabase = createServerClient();

  const { data: teamMembers, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              href="/admin"
              className="text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Team</h1>
          </div>
          <Link
            href="/admin/team/new"
            className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors shadow-sm"
          >
            + Add Team Member
          </Link>
        </div>

        {success === 'created' && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
            <strong className="font-semibold">Success!</strong> Team member added successfully.
          </div>
        )}

        {success === 'updated' && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
            <strong className="font-semibold">Success!</strong> Team member updated successfully.
          </div>
        )}

        {success === 'deleted' && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
            <strong className="font-semibold">Success!</strong> Team member deleted successfully.
          </div>
        )}

        {teamMembers && teamMembers.length > 0 ? (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {teamMembers.map((member: TeamMember) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-3xl">{member.avatar}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {member.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {member.position}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {member.display_order}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/team/${member.id}/edit`}
                          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteTeamButton memberId={member.id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200 px-6 py-4 rounded-lg">
            <p className="font-medium">No team members found.</p>
            <p className="text-sm mt-1">Add your first team member to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
