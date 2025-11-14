import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabaseServer';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_SECRET = 'your-secret-key-change-in-production'; // In production, use env variable

export async function hashPassword(password: string): Promise<string> {
  return crypto
    .createHash('sha256')
    .update(password + SESSION_SECRET)
    .digest('hex');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
}

export async function createSession(username: string) {
  const sessionData = {
    username,
    createdAt: Date.now(),
  };

  const sessionString = JSON.stringify(sessionData);
  const sessionToken = Buffer.from(sessionString).toString('base64');

  (await cookies()).set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getSession() {
  const sessionToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const sessionString = Buffer.from(sessionToken, 'base64').toString();
    const sessionData = JSON.parse(sessionString);
    return sessionData;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session;
}

export async function login(username: string, password: string) {
  const supabase = createServerClient();

  // Get user from database
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !user) {
    return { success: false, error: 'Invalid credentials' };
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    return { success: false, error: 'Invalid credentials' };
  }

  // Create session
  await createSession(username);

  return { success: true };
}
