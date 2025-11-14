'use client';

import { deleteTeamMember } from './actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteTeamButtonProps {
  memberId: string;
}

export function DeleteTeamButton({ memberId }: DeleteTeamButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove this team member? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteTeamMember(memberId);
      if (result.success) {
        router.push('/admin/team?success=deleted');
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
        setIsDeleting(false);
      }
    } catch (error) {
      alert('An error occurred while deleting the team member');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`px-3 py-1.5 text-sm rounded transition-colors ${
        isDeleting
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-red-600 text-white hover:bg-red-700'
      }`}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
