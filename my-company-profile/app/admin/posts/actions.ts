'use server';

import { createServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type FormState = {
  success: boolean;
  error: string;
} | null;

export async function createPost(prevState: FormState, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  // Validation
  if (!title || title.trim() === '') {
    return {
      success: false,
      error: 'Title is required',
    };
  }

  const supabase = createServerClient();

  // Insert post to Supabase
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title: title.trim(),
        body: body?.trim() || '',
        user_id: 'admin', // For now, using static user_id. Can be replaced with auth later
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate the posts list page
  revalidatePath('/admin/posts');

  // Redirect to posts list with success message
  redirect('/admin/posts?success=created');
}
