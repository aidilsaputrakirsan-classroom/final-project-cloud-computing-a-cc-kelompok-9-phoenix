'use server';

import { createServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';

type FormState = {
  success: boolean;
  error: string;
} | null;

export async function createPost(prevState: FormState, formData: FormData) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

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
        user_id: session.username, // Use authenticated user
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

export async function updatePost(prevState: FormState, formData: FormData) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const id = formData.get('id') as string;
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

  // Update post in Supabase
  const { error } = await supabase
    .from('posts')
    .update({
      title: title.trim(),
      body: body?.trim() || '',
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating post:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate pages
  revalidatePath('/admin/posts');
  revalidatePath('/');

  // Redirect to posts list with success message
  redirect('/admin/posts?success=updated');
}

export async function deletePost(id: string) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const supabase = createServerClient();

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate pages
  revalidatePath('/admin/posts');
  revalidatePath('/');

  return { success: true };
}
