'use server';

import { createServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';

type FormState = {
  success: boolean;
  error: string;
} | null;

export async function createTeamMember(prevState: FormState, formData: FormData) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const name = formData.get('name') as string;
  const position = formData.get('position') as string;
  const bio = formData.get('bio') as string;
  const avatar = formData.get('avatar') as string;
  const displayOrder = formData.get('display_order') as string;

  // Validation
  if (!name || name.trim() === '') {
    return {
      success: false,
      error: 'Name is required',
    };
  }

  if (!position || position.trim() === '') {
    return {
      success: false,
      error: 'Position is required',
    };
  }

  const supabase = createServerClient();

  // Insert team member to Supabase
  const { error } = await supabase
    .from('team_members')
    .insert([
      {
        name: name.trim(),
        position: position.trim(),
        bio: bio?.trim() || '',
        avatar: avatar || '👤',
        display_order: displayOrder ? parseInt(displayOrder) : 0,
      },
    ]);

  if (error) {
    console.error('Error creating team member:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate pages
  revalidatePath('/admin/team');
  revalidatePath('/');

  // Redirect to team list with success message
  redirect('/admin/team?success=created');
}

export async function updateTeamMember(prevState: FormState, formData: FormData) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const position = formData.get('position') as string;
  const bio = formData.get('bio') as string;
  const avatar = formData.get('avatar') as string;
  const displayOrder = formData.get('display_order') as string;

  // Validation
  if (!name || name.trim() === '') {
    return {
      success: false,
      error: 'Name is required',
    };
  }

  if (!position || position.trim() === '') {
    return {
      success: false,
      error: 'Position is required',
    };
  }

  const supabase = createServerClient();

  // Update team member in Supabase
  const { error } = await supabase
    .from('team_members')
    .update({
      name: name.trim(),
      position: position.trim(),
      bio: bio?.trim() || '',
      avatar: avatar || '👤',
      display_order: displayOrder ? parseInt(displayOrder) : 0,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating team member:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate pages
  revalidatePath('/admin/team');
  revalidatePath('/');

  // Redirect to team list with success message
  redirect('/admin/team?success=updated');
}

export async function deleteTeamMember(id: string) {
  // Check authentication
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const supabase = createServerClient();

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting team member:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate pages
  revalidatePath('/admin/team');
  revalidatePath('/');

  return { success: true };
}
