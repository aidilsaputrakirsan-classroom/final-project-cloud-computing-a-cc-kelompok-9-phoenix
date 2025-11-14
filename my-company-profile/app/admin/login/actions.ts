'use server';

import { login as authLogin, deleteSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

type FormState = {
  success: boolean;
  error?: string;
} | null;

export async function loginAction(prevState: FormState, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return {
      success: false,
      error: 'Username and password are required',
    };
  }

  const result = await authLogin(username, password);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  // Redirect to admin dashboard
  redirect('/admin');
}

export async function logoutAction() {
  await deleteSession();
  redirect('/admin/login');
}
