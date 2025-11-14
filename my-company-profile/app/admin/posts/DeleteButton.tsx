'use client';

import { deletePost } from './actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
  postId: string;
}

export function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deletePost(postId);
      if (result.success) {
        router.push('/admin/posts?success=deleted');
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
        setIsDeleting(false);
      }
    } catch (error) {
      alert('An error occurred while deleting the post');
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
